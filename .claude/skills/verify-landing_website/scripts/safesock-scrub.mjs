import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const usage = "usage: node safesock-scrub.mjs <base-url> [out-dir]";
const [, , baseArg, outArg] = process.argv;
if (!baseArg || !/^https?:\/\//.test(baseArg)) {
  console.error(usage);
  process.exit(2);
}
const base = baseArg.replace(/\/+$/, "");
const repo = process.cwd();
const { chromium } = createRequire(path.join(repo, "package.json"))("playwright");
const outDir = path.resolve(outArg ?? path.join(repo, "..", ".verify-evidence", path.basename(repo), `safesock-scrub-${new Date().toISOString().replace(/[:.]/g, "-")}`));
mkdirSync(outDir, { recursive: true });
console.log(`scrub-check: ${base}/safesock, evidence in ${outDir}`);

const viewports = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

async function stageBounds(page) {
  return page.evaluate(() => {
    const track = document.querySelector("[data-safesock-stage]");
    const stage = track.firstElementChild;
    const top = track.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(stage).top);
    return { start: top, end: top + track.offsetHeight - stage.offsetHeight };
  });
}

async function openPage(browser, name, options = {}) {
  const context = await browser.newContext({ ...viewports[name], ...options });
  const page = await context.newPage();
  await page.goto(`${base}/safesock`, { waitUntil: "load" });
  return { context, page };
}

async function waitForVideo(page) {
  await page.waitForFunction(() => {
    const video = document.querySelector("[data-safesock-stage] video");
    return video.readyState >= 4 || (video.buffered.length && video.buffered.end(0) >= video.duration - 0.1);
  }, null, { timeout: 30000 });
}

const readTime = (page) => page.evaluate(() => document.querySelector("[data-safesock-stage] video").currentTime);

async function scrubWithInput(page, name, scrollStep) {
  const { start, end } = await stageBounds(page);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), start - 200);
  await page.waitForTimeout(500);
  const samples = [];
  const cdp = name === "mobile" ? await page.context().newCDPSession(page) : null;
  await page.mouse.move(400, 400);
  while ((await page.evaluate(() => scrollY)) < end + 100) {
    assert.ok(samples.length < 200, `${name}: scrolling stalled at scrollY ${samples.at(-1)?.y}`);
    if (cdp) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 600 }] });
      for (let i = 1; i <= 8; i++) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 600 - (scrollStep * i) / 8 }] });
        await page.waitForTimeout(16);
      }
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } else {
      await page.mouse.wheel(0, scrollStep);
    }
    await page.waitForTimeout(90);
    samples.push({ y: await page.evaluate(() => scrollY), t: await readTime(page) });
  }
  await page.waitForTimeout(800);
  const final = await readTime(page);
  for (let i = 1; i < samples.length; i++) {
    assert.ok(samples[i].t >= samples[i - 1].t, `${name}: currentTime went back from ${samples[i - 1].t} to ${samples[i].t} at scrollY ${samples[i].y}`);
  }
  assert.ok(final > 7, `${name}: currentTime at the end of the stage is ${final}, expected more than 7`);
  return { inputs: samples.length, first: samples[0], last: samples.at(-1), final };
}

async function seekLatency(page) {
  return page.evaluate(() => {
    const video = document.querySelector("[data-safesock-stage] video");
    return new Promise((resolve) => {
      const times = [];
      let started = 0;
      const step = (i) => {
        if (i === 40) return resolve({ seeks: times.length, avgMs: times.reduce((a, b) => a + b, 0) / times.length, maxMs: Math.max(...times) });
        started = performance.now();
        video.addEventListener("seeked", () => { times.push(performance.now() - started); step(i + 1); }, { once: true });
        video.currentTime = (i * 0.2) % 7.9;
      };
      step(0);
    });
  });
}

async function screenshots(page, name) {
  const { start, end } = await stageBounds(page);
  const shots = [];
  for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), start + (end - start) * fraction);
    await page.waitForTimeout(1200);
    const file = path.join(outDir, `scrub-${name}-${Math.round(fraction * 100)}.png`);
    await page.screenshot({ path: file });
    shots.push({ fraction, time: await readTime(page), file });
  }
  return shots;
}

const browser = await chromium.launch();
const report = {};
try {
  for (const name of Object.keys(viewports)) {
    const { context, page } = await openPage(browser, name);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await waitForVideo(page);
    report[name] = {
      scrub: await scrubWithInput(page, name, name === "mobile" ? 160 : 100),
      seek: await seekLatency(page),
      shots: await screenshots(page, name),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
      errors,
    };
    assert.equal(report[name].overflow, 0, `${name}: horizontal overflow`);
    await context.close();
  }

  for (const [label, options] of [["nojs", { javaScriptEnabled: false }], ["reduced", { reducedMotion: "reduce" }]]) {
    for (const name of Object.keys(viewports)) {
      const { context, page } = await openPage(browser, name, options);
      const state = await page.evaluate(() => ({
        stage: getComputedStyle(document.querySelector("[data-safesock-stage]")).display,
        stills: getComputedStyle(document.querySelector("[data-safesock-stills]")).display,
        videoRequested: performance.getEntriesByType("resource").some((entry) => entry.name.includes("scrub.mp4")),
      }));
      assert.equal(state.stage, "none", `${label} ${name}: stage hidden`);
      assert.equal(state.stills, "block", `${label} ${name}: stills shown`);
      const file = path.join(outDir, `${label}-${name}.png`);
      await page.locator("[data-safesock-stills]").screenshot({ path: file });
      report[`${label}-${name}`] = { ...state, file };
      await context.close();
    }
  }
  for (const width of [320, 375, 768, 1024, 1280, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${base}/safesock`, { waitUntil: "load" });
    for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.equal(overflow, 0, `overflow at ${width}px, scrollY ${y}`);
    }
    report[`overflow-${width}`] = 0;
    await context.close();
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
console.log("scrub-check: PASS");

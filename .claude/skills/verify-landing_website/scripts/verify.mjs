#!/usr/bin/env node
import { spawn, spawnSync, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const worktreeName = path.basename(root);
const isWindows = process.platform === "win32";

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const CHECKS = {
  status: (p) => (p.status >= 400 || p.status === 0 ? [`HTTP ${p.status}`] : []),
  console: (p) => p.console,
  pageErrors: (p) => p.pageErrors,
  requests: (p) => p.requests,
  images: (p) => p.images,
  overflow: (p) => (p.overflow ? [`scrollWidth ${p.overflow.scrollWidth} > clientWidth ${p.overflow.clientWidth}; widest: ${p.overflow.offenders.join(", ")}`] : []),
  unrevealed: (p) => p.unrevealed,
};

function parseArgs(argv) {
  const args = { build: true, doctor: false, routes: null, out: null, port: null, concurrency: 4 };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === "--no-build") args.build = false;
    else if (flag === "--doctor") args.doctor = true;
    else if (flag === "--routes") args.routes = argv[++i].split(",").map((r) => r.trim()).filter(Boolean);
    else if (flag === "--out") args.out = path.resolve(argv[++i]);
    else if (flag === "--port") args.port = Number(argv[++i]);
    else if (flag === "--concurrency") args.concurrency = Number(argv[++i]);
    else if (flag === "--help" || flag === "-h") {
      console.log("usage: node verify.mjs [--no-build] [--routes /a,/b] [--out DIR] [--port N] [--concurrency N] [--doctor]");
      process.exit(0);
    } else throw new Error(`unknown flag ${flag}`);
  }
  const bad = (args.routes ?? []).filter((route) => !route.startsWith("/"));
  if (bad.length) {
    throw new Error(`routes must start with "/": ${bad.join(", ")}. Git Bash rewrites leading-slash args into Windows paths; rerun with MSYS_NO_PATHCONV=1.`);
  }
  return args;
}

function derivePort() {
  const digest = createHash("sha1").update(root.toLowerCase().replaceAll("\\", "/")).digest();
  return 3100 + (digest.readUInt16BE(0) % 1800);
}

function discoverRoutes() {
  const routes = [];
  const skipped = [];
  const walk = (dir, segments) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const name = entry.name;
        if (name.startsWith("_") || name.startsWith("@")) continue;
        walk(path.join(dir, name), /^\(.*\)$/.test(name) ? segments : [...segments, name]);
      } else if (/^page\.(tsx|ts|jsx|js|mdx)$/.test(entry.name)) {
        const route = "/" + segments.join("/");
        (segments.some((s) => s.startsWith("[")) ? skipped : routes).push(route);
      }
    }
  };
  walk(path.join(root, "app"), []);
  return { routes: routes.sort(), skipped: skipped.sort() };
}

function portInUse(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" });
    socket.once("connect", () => (socket.destroy(), resolve(true)));
    socket.once("error", () => resolve(false));
  });
}

function git(...args) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function startServer(port, logFile) {
  const log = fs.openSync(logFile, "a");
  return spawn(`pnpm start -p ${port}`, {
    cwd: root,
    shell: true,
    detached: !isWindows,
    stdio: ["ignore", log, log],
    env: { ...process.env, PORT: String(port) },
  });
}

function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  if (isWindows) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {}
  }
}

async function waitForReady(baseUrl, child, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`pnpm start exited with code ${child.exitCode}`);
    try {
      const response = await fetch(baseUrl + "/", { redirect: "manual" });
      if (response.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server not ready at ${baseUrl} after ${timeoutMs}ms`);
}

function slugFor(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "_");
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.floor(window.innerHeight * 0.6)) {
      window.scrollTo({ top: y, behavior: "instant" });
      await pause(120);
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
    await pause(400);
  });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page
    .waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 10_000 })
    .catch(() => {});
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  // Reveal transitions stagger by --reveal-i * 100ms, so let the longest one settle before capturing.
  await page.waitForTimeout(1500);
}

async function inspect(page) {
  return page.evaluate(() => {
    const describe = (el) => {
      const id = el.id ? `#${el.id}` : "";
      const cls = typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };
    const docEl = document.documentElement;
    let overflow = null;
    if (docEl.scrollWidth > docEl.clientWidth) {
      const offenders = [...document.body.querySelectorAll("*")]
        .map((el) => ({ el, right: el.getBoundingClientRect().right }))
        .filter(({ right }) => right > docEl.clientWidth + 1)
        .sort((a, b) => b.right - a.right)
        .slice(0, 5)
        .map(({ el, right }) => `${describe(el)} (right ${Math.round(right)})`);
      overflow = { scrollWidth: docEl.scrollWidth, clientWidth: docEl.clientWidth, offenders };
    }
    const images = [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => `broken image ${img.currentSrc || img.src || "(no src)"}`);
    const unrevealed =
      docEl.dataset.motion === "ready"
        ? [...document.querySelectorAll("[data-reveal]:not([data-revealed])")].map(
            (el) => `still hidden after full scroll: ${describe(el)} "${(el.textContent || "").trim().slice(0, 60)}"`,
          )
        : [];
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.href);
    return { overflow, images, unrevealed, links };
  });
}

async function checkPage(browser, baseUrl, route, viewportName, outDir) {
  const context = await browser.newContext(VIEWPORTS[viewportName]);
  const page = await context.newPage();
  const origin = new URL(baseUrl).origin;
  const result = { route, viewport: viewportName, status: 0, console: [], pageErrors: [], requests: [], images: [], overflow: null, unrevealed: [], links: [], shots: {} };
  page.on("console", (msg) => {
    if (msg.type() === "error") result.console.push(msg.text());
  });
  page.on("pageerror", (error) => result.pageErrors.push(String(error.stack || error)));
  page.on("response", (response) => {
    if (response.status() >= 400 && new URL(response.url()).origin === origin) {
      result.requests.push(`${response.status()} ${response.request().method()} ${response.url()}`);
    }
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText ?? "";
    if (new URL(request.url()).origin === origin && !failure.includes("ERR_ABORTED")) {
      result.requests.push(`failed (${failure}) ${request.method()} ${request.url()}`);
    }
  });
  try {
    const response = await page.goto(baseUrl + route, { waitUntil: "load", timeout: 60_000 });
    result.status = response?.status() ?? 0;
    await scrollThrough(page);
    Object.assign(result, await inspect(page));
    const slug = slugFor(route);
    result.shots.viewport = `${slug}-${viewportName}-viewport.png`;
    result.shots.full = `${slug}-${viewportName}-full.png`;
    await page.screenshot({ path: path.join(outDir, result.shots.viewport), animations: "disabled" });
    await page.screenshot({ path: path.join(outDir, result.shots.full), fullPage: true, animations: "disabled" });
  } catch (error) {
    result.pageErrors.push(`harness: ${error.message}`);
  } finally {
    await context.close();
  }
  return result;
}

async function checkLinks(urls, origin) {
  const results = [];
  for (const url of urls) {
    let current = url;
    let status = 0;
    let note = "";
    try {
      for (let hop = 0; hop < 6; hop++) {
        const response = await fetch(current, { redirect: "manual" });
        status = response.status;
        const location = response.headers.get("location");
        if (status < 300 || status >= 400 || !location) break;
        const next = new URL(location, current);
        if (next.origin !== origin) {
          note = `redirects off-site to ${next.href}`;
          break;
        }
        current = next.href;
      }
    } catch (error) {
      note = error.message;
    }
    results.push({ url, final: current, status, note, ok: status > 0 && status < 400 });
  }
  return results;
}

async function pool(items, size, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await worker(items[index]);
      }
    }),
  );
  return results;
}

function printSummary(pages, links, outDir) {
  const names = Object.keys(CHECKS);
  const rows = pages.map((p) => [p.route, p.viewport, ...names.map((n) => (n === "status" ? String(p.status) : String(CHECKS[n](p).length)))]);
  const header = ["route", "viewport", ...names];
  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
  const line = (cells) => cells.map((c, i) => c.padEnd(widths[i])).join("  ");
  console.log("\n" + line(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const row of rows) console.log(line(row));
  const brokenLinks = links.filter((l) => !l.ok);
  console.log(`\nlinks: ${links.length} same-origin checked, ${brokenLinks.length} broken`);
  for (const l of brokenLinks) console.log(`  ${l.status} ${l.url}${l.final !== l.url ? ` -> ${l.final}` : ""} (from ${l.from.join(", ")})`);
  for (const p of pages) {
    for (const n of names) {
      for (const finding of CHECKS[n](p)) console.log(`  FAIL ${p.route} [${p.viewport}] ${n}: ${finding.split("\n")[0].slice(0, 220)}`);
    }
  }
  console.log(`\nevidence: ${outDir}`);
}

async function doctor(port) {
  const baseUrl = `http://127.0.0.1:${port}`;
  const report = { root, worktree: worktreeName, head: git("rev-parse", "--short", "HEAD"), dirty: Boolean(git("status", "--porcelain")), port };
  report.portInUse = await portInUse(port);
  if (report.portInUse) {
    try {
      const response = await fetch(baseUrl + "/", { redirect: "manual" });
      report.portServer = `${response.status} x-powered-by=${response.headers.get("x-powered-by")}`;
    } catch (error) {
      report.portServer = error.message;
    }
  }
  report.buildId = fs.existsSync(path.join(root, ".next/BUILD_ID")) ? fs.readFileSync(path.join(root, ".next/BUILD_ID"), "utf8").trim() : null;
  report.nodeModules = fs.existsSync(path.join(root, "node_modules/playwright"));
  try {
    const browser = await chromium.launch();
    report.chromium = browser.version();
    await browser.close();
  } catch (error) {
    report.chromium = `launch failed: ${error.message.split("\n")[0]}`;
  }
  console.log(JSON.stringify(report, null, 2));
  const ready = !report.portInUse && report.nodeModules && !String(report.chromium).startsWith("launch failed");
  console.log(ready ? "doctor: ready" : "doctor: NOT ready (port taken, deps missing, or chromium cannot launch)");
  return ready ? 0 : 1;
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exit(2);
  }
  const port = args.port ?? derivePort();
  if (args.doctor) process.exit(await doctor(port));

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = args.out ?? path.join(path.dirname(root), ".verify-evidence", worktreeName, stamp);
  fs.mkdirSync(outDir, { recursive: true });
  const discovered = discoverRoutes();
  const routes = args.routes ?? discovered.routes;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`worktree ${root}\nport ${port}\nroutes ${routes.length}\nevidence ${outDir}`);

  if (await portInUse(port)) {
    console.error(`port ${port} is already in use; another run may own it. Pass --port or stop that run first.`);
    process.exit(2);
  }

  if (args.build) {
    console.log("pnpm build ...");
    const build = spawnSync("pnpm build", { cwd: root, shell: true, encoding: "utf8" });
    fs.writeFileSync(path.join(outDir, "build.log"), (build.stdout ?? "") + (build.stderr ?? ""));
    if (build.status !== 0) {
      console.error(`pnpm build failed (exit ${build.status}); see ${path.join(outDir, "build.log")}`);
      process.exit(2);
    }
  }

  const server = startServer(port, path.join(outDir, "server.log"));
  const shutdown = () => stopServer(server);
  process.on("exit", shutdown);
  process.on("SIGINT", () => process.exit(130));
  process.on("SIGTERM", () => process.exit(143));

  let browser;
  try {
    await waitForReady(baseUrl, server);
    browser = await chromium.launch();
    const jobs = routes.flatMap((route) => Object.keys(VIEWPORTS).map((viewport) => ({ route, viewport })));
    const pages = await pool(jobs, args.concurrency, ({ route, viewport }) => {
      process.stdout.write(`  ${viewport.padEnd(7)} ${route}\n`);
      return checkPage(browser, baseUrl, route, viewport, outDir);
    });

    const origin = new URL(baseUrl).origin;
    const linkSources = new Map();
    for (const p of pages) {
      for (const href of p.links) {
        const url = new URL(href);
        if (url.origin !== origin) continue;
        url.hash = "";
        const sources = linkSources.get(url.href) ?? new Set();
        sources.add(p.route);
        linkSources.set(url.href, sources);
      }
    }
    const links = (await checkLinks([...linkSources.keys()].sort(), origin)).map((l) => ({ ...l, from: [...linkSources.get(l.url)] }));

    const failures = pages.reduce((sum, p) => sum + Object.values(CHECKS).reduce((s, check) => s + check(p).length, 0), 0) + links.filter((l) => !l.ok).length;
    const report = {
      startedAt: stamp,
      worktree: root,
      head: git("rev-parse", "HEAD"),
      dirty: Boolean(git("status", "--porcelain")),
      baseUrl,
      viewports: VIEWPORTS,
      routes,
      skippedDynamicRoutes: discovered.skipped,
      failures,
      ok: failures === 0,
      pages: pages.map((p) => ({ ...p, links: undefined })),
      links,
    };
    fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
    printSummary(pages, links, outDir);
    console.log(failures === 0 ? "PASS" : `FAIL: ${failures} finding(s)`);
    process.exitCode = failures === 0 ? 0 : 1;
  } catch (error) {
    console.error(`harness error: ${error.message}; server log at ${path.join(outDir, "server.log")}`);
    process.exitCode = 2;
  } finally {
    await browser?.close();
    shutdown();
  }
}

main();

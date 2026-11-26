# Privacy

`/privacy` (title `Privacy policy | Landing`) is a long static policy with the h1 "Privacy policy" and the meta line "Updated November 25, 2026". It has three parts, each with its own scope line, and a closing Contact section. An "On this page" nav of three jump links sits under the hero.

## Sub-features

- `privacy-jump` is `<nav aria-label="On this page">` (`components/sections/trust/TrustPage.tsx`) with three numbered links, each showing a label and a scope note. They are `This website` (`#website`), `Patient and clinic data in Landing` (`#patient-data`), and `Google connections in the admin dashboard` (`#google`).
- `privacy-parts` renders the three sections as `<section id=... aria-labelledby=...>`. Each has a number, an h2, its scope line, and a ruled `<dl>` of rows. The Google part also shows "Updated October 29, 2026". The website part has 4 rows, the patient part 5, and the Google part 9.
- `privacy-contact` is the `#contact` section, which has an email link and no entry in the jump nav.
- `privacy-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Privacy` in the footer.
- Choose a jump link under the hero, or load `/privacy#google` directly.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /privacy`. `privacy-mobile-full.png` shows long URLs wrapping inside the 390px column, and `overflow` is 0.
- **Jump links.** With a server held on `<port>`, run this at desktop size.

  ```js
  await page.goto(base + "/privacy");
  const nav = page.getByRole("navigation", { name: "On this page" });
  for (const [name, id] of [["This website", "website"], ["Patient and clinic data in Landing", "patient-data"], ["Google connections in the admin dashboard", "google"]]) {
    await nav.getByRole("link", { name: new RegExp("^\\d*\\s*" + name) }).click();
    await page.waitForFunction((i) => location.hash === "#" + i, id);
    await page.waitForTimeout(600);
    const top = await page.evaluate((i) => document.getElementById(i).getBoundingClientRect().top, id);
    if (top < 0 || top > 160) throw new Error(`#${id} top is ${top}`);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  }
  ```

  Each link ends with its section just under the sticky header (`scroll-mt-24`).
- **Row counts.** Assert `page.locator("dl > div").count()` is 18 across the three parts.

## Gotchas

- The jump link's accessible name starts with its number and ends with its scope note, so match by regex, not by exact name.
- On this page, long unbroken URLs and email addresses are the usual cause of horizontal overflow at 390px.
- The page text is legal copy. Do not change its wording as part of a visual change. Its date lines are part of that copy.
- `data-scroll-behavior="smooth"` is set on `<html>`, so a jump scrolls over several frames. Wait before you read positions.

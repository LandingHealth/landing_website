# Home

The home page (`/`, title `Landing Health`) has a hero headline ("AI powered between visit management layer for physical therapy."), a `Book a demo` button, a static clinic dashboard preview, an "Awarded by" logo marquee, a four-card "The Workflow" video row, "You decide what changes.", "Support around the visit, too.", and a closing demo call-out.

## Sub-features

- `home-hero` renders the headline with the shimmer on the italic word, plus the demo button.
- `home-preview` renders the dashboard preview with sample patient Daniel Ortiz.
- `home-marquee` scrolls award logos edge to edge.
- `home-workflow` shows four cards: Exercise recording, Exercise review, Appointment preparation, and Post-appointment agent. Each is a looping video with a poster.
- `home-support` links to Scheduling, Home exercise guides, and SafeSock.
- `home-menu` opens the phone navigation popover below 768px.

## How to get to it (user POV)

- Open the site root, or choose `Landing Health home` in the header from any page.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /`. The summary shows `/` clean at desktop and mobile, and `home-desktop-full.png` shows every section above in order.
- **Phone menu.** With a server held on `<port>`, run this snippet at mobile size.

  ```js
  await page.goto(base + "/");
  await page.getByRole("button", { name: "Menu" }).click();
  const nav = page.getByRole("navigation", { name: "Phone navigation" });
  await nav.waitFor();
  for (const name of ["Product", "SafeSock", "Getting Started", "Resources", "Company"]) await nav.getByRole("link", { name }).waitFor();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "<evidence>/home-menu-open.png" });
  await nav.getByRole("link", { name: "Product" }).click();
  await page.waitForURL(base + "/product");
  ```

  The popover lists all five links, and choosing Product lands on `/product`.

## Gotchas

- The marquee and shimmer are infinite or delayed CSS animations. `verify.mjs` freezes animations for screenshots, so a mid-motion frame never shows up in a diff. If you change motion, check it by eye in a headed browser, and keep it unchanged per the Motion section of `DESIGN.md`.
- The two right-hand workflow cards look nearly empty in screenshots. Their poster frames are a pale document on a gray grid, so that look is the real content, not a load failure.
- The menu popover fades in. A screenshot taken right after the links appear shows the hero text through a half-transparent panel. Wait 1s, and the panel is opaque.
- At 1440px the marquee cuts logos at both edges by design.

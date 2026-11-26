# Home

The home page (`/`, title `Landing Health`) opens with the h1 "Turn home exercise into a new revenue stream", a `Book a demo` and a `See the product` button, and an expandable PT review video in a gradient frame. Below it sit "From the home session to the next visit." with three product cards, an "Awarded by" logo marquee, a dark "Setting up your clinic." card, then the shared closing call-out (see the README). The announcement bar and header sit above all of it (see the README's Shared chrome).

## Sub-features

- `home-hero` renders the h1, the lead paragraph, the two buttons, and the `HeroArcs` backdrop. Each element rises in with a staggered `animate-rise` delay.
- `home-video` is the hero `ExpandableMedia` (`components/ExpandableMedia.tsx`) of `/workspace/exercise-review.mp4`. Its button is named `Expand PT review video`, and `Close PT review video` once open.
- `home-product` renders three `<article>` cards, each labelled by `home-exercise-title`, `pt-review-title`, or `progress-title`. Each has an app screenshot (`ScreenCrop`), a body, and a link named `See home exercise`, `See PT review`, or `See progress and follow-up`. The links target `/product#home-exercise`, `/product#pt-review`, and `/product#progress`.
- `home-awards` is the "Awarded by" marquee of 14 logos (`components/sections/home/Awards.tsx`, `components/Marquee.tsx`). The list renders four times, and copies 2 to 4 are `aria-hidden`.
- `home-setup` is the dark "Setting up your clinic." card with three steps and a `See how setup works` link to `/getting-started`.
- `home-cta` is the shared closing call-out (see the README).
- `home-menu` is the phone menu popover below 1024px (the README's Shared chrome describes it).

## How to get to it (user POV)

- Open the site root, or choose `Landing Health home` in the header or footer from any page.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /`. The summary shows `/` clean at desktop and mobile, and `home-desktop-full.png` shows the sections above in order.
- **Product links.** With a server held on `<port>`, run this.

  ```js
  await page.goto(base + "/");
  const links = await page.locator("article[aria-labelledby$='-title'] a[href^='/product#']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  if (links.join() !== "/product#home-exercise,/product#pt-review,/product#progress") throw new Error(`product links: ${links}`);
  await page.getByRole("link", { name: "See PT review" }).click();
  await page.waitForURL(base + "/product#pt-review");
  ```

  The URL lands on `/product#pt-review`. The product feature file covers the menu state that follows.
- **Hero video expand.** Click `Expand PT review video`, wait for `Close PT review video`, wait 800ms, then screenshot. Assert `!document.querySelector("video").paused`. Press Escape and wait for `Expand PT review video`.
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

  The popover lists six links, and choosing Product lands on `/product`.

## Gotchas

- Nothing on the page says "Jump to", "NetworkFeed", or "The Workflow" any more. A recipe that looks for them is stale.
- The marquee and the hero rise are CSS animations. `verify.mjs` freezes animations for screenshots, so a mid-motion frame never shows up in a diff. If you change motion, check it by eye in a headed browser, and keep it per the Motion section of `DESIGN.md`.
- The marquee cuts logos at both edges by design. Under reduced motion it wraps into one centered list with the copies hidden.
- The hero video autoplays muted, except under reduced motion. A black frame before the poster loads is normal.
- The menu popover fades in. A screenshot taken right after the links appear shows the hero text through a half-transparent panel. Wait 1s, and the panel is opaque.

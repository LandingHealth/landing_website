# Product

`/product` (title `Product | Landing`) explains the Landing loop between visits. It has the h1 "From home exercise to the next visit", a three-step workflow list, the FeatureTour ("One loop between visits") with a sticky menu and three features, a "Planned" Documentation block, and a closing demo call-out.

## Sub-features

- `product-hero` renders the h1, the lead, `Book a demo` and `See how setup works` buttons, and an ordered list: "At home", "In your review queue", "Before the visit".
- `product-tour` is `components/ui/FeatureTour.tsx`, a `<nav aria-label="Product features">` beside three `<article>` features. The nav links are `Home exercise`, `PT review`, and `Progress and follow-up`, and they target `#home-exercise`, `#pt-review`, and `#progress`. Home links to these ids, so they are stable.
- `product-tour-active` marks the feature the visitor is reading. An `IntersectionObserver` with a thin band just above the viewport middle sets the active id. The matching nav link gets `aria-current="location"`. At 1024px and wider the inactive articles dim to `opacity-30`.
- `product-tour-sticky` keeps the menu pinned while the tour scrolls. At 1024px and wider it is a left column that pins at `top-24`. Below that it is a horizontal pill row that pins at `top-16` under the header and scrolls sideways to keep the active pill in view.
- `product-demos` shows an expandable looping video in `home-exercise` (`Expand Patient app exercise recording video`) and `pt-review` (`Expand PT app exercise review video`). The `progress` feature shows the static `ProgressPreview` (`components/DashboardPreview.tsx`) instead.
- `product-planned` renders the "Documentation" block under the eyebrow "Planned". It states that documentation support is not built.

## How to get to it (user POV)

- Choose `Product` in the header or phone menu.
- Choose a `See ...` link on a home product card, which opens `/product#home-exercise`, `#pt-review`, or `#progress`.
- Choose `See the product` on the home hero, or in the closing call-out of `/getting-started` or `/careers`.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /product`. `product-desktop-full.png` shows the menu column beside the first feature.
- **Menu follows the scroll.** With a server held on `<port>`, run this at desktop size (1440x900).

  ```js
  const active = () => page.evaluate(() => document.querySelector("nav[aria-label='Product features'] [aria-current='location']")?.textContent);
  await page.goto(base + "/product");
  await page.waitForFunction(() => document.querySelector("nav[aria-label='Product features'] [aria-current='location']")?.textContent === "Home exercise");
  for (const [id, name] of [["pt-review", "PT review"], ["progress", "Progress and follow-up"]]) {
    await page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: "center" }), id);
    await page.waitForFunction((n) => document.querySelector("nav[aria-label='Product features'] [aria-current='location']")?.textContent === n, name);
  }
  await page.screenshot({ path: "<evidence>/product-tour-progress.png" });
  ```

  The active link follows the feature in the middle of the screen, and the shot shows the other two features dimmed.
- **Menu click.** Choose `PT review` in the menu. Assert `location.hash === "#pt-review"`, that the link has `aria-current="location"`, and that `#pt-review` top is between 0 and 200px of the viewport top (below the sticky header).
- **Deep link.** Load `base + "/product#progress"` directly. The `Progress and follow-up` link is current after the scroll settles.
- **Mobile pill row.** At mobile size, scroll into the tour and read `getBoundingClientRect().top` of the `Product features` nav. It stays at 64px (`top-16`) while a feature scrolls beneath it.
- **Demo expand.** Click `Expand PT app exercise review video`, wait for `Close PT app exercise review video`, wait 800ms, assert the video is playing, screenshot, and press Escape.

## Gotchas

- The menu highlights by scroll position. Use `scrollIntoView({ block: "center" })`, not `scrollTo(bottom)`, when you assert on `progress`, because the last feature may never cross the viewport band when little page remains below it.
- `scroll-mt-32` (mobile) and `scroll-mt-24` (desktop) offset the anchors under the sticky header. A shot where the feature title hides under the header is a regression.
- A nav link sets the active id on click before the observer runs. A click assertion that passes does not prove the observer, so use the scroll recipe for that.
- There is no revenue block here any more. `/product#revenue` and `/product#security` do not exist, so a link to them lands at the top of the page. The calculators live at `/resources/clinic-planning`.
- The videos autoplay muted and loop. Under reduced motion they do not start, and the poster shows.

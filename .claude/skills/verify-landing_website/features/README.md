# landing_website verification map

This directory is the maintained source for verifying what a visitor sees on the Landing Health marketing site. Read this index, run `scripts/verify.mjs` for the load-level checks, then use the matching feature file for anything a visitor does beyond loading a page.

## Baseline preconditions

- Work from a worktree root with `node_modules` installed (`pnpm install`).
- `node .claude/skills/verify-landing_website/scripts/verify.mjs --doctor` prints `doctor: ready`. Its `port` value is this worktree's port, written `<port>` below.
- Never drive a server that this worktree did not start. Other worktrees run their own on other ports.

## Driving conventions

- Load-level proof for every route comes from one `verify.mjs` run. Feature files add only the interactions it does not do.
- For an interaction recipe, build once (`pnpm build`), then hold a server with `pnpm start -p <port>` in the background, run the snippet, and stop that server pid tree when done. Save each snippet as a Node ESM file under the scratchpad and run it with `node <file>.mjs` from the worktree root so `playwright` resolves.
- Every snippet starts the same way:

  ```js
  import { chromium } from "playwright";
  const base = "http://127.0.0.1:<port>";
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  ```

  Use `{ viewport: { width: 1440, height: 900 } }` for desktop. End with `await browser.close()`.
- Prefer roles and accessible names (`page.getByRole("button", { name: "Menu" })`) over CSS classes. The classes are Tailwind utilities and change with every restyle.
- The app writes curly apostrophes in copy (`Neil’s`, `couldn’t`). Match those names with a regex.
- Write recipe screenshots into the same evidence dir as the `verify.mjs` run they go with.

## Proof and skip reporting

- A route is proven at both widths only when `verify.mjs` reports it clean and you have looked at its PNGs.
- An interaction is proven by a screenshot before and after the action, plus an assertion on the resulting state.
- Report a recipe you could not run with the command you tried and the unmet precondition. Do not report it as verified by a different path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph on what the visitor sees. It then has exactly four H2s in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with verify.mjs`, and `Gotchas`.

## Shared chrome

Every page shares the announcement bar, header, footer, and closing call-out from `app/layout.tsx` and the components below.

- **Announcement bar** (`components/AnnouncementBar.tsx`) is a blue strip above the header, 40px tall, and not sticky. It reads "New article: <title>" with a `Read more →` link. The text and target come from `announcement` in `lib/site.ts`, which names the first entry of `resources` in `lib/resources.ts`. Setting `announcement` to `null` removes the bar.
- **Header** (`components/Header.tsx`) is sticky with a bottom hairline. It has a home link named `Landing Health home` on the left, then on the right a `Primary navigation` nav at 1024px and wider (Product, SafeSock, Getting Started, Resources, Company) and a `Book a demo` button that opens Calendly. On `/`, `/product` and `/getting-started` the header button is hidden and inert while the hero's own button row (`data-header-cta`) is on screen, and slides in once you scroll past it. Below 1024px the nav collapses into an icon button named `Menu`. It opens a popover dialog named `Menu` that holds `Phone navigation` with the five links. The home feature file holds the menu recipe.
- **Footer** (`components/Footer.tsx`) is graphite with a hairline on top: `© <year> Landing Health` on the left and a `Footer` nav of two untitled columns. The first has Product, SafeSock, Getting Started, Company, Careers, Resources, Referral, Security, and Privacy; the second has Contact (mailto) and LinkedIn.
- **CTA sheet** (`components/ui/CtaSheet.tsx`) closes every page. The layout renders it, identical on every page: "Monitor home exercise and bill for it in one system", the "Discover how Landing can help your clinic…" lead, and one white `Book a demo` button (to Calendly).

## Features

- [Home](./home.md) covers `/`, the hero video, the three product cards, the award marquee, and the phone menu.
- [Product](./product.md) covers `/product` and the FeatureTour sticky menu (`#home-exercise`, `#pt-review`, `#progress`).
- [SafeSock](./safesock.md) covers `/safesock`.
- [Getting started](./getting-started.md) covers `/getting-started` and the three setup steps.
- [Clinic planning](./clinic-planning.md) covers `/resources/clinic-planning`, its two calculators, and the `/revenue` redirect.
- [Resources and articles](./resources-articles.md) covers `/resources`, the flyer PDF, and the six article pages.
- [Company](./company.md) covers `/company`, the founders (Neil, Pragat, Evan), and the story video.
- [Security](./security.md) covers `/security`, its jump links, and the five topic lists.
- [Careers](./careers.md) covers `/careers`, the open roles, and the application form at `#apply`.
- [Privacy](./privacy.md) covers `/privacy` and its three jump links.
- [Referral](./referral.md) covers `/referral`.

## Redirects

`next.config.mjs` redirects `/apply` to `/careers#apply` (307), `/schedule` to Calendly (307), and, permanently (308), `/revenue` to `/resources/clinic-planning`, `/devices` to `/safesock`, `/integration` to `/getting-started`, `/about` to `/company`, and `/team` to `/careers`. `verify.mjs` checks only links that pages render. After you touch the redirects, run `curl -sI http://127.0.0.1:<port>/about` for each one and read the status and `location` header.

## Scripts

- `scripts/verify.mjs` is the load-level harness the SKILL.md describes.

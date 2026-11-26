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
- Write recipe screenshots into the same evidence dir as the `verify.mjs` run they go with.

## Proof and skip reporting

- A route is proven at both widths only when `verify.mjs` reports it clean and you have looked at its PNGs.
- An interaction is proven by a screenshot before and after the action, plus an assertion on the resulting state.
- Report a recipe you could not run with the command you tried and the unmet precondition. Do not report it as verified by a different path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph on what the visitor sees. It then has exactly four H2s in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with verify.mjs`, and `Gotchas`.

## Shared chrome

Every page shares the header and footer from `app/layout.tsx` and `components/Header.tsx`. The header has a home link named `Landing Health home`, a `Primary navigation` nav at 768px and wider (Product, SafeSock, Getting Started, Resources, Company), and a `Book a demo` button that opens Calendly. Below 768px the nav collapses into an icon button named `Menu`. That button opens a popover dialog named `Menu` that holds `Phone navigation`. The footer has a `Footer navigation` nav with Security, Referral, Careers, LinkedIn, Contact (mailto), and Privacy. The home feature file holds the menu recipe.

## Features

- [Home](./home.md) covers `/`, the hero, the dashboard preview, the award marquee, the workflow videos, and the phone menu.
- [Product](./product.md) covers `/product`, the two revenue calculators, and the `#revenue` and `#security` anchors.
- [SafeSock](./safesock.md) covers `/safesock` and the expandable video.
- [Getting started](./getting-started.md) covers `/getting-started` and the EHR setup steps.
- [Resources and articles](./resources-articles.md) covers `/resources`, the flyer PDF, and the six article pages.
- [Company](./company.md) covers `/company` and the founder video.
- [Security](./security.md) covers `/security` and the clinic Q&A list.
- [Careers](./careers.md) covers `/careers`, the open roles, and the application form.
- [Privacy](./privacy.md) covers `/privacy`.
- [Referral](./referral.md) covers `/referral`.

## Redirects

`next.config.mjs` redirects `/apply` to `/careers#apply`, `/schedule` to Calendly, `/revenue` to `/product`, `/devices` to `/safesock`, `/integration` to `/getting-started`, `/about` to `/company`, and `/team` to `/careers`. `verify.mjs` checks only links that pages render. After you touch the redirects, run `curl -sI http://127.0.0.1:<port>/about` for each one and read the `location` header.

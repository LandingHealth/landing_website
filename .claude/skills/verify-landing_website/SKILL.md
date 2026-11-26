---
name: verify-landing_website
description: Prove a change to the Landing Health marketing site (Next.js, landing_website) the way a visitor sees it. Builds and starts the production server on a per-worktree port, visits every route at desktop and phone width, and captures full-page and first-screen screenshots plus console errors, page errors, failed requests, broken images, horizontal overflow, content stuck hidden by the reveal animation, and broken internal links. Use before calling any page, style, copy, or routing change done, and for before/after screenshots on a PR.
---

# Verify landing_website

The surface is the public marketing site, served by `pnpm build` then `pnpm start`. It has no auth, no database, and no seed data. A visitor reads pages, follows links, opens the phone menu, plays videos, and submits the careers application form. `scripts/verify.mjs` drives all of that except form submission, which the careers feature file covers by hand.

Run every command from the worktree root. Node 24 and pnpm 11 are on PATH. Playwright `1.57.0` is a devDependency and uses the chromium headless shell build 1200 already installed in `%LOCALAPPDATA%/ms-playwright`. If it is missing, run `pnpm exec playwright install chromium-headless-shell`.

## Launch

```sh
node .claude/skills/verify-landing_website/scripts/verify.mjs
```

That one command builds and launches the site, drives it, collects the evidence, and tears it down.

1. It derives a port in 3100-4899 from a hash of the worktree path, so parallel worktrees never collide. `--port N` overrides it. If the port is already taken, the script exits 2 and drives nothing, because another run may own that instance.
2. It runs `pnpm build`, unless you pass `--no-build`. Pass `--no-build` only when `.next` was built from the current tree. A stale build verifies old code. The build output goes to `build.log` in the evidence dir.
3. It starts `pnpm start -p <port>` and logs to `server.log`. The server is ready when `GET /` answers with a status below 500, with a 90 second limit.
4. It drives every route and writes the report.
5. It stops the server it started by killing that pid's process tree (`taskkill /T` on Windows, the process group elsewhere). It does this on success, failure, and Ctrl-C alike.

Flags:

- `--routes /a,/b` checks only those routes. By default it checks every `app/**/page.tsx`. Route groups `(x)` are flattened, `_private` and `@slot` folders are skipped, and dynamic `[param]` routes are listed under `skippedDynamicRoutes` in the report because they need a concrete URL. Pass those through `--routes`.
- `--out DIR` sets the evidence dir.
- `--concurrency N` sets how many pages run at once. The default is 4.
- `--doctor` runs the read-only health check below.

In Git Bash, prefix any run that passes `--routes` with `MSYS_NO_PATHCONV=1`. Otherwise `/product` reaches node as `C:/Program Files/Git/product`. The script rejects such routes and exits 2.

## Doctor

```sh
node .claude/skills/verify-landing_website/scripts/verify.mjs --doctor
```

The doctor prints JSON with the worktree, HEAD, dirty flag, derived port, whether the port is in use (and the server header if so), the `.next/BUILD_ID`, whether `node_modules/playwright` exists, and the chromium version from a real launch. It ends with `doctor: ready` (exit 0) or `doctor: NOT ready` (exit 1). Run it first whenever a run fails before the summary table. A port in use with `x-powered-by=Next.js` usually means an earlier run of this worktree was killed hard. Stop that pid yourself after you confirm with `netstat -ano | grep :<port>` that it runs from this worktree.

## Drive

For each route at `desktop` (1440x900, DPR 1) and `mobile` (390x844, DPR 2, touch, mobile viewport), the script does the following:

1. Loads the page and waits for `load`.
2. Scrolls top to bottom in 60%-of-viewport steps. Each `[data-reveal]` element fades in through `components/Reveal.tsx` only after it intersects, and lazy images and videos load only when near the viewport.
3. Waits for network idle (8s cap) and every `img.complete` (10s cap), scrolls back to the top, and waits 1.5s for the staggered reveal transitions.
4. Captures `<slug>-<viewport>-viewport.png` (the first screen a visitor sees) and `<slug>-<viewport>-full.png`, with CSS animations frozen so before and after shots compare. The slug is `home` for `/`, and `/resources/x` becomes `resources_x`.
5. Records these findings. Each one fails the run.

| Check | Fails when |
| --- | --- |
| `status` | The document response is 400 or above, or missing |
| `console` | Any `console.error`, including the browser's own "Failed to load resource" |
| `pageErrors` | An uncaught exception, or a harness error such as a navigation timeout |
| `requests` | A same-origin response is 400 or above, or a same-origin request fails for a reason other than `ERR_ABORTED` |
| `images` | An `<img>` has `complete && naturalWidth === 0` |
| `overflow` | `documentElement.scrollWidth > clientWidth`. The finding names the five widest elements past the edge |
| `unrevealed` | A `[data-reveal]` element still lacks `data-revealed` after the full scroll, so a visitor never sees it |

It then gathers every same-origin `<a href>` from all pages, drops the `#fragment`, and fetches each one once. It follows same-origin redirects. A link passes when its final status is below 400. A redirect off-site passes and is noted.

For interaction beyond page load (the phone menu, video expand, the product feature menu, the SafeSock scrub, the application form, the clinic planning calculators), use the recipes in [features/](features/README.md). Each recipe is a short Playwright snippet run against the same port while you hold a server up with `pnpm start -p <port>`.

## Evidence

Evidence goes to `<checkout parent>/.verify-evidence/<worktree dir name>/<ISO timestamp>/`. For this machine, that is `C:/Users/ebatt/landinghealth/.verify-evidence/<worktree>/<timestamp>/`. It is outside every worktree, so removing a worktree keeps it. The dir holds the following:

- `report.json` has the worktree, HEAD SHA, dirty flag, base URL, viewports, routes, skipped dynamic routes, the failure count, `ok`, one entry per route and viewport with every finding and screenshot name, and one entry per link with status, final URL, and source routes.
- There are four PNGs per route.
- `build.log` and `server.log` complete the set.

The console shows a table of route by viewport with a finding count per check, then each broken link, then each `FAIL` line, then the evidence path, then `PASS` or `FAIL: N finding(s)`. The exit code is 0 when everything is clean, 1 when there are findings, and 2 when the harness itself failed (port taken, build failed, server never ready, or a bad flag).

Proof standards:

- Open the PNGs for every route you changed and look at them at both widths. A clean report proves the absence of errors, not that the page looks right.
- For a redesign or a page change, compare against the baseline. `C:/Users/ebatt/landinghealth/.verify-evidence/baseline-main/` holds origin/main at `ded6b45` (2026-11-25), with the same file names. Put matching before and after shots in the PR.
- Prove interactions with their own recipe from `features/`, capturing the action and the resulting state. A load-only screenshot does not prove a menu opens or a form validates.
- `report.json` records `dirty: true` when the tree had uncommitted changes. That is expected mid-change, so record which commit or diff the run covers.

## Cleanup

The script kills only the process tree it spawned, and it does so on every exit path. Nothing else needs cleanup. `.next` is the normal build output and is gitignored. Never delete the evidence dir. After a run, `netstat -ano | grep :<port>` should show no listener. If one remains, the run was killed with SIGKILL. Kill that one pid tree with `taskkill /pid <pid> /T /F`, never by process name, because other worktrees run `node` too.

## Helpers

- `scripts/verify.mjs` is the whole harness, as described above. Run `node .claude/skills/verify-landing_website/scripts/verify.mjs --help` for the flags.
- [features/README.md](features/README.md) indexes the per-route recipes.

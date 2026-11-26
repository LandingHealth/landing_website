# SafeSock

`/safesock` (title `SafeSock | Landing`) presents SafeSock, a sensor sleeve that is still in development. The page opens with an `In development` tag, the h1 "SafeSock", and two buttons. Then come a tall scroll-scrubbed concept render, "A closer look." with three concept stills, "The limit is set in the clinic. The loading happens at home.", "How it would help you review loading.", and a dark "In development." status card. Every image on the page is a concept render and says so.

## Sub-features

- `safesock-hero` has the `In development` tag, the h1, the lead, and a status line. `Talk about SafeSock` opens Calendly and `How it would work` jumps to `#workflow`.
- `safesock-stage` is the scroll-scrubbed `ScrubStage` (`components/sections/safesock/ScrubStage.tsx`), marked `[data-safesock-stage]`. Its track is `400svh` tall. Inside it, a sticky stage (`top-16`) holds a muted `scrub.mp4` video, a progress bar, and six captions stacked in one grid cell. Scrolling through the track sets `video.currentTime` from 0 to the end, and each caption fades in during its beat (`lib/safesock.ts`, `beats`). The label `Concept render` sits over the video.
- `safesock-stills` is `RenderStills`, marked `[data-safesock-stills]`. It lists the same six beats as a figure grid with the label "Concept renders". It is `display: none` normally. Under `prefers-reduced-motion: reduce` and without JavaScript it is `display: block`, and the stage is hidden instead.
- `safesock-closeups` is "A closer look." with three figures (the sleeve, the fit, sensor placement), each with a `Concept render` label.
- `safesock-why` has the problem paragraphs and three numbered measures under "What SafeSock is designed to measure."
- `safesock-workflow` is the `#workflow` block. It holds the `LoadHistoryPreview` chart (a `Proposed` badge, "Sample patient, last 14 days", a dashed "Your limit" line) and three numbered steps.
- `safesock-status` is the dark "In development." card with three items, then the closing call-out "Talk about SafeSock".

## How to get to it (user POV)

- Choose `SafeSock` in the header, footer, or phone menu.
- Old links to `/devices` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.
- A production server is held on `<port>` (`pnpm build`, then `pnpm start -p <port>`). The scrub script drives that server, so do not point it at `pnpm dev`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /safesock`.
- **Scrub, stills, and overflow proof.** From the worktree root, with the server up, run this.

  ```sh
  node .claude/skills/verify-landing_website/scripts/safesock-scrub.mjs http://127.0.0.1:<port> [out-dir]
  ```

  The first argument is the base URL, and the script visits `<base>/safesock`. It resolves `playwright` from the current directory, so run it from the worktree root. `out-dir` defaults to `<checkout parent>/.verify-evidence/<worktree>/safesock-scrub-<timestamp>/`. The script prints its evidence path first, then a JSON report, and ends with `scrub-check: PASS` (exit 0). A failed assertion throws and exits 1, and a missing or malformed URL exits 2. It takes about a minute. It does the following.
  1. At desktop (1440x900, mouse wheel) and mobile (390x844, CDP touch swipes), it waits for the whole video to buffer, scrolls through the stage in steps, and asserts that `currentTime` never goes backward and ends above 7 seconds.
  2. It times 40 `seeked` events, which the report gives as `avgMs` and `maxMs`.
  3. It captures `scrub-<viewport>-<0|25|50|75|100>.png` at five points in the stage.
  4. It asserts zero horizontal overflow at each viewport, and then at widths 320, 375, 768, 1024, 1280, 1440, and 1920 while scrolling the whole page.
  5. It reloads with JavaScript off and again with reduced motion on, at both viewports. It asserts that the stage is `display: none` and the stills are `display: block`, and screenshots the stills as `nojs-<viewport>.png` and `reduced-<viewport>.png`.
- **Look at the shots.** Open `scrub-desktop-0.png`, `scrub-desktop-50.png`, `scrub-mobile-100.png`, and `reduced-mobile.png`. The captions should match the render, and the stills grid should show six figures.

## Gotchas

- The stage needs the whole 8 second video buffered before it scrubs smoothly. The script waits up to 30s. A slow disk or a missing `public/safesock/scrub.mp4` fails the first step, not the scrub assertions.
- The script sends real wheel and touch input on purpose. An easing loop in `ScrubStage` moves the video toward the scroll target over several frames, so a bare `scrollTo` followed by an immediate read of `currentTime` sees a stale value. Wait about 90ms after each input.
- If you change the track height or `beats` in `lib/safesock.ts`, rerun the script and look at all five stops, because a caption can sit past the end of its beat.
- Under reduced motion or without JavaScript, the video is never requested. The script records `videoRequested` for those runs but only asserts the `display` values.
- Under reduced motion the stills show as one grid in place of the stage, so the page is much shorter. Compare those shots against each other, not against the normal full-page shot.
- The expandable video from the old page is gone. `Expand SafeSock video` no longer exists.

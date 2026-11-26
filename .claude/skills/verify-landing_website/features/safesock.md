# SafeSock

`/safesock` (title `SafeSock | Landing`) presents SafeSock, a sensor sleeve that is still in development. The hero has the h1 "SafeSock", a lead, a status line, and two buttons on the left, with a dark concept render of the sleeve on the right. Then come "A closer look." with three concept stills, "The limit is set in the clinic. The loading happens at home.", "How it would help you review loading.", and a blue "In development." status card. Every image on the page is a concept render and says so.

## Sub-features

- `safesock-hero` has the h1, the lead, and the status line "In development with our engineering partners." `Talk about SafeSock` opens Calendly and `How it would work` jumps to `#workflow`.
- `safesock-render` is the hero's right column: `public/safesock/render-dark.jpg` (`safesock.hero` in `lib/safesock.ts`) in a rounded dark card with a `Concept render` caption. Nothing on the page plays on scroll. The hero button row carries `data-header-cta`, so the header's `Book a demo` stays hidden until it scrolls past.
- `safesock-closeups` is "A closer look." with three figures (the sleeve, the fit, sensor placement), each with a `Concept render` label.
- `safesock-why` has the problem paragraphs and three numbered measures under "What SafeSock is designed to measure."
- `safesock-workflow` is the `#workflow` block. It holds the `LoadHistoryPreview` chart (a `Proposed` badge, "Sample patient, last 14 days", a dashed "Your limit" line) and three numbered steps.
- `safesock-status` is the blue "In development." card with three items, then the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `SafeSock` in the header, footer, or phone menu.
- Old links to `/devices` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.
- A production server is held on `<port>` (`pnpm build`, then `pnpm start -p <port>`).

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /safesock`.
- **Look at it.** Screenshot `/safesock` at 1440x900 and 390x844 and confirm the sleeve render shows with its `Concept render` label and no horizontal overflow.

## Gotchas

- The expandable video from the old page is gone. `Expand SafeSock video` no longer exists.

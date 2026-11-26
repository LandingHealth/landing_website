# Company

`/company` (title `Company | Landing`) is the about page. It introduces the cofounders, Akash and Neil, with an "Our story" section and a founder video.

## Sub-features

- `company-hero` shows the heading and the "Akash and Neil, cofounders" lead.
- `company-story` renders "Our story" with the inline founder video (`components/sections/About.tsx`).

## How to get to it (user POV)

- Choose `Company` in the header or phone menu.
- Old links to `/about` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /company`. The video frame shows its poster in `company-*-full.png`.
- **Video plays.** With a server held on `<port>`, load `/company`, scroll the `#about video` element into view, and wait 2s. Then assert `!video.paused || video.readyState >= 2`.

## Gotchas

- The video frame is black while the video loads, per `DESIGN.md`. A black frame is a failure only when the report also has a `requests` finding for the video file.

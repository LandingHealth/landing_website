# Getting started

`/getting-started` (title `Getting started | Landing`) explains how a clinic starts on Landing. The h1 is "Start using Landing at your clinic". The page has `Book a setup demo` and `See the product` buttons, a dark "What your clinic needs" card, "Setup in three steps" with a demo video per step, "Landing works alongside your EHR", "Support, pricing, and pilots", then the shared closing call-out (see the README).

## Sub-features

- `gs-before` is the dark card with three items: PT names and emails, patient details, and a browser.
- `gs-steps` renders three numbered steps. Step 01 shows the clinic-setup video (`Expand Adding a clinic site video`), step 02 the add-patient video (`Expand Adding a new patient video`), and step 03 two side-by-side clips (`Expand Patient app exercise recording video` and `Expand PT app exercise review video`). The step count in the heading and the lead comes from `steps.length`, spelled out as a word.
- `gs-ehr` renders "Landing works alongside your EHR". It says Landing does not connect to the EHR today.
- `gs-terms` renders Support, Pricing, and Pilot, and says pricing and pilot terms are not published.
- `gs-cta` is the shared closing call-out (see the README).

There is no AWS ingestion diagram on this page any more.

## How to get to it (user POV)

- Choose `Getting Started` in the header, footer, or phone menu.
- Follow `See how setup works` on `/product` or the home page, or the `Getting started` guide on `/resources`.
- Old links to `/integration` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /getting-started`. `getting-started-mobile-full.png` shows the steps stacked without horizontal scroll, and the `overflow` check is 0.
- **Videos.** With a server held on `<port>`, assert that the page has four `button[aria-label^='Expand ']` buttons. Click `Expand Adding a new patient video`, wait for the matching `Close` button, wait 800ms, assert the video is playing, screenshot, and press Escape.

## Gotchas

- The step videos are 1920x1094 and sit in a gradient frame. They are black until the poster loads, so expect a black box in any screenshot taken before `verify.mjs` finished scrolling.
- Step 03 puts two videos in a two-column grid at 640px and wider, so it is the widest element and the first suspect when `overflow` fires at 390px.
- The page states what is not built (EHR connection, published pricing). Do not turn those into claims in a copy change.

# Getting started

`/getting-started` (title `Getting started | Landing`) explains how a clinic sets up Landing beside its EHR, in two steps that take under half an hour. The main section is "Working with your EHR", and the AWS ingestion diagram includes a video.

## Sub-features

- `gs-steps` renders the numbered setup steps.
- `gs-ehr` renders the "Working with your EHR" section.
- `gs-ingestion` renders the ingestion-to-AWS diagram (`components/IngestionToAws.tsx`) with its looping video.

## How to get to it (user POV)

- Choose `Getting Started` in the header or phone menu.
- Follow `See how clinics get set up` on the home page, or the `Getting started` guide on `/resources`.
- Old links to `/integration` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /getting-started`. `getting-started-mobile-full.png` shows the diagram stacked without horizontal scroll, and the `overflow` check is 0.

## Gotchas

- The ingestion diagram is the widest element on the page. When `overflow` fires at 390px, check the diagram first.
- The diagram video is black until it loads. Expect a black box in any screenshot taken before `verify.mjs` finished scrolling.

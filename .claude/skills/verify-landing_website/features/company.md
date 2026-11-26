# Company

`/company` (title `Company | Landing`) is the about page. The h1 is "We're building the between-visit layer for physical therapy." It shows photos and a video from cofounder Neil's recovery, then "Our story", "The team" with three founders, a dark "What we're building toward" card, and Careers and Contact links.

## Sub-features

- `company-hero` shows the h1, the lead, two expandable photos (`Expand Neil's leg after surgery image` and `Expand Neil's X-ray, February 2025 image`), and a controls-visible video of Neil climbing a stair with his PT (`/about/clinic-visit.mp4`).
- `company-story` renders "Our story" under "Recovery happens between visits." with three paragraphs.
- `company-founders` renders "The team", a list of three founders, each with a photo, name, role, and bio. They are Neil Patel (Co-CTO, hardware), Pragat Patel (COO), and Evan Batten (Co-CTO, computer vision). Photos live in `public/about/team/`.
- `company-building` is the dark card with three items: home exercise a PT can see, visits that start with context, and load on the leg (SafeSock, with its status line from `lib/safesock.ts`).
- `company-links` has two links, `See open roles` to `/careers` and `Email us` to the contact mailto.
- `company-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Company` in the header, footer, or phone menu.
- Old links to `/about` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /company`. The three founder photos and the video poster appear in `company-*-full.png`, and the `images` check is 0.
- **Founders.** With a server held on `<port>`, run this.

  ```js
  await page.goto(base + "/company");
  const names = await page.getByRole("heading", { level: 3 }).allInnerTexts();
  for (const name of ["Neil Patel", "Pragat Patel", "Evan Batten"]) if (!names.includes(name)) throw new Error(`missing founder ${name}`);
  const photos = await page.locator("img[alt='Neil Patel'], img[alt='Pragat Patel in a suit'], img[alt='Evan Batten outdoors on a campus lawn']").evaluateAll((imgs) => imgs.map((i) => i.naturalWidth));
  if (photos.length !== 3 || photos.some((w) => !w)) throw new Error(`founder photos: ${photos}`);
  ```

- **Photo expand.** Click `Expand Neil's X-ray, February 2025 image`, wait for `Close Neil's X-ray, February 2025 image`, wait 800ms, screenshot, and press Escape.
- **Video plays.** Scroll `video[src="/about/clinic-visit.mp4"]` into view, press its play control (or call `play()`), wait 2s, and assert `readyState >= 2`.

## Gotchas

- The accessible names above use a curly apostrophe in the app (`Neil’s`). Match with a regex such as `/Expand Neil.s X-ray/` rather than a straight-quote string.
- The video has `preload="none"` and is black until the poster loads or playback starts. A black frame is a failure only when the report also has a `requests` finding for the video file.
- The old `#about` id no longer exists. Select the video by its `src`.
- The bios are copy the founders approve. Do not change their wording as part of a visual change.

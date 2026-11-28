# Company

`/company` (title `Company | Landing`) is the about page, built in `components/sections/Company.tsx`. It has no team section and no story photos.

## Sub-features

- `company-hero` has the h1 "We're building the between-visit layer for physical therapy." over a dark rule, the goal line, and a large blue "98.8%" with "of a patient's week is spent outside the clinic."
- `company-principles` is "What we believe" with four principles in a ruled 2x2 grid: care continues between visits, the PT makes the clinical calls, software takes the routine work, and measure what happens at home.
- `company-building` is the blue card "What we're building" with three items: home exercise a PT can see, visits that start with context, and SafeSock (its purpose and status come from `lib/safesock.ts`). Its button links to the product page.
- `company-awards` is "Recognition", a static grid of every logo in the `awards` list exported from `components/sections/home/Awards.tsx`.
- `company-links` has two cards, `See open roles` to `/careers` and `Email the team` to the contact mailto.
- `company-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Company` in the header, footer, or phone menu.
- Old links to `/about` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /company`. All 14 award logos render in `company-*-full.png`, and the `images` check is 0.
- **Awards.** With a server held on `<port>`, load `/company`, and assert that every `img` inside the Recognition section has a non-zero `naturalWidth` and that there are 14 of them.

## Gotchas

- The logos load eagerly. Lazy loading left two of them blank in phone screenshots.
- Copy on this page reuses claims from the home page. Don't add numbers or claims that the site doesn't already make.

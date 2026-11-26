# Security

`/security` (title `Security | Landing`) has the h1 "How Landing protects patient data.", a lead, and an "On this page" nav of six jump links. Five topic sections follow, then "Security reviews" with an `Email us` button. Every topic is a ruled definition list that is always fully visible. The page shares its layout with `/privacy` through `components/sections/trust/TrustPage.tsx`.

## Sub-features

- `sec-jump` is `<nav aria-label="On this page">` with six numbered links: `Data storage` (`#storage`), `Access controls` (`#access`), `Encryption` (`#encryption`), `Retention and deletion` (`#retention`), `Agreements` (`#agreements`), and `Security reviews` (`#reviews`).
- `sec-topics` renders the five topic sections with 5, 5, 3, 3, and 2 rows, 18 `<dt>` in all. The first row reads "Where data lives".
- `sec-reviews` is `#reviews`, with a paragraph and an `Email us` button that opens the contact mailto.
- `sec-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Security` in the footer.
- Choose the `Security` guide on `/resources`.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /security`.
- **Rows and jumps.** With a server held on `<port>`, assert `await page.locator("dl dt").count() === 18`, that the first `dt` reads "Where data lives", and that the `On this page` nav has six links. Click the last one and assert `location.hash === "#reviews"` and that `#reviews` sits under the sticky header after the scroll settles.

## Gotchas

- The section number and title column is sticky at 1024px and wider (`lg:sticky lg:top-24`). A full-page screenshot shows it only at its first position.
- The jump link names start with a number, so match with a regex.
- The page states what is in place and what is not, such as "does not record every time someone views a video". Do not soften or extend those claims in a style change.

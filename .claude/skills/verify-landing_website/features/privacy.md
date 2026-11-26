# Privacy

`/privacy` (title `Privacy policy | Landing`) is a long static policy page with the h1 "Privacy policy" and numbered h2 sections. It links to Google's API user data policy and account help pages, and it has a mailto contact link.

## Sub-features

- `privacy-body` renders every policy section with a readable line length at both widths.

## How to get to it (user POV)

- Choose `Privacy` in the footer.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /privacy`. `privacy-mobile-full.png` shows long URLs wrapping inside the 390px column, and `overflow` is 0.

## Gotchas

- On this page, long unbroken URLs and email addresses are the usual cause of horizontal overflow at 390px.
- The page text is legal copy. Do not change its wording as part of a visual change.

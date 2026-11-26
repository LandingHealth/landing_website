# Referral

`/referral` (title `Referral | Landing`) invites visitors to refer a clinic. The h1 reads "You know a clinic that would love Landing." with the reward line "Earn $500 when a clinic you refer starts using Landing." Then come "How it works" with three step cards, and "The rules" as a five-row definition list.

## Sub-features

- `referral-hero` renders the eyebrow "Referral program", the h1, and the reward.
- `referral-steps` renders three numbered cards with icons, "Book a call", "Introduce us", and "Get paid". The first has a `Book a call with us` link to Calendly.
- `referral-rules` renders five question and answer rows in a `<dl>`, from "Who can refer a clinic?" to "Where are the terms?".
- `referral-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Referral` in the footer under "Legal and trust".

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /referral`. "How it works" and "The rules" appear in the full-page shots at both widths.
- **Counts.** With a server held on `<port>`, assert `page.locator("ol > li").count()` is at least 3 for the steps, and `page.locator("dl dt").count()` is 5. Assert the `Book a call with us` link's `href` is the Calendly URL.

## Gotchas

- The heading wraps differently on phones. Compare the mobile shot against the mobile baseline, not against desktop.
- The $500 figure and the rules are business terms. Do not change them in a style change.

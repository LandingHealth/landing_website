# Referral

`/referral` (title `Referral | Landing`) invites visitors to refer a clinic. The heading reads "You know a clinic that would love Landing.", with "love Landing" set apart. The sections "How it works" and "The rules" follow.

## Sub-features

- `referral-hero` renders the heading with its highlighted phrase.
- `referral-steps` renders the numbered "How it works" steps.
- `referral-rules` renders the rules list.

## How to get to it (user POV)

- Choose `Referral` in the footer.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /referral`. Both "How it works" and "The rules" appear in the full-page shots at both widths.

## Gotchas

- "How it works" uses edge-to-edge padding (`edgePad`) instead of `container`. When the mobile shot shows content touching the screen edge, check this section first.

# Security

`/security` (title `Security | Landing`) answers clinic security questions. The heading reads "Peace of mind for physical therapists." A tile row of safeguards follows. Then "What clinics ask us" holds a definition list of seven questions, starting with "Where are records and videos stored?" and ending with "Who handles security reviews?".

## Sub-features

- `sec-tiles` renders the safeguards tile row.
- `sec-qa` renders seven question and answer pairs in a `<dl>`. All answers are always visible.

## How to get to it (user POV)

- Choose `Security` in the footer.
- Follow `Security questions` on `/resources`, or the security link in the `#security` block on `/product`.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /security`.
- **All questions present.** With a server held on `<port>`, assert `await page.locator("dl dt").count() === 7` and that the first `dt` reads "Where are records and videos stored?".

## Gotchas

- The `<br>` in the heading is hidden below 640px, so the heading wraps differently on phones. Compare the mobile shot against the mobile baseline, not against desktop.

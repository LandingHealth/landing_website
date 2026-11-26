# Clinic planning

`/resources/clinic-planning` (title `Clinic planning | Landing`) holds two calculators for clinic owners. The h1 is "Work through the numbers with your own inputs." The first sheet (`#time`) multiplies weekly visits by the visitor's own minutes-saved estimate. The second (`#program`) models the gross monthly revenue and review hours of a between-visit program. Both are Svelte islands, and each result shows its formula.

## Sub-features

- `plan-time` is `#time`, the "See what your own time estimate adds up to." sheet. It has two inputs, `Visits each week` (default 40, 1 to 1000) and `Your estimate of minutes saved per visit` (default 0, 0 to 60), and a result card "Hours saved each week" with a formula line such as "40 visits × 0 min ÷ 60 = 0 hours".
- `plan-program` is `#program`, "Model a monthly program for home exercise review." It has three inputs, `Patients enrolled` (default 20), `Monthly program fee per patient` (default $50, 50 to 1000), and `Review time per patient each month` (default 15 min). It has two results, "Estimated gross revenue each month" (default $1,000) and "Staff review hours each month" (default 5), each with a formula line.
- `plan-input` is `RangeField` (`src/lib/components/revenue/RangeField.svelte`). Each input is a text field with numeric input mode, labelled by the input's name, plus a range slider named `<label> slider` and min and max captions. Typing strips non-digits and clamps to the range when the field loses focus or Enter is pressed.
- `plan-redirect` makes `/revenue` redirect permanently (308) to `/resources/clinic-planning`.

## How to get to it (user POV)

- Choose `Resources` in the header, then the `Clinic planning` guide card (`Open guide`).
- Old links to `/revenue` redirect here.
- Nothing in the header, footer, or `/product` links here directly.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /resources/clinic-planning`. Both sheets appear in `resources_clinic-planning-*-full.png` with their default totals.
- **Redirect.** With a server held on `<port>`, run `curl -sI http://127.0.0.1:<port>/revenue`. It returns 308 with `location: /resources/clinic-planning`.
- **Slider updates the time result.** Run this.

  ```js
  await page.goto(base + "/resources/clinic-planning#time");
  const slider = page.getByRole("slider", { name: "Your estimate of minutes saved per visit slider" });
  await slider.waitFor();
  const card = page.locator("#time [aria-live='polite']");
  const before = await card.innerText();
  await slider.focus();
  for (let i = 0; i < 15; i++) await page.keyboard.press("ArrowRight");
  const after = await card.innerText();
  if (before === after || !after.includes("40 visits × 15 min ÷ 60 = 10 hours")) throw new Error(`time result: ${after}`);
  await page.screenshot({ path: "<evidence>/planning-time-after.png" });
  ```

- **Typed input updates the program result.** In `#program`, fill `Patients enrolled` with `40`, press Enter, and wait. Assert on the formula lines, "40 patients × $50 = $2,000. Before any costs." and "40 patients × 15 min ÷ 60 = 10 hours". The big revenue number is a ticker that counts up only while it is on screen, so it can still read `$0` in a result card that is scrolled out of view.
- **Clamp.** Fill `Monthly program fee per patient` with `5` and blur. It shows `$50`.

## Gotchas

- The calculators mount client-side through `SvelteIsland`. A screenshot taken before hydration shows empty boxes. Wait for `getByRole("slider")` before you assert.
- The default minutes-saved value is 0, so the first time result reads "0". A test that expects a nonzero default is wrong.
- Totals use tabular numbers. A font change that drops `tabular-nums` makes the numbers jitter as they update.
- The fee floor of $50 is an input limit, not Landing pricing, and the copy says so. Do not read it as a price claim.
- `/product#revenue` is gone. A link to it lands at the top of `/product`.

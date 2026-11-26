# Product

`/product` (title `Product | Landing`) explains what Landing does for a clinic. It has two interactive revenue calculators (time saved, and between-visit program revenue), a security summary anchored at `#security`, and a demo call-out.

## Sub-features

- `product-revenue` renders the `#revenue` section with its lead paragraph.
- `product-calc-time` and `product-calc-program` are Svelte islands. Each input is a number field paired with a range slider whose accessible name is `<label> slider`, and the totals update live.
- `product-security` renders the `#security` block with a link to `/security`.

## How to get to it (user POV)

- Choose `Product` in the header or phone menu.
- Follow `Model your clinic's numbers` on `/resources`, which links to `/product#revenue`.
- Old links to `/revenue` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /product`. Both calculators appear in `product-*-full.png` with their default totals.
- **Calculator update.** With a server held on `<port>`, run this.

  ```js
  await page.goto(base + "/product#revenue");
  const slider = page.getByRole("slider").first();
  const before = await page.locator("#revenue").innerText();
  await slider.focus();
  for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
  const after = await page.locator("#revenue").innerText();
  if (before === after) throw new Error("calculator totals did not change");
  await page.screenshot({ path: "<evidence>/product-calc-after.png" });
  ```

  The section text changes after the slider moves.

## Gotchas

- The calculators mount client-side through `SvelteIsland`. A screenshot taken before hydration shows empty boxes. Wait for `getByRole("slider")` before you assert.
- Totals use tabular numbers. A font change that drops `tabular-nums` makes the numbers jitter as they update.

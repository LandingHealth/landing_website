# Resources and articles

`/resources` (title `Resources | Landing`) lists guides (Getting started, Security questions, Model your clinic's numbers, Clinic flyer PDF) and article cards. Each article lives at `/resources/<slug>` and uses `components/Article.tsx`. An article page has an h1 title, a summary lead, a share button, a "Jump to" table of contents at 1280px and wider, and numbered references.

## Sub-features

- `res-index` lists the guides and articles with images.
- `res-flyer` serves `/landing-clinic-flyer.pdf`.
- `res-article` renders each of the six articles: `a-sleeve-that-reads-the-bones-own-alarm`, `betting-on-ai-agents-in-healthcare`, `betting-on-computer-vision-in-rehabilitation`, `how-we-track-the-166-hours-of-recovery-outside-the-clinic`, `recovery-world-model`, and `the-partnership-licklider-imagined-in-1960`.
- `res-jump` gives each article a `Jump to` nav with in-page anchors, at 1280px and wider.
- `res-share` gives each article a `Share this page` button. The button copies the URL and changes its label to `Link copied` for 2s.

## How to get to it (user POV)

- Choose `Resources` in the header or phone menu, then choose an article card.
- Follow the inline links to `/resources/recovery-world-model` in other articles.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `node .claude/skills/verify-landing_website/scripts/verify.mjs`. Discovery picks up every article, including a newly added one. The link check confirms that each card target and the flyer PDF return 200.
- **Share button.** With a server held on `<port>`, run this at desktop size.

  ```js
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  await page.goto(base + "/resources/recovery-world-model");
  await page.getByRole("button", { name: "Share this page" }).click();
  await page.getByText("Link copied").waitFor();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  if (!copied.endsWith("/resources/recovery-world-model")) throw new Error(`clipboard held ${copied}`);
  ```

- **Jump to.** At 1440 wide, choose the second link in `getByRole("navigation", { name: "Jump to" })`. Then assert that `location.hash` matches and that the target heading's top is within 120px of the viewport top.

## Gotchas

- The `Jump to` nav is `hidden` below 1280px, so the 1440 desktop shot shows it and the 390 shot does not.
- Reference links go to doi.org and other external sites. `verify.mjs` does not fetch external links. Check them by hand when you edit them.
- Without clipboard permission, the share button swallows the error and its label never changes. That is the component's error path, not a bug in the recipe.

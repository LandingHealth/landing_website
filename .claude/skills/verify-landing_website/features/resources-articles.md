# Resources and articles

`/resources` (title `Resources | Landing`) has the h1 "Learn how Landing works and why we build it.", four "Practical guides" cards (Getting started, Security, Clinic planning, Clinic flyer), and an "Articles" section grouped as Product, Research, and Company perspective. Each article lives at `/resources/<slug>` and renders through `components/Article.tsx`. Article metadata comes from `lib/resources.ts`.

## Sub-features

- `res-guides` renders four cards. `Getting started` goes to `/getting-started`, `Security` to `/security`, `Clinic planning` to `/resources/clinic-planning` (the clinic-planning feature file), and `Clinic flyer` downloads `/landing-clinic-flyer.pdf` (link text `Download PDF`, `download` attribute, no prefetch).
- `res-groups` renders three `<section>` groups in the order Product, Research, Company perspective. Each has an eyebrow, a description, and the group's article cards. A card has a cover image, an optional status tag (`Future concept` or `In development`), the title, a description, and the published date.
- `res-article` renders each of the six articles: `the-partnership-licklider-imagined-in-1960`, `a-sleeve-that-reads-the-bones-own-alarm`, `how-we-track-the-166-hours-of-recovery-outside-the-clinic`, `betting-on-computer-vision-in-rehabilitation`, `betting-on-ai-agents-in-healthcare`, and `recovery-world-model`. Each has a `Resources` back link, the h1, a byline linking the author's LinkedIn, the share button, a `Takeaway` aside, the body, numbered "Notes and sources", "Related reading" cards, and a closing call-out.
- `res-sources` links each citation (`aria-label="Source N"`, target `#source-N`) to a numbered list entry. Each entry's `↑` link (`Back to citation N`) returns to `#cite-N`.
- `res-share` gives each article a `Share this page` button. It copies the URL and changes its label to `Link copied` for 2s.
- `res-announcement` is the announcement bar's link target. The bar names the first entry of `resources` in `lib/resources.ts` (see the README's Shared chrome).

There is no `Jump to` table of contents on article pages any more.

## How to get to it (user POV)

- Choose `Resources` in the header or phone menu, then a guide or an article card.
- Choose `Read more` in the announcement bar, which opens the newest article.
- Follow the `Related reading` cards at the end of an article, or inline links between articles.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `node .claude/skills/verify-landing_website/scripts/verify.mjs`. Discovery picks up every article, including a newly added one. The link check confirms each card target and the flyer PDF return 200.
- **Guide and article counts.** With a server held on `<port>`, open `/resources` and assert that the Articles area has six cards and that the page has four guide links (`Open guide` three times, `Download PDF` once).
- **Share button.** Run this at desktop size.

  ```js
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  await page.goto(base + "/resources/recovery-world-model");
  await page.getByRole("button", { name: "Share this page" }).click();
  await page.getByText("Link copied").waitFor();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  if (!copied.endsWith("/resources/recovery-world-model")) throw new Error(`clipboard held ${copied}`);
  ```

- **Citations.** On `/resources/recovery-world-model`, click the `Source 1` link. Assert `location.hash === "#source-1"` and that the `Back to citation 1` link inside that list item returns to `#cite-1`.

## Gotchas

- Reference links go to doi.org and other external sites. `verify.mjs` does not fetch external links. Check them by hand when you edit them.
- Without clipboard permission, the share button swallows the error and its label never changes. That is the component's error path, not a bug in the recipe.
- Source anchors use `scroll-mt-28`. A shot where the target entry hides under the sticky header is a regression.
- The card cover images have empty `alt` text on purpose, because the card title names the link.

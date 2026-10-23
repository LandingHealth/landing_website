# Landing website

A responsive site for Landing, built with Next.js App Router, TypeScript, Tailwind CSS, and pnpm. Landing is the company; SafeSock is its sensor-based recovery product. The navigation links to Product, Solution, Devices, Schedule, and About pages.

The Product page includes a load-signal illustration adapted from the previous SafeSock site. The Devices page uses its product mark and demo video. The homepage animates the intended sensing workflow. The visualizations are illustrative and do not show live patient data.

## Pages

Each page body is a Svelte component in `src/lib/pages`. The registry in `src/lib/pages/index.ts` maps a page name to its body. A route file keeps its Next metadata and renders `<SveltePage name="..." />`.

The server renders the body to HTML, so the static export holds all copy. The browser then hydrates the same body. Bodies take no props. The layout owns the header, `<main>`, and footer.

```tsx
export default function DevicesPage() {
  return <SveltePage name="devices" />;
}
```

## Motion

Wrap a block in `Reveal` from `src/lib/motion` to fade it in on scroll. `Reveal` fades only blocks that start below the fold, and only when the visitor allows motion. Everything else renders as plain HTML, so the exported pages never hide content.

`pnpm verify:static` fails when an exported page has an inline style that hides content. CI runs it after the build.

## Vendored components

`src/lib/vendor/magic` is sv-animations CLI output and is never edited. Run `pnpm vendor:sync` to regenerate it. Run `pnpm vendor:sync <item>` to add an item.

Only the wrappers in `src/lib/motion` import vendor code, and lint enforces it. The wrappers apply the brand colors and the motion rules.

Run `pnpm check:svelte` to check Svelte components.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify or serve the production build:

```bash
pnpm build
pnpm start
```

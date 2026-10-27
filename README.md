# Landing website

This is the marketing site for Landing Health. It uses the Next.js App Router, TypeScript, Tailwind CSS, and pnpm. Landing is the company. SafeSock is the sensor sleeve it is designing for recovery. The navigation links to the Integration, Solution, Devices, Schedule, Security, and About pages.

The dashboard preview and the SafeSock demo video use sample data. Neither shows live patient data.

## Svelte animations

`components/SvelteIsland.tsx` can mount Svelte 5 components inside React. No page uses it today. Svelte, Motion SV, and the Svelte webpack loader are installed.

For example, in a React client component:

```tsx
"use client";

import SvelteIsland from "@/components/SvelteIsland";

const loadAnimation = () => import("$lib/components/animation/Ready.svelte");

export default function AnimationExample() {
  return <SvelteIsland load={loadAnimation} props={{ label: "Hello" }} />;
}
```

Run `pnpm check:svelte` to check Svelte components.

## Run locally

`proxy.ts` asks for the password in `SITE_PASSWORD` before it serves any page. Set `SITE_PASSWORD` in `.env.local` before you run `pnpm dev`. Without it, every page shows the password prompt and no password works.

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

# Landing website

This is the marketing site for Landing Health. It uses the Next.js App Router, TypeScript, Tailwind CSS, HeroUI v3, and pnpm. `DESIGN.md` describes the theme, and `AGENTS.md` tells coding agents how to build with it. Landing is the company. SafeSock is the sensor sleeve it is designing for recovery. The navigation links to the Product, SafeSock, Getting Started, Resources, and Company pages, and the footer links to Security, Privacy, Careers, and Referral.

The dashboard preview and the SafeSock demo video use sample data. Neither shows live patient data.

## Svelte animations

`components/SvelteIsland.tsx` mounts Svelte 5 components inside React. The two calculators on `/resources/clinic-planning` use it, through `components/RevenueCalculator.tsx`. Svelte, Motion SV, and the Svelte webpack loader are installed.

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

"use client";

import SvelteIsland from "@/components/SvelteIsland";

const props = {};
const load = () => import("$lib/components/revenue/RevenueCalculator.svelte");

export default function RevenueCalculator() {
  return <SvelteIsland load={load} props={props} />;
}

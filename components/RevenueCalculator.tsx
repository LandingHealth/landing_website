"use client";

import SvelteIsland from "@/components/SvelteIsland";

const load = () => import("$lib/components/revenue/CalculatorSliders.svelte");

export default function RevenueCalculator() {
  return <SvelteIsland load={load} />;
}

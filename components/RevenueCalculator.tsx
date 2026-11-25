"use client";

import SvelteIsland from "@/components/SvelteIsland";

const props = {};
const loaders = {
  time: () => import("$lib/components/revenue/TimeCalculator.svelte"),
  program: () => import("$lib/components/revenue/ProgramCalculator.svelte"),
};

export type CalculatorKind = keyof typeof loaders;

export default function RevenueCalculator({ kind }: { kind: CalculatorKind }) {
  return <SvelteIsland load={loaders[kind]} props={props} />;
}

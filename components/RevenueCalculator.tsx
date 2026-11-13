"use client";

import type { ComponentProps } from "react";
import SvelteIsland from "@/components/SvelteIsland";
import type { CalculatorKey } from "@/lib/revenue-calculators";

const calculators: Record<CalculatorKey, ComponentProps<typeof SvelteIsland>["load"]> = {
  a: () => import("$lib/components/revenue/CalculatorSliders.svelte"),
  b: () => import("$lib/components/revenue/CalculatorSentence.svelte"),
  c: () => import("$lib/components/revenue/CalculatorSliders.svelte"),
};

export default function RevenueCalculator({ variant }: { variant: CalculatorKey }) {
  return <SvelteIsland load={calculators[variant]} />;
}

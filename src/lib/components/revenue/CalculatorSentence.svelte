<script lang="ts">
	import { motion } from "motion-sv";
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { cumulativeByMonth, formatCompactDollars, formatDollars, revenue, revenueInputs } from "@/lib/revenue";
	import NumberField from "./NumberField.svelte";

	let patients = $state<number>(revenueInputs.patients.default);
	let fee = $state<number>(revenueInputs.fee.default);

	const result = $derived(revenue({ patients, fee }));
	const months = $derived(cumulativeByMonth({ patients, fee }));
	const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const resultClass = "rounded-lg bg-mist px-2";
</script>

<div class="px-6 lg:px-4">
	<p class="font-display text-[clamp(1.75rem,4.6vw,3.25rem)] font-normal leading-[1.3] tracking-[-0.01em]">
		If <NumberField name="patients" bind:value={patients} /> patients join at $<NumberField name="fee" bind:value={fee} /> a
		month, you earn
		<span class={resultClass}><NumberTicker value={result.monthly} prefix="$" /></span>
		a month and
		<span class={resultClass}><NumberTicker value={result.annual} prefix="$" /></span>
		a year.
	</p>

	<div class="mt-12 rounded-xl bg-mist p-5 sm:p-6">
		<h3 class="text-[15px] font-medium leading-snug">Cumulative revenue by month</h3>
		<ol class="mt-8 grid h-48 grid-cols-12 items-end gap-1.5 sm:h-56 sm:gap-2">
			{#each months as total, index (index)}
				<li class="flex h-full flex-col justify-end" title="Month {index + 1}: {formatDollars(total)}">
					<span class="mb-1 block text-center text-[11px] leading-none sm:text-[13px]">
						{(index + 1) % 3 === 0 ? formatCompactDollars(total) : ""}
					</span>
					<motion.div
						class={["w-full rounded-t-md", index === 11 ? "bg-ink" : "bg-white"]}
						initial={{ height: reducedMotion ? `${(total / result.annual) * 100}%` : "0%" }}
						animate={{ height: `${(total / result.annual) * 100}%` }}
						transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : index * 0.04 }}
					/>
				</li>
			{/each}
		</ol>
		<ol class="mt-2 grid grid-cols-12 gap-1.5 text-center text-[11px] leading-none sm:gap-2 sm:text-[13px]">
			{#each months as _, index (index)}
				<li>{index + 1}</li>
			{/each}
		</ol>
		<p class="mt-3 text-[13px] leading-none">Month</p>
	</div>
</div>

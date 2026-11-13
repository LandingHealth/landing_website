<script lang="ts">
	import { motion } from "motion-sv";
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { cumulativeByMonth, formatCompactDollars, formatDollars, formatPatients, revenue, revenueInputs } from "@/lib/revenue";
	import RangeField from "./RangeField.svelte";

	let patients = $state<number>(revenueInputs.patients.default);
	let fee = $state<number>(revenueInputs.fee.default);

	const result = $derived(revenue({ patients, fee }));
	const months = $derived(cumulativeByMonth({ patients, fee }));
	const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const cardClass = "rounded-xl bg-mist p-5 sm:p-6";
	const bigNumber = "font-display text-4xl font-medium leading-none tracking-[-0.025em]";
</script>

<div class="px-6 lg:px-4">
<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
	<li class={cardClass}>
		<RangeField name="patients" bind:value={patients} />
	</li>
	<li class={cardClass}>
		<RangeField name="fee" bind:value={fee} />
	</li>
	<li class={cardClass}>
		<p class={bigNumber}><NumberTicker value={result.monthly} prefix="$" /></p>
		<h3 class="mt-10 text-[15px] font-medium leading-snug">Revenue each month</h3>
		<p class="mt-1 text-[15px] leading-[1.5]">{formatPatients(patients)} at {formatDollars(fee)} each.</p>
	</li>
	<li class="rounded-xl bg-ink p-5 text-white sm:p-6">
		<p class={bigNumber}><NumberTicker value={result.annual} prefix="$" /></p>
		<h3 class="mt-10 text-[15px] font-medium leading-snug">Annualized revenue</h3>
		<p class="mt-1 text-[15px] leading-[1.5]">{formatDollars(result.monthly)} a month for 12 months.</p>
	</li>
</ul>

	<div class="mt-3 rounded-xl bg-mist p-5 sm:p-6">
		<h3 class="text-[15px] font-medium leading-snug">Cumulative revenue by month</h3>
		<ol class="mt-8 grid h-48 grid-cols-12 items-end gap-1.5 sm:h-56 sm:gap-2">
			{#each months as total, index (index)}
				<li class="flex h-full flex-col justify-end" title="Month {index + 1}: {formatDollars(total)}">
					<span class="relative z-10 mb-1 flex h-3 justify-center whitespace-nowrap text-[11px] leading-none sm:text-[13px]">
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

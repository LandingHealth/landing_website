<script lang="ts">
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { formatDollars, formatPatients, revenue, revenueInputs } from "@/lib/revenue";
	import RangeField from "./RangeField.svelte";

	let patients = $state<number>(revenueInputs.patients.default);
	let fee = $state<number>(revenueInputs.fee.default);

	const result = $derived(revenue({ patients, fee }));
	const cardClass = "rounded-xl bg-mist p-5 sm:p-6";
	const bigNumber = "font-display text-4xl font-medium leading-none tracking-[-0.025em]";
</script>

<ul class="grid gap-3 px-6 lg:px-4 sm:grid-cols-2 lg:grid-cols-4">
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

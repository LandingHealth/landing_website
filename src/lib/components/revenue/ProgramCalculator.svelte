<script lang="ts">
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { program, revenueInputs } from "@/lib/revenue";
	import RangeField from "./RangeField.svelte";

	let patients = $state<number>(revenueInputs.patients.default);
	let fee = $state<number>(revenueInputs.fee.default);
	let reviewMinutes = $state<number>(revenueInputs.reviewMinutes.default);

	const result = $derived(program({ patients, fee, reviewMinutes }));
	const cardClass = "rounded-xl bg-fog p-5 sm:p-6";
	const bigNumber = "text-4xl font-semibold leading-none tracking-[-0.025em] tabular-nums";
</script>

<ul class="grid gap-3 px-6 lg:px-4 sm:grid-cols-3">
	<li class={cardClass}><RangeField name="patients" bind:value={patients} /></li>
	<li class={cardClass}><RangeField name="fee" bind:value={fee} /></li>
	<li class={cardClass}><RangeField name="reviewMinutes" bind:value={reviewMinutes} /></li>
</ul>
<ul class="mt-3 grid gap-3 px-6 lg:px-4 sm:grid-cols-2">
	<li class="rounded-xl bg-ink p-5 text-white sm:p-6">
		<p class={bigNumber}><NumberTicker value={result.monthly} prefix="$" /></p>
		<h3 class="mt-10 text-[15px] font-medium leading-snug">Estimated gross revenue each month</h3>
		<p class="mt-1 text-[15px] leading-[1.5]">{result.revenueFormula}. Before any costs.</p>
	</li>
	<li class={cardClass}>
		<p class={bigNumber}>{result.reviewHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}</p>
		<h3 class="mt-10 text-[15px] font-medium leading-snug">Staff review hours each month</h3>
		<p class="mt-1 text-[15px] leading-[1.5]">{result.reviewFormula}</p>
	</li>
</ul>

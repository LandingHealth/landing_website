<script lang="ts">
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { program, revenueInputs } from "@/lib/revenue";
	import { calculatorCard, resultCard, resultNumber, resultTitle, resultFormula } from "./styles";
	import RangeField from "./RangeField.svelte";

	let patients = $state<number>(revenueInputs.patients.default);
	let fee = $state<number>(revenueInputs.fee.default);
	let reviewMinutes = $state<number>(revenueInputs.reviewMinutes.default);

	const result = $derived(program({ patients, fee, reviewMinutes }));
</script>

<ul class="grid gap-4 md:grid-cols-3">
	<li class={calculatorCard}><RangeField name="patients" bind:value={patients} /></li>
	<li class={calculatorCard}><RangeField name="fee" bind:value={fee} /></li>
	<li class={calculatorCard}><RangeField name="reviewMinutes" bind:value={reviewMinutes} /></li>
</ul>
<ul class="mt-4 grid gap-4 md:grid-cols-2">
	<li class={resultCard} aria-live="polite">
		<p class={resultNumber}><NumberTicker value={result.monthly} prefix="$" /></p>
		<h3 class={resultTitle}>Estimated gross revenue each month</h3>
		<p class={resultFormula}>{result.revenueFormula}. Before any costs.</p>
	</li>
	<li class={resultCard} aria-live="polite">
		<p class={resultNumber}>{result.reviewHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}</p>
		<h3 class={resultTitle}>Staff review hours each month</h3>
		<p class={resultFormula}>{result.reviewFormula}</p>
	</li>
</ul>

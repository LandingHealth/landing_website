<script lang="ts">
	import { revenueInputs, timeSaved } from "@/lib/revenue";
	import { calculatorCard, resultCard, resultNumber, resultTitle, resultFormula } from "./styles";
	import RangeField from "./RangeField.svelte";

	let visits = $state<number>(revenueInputs.visits.default);
	let minutesSaved = $state<number>(revenueInputs.minutesSaved.default);

	const result = $derived(timeSaved({ visits, minutesSaved }));
</script>

<ul class="grid gap-4 md:grid-cols-3">
	<li class={calculatorCard}><RangeField name="visits" bind:value={visits} /></li>
	<li class={calculatorCard}><RangeField name="minutesSaved" bind:value={minutesSaved} /></li>
	<li class={resultCard}>
		<p class={resultNumber}>{result.weeklyHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}</p>
		<h3 class={resultTitle}>Hours saved each week</h3>
		<p class={resultFormula} aria-live="polite">{result.formula}</p>
	</li>
</ul>

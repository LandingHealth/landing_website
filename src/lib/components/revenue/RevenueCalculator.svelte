<script lang="ts">
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { revenueInputs, revenueStreams } from "@/lib/revenue";
	import { calculatorCard, resultCard, resultNumber, resultTitle, resultFormula, totalCard } from "./styles";
	import RangeField from "./RangeField.svelte";

	let recoveryPatients = $state<number>(revenueInputs.recoveryPatients.default);
	let monitoringPerPatient = $state<number>(revenueInputs.monitoringPerPatient.default);
	let programPatients = $state<number>(revenueInputs.programPatients.default);
	let programFee = $state<number>(revenueInputs.programFee.default);

	const result = $derived(revenueStreams({ recoveryPatients, monitoringPerPatient, programPatients, programFee }));
</script>

<div class="grid gap-10 lg:grid-cols-2 lg:gap-8">
	<section aria-labelledby="stream-recovery">
		<h3 id="stream-recovery" class="text-xl font-semibold tracking-[-0.015em]">In recovery</h3>
		<ul class="mt-4 grid gap-4">
			<li class={calculatorCard}><RangeField name="recoveryPatients" bind:value={recoveryPatients} /></li>
			<li class={calculatorCard}><RangeField name="monitoringPerPatient" bind:value={monitoringPerPatient} /></li>
			<li class={resultCard}>
				<p class={resultNumber}><NumberTicker value={result.recovery} prefix="$" /></p>
				<h4 class={resultTitle}>Monitoring revenue each month</h4>
				<p class={resultFormula} aria-live="polite">{result.recoveryFormula}</p>
			</li>
		</ul>
	</section>
	<section aria-labelledby="stream-after-discharge">
		<h3 id="stream-after-discharge" class="text-xl font-semibold tracking-[-0.015em]">After discharge</h3>
		<ul class="mt-4 grid gap-4">
			<li class={calculatorCard}><RangeField name="programPatients" bind:value={programPatients} /></li>
			<li class={calculatorCard}><RangeField name="programFee" bind:value={programFee} /></li>
			<li class={resultCard}>
				<p class={resultNumber}><NumberTicker value={result.afterDischarge} prefix="$" /></p>
				<h4 class={resultTitle}>Program revenue each month</h4>
				<p class={resultFormula} aria-live="polite">{result.afterDischargeFormula}</p>
			</li>
		</ul>
	</section>
</div>
<div class={totalCard}>
	<p class="text-5xl font-semibold leading-none tracking-[-0.025em] text-blue tabular-nums sm:text-6xl"><NumberTicker value={result.total} prefix="$" /></p>
	<h3 class={resultTitle}>Added revenue each month</h3>
	<p class={resultFormula} aria-live="polite">{result.totalFormula}</p>
	<p class={resultFormula}>Before any costs. An estimate, not a forecast.</p>
</div>

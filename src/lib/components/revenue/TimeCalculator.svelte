<script lang="ts">
	import { revenueInputs, timeSaved } from "@/lib/revenue";
	import RangeField from "./RangeField.svelte";

	let visits = $state<number>(revenueInputs.visits.default);
	let minutesSaved = $state<number>(revenueInputs.minutesSaved.default);

	const result = $derived(timeSaved({ visits, minutesSaved }));
	const cardClass = "rounded-xl bg-paper p-5 sm:p-6";
</script>

<ul class="grid gap-3 px-6 lg:px-4 sm:grid-cols-3">
	<li class={cardClass}><RangeField name="visits" bind:value={visits} /></li>
	<li class={cardClass}><RangeField name="minutesSaved" bind:value={minutesSaved} /></li>
	<li class="rounded-xl bg-ink p-5 text-white sm:p-6">
		<p class="font-display text-4xl font-medium leading-none tracking-[-0.025em] tabular-nums">
			{result.weeklyHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}
		</p>
		<h3 class="mt-10 text-[15px] font-medium leading-snug">Hours saved each week</h3>
		<p class="mt-1 text-[15px] leading-[1.5]">{result.formula}</p>
	</li>
</ul>

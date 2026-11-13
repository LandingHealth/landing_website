<script lang="ts">
	import { AnimatedCircularProgressBar } from "$lib/components/magic/animated-circular-progress-bar";
	import { MagicCard } from "$lib/components/magic/magic-card";
	import { NumberTicker } from "$lib/components/magic/number-ticker";
	import { enrolledPatients, formatCount, formatDollars, revenue, revenueInputs } from "@/lib/revenue";
	import RangeField from "./RangeField.svelte";

	let caseload = $state<number>(revenueInputs.caseload.default);
	let enrollmentRate = $state<number>(revenueInputs.enrollmentRate.default);
	let fee = $state<number>(revenueInputs.fee.default);

	const patients = $derived(enrolledPatients(caseload, enrollmentRate));
	const result = $derived(revenue({ patients, fee }));
	const bigNumber = "font-display text-4xl font-medium leading-none tracking-[-0.025em]";
</script>

<div class="grid gap-3 px-6 lg:grid-cols-[2fr_3fr] lg:px-4">
	<div class="grid gap-8 rounded-xl bg-mist p-5 sm:p-6">
		<RangeField name="caseload" bind:value={caseload} />
		<RangeField name="enrollmentRate" bind:value={enrollmentRate} />
		<RangeField name="fee" bind:value={fee} />
	</div>

	<MagicCard class="rounded-xl">
		<div class="grid gap-8 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
			<div class="flex flex-col items-start gap-4">
				<AnimatedCircularProgressBar
					class="size-40 font-display text-3xl font-medium"
					value={enrollmentRate}
					max={100}
					gaugePrimaryColor="#0c0e32"
					gaugeSecondaryColor="#dcebf4"
				/>
				<p class="text-[15px] leading-snug">Share of your caseload enrolled</p>
			</div>
			<dl class="grid content-between gap-8">
				<div>
					<dt class="text-[15px] font-medium leading-snug">Patients enrolled</dt>
					<dd class="mt-2 {bigNumber}"><NumberTicker value={patients} /></dd>
					<p class="mt-1 text-[15px] leading-[1.5]">{formatCount(enrollmentRate)}% of {formatCount(caseload)} patients.</p>
				</div>
				<div>
					<dt class="text-[15px] font-medium leading-snug">Revenue each month</dt>
					<dd class="mt-2 {bigNumber}"><NumberTicker value={result.monthly} prefix="$" /></dd>
					<p class="mt-1 text-[15px] leading-[1.5]">{patients} patients at {formatDollars(fee)} each.</p>
				</div>
				<div class="rounded-xl bg-ink p-5 text-white">
					<dt class="text-[15px] font-medium leading-snug">Annualized revenue</dt>
					<dd class="mt-2 {bigNumber}"><NumberTicker value={result.annual} prefix="$" /></dd>
				</div>
			</dl>
		</div>
	</MagicCard>
</div>

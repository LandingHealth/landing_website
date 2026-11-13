<script lang="ts">
	import { revenueInputs, type InputKey } from "@/lib/revenue";

	let { name, value = $bindable() }: { name: InputKey; value: number } = $props();

	const spec = $derived(revenueInputs[name]);
	const id = $props.id();
</script>

<div>
	<p class="font-display text-4xl font-medium leading-none tracking-[-0.025em] tabular-nums">{spec.format(value)}</p>
	<label for={id} class="mt-10 block text-[15px] font-medium leading-snug">{spec.label}</label>
	<input
		{id}
		type="range"
		class="calc-range mt-4"
		min={spec.min}
		max={spec.max}
		step={spec.step}
		aria-valuetext={spec.format(value)}
		bind:value
	/>
	<div class="mt-2 flex justify-between text-[13px] leading-none">
		<span>{spec.format(spec.min)}</span>
		<span>{spec.format(spec.max)}</span>
	</div>
</div>

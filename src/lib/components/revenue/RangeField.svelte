<script lang="ts">
	import { tick } from "svelte";
	import { clampInput, parseInput, revenueInputs, type InputKey } from "@/lib/revenue";

	let { name, value = $bindable() }: { name: InputKey; value: number } = $props();

	const spec = $derived(revenueInputs[name]);
	const id = $props.id();

	let focused = $state(false);
	let text = $state("");

	function onfocus(event: FocusEvent & { currentTarget: HTMLInputElement }) {
		const field = event.currentTarget;
		text = String(value);
		focused = true;
		tick().then(() => field.select());
	}

	function oninput(event: Event & { currentTarget: HTMLInputElement }) {
		const field = event.currentTarget;
		text = field.value.replace(/\D/g, "");
		field.value = text;
		if (text !== "") value = parseInput(name, text);
	}

	function commit() {
		if (text !== "") value = clampInput(name, Number(text));
		focused = false;
	}
</script>

<div>
	<input
		type="text"
		inputmode="numeric"
		autocomplete="off"
		class="calc-number font-display text-4xl font-medium leading-none tracking-[-0.025em] tabular-nums"
		{id}
		value={focused ? text : spec.format(value)}
		{onfocus}
		{oninput}
		onblur={commit}
		onkeydown={(event) => event.key === "Enter" && event.currentTarget.blur()}
	/>
	<label for={id} class="mt-[22px] block text-[15px] font-medium leading-snug">{spec.label}</label>
	<input
		type="range"
		class="calc-range mt-4"
		aria-label="{spec.label} slider"
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

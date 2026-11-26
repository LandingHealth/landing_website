<script lang="ts">
	import { tick } from "svelte";
	import { clampInput, parseInput, revenueInputs, type InputKey } from "@/lib/revenue";
	import { type } from "@/lib/site";

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
		class="calc-number text-4xl font-semibold leading-none tracking-[-0.025em] tabular-nums"
		{id}
		value={focused ? text : spec.format(value)}
		{onfocus}
		{oninput}
		onblur={commit}
		onkeydown={(event) => event.key === "Enter" && event.currentTarget.blur()}
	/>
	<label for={id} class="{type.small} mt-[22px] block font-medium leading-snug">{spec.label}</label>
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
	<div class="{type.caption} mt-2 flex justify-between leading-none text-mute">
		<span>{spec.format(spec.min)}</span>
		<span>{spec.format(spec.max)}</span>
	</div>
</div>

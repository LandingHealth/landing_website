<script lang="ts">
	import { parseInput, revenueInputs, type InputKey } from "@/lib/revenue";

	let { name, value = $bindable() }: { name: InputKey; value: number } = $props();

	const spec = $derived(revenueInputs[name]);
	let draft = $state(String(value));

	function onInput() {
		if (draft.trim() === "") return;
		value = parseInput(name, draft);
	}

	function onBlur() {
		value = parseInput(name, draft);
		draft = String(value);
	}
</script>

<input
	type="text"
	inputmode="numeric"
	aria-label={spec.label}
	class="calc-field"
	style:width="{Math.max(draft.length, 1) + 0.4}ch"
	bind:value={draft}
	oninput={onInput}
	onblur={onBlur}
/>

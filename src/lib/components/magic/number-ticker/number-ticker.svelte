<script lang="ts">
	import type { ClassValue } from "svelte/elements";
	import { untrack } from "svelte";
	import { useInView } from "motion-sv";

	interface NumberTickerProps {
		value: number;
		startValue?: number;
		delay?: number;
		decimalPlaces?: number;
		class?: ClassValue;
		prefix?: string;
		suffix?: string;
	}

	let {
		value,
		startValue = 0,
		delay = 0,
		decimalPlaces = 0,
		class: className,
		prefix = "",
		suffix = "",
	}: NumberTickerProps = $props();

	const duration = 900;

	let spanRef: HTMLSpanElement | null = $state(null);
	let displayed = $state(untrack(() => startValue));
	let started = false;

	const formatter = $derived(
		new Intl.NumberFormat("en-US", {
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		})
	);

	const view = useInView(
		() => spanRef!,
		() => ({})
	);

	$effect(() => {
		if (!view.current) return;

		const target = value;
		const from = untrack(() => displayed);
		const wait = started ? 0 : delay * 1000;
		started = true;

		if (from === target || matchMedia("(prefers-reduced-motion: reduce)").matches) {
			displayed = target;
			return;
		}

		let frame = 0;
		const timer = setTimeout(() => {
			const startTime = performance.now();
			const step = (now: number) => {
				const progress = Math.min(1, (now - startTime) / duration);
				displayed = from + (target - from) * (1 - Math.pow(1 - progress, 3));
				if (progress < 1) frame = requestAnimationFrame(step);
			};
			frame = requestAnimationFrame(step);
		}, wait);

		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(frame);
		};
	});
</script>

<span bind:this={spanRef} class={["inline-block tabular-nums", className]}>{prefix}{formatter.format(Number(displayed.toFixed(decimalPlaces)))}{suffix}</span>

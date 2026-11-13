<script lang="ts">
	import type { ClassValue } from "svelte/elements";
	import { motion, useMotionTemplate, useMotionValue } from "motion-sv";
	import type { Snippet } from "svelte";

	interface MagicCardProps {
		/** Card content */
		children?: Snippet;
		/** Additional CSS classes */
		class?: ClassValue;
		/** Size of the gradient circle */
		gradientSize?: number;
		/** Color of the gradient overlay */
		gradientColor?: string;
		/** Opacity of the gradient overlay */
		gradientOpacity?: number;
		/** Starting color of the border gradient */
		gradientFrom?: string;
		/** Ending color of the border gradient */
		gradientTo?: string;
	}

	let {
		children,
		class: className,
		gradientSize = 200,
		gradientColor = "#dcebf4",
		gradientOpacity = 0.8,
		gradientFrom = "#0c0e32",
		gradientTo = "#dcebf4",
	}: MagicCardProps = $props();

	let mouseX = $derived(useMotionValue(-gradientSize));
	let mouseY = $derived(useMotionValue(-gradientSize));

	let borderGradient = $derived(
		useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, #dcebf4 100%)`
	);
	let overlayGradient = $derived(
		useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`
	);

	const reset = () => {
		mouseX.set(-gradientSize);
		mouseY.set(-gradientSize);
	};

	const handlePointerMove = (e: PointerEvent) => {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	// Reset on mount
	$effect(() => {
		reset();
	});

	// Global event listeners
	$effect(() => {
		const handleGlobalPointerOut = (e: PointerEvent) => {
			if (!e.relatedTarget) {
				reset();
			}
		};

		const handleVisibility = () => {
			if (document.visibilityState !== "visible") {
				reset();
			}
		};

		window.addEventListener("pointerout", handleGlobalPointerOut);
		window.addEventListener("blur", reset);
		document.addEventListener("visibilitychange", handleVisibility);

		return () => {
			window.removeEventListener("pointerout", handleGlobalPointerOut);
			window.removeEventListener("blur", reset);
			document.removeEventListener("visibilitychange", handleVisibility);
		};
	});
</script>

<div
	class={["group relative rounded-[inherit]", className]}
	onpointermove={handlePointerMove}
	onpointerleave={reset}
	onpointerenter={reset}
	role="region"
>
	<motion.div
		class="bg-mist pointer-events-none absolute inset-0 rounded-[inherit] duration-300 group-hover:opacity-100"
		style={{ background: borderGradient }}
	/>
	<div class="absolute inset-px rounded-[inherit] bg-white"></div>
	<motion.div
		class="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style={{ background: overlayGradient, opacity: gradientOpacity }}
	/>
	<div class="relative">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

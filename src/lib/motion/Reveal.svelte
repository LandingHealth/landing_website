<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import { BlurFade } from "$lib/vendor/magic/blur-fade";

  type Props = { children: Snippet; order?: number; class?: string };
  let { children, order = 0, class: className = "" }: Props = $props();

  let box: HTMLDivElement;
  let fade = $state(false);

  onMount(() => {
    fade = !prefersReducedMotion.current && box.getBoundingClientRect().top >= window.innerHeight;
  });
</script>

<div bind:this={box} class="grid {className}">
  {#if fade}
    <BlurFade class="h-full" direction="up" offset={12} duration={0.6} delay={order * 0.07} inViewMargin="0px 0px -8% 0px">
      {@render children()}
    </BlurFade>
  {:else}
    <div class="h-full">{@render children()}</div>
  {/if}
</div>

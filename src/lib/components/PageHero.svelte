<script lang="ts">
  import type { Snippet } from "svelte";
  import GridBackdrop from "$lib/motion/GridBackdrop.svelte";
  import Reveal from "$lib/motion/Reveal.svelte";
  import { container, type } from "@/lib/site";

  type Props = { eyebrow: string; title: string; children: Snippet; below?: Snippet };
  let { eyebrow, title, children, below }: Props = $props();
</script>

<section class="relative isolate bg-mist pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
  <GridBackdrop />
  <div class="{container} relative">
    <Reveal><p class="{type.mono} text-accent-deep">{eyebrow}</p></Reveal>
    <div class="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <Reveal order={1} class="lg:col-span-7"><h1 class={type.h1}>{title}</h1></Reveal>
      <Reveal order={2} class="lg:col-span-5">{@render children()}</Reveal>
    </div>
    {#if below}
      <div class="mt-12 sm:mt-14">{@render below()}</div>
    {/if}
  </div>
</section>

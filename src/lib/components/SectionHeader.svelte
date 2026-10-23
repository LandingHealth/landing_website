<script lang="ts">
  import Reveal from "$lib/motion/Reveal.svelte";
  import { type } from "@/lib/site";

  type Props = { eyebrow: string; title: string; lead?: string; onInk?: boolean };
  let { eyebrow, title, lead, onInk = false }: Props = $props();
</script>

<Reveal>
  <p class="{type.mono} {onInk ? 'text-accent-soft' : 'text-accent-deep'}">{eyebrow}</p>
  <h2 class="{type.h2} mt-4 max-w-3xl">{title}</h2>
  {#if lead}
    <p class="{onInk ? type.bodyOnInk : type.body} mt-5">{lead}</p>
  {/if}
</Reveal>

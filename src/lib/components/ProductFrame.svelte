<script lang="ts">
  import type { Snippet } from "svelte";
  import FrameBeam from "$lib/motion/FrameBeam.svelte";
  import Reveal from "$lib/motion/Reveal.svelte";

  type Props = { label: string; caption?: string; children: Snippet };
  let { label, caption, children }: Props = $props();
</script>

<Reveal>
  <figure>
    <div class="relative overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_12px_40px_rgba(11,14,50,0.06)]">
      <div class="flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3">
        <div aria-hidden="true" class="flex gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-ink/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-ink/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-ink/15"></span>
        </div>
        <span class="font-mono text-xs uppercase tracking-[0.08em] text-slate">{label}</span>
      </div>
      {@render children()}
      <FrameBeam />
    </div>
    {#if caption}
      <figcaption class="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-current opacity-70">{caption}</figcaption>
    {/if}
  </figure>
</Reveal>

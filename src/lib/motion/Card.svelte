<script lang="ts">
  import type { Snippet } from "svelte";
  import { MagicCard } from "$lib/vendor/magic/magic-card";
  import { cn } from "$lib/utils";

  type Tone = "paper" | "ink";
  type Props = { children: Snippet; tone?: Tone; class?: string };
  let { children, tone = "paper", class: className }: Props = $props();

  const tones = {
    paper: { surface: "", glow: "var(--color-mist)" },
    ink: { surface: "[--background:var(--color-ink)] [--border:rgb(255_255_255/0.15)]", glow: "#182047" },
  } satisfies Record<Tone, { surface: string; glow: string }>;
</script>

<MagicCard
  class={cn("h-full rounded-xl", tones[tone].surface, className)}
  gradientFrom="var(--color-accent)"
  gradientTo="var(--color-accent-soft)"
  gradientColor={tones[tone].glow}
  gradientOpacity={0.6}
  gradientSize={240}
>
  {@render children()}
</MagicCard>

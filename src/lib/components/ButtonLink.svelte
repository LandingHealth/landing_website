<script lang="ts">
  import type { Snippet } from "svelte";
  import { button, type ButtonVariant } from "@/lib/site";

  type Props = { href: string; variant: ButtonVariant; children: Snippet };
  let { href, variant, children }: Props = $props();
</script>

<a {href} class={button[variant]}>
  {@render children()}
  <span aria-hidden="true" class="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">→</span>
</a>

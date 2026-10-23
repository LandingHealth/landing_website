<script lang="ts">
  import type { Snippet } from "svelte";
  import Card from "$lib/motion/Card.svelte";
  import Reveal from "$lib/motion/Reveal.svelte";
  import CtaBand from "./CtaBand.svelte";
  import PageHero from "./PageHero.svelte";
  import SectionHeader from "./SectionHeader.svelte";
  import { container, sectionPad, type } from "@/lib/site";

  type Props = {
    label: string;
    title: string;
    intro: string;
    sectionTitle: string;
    details: ReadonlyArray<{ heading: string; text: string }>;
    team?: ReadonlyArray<{ name: string; role: string }>;
    children?: Snippet;
  };
  let { label, title, intro, sectionTitle, details, team, children }: Props = $props();

  const index = (i: number) => String(i + 1).padStart(2, "0");
</script>

<PageHero eyebrow="Landing / {label}" {title}>
  <p class={type.body}>{intro}</p>
</PageHero>

<section class="border-t border-ink/10 bg-paper {sectionPad}">
  <div class="{container} grid gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-4">
      <SectionHeader eyebrow={label} title={sectionTitle} />
    </div>
    <div class="space-y-4 lg:col-span-8">
      {#each details as { heading, text }, i (heading)}
        <Reveal order={i}>
          <Card>
            <article class="grid gap-3 p-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span aria-hidden="true" class="{type.mono} pt-1.5 text-accent-deep">{index(i)}</span>
              <div>
                <h3 class={type.h3}>{heading}</h3>
                <p class="mt-2 max-w-prose text-base leading-7 text-slate">{text}</p>
              </div>
            </article>
          </Card>
        </Reveal>
      {/each}
    </div>
  </div>
</section>

{@render children?.()}

{#if team}
  <section class="bg-ink text-paper {sectionPad}">
    <div class="{container} space-y-12">
      <SectionHeader eyebrow="Team" title="Meet the team" onInk />
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {#each team as { name, role }, i (name)}
          <li>
            <Reveal order={i}>
              <Card tone="ink">
                <div class="p-6">
                  <p class="text-xl font-semibold tracking-[-0.02em]">{name}</p>
                  <p class="{type.mono} mt-2 text-on-ink/70">{role}</p>
                </div>
              </Card>
            </Reveal>
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/if}

<CtaBand />

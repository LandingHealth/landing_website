<script lang="ts">
  import ButtonLink from "$lib/components/ButtonLink.svelte";
  import CtaBand from "$lib/components/CtaBand.svelte";
  import LoadSignal from "$lib/components/LoadSignal.svelte";
  import PageHero from "$lib/components/PageHero.svelte";
  import ProductFrame from "$lib/components/ProductFrame.svelte";
  import RecoverySignals from "$lib/components/RecoverySignals.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import Card from "$lib/motion/Card.svelte";
  import Reveal from "$lib/motion/Reveal.svelte";
  import { container, sectionPad, type } from "@/lib/site";

  const audiences = [
    {
      label: "For therapists",
      heading: "Plan the practice",
      text: "Plan availability, prepare exercise guides, coordinate follow ups.",
    },
    {
      label: "For patients",
      heading: "Care at home",
      text: "Book online sessions and get home exercise guides with clear instructions and schedules.",
    },
    {
      label: "Between visits",
      heading: "Context beyond the clinic",
      text: "SafeSock adds a view of weight bearing outside the clinic.",
    },
  ];

  const platform = [
    {
      heading: "Scheduling",
      text: "Landing helps therapists anticipate demand and plan appointment availability around the needs of their practice. Patients can book online sessions, while AI agents help coordinate scheduling, reminders, and follow ups.",
    },
    {
      heading: "Exercise planning",
      text: "For exercise planning, Landing helps therapists find exercises suited to treatment goals, available equipment, and the restrictions they define. Therapists can prepare personalized home exercise guides with clear instructions and schedules, giving patients a practical reference between sessions.",
    },
    {
      heading: "SafeSock",
      text: "SafeSock adds a view of how a patient bears weight outside the clinic. Its sensor sleeve is designed to sit inside a boot, cast, or brace and capture pressure patterns that can help therapists discuss recovery with more context.",
    },
  ];
</script>

<PageHero eyebrow="SafeSock by Landing" title="A connected operating system for physical therapy">
  <p class={type.body}>
    Landing connects scheduling, exercise planning, and patient communication with SafeSock, a sensor
    sleeve designed to capture how patients bear weight between appointments.
  </p>
  <div class="mt-7 flex flex-wrap gap-3">
    <ButtonLink href="/devices#demo" variant="primary">Watch the demo</ButtonLink>
    <ButtonLink href="/product" variant="secondary">Explore the platform</ButtonLink>
  </div>
  {#snippet below()}
    <ProductFrame label="SafeSock · Concept render" caption="Concept render · Not live data">
      <img
        src="/safesock-sensor-layout.jpg"
        alt="Concept render of SafeSock's pressure sensor layout across the sole"
        width="1600"
        height="871"
        fetchpriority="high"
        loading="eager"
        class="h-auto w-full"
      />
    </ProductFrame>
  {/snippet}
</PageHero>

<section class="border-t border-ink/10 bg-paper {sectionPad}">
  <div class="{container} grid gap-6 md:grid-cols-3">
    {#each audiences as { label, heading, text }, index (label)}
      <Reveal order={index}>
        <div class="border-t border-ink/10 pt-6">
          <p class="{type.mono} text-accent-deep">{label}</p>
          <h2 class="{type.h3} mt-3">{heading}</h2>
          <p class="mt-3 max-w-prose text-base leading-7 text-slate">{text}</p>
        </div>
      </Reveal>
    {/each}
  </div>
</section>

<section class="bg-mist {sectionPad}">
  <div class="{container} space-y-12">
    <SectionHeader eyebrow="Workflow" title="From step to insight" />
    <LoadSignal />
  </div>
</section>

<section class="border-t border-ink/10 bg-paper {sectionPad}">
  <div class="{container} space-y-12">
    <SectionHeader eyebrow="Platform" title="Support for your practice and your patients" />
    <div class="grid gap-4 md:grid-cols-3">
      {#each platform as { heading, text }, index (heading)}
        <Reveal order={index}>
          <Card>
            <article class="p-6">
              <p class="{type.mono} text-accent-deep">{String(index + 1).padStart(2, "0")}</p>
              <h3 class="{type.h3} mt-4">{heading}</h3>
              <p class="mt-3 text-base leading-7 text-slate">{text}</p>
            </article>
          </Card>
        </Reveal>
      {/each}
    </div>
  </div>
</section>

<section class="bg-ink text-paper {sectionPad}">
  <div class="{container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
    <Reveal class="lg:col-span-5">
      <p class="{type.mono} text-accent-soft">Care</p>
      <h2 class="{type.h2} mt-4">More time for patient care</h2>
      <p class="{type.bodyOnInk} mt-5">
        Our goal is to help physical therapists support more patients while preserving the attention each
        person deserves. Landing’s devices provide meaningful context, and its AI agents help with the
        coordination and administrative work surrounding care. Therapists remain responsible for exercise
        plans and clinical decisions, with one connected system supporting their work.
      </p>
      <div class="mt-8">
        <ButtonLink href="/devices" variant="onInk">Explore SafeSock</ButtonLink>
      </div>
    </Reveal>
    <Reveal class="lg:col-span-7">
      <RecoverySignals />
    </Reveal>
  </div>
</section>

<CtaBand />

<script lang="ts">
  import SectionPage from "$lib/components/SectionPage.svelte";
  import ProductFrame from "$lib/components/ProductFrame.svelte";
  import Reveal from "$lib/motion/Reveal.svelte";
  import { container, sectionPad, type } from "@/lib/site";

  const details = [
    {
      heading: "Wear the sensor sleeve",
      text: "The thin sleeve is designed to sit inside common recovery supports, with no adhesive or external wires.",
    },
    {
      heading: "Follow weight bearing",
      text: "Embedded pressure sensors are intended to record load distribution and changes in weight bearing as patients move through recovery.",
    },
    {
      heading: "Review the trend",
      text: "The planned clinician view brings movement trends into the care conversation, giving therapists more context while they make their own clinical decisions.",
    },
  ];
</script>

<SectionPage
  label="Devices"
  title="Meet SafeSock."
  intro="SafeSock is a Landing product designed to show how patients bear weight between appointments. A sensor-embedded sleeve fits inside a walking boot, cast, or brace and captures pressure patterns during movement."
  sectionTitle="From step to insight"
  {details}
>
  <section id="demo" class="scroll-mt-24 bg-ink text-paper {sectionPad}">
    <div class="{container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal class="lg:col-span-5">
        <div>
          <p class="{type.mono} text-accent-soft">Demo</p>
          <h2 class="{type.h2} mt-4">See the SafeSock concept</h2>
          <p class="{type.bodyOnInk} mt-5">A short visualization of the SafeSock concept and its intended sensing workflow. The measurements shown are illustrative.</p>
          <div class="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2">
            <img src="/safesock-mark.png" alt="SafeSock product mark" width="56" height="56" class="h-12 w-12 rounded-lg object-cover" />
            <span class="text-sm font-semibold tracking-wide">SafeSock <span class="font-normal text-on-ink">by Landing</span></span>
          </div>
        </div>
      </Reveal>
      <div class="lg:col-span-7">
        <ProductFrame label="SafeSock · Concept video" caption="Illustrative data">
          <video class="aspect-video w-full bg-black object-cover" controls playsinline preload="metadata" poster="/safesock-demo-poster.jpg" aria-label="SafeSock product concept video">
            <source src="/safesock-demo.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </ProductFrame>
      </div>
    </div>
  </section>
</SectionPage>

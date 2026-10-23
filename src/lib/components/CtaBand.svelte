<script lang="ts">
  import Reveal from "$lib/motion/Reveal.svelte";
  import ButtonLink from "./ButtonLink.svelte";
  import { container, sectionPad, type } from "@/lib/site";
</script>

<section class="border-t border-ink/10 bg-paper {sectionPad}">
  <div class={container}>
    <Reveal class="max-w-2xl">
      <h2 class={type.h2}>See how SafeSock works.</h2>
      <p class="{type.body} mt-5">
        SafeSock is a Landing product designed to show how patients bear weight between appointments.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/devices#demo" variant="primary">Watch the demo</ButtonLink>
        <ButtonLink href="/about" variant="secondary">Meet the team</ButtonLink>
      </div>
    </Reveal>
  </div>
</section>

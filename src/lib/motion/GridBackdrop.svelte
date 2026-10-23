<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import { AnimatedGridPattern } from "$lib/vendor/magic/animated-grid-pattern";
</script>

<AnimatedGridPattern
  class="stroke-ink/[0.07] text-white [mask-image:radial-gradient(60%_70%_at_75%_0%,#000,transparent)]"
  width={48}
  height={48}
  numSquares={prefersReducedMotion.current ? 0 : 24}
  maxOpacity={0.7}
  duration={5}
  repeatDelay={1.5}
/>

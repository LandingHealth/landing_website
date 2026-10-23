<script lang="ts">
  import Reveal from "$lib/motion/Reveal.svelte";

  const signal =
    "M0 104 C22 104 26 99 34 83 C42 60 47 34 59 39 C72 45 78 82 91 85 C108 87 111 45 125 38 C138 32 147 81 162 102 C177 104 184 104 200 104 C220 104 225 98 233 82 C242 57 249 34 261 39 C274 46 281 82 294 84 C308 85 319 44 333 38 C347 34 355 82 370 102 C380 104 390 104 400 104";
</script>

<Reveal>
  <figure class="rounded-xl border border-ink/10 bg-white p-5 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5">
      <p class="text-sm font-semibold tracking-[-0.02em] text-ink">From movement to useful context</p>
      <span class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-accent-text">
        <span class="signal-pulse h-2 w-2 rounded-full bg-accent"></span>
        Illustrative signal
      </span>
    </div>
    <div class="grid gap-4 py-6 lg:grid-cols-[1fr_auto_1.4fr_auto_1fr] lg:items-stretch">
      <div class="rounded-lg bg-panel p-5">
        <p class="font-mono text-xs uppercase tracking-[0.08em] text-accent-text">01 / Capture</p>
        <div class="relative mx-auto mt-4 h-32 w-28">
          <svg viewBox="0 0 140 180" role="img" aria-label="Illustration of pressure sensing beneath the foot" class="h-full w-full">
            <defs>
              <clipPath id="sock-foot"><path d="M71 7C101 7 120 30 119 70c-1 30-12 54-18 79-5 17-13 25-31 25s-27-8-32-25c-7-26-17-51-17-79C21 30 41 7 71 7Z" /></clipPath>
              <radialGradient id="sock-heat"><stop stop-color="#eb662c" stop-opacity=".75" /><stop offset="1" stop-color="#eb662c" stop-opacity="0" /></radialGradient>
            </defs>
            <path d="M71 7C101 7 120 30 119 70c-1 30-12 54-18 79-5 17-13 25-31 25s-27-8-32-25c-7-26-17-51-17-79C21 30 41 7 71 7Z" fill="#fff" stroke="#0b0e32" stroke-opacity=".25" />
            <g clip-path="url(#sock-foot)">
              <ellipse class="signal-heat" cx="70" cy="47" rx="41" ry="31" fill="url(#sock-heat)" />
              <ellipse class="signal-heat" cx="70" cy="141" rx="37" ry="32" fill="url(#sock-heat)" style="animation-delay: -1.3s" />
              {#each [0, 1, 2, 3, 4] as row (row)}
                {#each [0, 1, 2] as col (col)}
                  <circle cx={46 + col * 24} cy={31 + row * 27} r="2" fill="#0b0e32" fill-opacity=".3" />
                {/each}
              {/each}
            </g>
          </svg>
        </div>
        <p class="mt-3 text-center text-sm leading-6 text-slate">SafeSock's sensor sleeve sits inside a boot, cast, or brace.</p>
      </div>
      <div aria-hidden="true" class="signal-arrow self-center text-center text-2xl text-accent lg:px-1">→</div>
      <div class="flex flex-col rounded-lg bg-panel p-5">
        <p class="font-mono text-xs uppercase tracking-[0.08em] text-accent-text">02 / Understand</p>
        <div class="flex min-h-32 flex-1 items-center">
          <svg viewBox="0 0 400 130" role="img" aria-label="Animated illustration of a repeating weight bearing signal" class="h-32 w-full">
            <path d="M0 104H400" stroke="#0b0e32" stroke-opacity=".2" />
            <path d={signal} fill="none" stroke="#eb662c" stroke-width="3" stroke-linecap="round" />
            <path class="signal-trace" d={signal} fill="none" stroke="#0b0e32" stroke-width="5" stroke-linecap="round" stroke-dasharray="3 50" />
          </svg>
        </div>
        <p class="text-center text-sm leading-6 text-slate">Pressure patterns can show how weight bearing changes over time.</p>
      </div>
      <div aria-hidden="true" class="signal-arrow self-center text-center text-2xl text-accent lg:px-1">→</div>
      <div class="flex flex-col rounded-lg bg-panel p-5">
        <p class="font-mono text-xs uppercase tracking-[0.08em] text-accent-text">03 / Review</p>
        <div class="flex min-h-32 flex-1 items-center justify-center">
          <div class="w-full rounded-lg border border-ink/10 bg-white p-4">
            <div class="mb-3 flex items-center justify-between"><span class="h-2 w-16 rounded-full bg-ink/15"></span><span class="h-2 w-2 rounded-full bg-accent"></span></div>
            <svg viewBox="0 0 160 60" aria-hidden="true" class="h-14 w-full"><path d="M2 52 28 48 51 43 78 34 104 37 130 22 158 11" fill="none" stroke="#eb662c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M2 52 28 48 51 43 78 34 104 37 130 22 158 11" fill="none" stroke="#eb662c" stroke-opacity=".12" stroke-width="12" /></svg>
          </div>
        </div>
        <p class="text-center text-sm leading-6 text-slate">A clinician can review trends alongside the care plan.</p>
      </div>
    </div>
    <figcaption class="border-t border-ink/10 pt-4 text-sm leading-6 text-slate">This diagram illustrates the intended workflow; it is not live patient data.</figcaption>
  </figure>
</Reveal>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .signal-pulse { animation: signal-pulse 2s ease-in-out infinite; }
    .signal-heat { transform-box: fill-box; transform-origin: center; animation: signal-heat 3s ease-in-out infinite; }
    .signal-trace { animation: signal-flow 2.4s linear infinite; }
    .signal-arrow { animation: signal-arrow 2s ease-in-out infinite; }
  }
  @keyframes signal-pulse { 50% { opacity: .35; } }
  @keyframes signal-heat { 50% { opacity: .55; transform: scale(.88); } }
  @keyframes signal-flow { to { stroke-dashoffset: -106; } }
  @keyframes signal-arrow { 50% { opacity: .45; transform: translateX(4px); } }
</style>

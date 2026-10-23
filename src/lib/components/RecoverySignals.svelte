<div class="signal-shell" role="img" aria-label="Illustration of SafeSock pressure sensing, a weight-bearing waveform, and a recovery trend">
  <div class="signal-header">
    <span class="eyebrow">SafeSock / movement context</span>
    <span class="concept"><span class="status-dot"></span> Concept visualization</span>
  </div>

  <div class="visual-grid">
    <div class="foot-panel">
      <div class="panel-label">Pressure pattern</div>
      <svg viewBox="0 0 180 250" class="foot" aria-hidden="true">
        <defs>
          <clipPath id="foot-clip"><path d="M90 8C127 8 151 43 149 94c-2 41-18 73-25 105-5 24-17 41-34 41s-29-17-34-41c-7-32-23-64-25-105C29 43 53 8 90 8Z" /></clipPath>
          <radialGradient id="pressure-glow"><stop stop-color="#eb662c" stop-opacity=".78" /><stop offset="1" stop-color="#eb662c" stop-opacity="0" /></radialGradient>
        </defs>
        <path class="foot-outline" d="M90 8C127 8 151 43 149 94c-2 41-18 73-25 105-5 24-17 41-34 41s-29-17-34-41c-7-32-23-64-25-105C29 43 53 8 90 8Z" />
        <g clip-path="url(#foot-clip)">
          <circle class="pressure pressure-a" cx="88" cy="68" r="53" fill="url(#pressure-glow)" />
          <circle class="pressure pressure-b" cx="88" cy="201" r="49" fill="url(#pressure-glow)" />
          <circle cx="61" cy="67" r="3" fill="#eb662c" />
          <circle cx="91" cy="52" r="3" fill="#eb662c" />
          <circle cx="119" cy="72" r="3" fill="#eb662c" />
          <circle cx="75" cy="193" r="3" fill="#eb662c" />
          <circle cx="106" cy="196" r="3" fill="#eb662c" />
        </g>
      </svg>
      <div class="panel-foot">Sensor sleeve</div>
    </div>

    <div class="graph-panel">
      <div class="panel-label">Weight-bearing signal</div>
      <svg viewBox="0 0 360 166" class="waveform" aria-hidden="true">
        <defs>
          <linearGradient id="wave-fill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#eb662c" stop-opacity=".27" /><stop offset="1" stop-color="#eb662c" stop-opacity="0" /></linearGradient>
        </defs>
        <path class="grid-line" d="M0 45H360M0 95H360M0 145H360" />
        <path d="M0 145C19 145 21 130 30 98c10-37 19-62 32-63 15-1 22 73 42 78 20 5 30-75 47-75 17 0 27 66 45 105 21 2 28 2 40 2 16 0 21-17 31-53 9-34 20-57 32-57 16 0 23 73 43 78 20 5 30-75 48-75v107H0Z" fill="url(#wave-fill)" />
        <path class="wave-base" d="M0 145C19 145 21 130 30 98c10-37 19-62 32-63 15-1 22 73 42 78 20 5 30-75 47-75 17 0 27 66 45 105 21 2 28 2 40 2 16 0 21-17 31-53 9-34 20-57 32-57 16 0 23 73 43 78 20 5 30-75 48-75" />
        <path class="wave-glint" d="M0 145C19 145 21 130 30 98c10-37 19-62 32-63 15-1 22 73 42 78 20 5 30-75 47-75 17 0 27 66 45 105 21 2 28 2 40 2 16 0 21-17 31-53 9-34 20-57 32-57 16 0 23 73 43 78 20 5 30-75 48-75" />
      </svg>
      <div class="trend-card">
        <div>
          <span class="trend-heading">Recovery trend</span>
          <span class="trend-sub">Context for the next conversation</span>
        </div>
        <div class="trend-bars" aria-hidden="true">
          <span style="--bar-height: 26%"></span>
          <span style="--bar-height: 39%"></span>
          <span style="--bar-height: 51%"></span>
          <span style="--bar-height: 64%"></span>
          <span style="--bar-height: 74%"></span>
          <span style="--bar-height: 90%"></span>
        </div>
      </div>
    </div>
  </div>
  <p class="caption">Illustrative data · therapist-led decisions</p>
</div>

<style>
  .signal-shell { overflow: hidden; border: 1px solid rgba(255,255,255,.18); border-radius: 28px; background: linear-gradient(150deg,#182047,#0d1236 70%); box-shadow: 0 28px 70px rgba(0,0,0,.22); color: #f7fbfd; font-family: inherit; }
  .signal-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; padding: 20px 22px; border-bottom: 1px solid rgba(255,255,255,.13); }
  .eyebrow, .panel-label { font-size: 11px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
  .eyebrow { color: #f28a59; }
  .concept { display: flex; align-items: center; gap: 8px; color: #aec2d1; font-size: 11px; }
  .status-dot { display: block; width: 7px; height: 7px; border-radius: 50%; background: #eb662c; box-shadow: 0 0 0 4px rgba(235,102,44,.14); }
  .visual-grid { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.2fr); gap: 12px; padding: 14px; }
  .foot-panel, .graph-panel { min-width: 0; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: rgba(255,255,255,.045); padding: 17px; }
  .panel-label { color: #abc0d0; }
  .foot { display: block; height: 195px; width: 100%; margin: 8px auto 0; }
  .foot-outline { fill: rgba(219,235,244,.09); stroke: rgba(219,235,244,.42); stroke-width: 1.5; }
  .panel-foot { margin-top: 5px; color: #f28a59; font-size: 12px; font-weight: 600; text-align: center; }
  .graph-panel { display: flex; flex-direction: column; }
  .waveform { display: block; width: 100%; height: 154px; margin: 8px 0 4px; }
  .grid-line { fill: none; stroke: rgba(219,235,244,.12); stroke-width: 1; }
  .wave-base { fill: none; stroke: #eb662c; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .wave-glint { fill: none; stroke: #ffe0c6; stroke-width: 5; stroke-linecap: round; stroke-dasharray: 2 48; }
  .trend-card { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: auto; padding: 13px; border-radius: 12px; background: rgba(219,235,244,.09); }
  .trend-heading, .trend-sub { display: block; }
  .trend-heading { font-size: 12px; font-weight: 700; }
  .trend-sub { margin-top: 3px; color: #aec2d1; font-size: 10px; line-height: 1.4; }
  .trend-bars { display: flex; align-items: end; gap: 4px; flex: none; width: 87px; height: 36px; }
  .trend-bars span { flex: 1; height: var(--bar-height); border-radius: 3px 3px 0 0; background: #eb662c; transform-origin: bottom; }
  .caption { margin: 0 22px 20px; color: #aec2d1; font-size: 11px; }
  @media (max-width: 560px) { .visual-grid { grid-template-columns: 1fr; } .foot { height: 150px; } .signal-header { padding: 17px; } .caption { margin: 0 17px 18px; } }
  @media (prefers-reduced-motion: no-preference) {
    .status-dot { animation: blink 2s ease-in-out infinite; }
    .pressure { transform-box: fill-box; transform-origin: center; animation: breathe 3.2s ease-in-out infinite; }
    .pressure-b { animation-delay: -1.4s; }
    .wave-glint { animation: flow 2.6s linear infinite; }
    .trend-bars span { animation: rise 1.5s cubic-bezier(.22,1,.36,1) both; }
    .trend-bars span:nth-child(2) { animation-delay: .12s; }
    .trend-bars span:nth-child(3) { animation-delay: .24s; }
    .trend-bars span:nth-child(4) { animation-delay: .36s; }
    .trend-bars span:nth-child(5) { animation-delay: .48s; }
    .trend-bars span:nth-child(6) { animation-delay: .6s; }
  }
  @keyframes blink { 50% { opacity: .35; } }
  @keyframes breathe { 50% { opacity: .45; transform: scale(.84); } }
  @keyframes flow { to { stroke-dashoffset: -100; } }
  @keyframes rise { from { transform: scaleY(.08); opacity: .25; } to { transform: scaleY(1); opacity: 1; } }
</style>

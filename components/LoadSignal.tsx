import { type } from "@/lib/site";

const signal =
  "M0 104 C22 104 26 99 34 83 C42 60 47 34 59 39 C72 45 78 82 91 85 C108 87 111 45 125 38 C138 32 147 81 162 102 C177 104 184 104 200 104 C220 104 225 98 233 82 C242 57 249 34 261 39 C274 46 281 82 294 84 C308 85 319 44 333 38 C347 34 355 82 370 102 C380 104 390 104 400 104";

export default function LoadSignal() {
  return (
    <figure data-reveal className="rounded-xl border border-ink/10 bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5">
        <p className="text-sm font-semibold tracking-[-0.02em] text-ink">From movement to useful context</p>
        <span className={`flex items-center gap-2 ${type.label} text-accent-text`}>
          <span className="signal-pulse h-2 w-2 rounded-full bg-accent" />
          Illustrative signal
        </span>
      </div>
      <div className="grid gap-4 py-6 lg:grid-cols-[1fr_auto_1.4fr_auto_1fr] lg:items-stretch">
        <div className="rounded-lg bg-panel p-5">
          <p className={`${type.label} text-accent-text`}>01 / Capture</p>
          <div className="relative mx-auto mt-4 h-32 w-28">
            <svg viewBox="0 0 140 180" role="img" aria-label="Illustration of pressure sensing beneath the foot" className="h-full w-full">
              <defs>
                <clipPath id="sock-foot"><path d="M71 7C101 7 120 30 119 70c-1 30-12 54-18 79-5 17-13 25-31 25s-27-8-32-25c-7-26-17-51-17-79C21 30 41 7 71 7Z" /></clipPath>
                <radialGradient id="sock-heat"><stop stopColor="#eb662c" stopOpacity=".75" /><stop offset="1" stopColor="#eb662c" stopOpacity="0" /></radialGradient>
              </defs>
              <path d="M71 7C101 7 120 30 119 70c-1 30-12 54-18 79-5 17-13 25-31 25s-27-8-32-25c-7-26-17-51-17-79C21 30 41 7 71 7Z" fill="#fff" stroke="#0b0e32" strokeOpacity=".25" />
              <g clipPath="url(#sock-foot)">
                <ellipse className="signal-heat" cx="70" cy="47" rx="41" ry="31" fill="url(#sock-heat)" />
                <ellipse className="signal-heat" cx="70" cy="141" rx="37" ry="32" fill="url(#sock-heat)" style={{ animationDelay: "-1.3s" }} />
                {Array.from({ length: 5 }, (_, row) => Array.from({ length: 3 }, (_, col) => <circle key={`${row}-${col}`} cx={46 + col * 24} cy={31 + row * 27} r="2" fill="#0b0e32" fillOpacity=".3" />))}
              </g>
            </svg>
          </div>
          <p className="mt-3 text-center text-sm leading-6 text-slate">SafeSock&apos;s sensor sleeve sits inside a boot, cast, or brace.</p>
        </div>
        <div aria-hidden="true" className="signal-arrow self-center text-center text-2xl text-accent lg:px-1">→</div>
        <div className="flex flex-col rounded-lg bg-panel p-5">
          <p className={`${type.label} text-accent-text`}>02 / Understand</p>
          <div className="flex min-h-32 flex-1 items-center">
            <svg viewBox="0 0 400 130" role="img" aria-label="Animated illustration of a repeating weight bearing signal" className="h-32 w-full">
              <path d="M0 104H400" stroke="#0b0e32" strokeOpacity=".2" />
              <path d={signal} fill="none" stroke="#eb662c" strokeWidth="3" strokeLinecap="round" />
              <path className="signal-trace" d={signal} fill="none" stroke="#0b0e32" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 50" />
            </svg>
          </div>
          <p className="text-center text-sm leading-6 text-slate">Pressure patterns can show how weight bearing changes over time.</p>
        </div>
        <div aria-hidden="true" className="signal-arrow self-center text-center text-2xl text-accent lg:px-1">→</div>
        <div className="flex flex-col rounded-lg bg-panel p-5">
          <p className={`${type.label} text-accent-text`}>03 / Review</p>
          <div className="flex min-h-32 flex-1 items-center justify-center">
            <div className="w-full rounded-lg border border-ink/10 bg-white p-4">
              <div className="mb-3 flex items-center justify-between"><span className="h-2 w-16 rounded-full bg-ink/15" /><span className="h-2 w-2 rounded-full bg-accent" /></div>
              <svg viewBox="0 0 160 60" aria-hidden="true" className="h-14 w-full"><path d="M2 52 28 48 51 43 78 34 104 37 130 22 158 11" fill="none" stroke="#eb662c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 52 28 48 51 43 78 34 104 37 130 22 158 11" fill="none" stroke="#eb662c" strokeOpacity=".12" strokeWidth="12" /></svg>
            </div>
          </div>
          <p className="text-center text-sm leading-6 text-slate">A clinician can review trends alongside the care plan.</p>
        </div>
      </div>
      <figcaption className="border-t border-ink/10 pt-4 text-sm leading-6 text-slate">This diagram illustrates the intended workflow; it is not live patient data.</figcaption>
    </figure>
  );
}

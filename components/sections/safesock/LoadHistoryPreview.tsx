import { type } from "@/lib/site";

// Illustrative daily peaks as a share of the chart height. Not measurements.
const sampleDays = [0.34, 0.4, 0.37, 0.45, 0.42, 0.5, 0.47, 0.74, 0.55, 0.5, 0.58, 0.69, 0.53, 0.57];
const limit = 0.62;

export default function LoadHistoryPreview() {
  return (
    <figure className="w-full max-w-2xl">
      <div className="rounded-2xl bg-white p-5 shadow-preview sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-semibold">Load history</p>
          <span className={`${type.label} rounded-[4px] bg-fog px-2 py-1 text-slate`}>Proposed</span>
        </div>
        <p className="mt-1 text-sm text-mute">Sample patient, last 14 days</p>
        <div role="img" aria-label="Sample bar chart of daily load, with two days above the limit line." className="relative mt-8 h-44 sm:h-56">
          <div className="absolute inset-x-0 z-10 border-t border-dashed border-ink" style={{ bottom: `${limit * 100}%` }}>
            <span className={`${type.label} absolute right-0 -top-6 bg-white pl-1 text-ink`}>Your limit</span>
          </div>
          <div className="flex h-full items-end gap-1.5 sm:gap-2">
            {sampleDays.map((day, index) => (
              <span
                key={index}
                className={`flex-1 rounded-t-[3px] ${day > limit ? "bg-ink" : "bg-blue/70"}`}
                style={{ height: `${day * 100}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hair pt-4 text-sm text-slate">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-[2px] bg-blue/70" />
            Within the limit
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-[2px] bg-ink" />
            Above the limit
          </span>
        </div>
      </div>
      <figcaption className={`${type.label} mt-4 text-center text-ink/70`}>Proposed view with sample data</figcaption>
    </figure>
  );
}

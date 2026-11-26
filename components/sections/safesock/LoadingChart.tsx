"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { type } from "@/lib/site";

type RecoveryPhase = { fromWeek: number; toWeek: number; limit: number; label: string };
type Progression = { weeks: number; phases: ReadonlyArray<RecoveryPhase>; days: ReadonlyArray<number> };
type KeyKind = "peak" | "limit";

const progression: Progression = {
  weeks: 8,
  phases: [
    { fromWeek: 1, toWeek: 2, limit: 20, label: "Toe-touch" },
    { fromWeek: 3, toWeek: 4, limit: 50, label: "Partial" },
    { fromWeek: 5, toWeek: 6, limit: 75, label: "Partial" },
    { fromWeek: 7, toWeek: 8, limit: 100, label: "Full" },
  ],
  days: [
    12, 14, 15, 17, 16, 18, 21,
    17, 18, 19, 18, 22, 19, 19,
    31, 35, 38, 41, 43, 44, 46,
    47, 51, 48, 53, 49, 52, 58,
  ],
};

const today = progression.days.length - 1;
const totalDays = progression.weeks * 7;
const domain: [number, number] = [0, 110];

const phaseOn = (day: number) => {
  const week = Math.floor(day / 7) + 1;
  return progression.phases.find((p) => week >= p.fromWeek && week <= p.toWeek) ?? progression.phases[0];
};
const isOver = (day: number) => progression.days[day] > phaseOn(day).limit;
const dayName = (day: number) => (day === today ? "Today" : `Week ${Math.floor(day / 7) + 1}, day ${(day % 7) + 1}`);
const overCount = progression.days.filter((_, i) => isOver(i)).length;

const axisText = "font-mono text-[11px] font-medium uppercase tracking-[0.04em]";

function niceTicks([min, max]: [number, number], target: number) {
  const raw = (max - min) / target;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value));
}

export default function LoadingChart() {
  const { days, phases, weeks } = progression;
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = lineRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const draw = element.animate(
      [
        { strokeDasharray: "1 1", strokeDashoffset: 1 },
        { strokeDasharray: "1 1", strokeDashoffset: 0 },
      ],
      { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
    );
    draw.pause();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        draw.play();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      draw.cancel();
    };
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 7 : 1;
    const moves: Record<string, (current: number) => number> = {
      ArrowRight: (c) => c + step,
      ArrowUp: (c) => c + step,
      ArrowLeft: (c) => c - step,
      ArrowDown: (c) => c - step,
      Home: () => 0,
      End: () => today,
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setActive((current) => (current === null ? today : clamp(move(current), 0, today)));
  };

  const plotWidthPx = width || 960;
  const narrow = plotWidthPx < 560;
  const ticks = niceTicks(domain, 5);
  const margin = { top: 22, right: 2, bottom: 28, left: 34 };
  const plotHeight = narrow ? 170 : 210;
  const height = plotHeight + margin.top + margin.bottom;
  const plotWidth = plotWidthPx - margin.left - margin.right;
  const edge = (day: number) => margin.left + (day / totalDays) * plotWidth;
  const x = (day: number) => edge(day + 0.5);
  const y = (value: number) => margin.top + ((domain[1] - value) / (domain[1] - domain[0])) * plotHeight;
  const steps = phases
    .map((p, i) =>
      i
        ? `V${y(p.limit).toFixed(1)}H${edge(p.toWeek * 7).toFixed(1)}`
        : `M${edge((p.fromWeek - 1) * 7).toFixed(1)} ${y(p.limit).toFixed(1)}H${edge(p.toWeek * 7).toFixed(1)}`,
    )
    .join("");
  const line = days.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const futureStart = edge(today + 1);

  const dayAt = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - box.left) / box.width) * plotWidthPx;
    return clamp(Math.round(((px - margin.left) / plotWidth) * totalDays - 0.5), 0, today);
  };

  return (
    <figure
      className="w-full max-w-6xl"
      aria-label={`Weight-bearing progression over ${weeks} weeks, sample patient data. ${overCount} of ${days.length} days so far peaked over the prescribed restriction.`}
    >
      <div className="rounded-2xl bg-white p-5 shadow-preview sm:p-8">
        <div ref={measureRef}>
          <p className="text-base font-semibold text-ink">Weight-bearing progression</p>
          <p className="mt-1 text-sm text-mute">Daily peak load against the prescribed restriction</p>
          <p className={`${type.label} mt-4 text-mute sm:mt-5`}>% body weight</p>
          <div
            className="relative mt-1 rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            tabIndex={0}
            role="group"
            aria-label="Daily peak load plot. Use the left and right arrow keys to read each day."
            onKeyDown={onKeyDown}
            onBlur={() => setActive(null)}
          >
            <svg
              viewBox={`0 0 ${plotWidthPx} ${height}`}
              className="block h-auto w-full touch-pan-y select-none"
              aria-hidden="true"
              onPointerMove={(event) => setActive(dayAt(event))}
              onPointerDown={(event) => setActive(dayAt(event))}
              onPointerLeave={(event) => event.pointerType === "mouse" && setActive(null)}
            >
              <rect x={futureStart} y={margin.top} width={plotWidthPx - margin.right - futureStart} height={plotHeight} className="fill-fog" />

              {ticks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={margin.left}
                    x2={plotWidthPx - margin.right}
                    y1={y(tick)}
                    y2={y(tick)}
                    className={tick === 0 ? "stroke-ink/35" : "stroke-hair/70"}
                    strokeWidth={1}
                    shapeRendering="crispEdges"
                  />
                  <text x={margin.left - 8} y={y(tick)} dy="0.35em" textAnchor="end" className={`${axisText} fill-mute tabular-nums`}>
                    {tick}
                  </text>
                </g>
              ))}

              <line x1={futureStart} x2={futureStart} y1={margin.top - 14} y2={margin.top + plotHeight} className="stroke-ink/40" strokeWidth={1} shapeRendering="crispEdges" />
              <text x={futureStart - 6} y={margin.top - 6} textAnchor="end" className={`${axisText} fill-ink`}>
                Today
              </text>
              <text x={futureStart + 6} y={margin.top - 6} className={`${axisText} fill-mute`}>
                Planned
              </text>

              <path d={steps} fill="none" className="stroke-ink" strokeWidth={1.5} strokeDasharray="6 4" />
              {phases.map((p) => (
                <text key={p.fromWeek} x={edge((p.fromWeek - 1) * 7) + 4} y={y(p.limit) - 7} className={`${axisText} fill-slate`}>
                  {narrow ? `${p.limit}%` : `${p.limit}% · ${p.label}`}
                </text>
              ))}

              <path ref={lineRef} pathLength={1} d={line} fill="none" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" className="stroke-blue" />
              {!narrow && days.map((v, i) => !isOver(i) && <circle key={i} cx={x(i)} cy={y(v)} r={2.5} className="fill-blue" />)}
              {days.map((v, i) => isOver(i) && <circle key={i} cx={x(i)} cy={y(v)} r={4.5} strokeWidth={2} className="fill-danger stroke-white" />)}

              {Array.from({ length: weeks }, (_, w) => (
                <text key={w} x={edge(w * 7 + 3.5)} y={margin.top + plotHeight + 18} textAnchor="middle" className={`${axisText} fill-slate`}>
                  {narrow ? `W${w + 1}` : `Week ${w + 1}`}
                </text>
              ))}

              {active !== null && (
                <g>
                  <line x1={x(active)} x2={x(active)} y1={margin.top} y2={margin.top + plotHeight} className="stroke-ink/40" strokeWidth={1} shapeRendering="crispEdges" />
                  <circle cx={x(active)} cy={y(days[active])} r={4.5} strokeWidth={2} className={`${isOver(active) ? "fill-danger" : "fill-blue"} stroke-white`} />
                </g>
              )}

              <rect x={margin.left} y={0} width={plotWidth} height={margin.top + plotHeight} fill="transparent" className="cursor-crosshair" />
            </svg>

            {active !== null && (
              <Tooltip
                heading={dayName(active)}
                rows={[
                  { id: "peak", kind: "peak", value: `${days[active]}% BW`, label: isOver(active) ? "Daily peak, over" : "Daily peak" },
                  { id: "limit", kind: "limit", value: `${phaseOn(active).limit}% BW`, label: `Restriction, ${phaseOn(active).label.toLowerCase()}` },
                ]}
                left={x(active)}
                width={plotWidthPx}
                top={margin.top}
                narrow={narrow}
              />
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {active === null ? "" : `${dayName(active)}. Daily peak ${days[active]}% body weight, restriction ${phaseOn(active).limit}%.`}
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate">
            <LegendItem label="Daily peak load">
              <LineKey kind="peak" />
            </LegendItem>
            <LegendItem label="Prescribed restriction">
              <LineKey kind="limit" />
            </LegendItem>
            <LegendItem label="Day over restriction">
              <span className="size-2.5 rounded-full bg-danger" />
            </LegendItem>
            <LegendItem label="Planned">
              <span className="size-3 rounded-[3px] bg-fog ring-1 ring-hair ring-inset" />
            </LegendItem>
          </ul>
          <div className="sr-only">
            <table>
              <caption>Daily peak load and restriction, sample data</caption>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Peak (% BW)</th>
                  <th scope="col">Restriction (% BW)</th>
                </tr>
              </thead>
              <tbody>
                {days.map((v, i) => (
                  <tr key={i}>
                    <th scope="row">{dayName(i)}</th>
                    <td>{v}</td>
                    <td>{phaseOn(i).limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </figure>
  );
}

type TooltipRow = { id: string; kind: KeyKind; value: string; label: string };

function Tooltip({
  heading,
  rows,
  left,
  width,
  top,
  narrow,
}: {
  heading: string;
  rows: ReadonlyArray<TooltipRow>;
  left: number;
  width: number;
  top: number;
  narrow: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const box = element.offsetWidth;
    const scale = element.parentElement ? element.parentElement.clientWidth / width : 1;
    const anchor = left * scale;
    const room = width * scale;
    // On phones the finger covers the plot, so the readout sits above it instead of beside the crosshair.
    const x = narrow ? clamp(anchor - box / 2, 0, room - box) : anchor + 12 + box <= room ? anchor + 12 : anchor - 12 - box;
    element.style.left = `${x}px`;
    element.style.top = narrow ? `${top - element.offsetHeight - 8}px` : `${top}px`;
  }, [left, width, top, narrow, heading]);

  return (
    <div ref={ref} className="pointer-events-none absolute top-0 left-0 z-10 w-max rounded-lg border border-hair bg-white px-3 py-2.5 shadow-preview">
      <p className={`${type.label} text-mute`}>{heading}</p>
      <ul className="mt-1.5 space-y-1">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-2 text-sm">
            <LineKey kind={row.kind} />
            <span className="font-semibold text-ink tabular-nums">{row.value}</span>
            <span className="text-slate">{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LineKey({ kind }: { kind: KeyKind }) {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true" className="shrink-0">
      {kind === "limit" ? (
        <line x1="0" x2="16" y1="4" y2="4" strokeWidth="1.5" strokeDasharray="4 3" className="stroke-ink" />
      ) : (
        <line x1="1" x2="15" y1="4" y2="4" strokeWidth="2" strokeLinecap="round" className="stroke-blue" />
      )}
    </svg>
  );
}

function LegendItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden="true" className="flex w-4 justify-center">
        {children}
      </span>
      {label}
    </li>
  );
}

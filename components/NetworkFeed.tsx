"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "on" | "off";

const dot: Record<Tone, string> = {
  on: "bg-emerald-500",
  off: "bg-rose-400",
};

const rows: { label: string; status: string; tone: Tone }[] = [
  { label: "Backups", status: "7 days", tone: "on" },
  { label: "Landing services", status: "Allowed", tone: "on" },
  { label: "Internet", status: "No route", tone: "off" },
];

const stepMs = 1000;

const rowSlotRem = 2.25;

export default function NetworkFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setShown(rows.length);
          return;
        }
        for (let count = 2; count <= rows.length; count++) {
          timers.push(setTimeout(() => setShown(count), stepMs * (count - 1)));
        }
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-[88%] max-w-64 text-left"
      style={{ height: `${rows.length * rowSlotRem}rem` }}
    >
      <ul>
        {rows
          .slice(0, shown)
          .reverse()
          .map(({ label, status, tone }) => (
            <li key={label} className="grid grid-rows-[1fr] motion-safe:animate-feed-row">
              <div className="min-h-0 pb-1.5">
                <div className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-ink/12 bg-white px-2.5 py-1.5 text-xs leading-4 motion-safe:animate-feed-card">
                  <span className={`size-1.5 shrink-0 rounded-full ${dot[tone]}`} />
                  <span className="font-medium">{label}</span>
                  <span className="ml-auto">{status}</span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

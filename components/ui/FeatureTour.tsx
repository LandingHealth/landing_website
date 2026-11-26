"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { focusRing, type } from "@/lib/site";

export type Feature = {
  id: string;
  menuLabel: string;
  title: string;
  body: string;
  capabilities?: readonly string[];
  demo: ReactNode;
};

export default function FeatureTour({ features, label = "Features" }: { features: readonly Feature[]; label?: string }) {
  const [activeId, setActiveId] = useState(features[0].id);
  const menu = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // A thin band just above the viewport middle: the feature crossing it is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const { id } of features) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [features]);

  useEffect(() => {
    const list = menu.current;
    const item = list?.querySelector<HTMLElement>(`[data-feature="${activeId}"]`);
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: item.offsetLeft - 48, behavior: smooth ? "smooth" : "auto" });
  }, [activeId]);

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-x-10">
      <nav
        aria-label={label}
        className="sticky top-16 z-10 -mx-4 bg-fog px-4 py-3 sm:-mx-10 sm:px-10 lg:top-24 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
      >
        <ul ref={menu} className="relative flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible">
          {features.map(({ id, menuLabel }) => {
            const active = id === activeId;
            return (
              <li key={id} data-feature={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(id)}
                  className={`block rounded-[4px] px-3 py-2 text-[15px] font-medium whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none lg:rounded-none lg:border-b lg:px-0 lg:py-3.5 lg:text-base lg:whitespace-normal ${focusRing} ${
                    active
                      ? "bg-blue text-white lg:border-blue lg:bg-transparent lg:text-blue"
                      : "bg-white text-slate lg:border-hair lg:bg-transparent lg:text-mute lg:hover:text-ink"
                  }`}
                >
                  {menuLabel}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-8 flex flex-col gap-16 lg:col-span-3 lg:mt-0 lg:gap-10">
        {features.map(({ id, title, body, capabilities, demo }) => (
          <article
            key={id}
            id={id}
            aria-labelledby={`${id}-title`}
            className={`grid scroll-mt-32 items-center gap-6 transition-opacity duration-500 motion-reduce:transition-none lg:scroll-mt-24 lg:grid-cols-3 lg:gap-10 ${
              id === activeId ? "" : "lg:opacity-30"
            }`}
          >
            <div className="lg:order-2">
              <h3 id={`${id}-title`} className={type.h3}>{title}</h3>
              <p className={`${type.body} mt-3`}>{body}</p>
              {capabilities && (
                <ul className="mt-5 border-t border-hair">
                  {capabilities.map((capability) => (
                    <li key={capability} className="border-b border-hair py-2.5 text-[15px] leading-[1.4] text-slate">
                      {capability}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="order-first lg:order-1 lg:col-span-2">{demo}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

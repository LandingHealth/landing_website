"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import InDevelopment from "@/components/ui/InDevelopment";
import { focusRing, type } from "@/lib/site";

export type Feature = {
  id: string;
  menuLabel: string;
  title: string;
  body: string;
  capabilities?: readonly string[];
  inDevelopment?: readonly string[];
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
        <ul ref={menu} className="relative -mx-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)] [scrollbar-width:none] sm:-mx-10 sm:px-10 sm:[mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:[mask-image:none]">
          {features.map(({ id, menuLabel }) => {
            const active = id === activeId;
            return (
              <li key={id} data-feature={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(id)}
                  className={`${type.small} block rounded-[4px] px-3 py-2 font-medium whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none lg:rounded-none lg:border-b lg:px-0 lg:py-3.5 lg:text-base lg:whitespace-normal ${focusRing} ${
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
        {features.map(({ id, title, body, capabilities, inDevelopment, demo }) => (
          <article
            key={id}
            id={id}
            aria-labelledby={`${id}-title`}
            className="grid scroll-mt-32 items-center gap-6 lg:scroll-mt-24 lg:grid-cols-3 lg:gap-10"
          >
            <div className="text-center lg:order-2">
              <h3 id={`${id}-title`} className={type.h3}>{title}</h3>
              <p className={`${type.body} mx-auto mt-3`}>{body}</p>
              {capabilities && (
                <ul className="mt-5 border-t border-hair">
                  {capabilities.map((capability) => (
                    <li key={capability} className={`${type.small} border-b border-hair py-2.5 leading-[1.4] text-slate`}>
                      {capability}
                    </li>
                  ))}
                  {inDevelopment?.map((item) => (
                    <li key={item} className={`${type.small} flex items-start justify-center gap-2 border-b border-hair py-2.5 leading-[1.4] text-slate`}>
                      <InDevelopment />
                      {item}
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

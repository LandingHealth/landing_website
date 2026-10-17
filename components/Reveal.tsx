"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.motion) {
      // Content already on screen at hydration stays put; hiding it to fade back in reads as a flicker.
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) element.dataset.revealed = "";
      });
    }
    root.dataset.motion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

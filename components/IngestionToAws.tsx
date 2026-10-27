"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/components/ExpandableMedia";

const passes = 3;

export default function IngestionToAws({ video }: { video: Video }) {
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [plays, setPlays] = useState(0);
  const stage = plays < passes ? "video" : "logo";

  const play = () => player.current?.play().catch(() => setPlays(passes));

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlays(passes);
        else play();
        observer.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const onEnded = () => {
    setPlays(plays + 1);
    if (plays + 1 < passes) play();
  };

  return (
    <div ref={root} aria-hidden data-stage={stage} className="group relative size-full overflow-hidden rounded-xl bg-white">
      <video
        ref={player}
        className="absolute inset-0 size-full origin-[60%_50%] object-contain transition-[scale,opacity,filter] duration-700 ease-in group-data-[stage=logo]:scale-300 group-data-[stage=logo]:opacity-0 group-data-[stage=logo]:blur-sm motion-reduce:transition-none"
        poster={video.poster}
        src={video.src}
        onEnded={onEnded}
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 grid translate-x-[10%] scale-25 place-items-center opacity-0 transition-[translate,scale,opacity] delay-200 duration-700 ease-out group-data-[stage=logo]:translate-x-0 group-data-[stage=logo]:scale-100 group-data-[stage=logo]:opacity-100 motion-reduce:transition-none">
        <Image src="/security/powered-by-aws.png" alt="" width={200} height={72} className="h-auto w-32" />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/components/ExpandableMedia";

const passes = 2;
const switchMs = 3500;

export default function IngestionToAws({ video }: { video: Video }) {
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const plays = useRef(0);
  const [flips, setFlips] = useState(0);
  const stage = flips % 2 === 0 ? "video" : "logo";

  const play = () => player.current?.play().catch(() => {});

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setFlips(1);
          return;
        }
        play();
        timer = setInterval(() => setFlips((count) => count + 1), switchMs);
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (flips === 0 || stage !== "video" || !player.current) return;
    plays.current = 0;
    player.current.currentTime = 0;
    play();
  }, [flips, stage]);

  const onEnded = () => {
    plays.current += 1;
    if (plays.current < passes) play();
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

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/components/ExpandableMedia";

const holdMs = { video: 4000, logo: 2500 } as const;
type Face = keyof typeof holdMs;

const face = "absolute inset-0 rounded-xl backface-hidden";

export default function IngestionFlip({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [showing, setShowing] = useState<Face>("video");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const player = ref.current;
    if (showing === "video" && player) {
      player.currentTime = 0;
      player.play().catch(() => {});
    }
    const timeout = setTimeout(() => setShowing(showing === "video" ? "logo" : "video"), holdMs[showing]);
    return () => clearTimeout(timeout);
  }, [showing]);

  return (
    <div aria-hidden className="size-full perspective-distant">
      <div
        data-face={showing}
        className="relative size-full transform-3d transition-transform duration-700 ease-in-out data-[face=logo]:rotate-y-180"
      >
        <video
          ref={ref}
          className={`${face} size-full object-contain`}
          poster={video.poster}
          src={video.src}
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className={`${face} flex rotate-y-180 items-center justify-center bg-white`}>
          <Image src="/security/powered-by-aws.png" alt="" width={200} height={72} className="h-auto w-32" />
        </div>
      </div>
    </div>
  );
}

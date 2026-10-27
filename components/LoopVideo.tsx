"use client";

import { useEffect, useRef } from "react";

export default function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  return <video ref={ref} className={className} poster={poster} src={src} loop muted playsInline preload="metadata" aria-hidden />;
}

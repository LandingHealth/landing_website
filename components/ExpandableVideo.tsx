"use client";

import { startTransition, useEffect, useRef, useState, ViewTransition } from "react";

type Clip = { src: string; poster: string };

export default function ExpandableVideo({
  clips,
  title,
  className,
}: {
  clips: Clip[];
  title: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const { src, poster } = clips[index];
  const playlist = clips.length > 1;

  const toggle = () => startTransition(() => setExpanded((open) => !open));

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, [index]);

  useEffect(() => {
    if (!expanded) return;
    ref.current?.play().catch(() => {});
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") startTransition(() => setExpanded(false));
    };
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [expanded]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${expanded ? "Close" : "Expand"} ${title} video`}
        className={
          expanded
            ? "fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-black/70 [--margin:2rem] sm:[--margin:5rem]"
            : "block size-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        }
      >
        <ViewTransition default="none" update="video-expand">
          <video
            ref={ref}
            className={
              expanded
                ? "aspect-(--ratio) w-[min(100vw-var(--margin),(100dvh-var(--margin))*var(--ratio))] rounded-xl object-contain"
                : "size-full rounded-xl object-contain"
            }
            poster={poster}
            src={src}
            loop={!playlist}
            onEnded={() => setIndex((current) => (current + 1) % clips.length)}
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        </ViewTransition>
      </button>
    </div>
  );
}

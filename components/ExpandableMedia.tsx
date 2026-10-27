"use client";

import Image from "next/image";
import { type CSSProperties, startTransition, useEffect, useRef, useState, ViewTransition } from "react";

export type Video = { src: string; poster: string };
export type Photo = { src: string; alt: string; width: number; height: number; focus?: string };
type Media = { video: Video } | { image: Photo };

const button = {
  open: "fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-black/70 [--margin:2rem] sm:[--margin:5rem]",
  closed:
    "block size-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
};
const expandedSize = "aspect-(--ratio) w-[min(100vw-var(--margin),(100dvh-var(--margin))*var(--ratio))] rounded-xl object-contain";

export default function ExpandableMedia({
  media,
  title,
  className,
}: {
  media: Media;
  title: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => startTransition(() => setExpanded((open) => !open));

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

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

  const label = `${expanded ? "Close" : "Expand"} ${title} ${"video" in media ? "video" : "image"}`;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={expanded ? button.open : button.closed}
      >
        <ViewTransition default="none" update="media-expand">
          {"video" in media ? (
            <video
              ref={ref}
              className={expanded ? expandedSize : "size-full rounded-xl object-contain"}
              poster={media.video.poster}
              src={media.video.src}
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden
            />
          ) : (
            <Image
              src={media.image.src}
              alt={media.image.alt}
              width={media.image.width}
              height={media.image.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className={expanded ? expandedSize : "size-full rounded-xl object-cover"}
              style={
                expanded
                  ? ({ "--ratio": `${media.image.width}/${media.image.height}` } as CSSProperties)
                  : { objectPosition: media.image.focus }
              }
            />
          )}
        </ViewTransition>
      </button>
    </div>
  );
}

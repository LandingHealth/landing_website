"use client";

import { type CSSProperties, type ReactNode, startTransition, useEffect, useRef, useState } from "react";
import ExpandableMedia, { type Photo, type Video } from "@/components/ExpandableMedia";
import { edgePad } from "@/lib/site";

export type Tile = { title: string; text?: string } & (
  | { video: Video; image?: never; art?: never }
  | { image: Photo; video?: never; art?: never }
  | { video?: never; image?: never; art?: ReactNode }
);

export type Tiles = readonly [Tile, Tile, Tile] | readonly [Tile, Tile, Tile, Tile];

const columns = { 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

const tourStepMs = 5000;

const nextMedia = (tiles: Tiles, from: number) => tiles.findIndex((tile, i) => i > from && (tile.video || tile.image));

const frame = "aspect-(--ratio) w-full rounded-xl bg-mist ring-1 ring-black";

export default function TileRow({
  tiles,
  ratio = "1920/1094",
  className = "",
  tour = false,
}: {
  tiles: Tiles;
  ratio?: string;
  className?: string;
  tour?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [phase, setPhase] = useState<"waiting" | "running" | "over">(tour ? "waiting" : "over");

  const show = (index: number | null, next: "running" | "over") =>
    startTransition(() => {
      setOpen(index);
      setPhase(next);
    });

  useEffect(() => {
    const root = rootRef.current;
    if (phase !== "waiting" || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        show(nextMedia(tiles, -1), "running");
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [phase, tiles]);

  useEffect(() => {
    if (phase !== "running" || open === null) return;
    const timer = setTimeout(() => {
      const next = nextMedia(tiles, open);
      show(next < 0 ? null : next, next < 0 ? "over" : "running");
    }, tourStepMs);
    return () => clearTimeout(timer);
  }, [phase, open, tiles]);

  return (
    <div
      ref={rootRef}
      className={`grid gap-x-3 gap-y-12 ${edgePad} ${columns[tiles.length]} ${className}`}
      style={{ "--ratio": ratio } as CSSProperties}
    >
      {tiles.map(({ title, text, video, image, art }, i) => {
        const media = video ? { video } : image ? { image } : null;
        return (
          <article key={title} className="text-center">
            {media ? (
              <ExpandableMedia
                media={media}
                title={title}
                className={frame}
                expanded={open === i}
                onExpandedChange={(expanded) => show(expanded ? i : null, "over")}
              />
            ) : (
              <div className={`flex items-center justify-center ${frame}`}>{art}</div>
            )}
            <h3 className="mt-4 text-[15px] font-medium leading-snug">{title}</h3>
            {text && <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>}
          </article>
        );
      })}
    </div>
  );
}

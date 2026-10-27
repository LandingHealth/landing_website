import type { CSSProperties, ReactNode } from "react";
import ExpandableMedia, { type Photo, type Video } from "@/components/ExpandableMedia";
import { edgePad } from "@/lib/site";

export type Tile = { title: string; text?: string } & (
  | { video: Video; image?: never; art?: never }
  | { image: Photo; video?: never; art?: never }
  | { video?: never; image?: never; art?: ReactNode }
);

export type Tiles = readonly [Tile, Tile, Tile] | readonly [Tile, Tile, Tile, Tile];

const columns = { 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

const frame = "aspect-(--ratio) w-full rounded-xl bg-mist ring-1 ring-black";

export default function TileRow({
  tiles,
  ratio = "1920/1094",
  className = "",
}: {
  tiles: Tiles;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-x-3 gap-y-12 ${edgePad} ${columns[tiles.length]} ${className}`}
      style={{ "--ratio": ratio } as CSSProperties}
    >
      {tiles.map(({ title, text, video, image, art }) => {
        const media = video ? { video } : image ? { image } : null;
        return (
          <article key={title} className="text-center">
            {media ? (
              <ExpandableMedia media={media} title={title} className={frame} />
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

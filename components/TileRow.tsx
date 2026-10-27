import Image from "next/image";
import ExpandableVideo from "@/components/ExpandableVideo";

type Video = { src: string; poster: string };
type Photo = { src: string; alt: string; width: number; height: number };

export type Tile = { title: string; text?: string } & (
  | { video: Video; image?: never }
  | { image: Photo; video?: never }
  | { video?: never; image?: never }
);

export type Tiles = readonly [Tile, Tile, Tile] | readonly [Tile, Tile, Tile, Tile];

const columns = { 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

const tile = "w-full rounded-xl bg-mist ring-1 ring-black";
const framed = `[--ratio:1920/1094] aspect-(--ratio) ${tile}`;

export default function TileRow({ tiles, className = "" }: { tiles: Tiles; className?: string }) {
  return (
    <div className={`grid gap-x-3 gap-y-12 px-6 ${columns[tiles.length]} lg:px-4 ${className}`}>
      {tiles.map(({ title, text, video, image }) => (
        <article key={title}>
          {video ? (
            <ExpandableVideo src={video.src} poster={video.poster} title={title} className={framed} />
          ) : image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={`aspect-3/2 h-auto object-cover ${tile}`}
            />
          ) : (
            <div className={framed} />
          )}
          <h3 className="mt-4 text-[15px] font-medium leading-snug">{title}</h3>
          {text && <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>}
        </article>
      ))}
    </div>
  );
}

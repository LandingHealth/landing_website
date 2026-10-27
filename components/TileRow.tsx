import ExpandableVideo from "@/components/ExpandableVideo";

export type Tile = { title: string; text: string; video?: { src: string; poster: string } };

const tile = "[--ratio:1920/1094] aspect-(--ratio) w-full rounded-xl bg-mist";

export default function TileRow({ tiles, className = "" }: { tiles: ReadonlyArray<Tile>; className?: string }) {
  return (
    <div className={`grid gap-x-3 gap-y-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-4 ${className}`}>
      {tiles.map(({ title, text, video }) => (
        <article key={title}>
          {video ? (
            <ExpandableVideo src={video.src} poster={video.poster} title={title} className={tile} />
          ) : (
            <div className={tile} />
          )}
          <h3 className="mt-4 text-[15px] font-medium leading-snug">{title}</h3>
          <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>
        </article>
      ))}
    </div>
  );
}

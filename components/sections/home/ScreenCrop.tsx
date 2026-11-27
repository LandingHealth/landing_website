import Image from "next/image";

export type Crop = {
  src: string;
  alt: string;
  width: number;
  height: number;
  region: { x: number; y: number; w: number; h: number };
};

// Shows one region of a full app screenshot, scaled to fill the box, so a detail reads at card size.
export default function ScreenCrop({ src, alt, width, height, region }: Crop) {
  const { x, y, w, h } = region;
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-preview max-sm:shadow-none" style={{ aspectRatio: `${w}/${h}` }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="absolute h-auto max-w-none"
        style={{ width: `${(width / w) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
      />
    </div>
  );
}

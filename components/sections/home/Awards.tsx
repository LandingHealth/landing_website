import Image from "next/image";
import Marquee from "@/components/Marquee";
import { type } from "@/lib/site";

export const awards = [
  { name: "America250", src: "/awards/america250.svg", aspectRatio: 4.471 },
  { name: "TEDCO", src: "/awards/tedco.png", aspectRatio: 2.713 },
  { name: "Johns Hopkins University", src: "/awards/johns-hopkins.png", aspectRatio: 4.115 },
  { name: "Johns Hopkins Pava Center", src: "/awards/pava-center.svg", aspectRatio: 0.896 },
  { name: "Baylor University", src: "/awards/baylor.svg", aspectRatio: 5.449 },
  { name: "TCU", src: "/awards/tcu.svg", aspectRatio: 2.047 },
  { name: "Duquesne University", src: "/awards/duquesne.png", aspectRatio: 3.576 },
  { name: "Sasin School of Management, Chulalongkorn University", src: "/awards/sasin.svg", aspectRatio: 7.23 },
  { name: "KBank", src: "/awards/kbank.svg", aspectRatio: 4.056 },
  { name: "London Business School", src: "/awards/london-business-school.svg", aspectRatio: 1 },
  { name: "University of Manitoba", src: "/awards/university-of-manitoba.svg", aspectRatio: 2.066 },
  { name: "U.S. National Science Foundation", src: "/awards/nsf.png", aspectRatio: 0.999 },
  { name: "O’Shaughnessy Ventures", src: "/awards/oshaughnessy-ventures.svg", aspectRatio: 3.192 },
  { name: "FOX45 Baltimore", src: "/awards/fox45.svg", aspectRatio: 2.201 },
] as const satisfies ReadonlyArray<{ name: string; src: string; aspectRatio: number }>;

// Equal visual weight: a wide wordmark gets less height than a square seal.
const logoWeight = 62;

function logoSize(aspectRatio: number) {
  const height = Math.min(52, Math.max(24, Math.round(logoWeight / Math.sqrt(aspectRatio))));
  return { height, width: Math.round(height * aspectRatio) };
}

export default function Awards() {
  return (
    <div>
      <h2 className={`${type.label} text-center text-slate`}>Awarded by</h2>
      <Marquee className="mt-7 [--gap:2rem] sm:[--gap:3rem]">
        {awards.map(({ name, src, aspectRatio }) => {
          const { width, height } = logoSize(aspectRatio);
          return (
            <li key={name} className="flex shrink-0 items-center">
              <Image src={src} alt={name} width={width} height={height} loading="eager" className="grayscale" />
            </li>
          );
        })}
      </Marquee>
    </div>
  );
}

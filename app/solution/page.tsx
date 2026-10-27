import type { Metadata } from "next";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

const summary =
  "Movement changes with every step. Healing unfolds over weeks. SafeSock measures the mechanics to help connect the two.";

export const metadata: Metadata = {
  title: "Solution | Landing",
  description: summary,
};

const timescales: Tiles = [
  {
    title: "Physics",
    text: "The fast one is mechanics. Each step of gait brings ground reaction forces and moments, joint angles, and vertical load. Physics already models it well. All three of our founding engineers studied in the world’s top-ranked biomedical engineering program. Two of them helped train a dual-path, attention-guided deep learning model to predict gait cycle data.",
    image: {
      src: "/solution/mechanics-plate.jpg",
      alt: "An 1816 engraving of the mechanical powers, with screws, presses, pulleys, and force diagrams",
      width: 1600,
      height: 2123,
      focus: "50% 46%",
    },
  },
  {
    title: "Biology",
    text: "The slow one is biology: healing, remodeling, and strength gain. Nobody models it well, because nobody has measured it. Our team includes a Penn ELITE Fellow, one of about three people the University of Pennsylvania’s health-tech fellowship picks each year.",
    image: {
      src: "/solution/vitruvian-man.jpg",
      alt: "Leonardo da Vinci’s Vitruvian Man, a figure with outstretched arms and legs inside a circle and a square",
      width: 1600,
      height: 2234,
      focus: "50% 30%",
    },
  },
  {
    title: "SafeSock",
    text: "A sensor sleeve we’re designing to measure load with every step, across the weeks of healing. Our engineers bring the gait modeling, and our fellow brings the training to move a health device from the lab to patients.",
    video: { src: "/safesock-demo.mp4", poster: "/safesock-demo-poster.jpg" },
  },
];

export default function SolutionPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Two timescales. One recovery.</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>{summary}</p>
        </div>
        <TileRow tiles={timescales} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

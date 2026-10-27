import type { Metadata } from "next";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Landing",
  description: "Meet Akash and Neil, the cofounders of Landing.",
};

const cofounders: Tiles = [
  {
    title: "Akash’s femur fracture",
    image: {
      src: "/about/akash-femur-fracture.jpg",
      alt: "Akash on a hospital bed with his leg in a traction splint, giving a thumbs up",
      width: 960,
      height: 640,
    },
  },
  {
    title: "Neil’s tib-fib fracture",
    image: {
      src: "/about/neil-tib-fib-fracture.jpg",
      alt: "Neil’s leg wrapped in bandages, resting on pillows",
      width: 1197,
      height: 798,
    },
  },
  {
    title: "Neil’s X-ray",
    image: {
      src: "/about/neil-x-ray.jpg",
      alt: "X-rays of Neil’s fractured right tibia and fibula",
      width: 1053,
      height: 702,
    },
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet our cofounders</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>Akash and Neil</p>
        </div>
        <TileRow tiles={cofounders} ratio="3/2" className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

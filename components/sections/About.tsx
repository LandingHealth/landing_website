import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

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

const story = [
  "Akash broke his femur. Neil broke his tibia and fibula. Both of us went through physical therapy to walk again, and most of that recovery happened outside the clinic.",
  "Between appointments we had questions and nobody to ask. Our physical therapists saw us for an hour, then had little idea what happened at home until the next visit.",
  "We built Landing to connect those parts of care. Patients record their home exercises, their PT reviews what needs attention, and the next visit starts with the full picture.",
] as const;

export default function AboutSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="about" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className={`${container} flex flex-col items-center text-center`}>
        <Heading className={`${type.h1} max-w-4xl`}>We built Landing after our own recoveries.</Heading>
        <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>Akash and Neil, cofounders</p>
      </div>
      <TileRow tiles={cofounders} ratio="3/2" className="mt-14 sm:mt-16" />
      <div className={`${container} mt-20 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-20`}>
        <div className="space-y-5 lg:col-span-7">
          <h2 className={type.h2}>Our story</h2>
          {story.map((text) => (
            <p key={text} className="max-w-prose text-[15px] leading-[1.65]">
              {text}
            </p>
          ))}
        </div>
        <figure className="lg:col-span-5">
          <video
            src="/about/clinic-visit.mp4"
            poster="/about/clinic-visit.jpg"
            controls
            playsInline
            preload="none"
            className="mx-auto aspect-9/16 w-full max-w-sm rounded-xl bg-black ring-1 ring-black"
          />
          <figcaption className="mt-3 text-center text-[13px]">
            Neil climbing a stair with his PT, three weeks after his fracture. Press play to watch.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

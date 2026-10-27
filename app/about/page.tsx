import type { Metadata } from "next";
import Icon from "@/components/Icon";
import LoopVideo from "@/components/LoopVideo";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, edgePad, type } from "@/lib/site";

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

const story = [
  {
    title: "The injuries",
    paragraphs: [
      "Akash broke his femur and Neil broke his tibia and fibula. Both of us went through physical therapy to walk again. As patients, we saw how much of recovery depends on what happens between visits.",
    ],
  },
  {
    title: "The bottleneck",
    paragraphs: [
      "We believe the biggest bottleneck to success in physical therapy isn’t the physical therapist, the patient, or the clinic owner. It’s the model of care around them and the workflow that connects them.",
      "Today’s model of care centers on the visit, but most of recovery happens between visits. The therapist sees the patient only in the clinic. The patient does home exercise alone, with no way to know if they’re doing it right. The clinic owner manages the schedule and billing in separate tools. Each of them does their part, and none of them sees the whole recovery.",
    ],
  },
  {
    title: "Landing",
    paragraphs: [
      "Landing builds clinic software for a model of care that covers the whole recovery, not only the visit. The software keeps patient progress, home exercise, and daily operations in one place. When a patient records a home exercise, their therapist can review the video before the next visit.",
      "We’re also designing SafeSock, a sensor sleeve that shows how a patient bears weight between visits.",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet our cofounders</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>Akash and Neil</p>
        </div>
        <TileRow tiles={cofounders} ratio="3/2" className="mt-14 sm:mt-16" />
        <div className={`mt-20 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-24 lg:grid-cols-2`}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[15px]">Our story</p>
            <h2 className={`${type.h2} mt-4 max-w-xl`}>We built Landing after our own recoveries.</h2>
            <div className="mt-12 max-w-xl border-t border-black lg:mt-20">
              {story.map(({ title, paragraphs }, i) => (
                <details key={title} name="story" open={i === 0} className="group border-black/15 not-last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-xl font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                    {title}
                    <Icon name="plus" className="size-5 group-open:rotate-45" />
                  </summary>
                  <div className="max-w-lg space-y-4 pb-8 text-[15px] leading-[1.6]">
                    {paragraphs.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <LoopVideo
            src="/about/clinic-visit.mp4"
            poster="/about/clinic-visit.jpg"
            className="aspect-9/16 w-full rounded-xl bg-mist ring-1 ring-black"
          />
        </div>
      </section>
    </main>
  );
}

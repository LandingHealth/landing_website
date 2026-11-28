import ExpandableMedia, { type Photo } from "@/components/ExpandableMedia";
import DarkCard from "@/components/ui/DarkCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { safesock } from "@/lib/safesock";
import { contactEmail, contactHref, container, focusRing, type } from "@/lib/site";

const injury: ReadonlyArray<{ caption: string; photo: Photo }> = [
  {
    caption: "Neil’s leg after surgery",
    photo: {
      src: "/about/neil-tib-fib-fracture.jpg",
      alt: "Neil’s leg wrapped in bandages, resting on pillows",
      width: 1197,
      height: 798,
    },
  },
  {
    caption: "Neil’s X-ray, February 2025",
    photo: {
      src: "/about/neil-x-ray.jpg",
      alt: "X-rays of Neil’s fractured right tibia and fibula",
      width: 1053,
      height: 702,
    },
  },
];

const story = [
  "Neil broke the tibia and fibula in his right leg. His surgery went well, and so did his physical therapy.",
  "Between visits, though, nobody could tell him whether he was loading the leg the right way, so he guessed. His PT saw him for an hour at a time and had little idea what happened at home until the next visit.",
  "We built Landing to connect those parts of care. Patients record their home exercises, their PT reviews what needs attention, and the next visit starts with more context.",
] as const;

const buildingToward = [
  {
    title: "Home exercise a PT can see",
    body: "Patients record their sets at home, and Landing flags moments for the PT to check.",
  },
  {
    title: "Visits that start with context",
    body: "A brief before each visit, written from recent sessions and the PT’s notes.",
  },
  {
    title: "Load on the leg, measured",
    body: `SafeSock is a sensor sleeve we’re designing to show how much weight a patient puts on an injured leg between visits. ${safesock.status}`,
  },
] as const;

const links = [
  { title: "Careers", body: "We’re hiring for operations, sales, engineering and research. Every role is remote.", href: "/careers", action: "See open roles" },
  { title: "Contact", body: "Questions about Landing, a security review, or working with us. Email the team.", href: contactHref, action: contactEmail },
] as const;

const figureCaption = "mt-3 text-center text-sm text-slate";

export default function AboutSection() {
  return (
    <>
      <section className="pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-20">
        <div className={container}>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Company"
            title="We’re building the between‑visit layer for physical therapy"
            lead="Our goal is better outcomes from care that adjusts between visits, with less work for the people who deliver it."
          />
        </div>
      </section>

      <Sheet tone="white">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Our story" title="Recovery happens between visits." />
          <div className="mt-6 space-y-4">
            {story.map((text) => (
              <p key={text} className={`${type.body} mx-auto`}>{text}</p>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-[4fr_3fr] lg:mt-16 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6">
            {injury.map(({ caption, photo }) => (
              <figure key={photo.src}>
                <ExpandableMedia media={{ image: photo }} title={caption} className="aspect-[3/2] w-full rounded-3xl bg-fog [&>button]:rounded-3xl [&_img]:rounded-3xl" />
                <figcaption className={figureCaption}>{caption}</figcaption>
              </figure>
            ))}
          </div>
          <figure className="flex flex-col">
            <div className="relative aspect-9/16">
              <video
                src="/about/clinic-visit.mp4"
                poster="/about/clinic-visit.jpg"
                controls
                playsInline
                preload="none"
                className="absolute inset-0 size-full rounded-3xl bg-fog object-cover object-top"
              />
            </div>
            <figcaption className={figureCaption}>Neil climbing a stair with his PT, three weeks after his fracture.</figcaption>
          </figure>
        </div>
      </Sheet>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard
          eyebrow="What we’re building toward"
          title="Care that keeps going after the visit ends."
          body="Landing gathers what happens at home and handles the routine work. The PT makes the clinical calls."
          items={buildingToward}
        />
      </div>

      <section className={`${container} pb-16 lg:pb-20`}>
        <ul className="grid gap-x-10 border-t border-hair sm:grid-cols-2">
          {links.map(({ title, body, href, action }) => (
            <li key={title} className="border-b border-hair py-8 text-center sm:border-b-0">
              <h2 className={type.h3}>{title}</h2>
              <p className={`${type.body} mx-auto mt-3`}>{body}</p>
              <a href={href} className={`mt-5 inline-block rounded-sm font-medium text-blue underline-offset-4 hover:underline ${focusRing}`}>
                {action} <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

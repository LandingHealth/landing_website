import type { ReactNode } from "react";
import ExpandableMedia, { type Photo } from "@/components/ExpandableMedia";
import Awards from "@/components/sections/home/Awards";
import ScreenCrop from "@/components/sections/home/ScreenCrop";
import Eyebrow from "@/components/ui/Eyebrow";
import GradientFrame from "@/components/ui/GradientFrame";
import InDevelopment from "@/components/ui/InDevelopment";
import Sheet from "@/components/ui/Sheet";
import { safesock } from "@/lib/safesock";
import { contactEmail, contactHref, container, focusRing, type } from "@/lib/site";

type Moment = { label: string; text: string; media: ReactNode };

const photo = "aspect-[3/2] w-full rounded-3xl bg-fog [&>button]:rounded-3xl [&_img]:rounded-3xl";

const xray: Photo = {
  src: "/about/neil-x-ray.jpg",
  alt: "X-rays of Neil’s fractured right tibia and fibula",
  width: 1053,
  height: 702,
};

const leg: Photo = {
  src: "/about/neil-tib-fib-fracture.jpg",
  alt: "Neil’s leg wrapped in bandages, resting on pillows",
  width: 1197,
  height: 798,
};

const moments: ReadonlyArray<Moment> = [
  {
    label: "February 2025",
    text: "Neil broke the tibia and fibula in his right leg.",
    media: <ExpandableMedia media={{ image: xray }} title="Neil’s X-ray" className={photo} />,
  },
  {
    label: "After surgery",
    text: "His surgery went well, and so did his physical therapy.",
    media: <ExpandableMedia media={{ image: leg }} title="Neil’s leg after surgery" className={photo} />,
  },
  {
    label: "Three weeks after his fracture",
    text: "Neil climbing a stair with his PT.",
    media: (
      <div className="relative mx-auto aspect-9/16 w-full max-w-sm lg:mx-0">
        <video
          src="/about/clinic-visit.mp4"
          poster="/about/clinic-visit.jpg"
          controls
          playsInline
          preload="none"
          aria-label="Neil climbing a stair with his PT"
          className="absolute inset-0 size-full rounded-3xl bg-fog object-cover object-top"
        />
      </div>
    ),
  },
];

const building = [
  {
    title: "Home exercise a PT can see",
    body: "Patients record their sets at home, and Landing flags moments for the PT to check.",
  },
  {
    title: "Visits that start with context",
    body: "A brief before each visit, written from recent sessions and the PT’s notes.",
  },
] as const;

const column = "mx-auto w-full max-w-2xl";
const paragraph = `${type.prose} text-slate`;
const link = `rounded-sm font-medium text-blue underline-offset-4 hover:underline ${focusRing}`;

function Chapter({ index, title }: { index: string; title: string }) {
  return (
    <div data-reveal className={column}>
      <Eyebrow>{index}</Eyebrow>
      <h2 className={`${type.h2} mt-4`}>{title}</h2>
    </div>
  );
}

export default function VersionA() {
  return (
    <article>
      <header className={`${container} pt-16 pb-16 sm:pt-24 lg:pt-32 lg:pb-24`}>
        <div className="mx-auto max-w-4xl">
          <Eyebrow className="mb-6">Company</Eyebrow>
          <h1 className={`${type.h1} motion-safe:animate-rise`}>Recovery happens between visits.</h1>
          <p className={`${type.lead} mt-8 max-w-2xl text-pretty`}>
            Patients spend 98.8% of their week outside the clinic. We’re building the between‑visit layer for physical
            therapy.
          </p>
        </div>
      </header>

      <section aria-labelledby="gap" className={`${container} pb-20 lg:pb-28`}>
        <div data-reveal="line" className="mx-auto mb-16 max-w-4xl border-t border-hair lg:mb-20" />
        <div data-reveal className={`${column} space-y-6`}>
          <Eyebrow>I. The gap</Eyebrow>
          <h2 id="gap" className={type.h2}>Between visits, nobody measures it.</h2>
          <p className={paragraph}>{safesock.problem[0]}</p>
          <p className={paragraph}>
            The patient has to judge the load by feel, and the PT learns what happened from what the patient remembers
            at the next appointment.
          </p>
        </div>
      </section>

      <Sheet tone="fog" round="top" className="py-4 lg:py-8">
        <Chapter index="II. Neil’s recovery" title="One leg, three moments." />
        <ol className="mx-auto mt-14 max-w-5xl space-y-16 lg:mt-20 lg:space-y-24">
          {moments.map(({ label, text, media }) => (
            <li key={label} data-reveal className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
              <div className="lg:pt-2">
                <p className={`${type.label} text-slate`}>{label}</p>
                <p className={`${type.h3} mt-3 text-balance`}>{text}</p>
              </div>
              <figure>{media}</figure>
            </li>
          ))}
        </ol>
      </Sheet>

      <section aria-label="Pull quote" className="bg-fog">
        <div className={`${container} pt-8 pb-20 lg:pt-12 lg:pb-32`}>
          <figure data-reveal className="mx-auto max-w-4xl border-l-2 border-blue pl-6 sm:pl-10">
            <blockquote className={`${type.h1} italic`}>
              “Between visits, nobody could tell him whether he was loading the leg the right way, so he guessed.”
            </blockquote>
          </figure>
          <p data-reveal className={`${paragraph} ${column} mt-12 lg:mt-16`}>
            His PT saw him for an hour at a time and had little idea what happened at home until the next visit.
          </p>
        </div>
      </section>

      <section aria-labelledby="build" className={`${container} py-20 lg:py-28`}>
        <div data-reveal className={`${column} space-y-6`}>
          <Eyebrow>III. What we build</Eyebrow>
          <h2 id="build" className={type.h2}>We built Landing to connect those parts of care.</h2>
          <p className={paragraph}>
            Patients record their home exercises, their PT reviews what needs attention, and the next visit starts with
            more context.
          </p>
        </div>
        <figure data-reveal className="mx-auto mt-14 max-w-5xl lg:mt-20">
          <GradientFrame>
            <div className="w-full max-w-3xl">
              <ScreenCrop
                src="/workspace/exercise-review-flag.jpg"
                alt="A flagged knee valgus in the PT review screen, with Correct and Incorrect buttons and a comment to the patient"
                width={1314}
                height={984}
                region={{ x: 0, y: 0, w: 1314, h: 984 }}
              />
            </div>
          </GradientFrame>
          <figcaption className="mt-3 text-center text-sm text-slate">
            Recorded sets reach the PT’s review queue with possible form issues flagged.
          </figcaption>
        </figure>
        <div className={`${column} mt-14 space-y-10 lg:mt-20`}>
          {building.map(({ title, body }) => (
            <div key={title} data-reveal>
              <h3 className={type.h3}>{title}</h3>
              <p className={`${paragraph} mt-3`}>{body}</p>
            </div>
          ))}
          <div data-reveal>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className={type.h3}>Load on the leg, measured</h3>
              <InDevelopment />
            </div>
            <p className={`${paragraph} mt-3`}>
              SafeSock is a sensor sleeve we’re designing to show how much weight a patient puts on an injured leg
              between visits. {safesock.status}{" "}
              <a href="/safesock" className={link}>
                About SafeSock <span aria-hidden>→</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ahead" className={`${container} pb-20 lg:pb-28`}>
        <div data-reveal="line" className="mx-auto mb-16 max-w-4xl border-t border-hair lg:mb-20" />
        <div data-reveal className={`${column} space-y-6`}>
          <Eyebrow>IV. Where it’s going</Eyebrow>
          <h2 id="ahead" className={type.h2}>Care that keeps going after the visit ends.</h2>
          <p className={paragraph}>
            Landing gathers what happens at home and handles the routine work. The PT makes the clinical calls.
          </p>
          <p className={paragraph}>
            Our goal is better outcomes from care that adjusts between visits, with less work for the people who deliver
            it.
          </p>
        </div>
      </section>

      <Sheet tone="fog" round="top">
        <Awards />
      </Sheet>

      <section aria-labelledby="with-us" className="bg-fog">
        <div className={`${container} pb-20 lg:pb-28`}>
          <div data-reveal="line" className="mx-auto mb-14 max-w-4xl border-t border-hair [--reveal-mask:var(--color-fog)] lg:mb-16" />
          <div className={`${column} space-y-10`}>
            <h2 id="with-us" className={type.h3}>Work with us</h2>
            <p className={paragraph}>
              We’re hiring for operations, sales, engineering and research. Every role is remote.{" "}
              <a href="/careers" className={link}>
                See open roles <span aria-hidden>→</span>
              </a>
            </p>
            <p className={paragraph}>
              Questions about Landing, a security review, or working with us? Email the team at{" "}
              <a href={contactHref} className={link}>
                {contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

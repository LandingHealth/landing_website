import type { CSSProperties, ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import ExpandableMedia from "@/components/ExpandableMedia";
import Awards from "@/components/sections/home/Awards";
import HeroArcs from "@/components/sections/home/HeroArcs";
import ScreenCrop from "@/components/sections/home/ScreenCrop";
import SessionsSample from "@/components/sections/home/SessionsSample";
import CtaSheet from "@/components/ui/CtaSheet";
import DarkCard from "@/components/ui/DarkCard";
import GradientFrame from "@/components/ui/GradientFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { container, demo, demoHref, focusRing, type } from "@/lib/site";

type Feature = { id: "home-exercise" | "pt-review" | "progress"; title: string; body: string; link: string; visual: ReactNode; inDevelopment?: string };

const features: readonly Feature[] = [
  {
    id: "home-exercise",
    title: "Home exercise",
    body: "Patients follow the sessions you assign, with sets, reps, and your cues. Landing shows them how to film each set and asks about pain and difficulty before and after.",
    link: "See home exercise",
    visual: (
      <ScreenCrop
        src="/workspace/exercise-recording-plan.jpg"
        alt="A bodyweight squat in the patient app: 3 sets, 10 reps, 60 seconds rest, and a cue from the PT"
        width={1742}
        height={994}
        region={{ x: 556, y: 12, w: 628, h: 471 }}
      />
    ),
  },
  {
    id: "pt-review",
    title: "PT review",
    body: "Videos arrive in your review queue with possible form issues flagged. Mark each flag correct or incorrect, add one Landing missed, and choose whether your comment goes to the patient.",
    link: "See PT review",
    visual: (
      <ScreenCrop
        src="/workspace/exercise-review-app.jpg"
        alt="A flagged heel lift in the PT review screen, with Correct and Incorrect buttons and a comment to the patient"
        width={1482}
        height={994}
        region={{ x: 1010, y: 230, w: 464, h: 348 }}
      />
    ),
  },
  {
    id: "progress",
    title: "Progress and follow-up",
    body: "See each patient’s session history. Before each visit, Landing writes a brief from the patient’s history, recent sessions, and your notes.",
    link: "See progress and follow-up",
    inDevelopment: "Progress charts over time",
    visual: <SessionsSample />,
  },
];

const setupSteps = [
  {
    title: "We set up your clinic",
    body: "Send us the clinic’s name and each PT’s name and email. We add them, and each PT signs in from an invitation.",
  },
  {
    title: "Add your patients",
    body: "Add each patient with one short form, then assign their exercise sessions.",
  },
  {
    title: "Start reviewing",
    body: "Patients record their sessions at home, and their videos arrive in your review queue.",
  },
] as const;

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="relative pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-20">
        <HeroArcs />
        <div className={`${container} relative flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl motion-safe:animate-rise`}>Know what happened between visits.</h1>
          <p style={delay(120)} className={`${type.lead} mt-6 max-w-2xl text-pretty motion-safe:animate-rise`}>
            Landing is clinic software for physical therapy. Patients record their home exercises, PTs review what needs
            attention, and the next visit starts with more context.
          </p>
          <div
            style={delay(240)}
            className="mt-10 flex w-full max-w-sm flex-col gap-3 motion-safe:animate-rise sm:w-auto sm:max-w-none sm:flex-row"
          >
            <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
            <ButtonLink href="/product" variant="secondary">See the product</ButtonLink>
          </div>
        </div>
        <figure style={delay(380)} className={`${container} relative mt-14 motion-safe:animate-arrive sm:mt-18`}>
          <GradientFrame>
            <div className="w-full sm:hidden">
              <ScreenCrop
                src="/workspace/exercise-review-app.jpg"
                alt="A PT reviewing a flagged squat in Landing, with the flag timeline under the patient's video"
                width={1482}
                height={994}
                region={{ x: 380, y: 175, w: 630, h: 740 }}
              />
            </div>
            <ExpandableMedia
              media={{ video: { src: "/workspace/exercise-review-app.mp4", poster: "/workspace/exercise-review-app.jpg" } }}
              title="PT review"
              className="hidden aspect-[1482/994] w-full max-w-5xl rounded-xl bg-white shadow-preview sm:block"
            />
          </GradientFrame>
          <figcaption className="mt-3 text-center text-sm text-slate">
            A PT reviewing a flagged squat in Landing, recorded with a sample patient.
          </figcaption>
        </figure>
      </section>

      <Sheet tone="fog" round="top">
        <SectionHeading
          eyebrow="Product"
          align="split"
          title="From the home session to the next visit."
          lead="Three parts of Landing work together between appointments."
        />
        <div className="mt-12 grid gap-x-10 gap-y-14 lg:mt-16 lg:grid-cols-3">
          {features.map(({ id, title, body, link, visual, inDevelopment }) => (
            <article key={id} aria-labelledby={`${id}-title`} data-reveal className="flex flex-col">
              <GradientFrame size="md">
                <div className="aspect-[4/3] w-full">{visual}</div>
              </GradientFrame>
              <h3 id={`${id}-title`} className={`${type.h3} mt-8`}>{title}</h3>
              <p className={`${type.body} mt-3`}>{body}</p>
              {inDevelopment && (
                <p className="mt-4 flex items-center gap-2 text-[15px] text-ink">
                  <span className={`${type.label} rounded-[4px] bg-blue/10 px-1.5 py-0.5 text-blue`}>In development</span>
                  {inDevelopment}
                </p>
              )}
              <a
                href={`/product#${id}`}
                className={`mt-5 self-start rounded-sm font-medium text-blue underline-offset-4 hover:underline ${focusRing}`}
              >
                {link} <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </Sheet>

      <Sheet tone="white" round="top">
        <Awards />
      </Sheet>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard
          eyebrow="Getting started"
          title="Setting up your clinic."
          body="Landing runs in the browser alongside the EHR you already use. Your EHR stays your system of record."
          items={setupSteps}
          action={{ label: "See how setup works", href: "/getting-started" }}
        />
      </div>

      <CtaSheet heading="See how Landing fits your clinic." lead={demo.sees} />
    </main>
  );
}

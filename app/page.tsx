import type { CSSProperties, ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import ExpandableMedia from "@/components/ExpandableMedia";
import Awards from "@/components/sections/home/Awards";
import HeroArcs from "@/components/sections/home/HeroArcs";
import ScreenCrop from "@/components/sections/home/ScreenCrop";
import DarkCard from "@/components/ui/DarkCard";
import GradientFrame from "@/components/ui/GradientFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { container, demoHref, focusRing, type } from "@/lib/site";

type Feature = { id: "home-exercise" | "pt-review" | "progress"; title: string; body: string; link: string; visual: ReactNode };

const features: readonly Feature[] = [
  {
    id: "home-exercise",
    title: "Home exercise",
    body: "Patients complete the sessions you prescribe, with your sets, reps, and cues. Landing guides each recording and collects pain and difficulty ratings.",
    link: "See home exercise",
    visual: (
      <ScreenCrop
        src="/workspace/exercise-squat.jpg"
        alt="A bodyweight squat in the patient app: 3 sets, 10 reps, 60 seconds rest, and a cue from the PT"
        width={1467}
        height={1098}
        region={{ x: 0, y: 0, w: 1467, h: 1098 }}
      />
    ),
  },
  {
    id: "pt-review",
    title: "PT review",
    body: "Recorded sets reach your review queue with possible form issues flagged. Confirm or dismiss each flag, add your own, and choose what the patient sees.",
    link: "See PT review",
    visual: (
      <ScreenCrop
        src="/workspace/exercise-review-flag.jpg"
        alt="A flagged knee valgus in the PT review screen, with Correct and Incorrect buttons and a comment to the patient"
        width={1314}
        height={984}
        region={{ x: 0, y: 0, w: 1314, h: 984 }}
      />
    ),
  },
  {
    id: "progress",
    title: "Progress and follow-up",
    body: "Track each patient’s session history and progress over time. Before every visit, Landing prepares a brief from their history, recent sessions, and your notes.",
    link: "See progress and follow-up",
    visual: (
      <ScreenCrop
        src="/workspace/progress-sessions.jpg"
        alt="The patient app's session list: two sessions coming up and a completed session with new feedback from the PT"
        width={1545}
        height={1158}
        region={{ x: 0, y: 0, w: 1545, h: 1158 }}
      />
    ),
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
          <h1 className={`${type.h1} max-w-4xl motion-safe:animate-rise`}>Turn home exercise into a new revenue stream</h1>
          <p style={delay(120)} className={`${type.lead} mt-6 max-w-2xl text-pretty motion-safe:animate-rise`}>
            Patients spend 98.8% of their week outside the clinic. Landing turns that time into reviewed home exercise
            you can bill for.
          </p>
          <div
            data-header-cta
            style={delay(240)}
            className="mt-10 flex w-full max-w-sm flex-col gap-3 motion-safe:animate-rise sm:w-auto sm:max-w-none sm:flex-row"
          >
            <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
            <ButtonLink href="/product" variant="secondary">See the product</ButtonLink>
          </div>
        </div>
        <figure style={delay(380)} className={`${container} relative mt-14 motion-safe:animate-arrive max-sm:mt-10 max-sm:px-6 sm:mt-18`}>
          <GradientFrame className="max-sm:rounded-xl max-sm:border-edge max-sm:bg-frame-glow max-sm:p-6">
            <ExpandableMedia
              media={{
                video: {
                  src: "/workspace/exercise-review-app.mp4",
                  phoneSrc: "/workspace/exercise-review-app-phone.mp4",
                  poster: "/workspace/exercise-review-app.jpg",
                },
              }}
              title="PT review"
              className="aspect-[1482/994] w-full max-w-5xl rounded-xl bg-white shadow-preview max-sm:overflow-hidden max-sm:rounded-[10px] max-sm:shadow-none"
            />
          </GradientFrame>
        </figure>
      </section>

      <Sheet tone="fog" round="top">
        <SectionHeading align="center" title="From the home session to the next visit." />
        <div className="mt-12 grid gap-x-10 gap-y-14 lg:mt-16 lg:grid-cols-3">
          {features.map(({ id, title, body, link, visual }) => (
            <article key={id} aria-labelledby={`${id}-title`} data-reveal className="flex flex-col text-center">
              <GradientFrame size="md">
                <div className="aspect-[4/3] w-full">{visual}</div>
              </GradientFrame>
              <h3 id={`${id}-title`} className={`${type.h3} mt-8`}>{title}</h3>
              <p className={`${type.body} mt-3`}>{body}</p>
              <p className="mt-auto pt-5">
                <a
                  href={`/product#${id}`}
                  className={`rounded-sm font-medium text-blue underline-offset-4 hover:underline ${focusRing}`}
                >
                  {link} <span aria-hidden>→</span>
                </a>
              </p>
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
    </main>
  );
}

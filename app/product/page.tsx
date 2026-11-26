import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import { ProgressPreview } from "@/components/DashboardPreview";
import DemoVideo from "@/components/sections/product/DemoVideo";
import MovedSections from "@/components/sections/product/MovedSections";
import CtaSheet from "@/components/ui/CtaSheet";
import Eyebrow from "@/components/ui/Eyebrow";
import FeatureTour, { type Feature } from "@/components/ui/FeatureTour";
import GradientFrame from "@/components/ui/GradientFrame";
import NumberedRows from "@/components/ui/NumberedRows";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { demo, demoHref, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product | Landing",
  description:
    "See how Landing works between visits. Patients record home exercise, PTs review flagged moments, and the next visit starts with a brief.",
};

const workflow = [
  { title: "At home", body: "Patients follow the exercise plan you assign and film each set." },
  { title: "In your review queue", body: "You see what Landing flagged, check it, and reply to the patient." },
  { title: "Before the visit", body: "Landing brings the patient’s sessions and history into one brief." },
] as const;

// Home links to these ids, so keep them stable.
const features: readonly Feature[] = [
  {
    id: "home-exercise",
    menuLabel: "Home exercise",
    title: "Home exercise patients can follow",
    body: "You assign exercise sessions. Patients open each exercise in a phone or laptop browser, see exactly what to do, film their set, and tell you how it felt.",
    capabilities: [
      "Sets, reps, rest, and your cue on every exercise.",
      "How to do it, common mistakes, and how to film, on each exercise.",
      "Patients can send a video they already have, or skip an exercise and say why.",
      "A pain and difficulty check-in before the session and a check-out after.",
    ],
    demo: <DemoVideo name="exerciseRecording" caption="The Landing patient app, recorded with test data." />,
  },
  {
    id: "pt-review",
    menuLabel: "PT review",
    title: "PT review that starts with the flags",
    body: "Submitted videos arrive in your review queue. Landing flags moments with possible form issues. You decide whether each flag is right and what the patient hears.",
    capabilities: [
      "A queue sorted into flagged, unflagged, unassessable, and failed videos.",
      "Each flag jumps to its moment in the video and shows the measurement behind it.",
      "Mark each flag correct or incorrect, and add a flag Landing missed.",
      "The patient’s pain and difficulty check-in sits beside the video.",
      "Write a comment and send it to the patient, or keep it private.",
    ],
    demo: <DemoVideo name="exerciseReview" caption="The Landing PT app, recorded with test data." />,
  },
  {
    id: "progress",
    menuLabel: "Progress and follow-up",
    title: "Progress and follow-up before the next visit",
    body: "Each patient’s sessions sit in one history. Before a visit, Landing writes a brief from the patient’s history, recent sessions, and your notes.",
    capabilities: [
      "Session history grouped into upcoming, today, and past, with a status on each.",
      "A next visit brief for your review.",
      "Message threads with the patient between visits.",
    ],
    inDevelopment: ["Changes over time across sessions.", "Exercise proposals that wait for your review."],
    demo: (
      <GradientFrame size="md" className="flex-col">
        <ProgressPreview />
      </GradientFrame>
    ),
  },
];

export default function ProductPage() {
  return (
    <main className="overflow-x-clip">
      <MovedSections />
      <Sheet className="flex flex-col items-center text-center">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Product"
          title="From home exercise to the next visit"
          lead="Patients submit home exercises, PTs review what needs attention, and the next visit starts with more context."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
          <ButtonLink href="/getting-started" variant="secondary">See how setup works</ButtonLink>
        </div>
        <NumberedRows items={workflow} heading="h2" className="mt-16 w-full text-left lg:mt-20" />
      </Sheet>

      <Sheet tone="fog" round="top">
        <SectionHeading
          align="split"
          eyebrow="How it works"
          title="One loop between visits"
          lead="Three parts of Landing. The videos are the real apps, recorded with test data."
          className="mb-12 lg:mb-16"
        />
        <FeatureTour features={features} label="Product features" />
      </Sheet>

      <Sheet round="top">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-10">
          <Eyebrow className="mb-4 lg:mb-0 lg:pt-2">Planned</Eyebrow>
          <div className="lg:col-span-2">
            <h2 className={type.h2}>Documentation</h2>
            <p className={`${type.lead} mt-4 text-pretty`}>
              Documentation support is planned. It is not built, and Landing does not write or file notes today.
            </p>
            <p className={`${type.body} mt-4`}>
              The goal is a draft of the treatment note built from the visit and the home exercise plan, checked for
              missing details before you sign it.
            </p>
          </div>
        </div>
      </Sheet>

      <CtaSheet heading="See the whole loop in a demo." lead={demo.sees} />
    </main>
  );
}

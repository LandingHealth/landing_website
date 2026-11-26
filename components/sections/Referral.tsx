import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Eyebrow from "@/components/ui/Eyebrow";
import IndexNumber from "@/components/ui/IndexNumber";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { proseLink, RuledRows } from "@/components/sections/trust/TrustPage";
import { container, demoHref, type } from "@/lib/site";

type Step = { icon: IconName; title: string; text: ReactNode };

const steps: ReadonlyArray<Step> = [
  {
    icon: "calendar",
    title: "Book a call",
    text: (
      <>
        <a
          href={demoHref}
          className={proseLink}
        >
          Book a call with us
        </a>
        . On the call, tell us about a physical therapy clinic that could use Landing.
      </>
    ),
  },
  {
    icon: "userPlus",
    title: "Introduce us",
    text: "Connect us with the person who runs the clinic. We meet with the clinic and set up Landing for its physical therapists.",
  },
  {
    icon: "banknote",
    title: "Get paid",
    text: "When the clinic signs on and starts using Landing, you earn $500. If you refer more than one clinic, you earn $500 for each.",
  },
];

const rules: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: "Who can refer a clinic?",
    answer: "Anyone outside the Landing team, including physical therapists, clinic staff, and patients.",
  },
  {
    question: "What counts as a new referral?",
    answer: "A physical therapy clinic that isn’t already using Landing and that we aren’t already talking with.",
  },
  {
    question: "When is the reward earned?",
    answer: "When the clinic you introduced signs on and starts using Landing with its patients.",
  },
  {
    question: "What if two people refer the same clinic?",
    answer: "The first introduction we receive counts. We’ll tell you on the call if a clinic is already in touch with us.",
  },
  {
    question: "Where are the terms?",
    answer: "Ask us for the written referral terms on your call, before you make an introduction.",
  },
];

export default function ReferralSection() {
  return (
    <>
      <section className={`${container} pt-16 pb-16 lg:pt-24 lg:pb-20`}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow className="mb-4">Referral program</Eyebrow>
          <h1 className={type.h1}>You know a clinic that would love Landing</h1>
          <p className={`${type.label} mt-10 text-mute`}>The reward</p>
          <p className={`${type.lead} mt-3 text-pretty`}>Earn $500 when a clinic you refer starts using Landing.</p>
        </div>
      </section>
      <Sheet tone="fog" round="top">
        <SectionHeading title="How it works" />
        <ol className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-10">
          {steps.map(({ icon, title, text }, index) => (
            <li key={title} className="rounded-3xl bg-white p-8">
              <div className="flex items-center justify-between">
                <IndexNumber index={index} />
                <Icon name={icon} className="size-6 text-blue" />
              </div>
              <h3 className={`${type.h3} mt-10`}>{title}</h3>
              <p className={`${type.body} mt-3`}>{text}</p>
            </li>
          ))}
        </ol>
      </Sheet>
      <Sheet round="top" className="lg:grid lg:grid-cols-4 lg:gap-x-10">
        <h2 className={`${type.h2} mb-8 lg:mb-0`}>The rules</h2>
        <div className="lg:col-span-3">
          <RuledRows rows={rules.map(({ question, answer }) => ({ label: question, body: answer }))} />
        </div>
      </Sheet>
    </>
  );
}

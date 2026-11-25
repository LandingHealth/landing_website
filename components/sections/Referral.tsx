import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { container, demoHref, edgePad, type } from "@/lib/site";

type Step = { icon: IconName; title: string; text: ReactNode };

const steps: ReadonlyArray<Step> = [
  {
    icon: "calendar",
    title: "Book a call",
    text: (
      <>
        <a
          href={demoHref}
          className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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

export default function ReferralSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="referral" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <section className={`${container} flex flex-col items-center text-center`}>
        <p className={`${type.label} text-ink`}>Referral program</p>
        <Heading className={`${type.h1} mt-6 max-w-4xl`}>
          You know a clinic that would <span className="text-ink">love Landing</span>.
        </Heading>
        <p className={`${type.label} mt-14 text-ink sm:mt-16`}>The reward</p>
        <p className="mt-3 text-lg leading-snug sm:text-xl">Earn $500 when a clinic you refer starts using Landing.</p>
      </section>
      <section className="mt-24 sm:mt-32">
        <h2 className={`${type.h2} text-center ${edgePad}`}>How it works</h2>
        <ol className={`mt-10 grid gap-3 ${edgePad} sm:mt-14 lg:grid-cols-3`}>
          {steps.map(({ icon, title, text }, index) => (
            <li key={title} className="rounded-xl bg-paper p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <div className="flex size-14 items-center justify-center rounded-lg bg-ink text-white">
                  <Icon name={icon} className="size-6" />
                </div>
                <span aria-hidden="true" className="font-display text-5xl leading-none text-ink/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className={`${type.h3} mt-10`}>{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6]">{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={`${container} mt-24 sm:mt-32`}>
        <h2 className={`${type.h2} max-w-3xl`}>The rules</h2>
        <dl className="mt-10 border-t border-ink">
          {rules.map(({ question, answer }) => (
            <div key={question} className="grid gap-3 border-b border-ink/10 py-6 lg:grid-cols-12 lg:gap-12">
              <dt className="text-[17px] font-medium leading-snug lg:col-span-5">{question}</dt>
              <dd className="text-[15px] leading-[1.65] lg:col-span-7">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { container, demoHref, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referral | Landing",
  description: "Earn $500 when a clinic you refer integrates Landing.",
};

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
    text: "After the clinic integrates Landing, we pay you $500. If you refer more than one clinic, you earn $500 for each.",
  },
];

export default function ReferralPage() {
  return (
    <main className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <section className={`${container} flex flex-col items-center text-center`}>
        <p className={`${type.label} text-accent-deep`}>Referral program</p>
        <h1 className={`${type.h1} mt-6 max-w-4xl`}>
          You know a clinic that would <span className="text-accent-deep">love Landing</span>.
        </h1>
        <p className={`${type.label} mt-14 text-accent-deep sm:mt-16`}>The reward</p>
        <p className="mt-3 text-lg leading-snug sm:text-xl">Earn $500 when a clinic you refer integrates Landing.</p>
      </section>
      <section className="mt-24 sm:mt-32">
        <h2 className={`${type.h2} text-center ${edgePad}`}>How it works</h2>
        <ol className={`mt-10 grid gap-3 ${edgePad} sm:mt-14 lg:grid-cols-3`}>
          {steps.map(({ icon, title, text }, index) => (
            <li key={title} className="rounded-xl border border-ink/10 bg-white p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <div className="flex size-14 items-center justify-center rounded-lg bg-mist text-accent-deep">
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
    </main>
  );
}

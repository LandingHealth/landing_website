import type { Metadata } from "next";
import type { ReactNode } from "react";
import { demoHref, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referral | Landing",
  description: "Earn $500 when a clinic you refer integrates Landing.",
};

type Step = { title: string; text: ReactNode };

const steps: ReadonlyArray<Step> = [
  {
    title: "Introduce us",
    text: (
      <>
        <a
          href={demoHref}
          className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Book a call with us
        </a>{" "}
        and tell us about a physical therapy clinic that could use Landing. Then connect us with the person who runs the clinic.
      </>
    ),
  },
  {
    title: "The clinic integrates Landing",
    text: "We meet the clinic’s team and set up Landing for their physical therapists.",
  },
  {
    title: "We pay you $500",
    text: "After the clinic integrates Landing, we pay you $500. Refer more than one clinic, and you earn $500 for each.",
  },
];

export default function ReferralPage() {
  return (
    <main className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <section>
        <div className={edgePad}>
          <h1 className={type.h1}>Refer a clinic. Earn $500.</h1>
        </div>
        <ul className={`mt-16 grid gap-3 sm:mt-24 lg:grid-cols-3 ${edgePad}`}>
          {steps.map(({ title, text }) => (
            <li key={title} className="grid min-h-[20rem] grid-rows-2 rounded-xl bg-mist p-6 sm:p-7 lg:min-h-[30rem]">
              <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-[-0.025em] text-balance sm:text-4xl">
                {title}
              </h2>
              <div className="border-t border-ink/15 pt-4">
                <p className="text-[15px] leading-[1.5]">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

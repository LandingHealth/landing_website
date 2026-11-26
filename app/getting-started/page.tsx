import type { Metadata } from "next";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import DemoVideo, { DemoClip } from "@/components/sections/product/DemoVideo";
import CtaSheet from "@/components/ui/CtaSheet";
import DarkCard from "@/components/ui/DarkCard";
import GradientFrame from "@/components/ui/GradientFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { container, demoHref, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Getting started | Landing",
  description: "What a clinic needs to start on Landing, how setup works, and how Landing sits alongside your EHR.",
};

const before = [
  { title: "Your PTs’ names and emails", body: "We use them to set up each PT’s account. Staff accounts are by invitation only." },
  { title: "Your patients’ details", body: "A name, injury, and dates for each patient. An email links them to the patient app." },
  { title: "A browser", body: "PTs and patients use Landing in a browser. There is no software to install and no new hardware." },
] as const;

type Step = { title: string; body: string; visual: ReactNode };

const steps: readonly Step[] = [
  {
    title: "We set up your clinic and PT accounts",
    body: "Send us your clinic’s name and each PT’s name and email. We add the clinic and its PTs. Each PT gets an invitation email and signs in with that address.",
    visual: <DemoVideo name="clinicSetup" caption="Landing’s admin app, recorded with test data." />,
  },
  {
    title: "Add a patient and assign exercises",
    body: "Add each patient with one short form. Then assign their exercise sessions with sets, reps, rest, and your cues. The patient signs up with their email in a phone or laptop browser.",
    visual: (
      <div className="mx-auto max-w-md">
        <DemoVideo name="addPatients" caption="The Landing PT app, recorded with test data." />
      </div>
    ),
  },
  {
    title: "The first recording and the first review",
    body: "The patient checks in, films each set, and sends it. The video arrives in your review queue with any flagged moments. You check the flags and reply.",
    visual: (
      <figure>
        <GradientFrame size="md">
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <DemoClip name="exerciseRecording" />
            <DemoClip name="exerciseReview" />
          </div>
        </GradientFrame>
        <figcaption className="mt-3 text-center text-xs text-slate">The patient app and the PT app, recorded with test data.</figcaption>
      </figure>
    ),
  },
];

const numberWords = ["zero", "one", "two", "three", "four", "five", "six"] as const;
const stepCount = numberWords[steps.length] ?? String(steps.length);

const terms = [
  {
    title: "Support",
    body: "You work with our team directly during setup. Book a call, or email us from the Contact link.",
  },
  {
    title: "Pricing",
    body: "Pricing is not published yet. We cover it on the demo call.",
  },
  {
    title: "Pilot",
    body: "Pilot terms are not published yet either. We discuss them on the same call.",
  },
] as const;

export default function GettingStartedPage() {
  return (
    <main className="overflow-x-clip">
      <Sheet className="flex flex-col items-center text-center">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Getting started"
          title="Start using Landing at your clinic"
          lead={`Landing runs in the browser alongside your EHR. Setup takes ${stepCount} steps, and we do the first one for you.`}
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={demoHref} variant="primary">Book a setup demo</ButtonLink>
          <ButtonLink href="/product" variant="secondary">See the product</ButtonLink>
        </div>
      </Sheet>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard
          eyebrow="Before you start"
          title="What your clinic needs"
          body="Setup needs a few details from you and nothing to install."
          items={before}
        />
      </div>

      <Sheet tone="fog" round="top">
        <SectionHeading
          align="split"
          eyebrow="Setup"
          title={`Setup in ${stepCount} steps`}
          lead="From your clinic’s accounts to the first video you review."
        />
        <ol className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-20">
          {steps.map(({ title, body, visual }, index) => (
            <li key={title} className="grid items-center gap-6 lg:grid-cols-4 lg:gap-x-10">
              <div>
                <p className={`${type.label} text-blue`}>Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className={`${type.h3} mt-3`}>{title}</h3>
                <p className={`${type.body} mt-3`}>{body}</p>
              </div>
              <div className="lg:col-span-3">{visual}</div>
            </li>
          ))}
        </ol>
      </Sheet>

      <Sheet round="top">
        <SectionHeading
          align="split"
          eyebrow="Your EHR"
          title="Landing works alongside your EHR"
          lead="Landing runs in the browser next to the EHR you already use. Your EHR stays your system of record, and nothing in it changes."
        />
        <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-x-10">
          <p className={`${type.body} lg:col-span-2 lg:col-start-2`}>
            Landing does not connect to your EHR today, so you add patients in Landing yourself. Tell us which EHR you use
            on the demo call.
          </p>
        </div>
        <div className="mt-20 lg:mt-28">
          <SectionHeading align="split" eyebrow="Working with us" title="Support, pricing, and pilots" />
          <ul className="mt-12 grid gap-x-10 border-t border-hair sm:grid-cols-3">
            {terms.map(({ title, body }) => (
              <li key={title} className="border-b border-hair py-6 sm:border-b-0">
                <h3 className={type.h3}>{title}</h3>
                <p className={`${type.body} mt-3`}>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      <CtaSheet heading="Book a setup demo." lead="We’ll show you each setup step with a sample patient, then talk through pricing and pilot terms." />
    </main>
  );
}

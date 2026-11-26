import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import DemoVideo, { DemoClip } from "@/components/sections/product/DemoVideo";
import DarkCard from "@/components/ui/DarkCard";
import GradientFrame from "@/components/ui/GradientFrame";
import IndexNumber from "@/components/ui/IndexNumber";
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

type Ehr = { name: string; logo?: { src: string; width: number; height: number } };

const ehrs: ReadonlyArray<Ehr> = [
  { name: "Jane" },
  { name: "WebPT" },
  { name: "Prompt" },
  { name: "Raintree" },
];

const alongside = [
  { title: "Evidence packet", body: "One per patient. The prescribed home exercise program and adherence from the patient’s sessions." },
  { title: "Evaluation", body: "Your clinic measurements next to the camera readings." },
  { title: "Nothing to install", body: "Landing runs in the browser next to your EHR. There is no new software or hardware." },
  { title: "Your workflow stays put", body: "Notes, billing, and scheduling stay in your EHR, the way you run them today." },
] as const;

type Step = { title: string; body: string; visual: ReactNode };

const steps: readonly Step[] = [
  {
    title: "We set up your clinic and PT accounts",
    body: "Send us your clinic’s name and each PT’s name and email. We add the clinic and its PTs. Each PT gets an invitation email and signs in with that address.",
    visual: <DemoVideo name="clinicSetup" />,
  },
  {
    title: "Add a patient and assign exercises",
    body: "Add each patient with one short form. Then assign their exercise sessions with sets, reps, rest, and your cues. The patient signs up with their email in a phone or laptop browser.",
    visual: (
      <GradientFrame size="md">
        <div className="w-full max-w-lg">
          <DemoClip name="addPatients" />
        </div>
      </GradientFrame>
    ),
  },
  {
    title: "The first recording and the first review",
    body: "The patient checks in, films each set, and sends it. The video arrives in your review queue with any flagged moments. You check the flags and reply.",
    visual: (
      <GradientFrame size="md">
        <DemoClip name="exerciseReview" />
      </GradientFrame>
    ),
  },
];

export default function GettingStartedPage() {
  return (
    <main className="overflow-x-clip">
      <Sheet className="flex flex-col items-center text-center">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Getting started"
          title="Start using Landing at your clinic"
          lead="Landing runs in the browser alongside your EHR. Setup takes three steps and about 15 minutes, and we do the first one for you."
        />
        <div data-header-cta className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={demoHref} variant="primary">Book a setup demo</ButtonLink>
          <ButtonLink href="/product" variant="secondary">See the product</ButtonLink>
        </div>
      </Sheet>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard
          eyebrow="Before you start"
          title="What your clinic needs"
          body="Setup needs a few details from you and nothing to install."
          stat={{ value: "15 min", label: "Onboarding takes about 15 minutes." }}
          items={before}
        />
      </div>

      <Sheet tone="fog" round="top">
        <SectionHeading
          align="center"
          title="Setup in three steps"
          lead="From your clinic’s accounts to the first video you review."
        />
        <ol className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-20">
          {steps.map(({ title, body, visual }, index) => (
            <li key={title} className="grid items-center gap-6 lg:grid-cols-4 lg:gap-x-10">
              <div className="text-center">
                <p className={`${type.label} text-blue`}>Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className={`${type.h3} mt-3`}>{title}</h3>
                <p className={`${type.body} mx-auto mt-3`}>{body}</p>
              </div>
              <div className="lg:col-span-3">{visual}</div>
            </li>
          ))}
        </ol>
      </Sheet>

      <Sheet round="top" bleed className={`${container} flex min-h-[calc(100svh-4.25rem)] flex-col py-4 sm:py-6`}>
        <div className="grid flex-1 content-center items-center gap-4 rounded-3xl bg-blue px-5 py-5 text-white sm:gap-10 sm:p-12 lg:grid-cols-2 lg:gap-x-20 lg:p-16">
          <div>
            <SectionHeading
              align="left"
              onDark
              title="Landing works alongside your EHR"
              lead="Patient data moves seamlessly into the EHR you already use, so it stays your system of record."
            />
            <div className="mt-5 sm:mt-10 sm:border-t sm:border-white/25 sm:pt-6">
              <p className={`${type.label} text-white/70`}>Works with</p>
              <ul className="mt-2 grid grid-cols-3 gap-y-1 font-display text-lg leading-snug font-[380] [font-stretch:110%] sm:mt-3 sm:flex sm:flex-wrap sm:gap-x-7 sm:text-xl">
                {ehrs.map(({ name, logo }) => (
                  <li key={name}>
                    {logo ? <Image src={logo.src} width={logo.width} height={logo.height} alt={name} className="h-6 w-auto brightness-0 invert" /> : name}
                  </li>
                ))}
                <li className="text-white/60">and more</li>
              </ul>
            </div>
          </div>
          <ol className="divide-y divide-white/25">
            {alongside.map(({ title, body }, index) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] items-baseline py-2.5 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:py-7">
                <IndexNumber index={index} onDark />
                <h3 className={`${type.h3} max-sm:!text-lg`}>{title}</h3>
                <p className={`${type.bodyOnDark} col-start-2 mt-0.5 max-sm:!text-sm max-sm:leading-[1.4] sm:mt-2`}>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Sheet>
    </main>
  );
}


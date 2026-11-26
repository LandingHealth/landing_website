import DemoCallout from "@/components/DemoCallout";
import ExpandableMedia, { type Video } from "@/components/ExpandableMedia";
import { container, sectionPad, type } from "@/lib/site";

const steps: ReadonlyArray<{ title: string; text: string; video: Video }> = [
  {
    title: "We set up your clinic",
    text: "Send us the clinic’s name and each PT’s name and email. We add them, and each PT creates an account with that email.",
    video: { src: "/integration/clinic-setup.mp4", poster: "/integration/clinic-setup.jpg" },
  },
  {
    title: "Add your patients",
    text: "Add each patient with one short form: name, email, injury, and dates. Then assign their exercise sessions. Patients sign up with that email in a phone or laptop browser. There’s no app to download.",
    video: { src: "/integration/add-patients.mp4", poster: "/integration/add-patients.jpg" },
  },
  {
    title: "Start reviewing home exercise",
    text: "That’s the whole setup. Patients record their sessions at home, and their videos arrive in your review queue.",
    video: { src: "/integration/onboarding-complete.mp4", poster: "/integration/onboarding-complete.jpg" },
  },
];

const ehr = [
  "Landing runs in the browser alongside the EHR you already use. Your EHR stays your system of record, and nothing in it changes.",
] as const;

export default function IntegrationSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <>
      <section id="integration" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <Heading className={`${type.h1} max-w-4xl`}>Getting started</Heading>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Landing runs alongside your EHR. Setup takes two steps and usually less than half an hour, with no software to
            install and no new hardware.
          </p>
          <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.6] text-pretty">
            The estimate is for one clinic and its PTs. Each patient takes one short form, so a larger caseload adds time.
          </p>
        </div>
        <ol className={`${container} mt-14 space-y-16 sm:mt-16 sm:space-y-20`}>
          {steps.map(({ title, text, video }, i) => (
            <li key={title} className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-4">
                <p className="text-[15px]">Step {i + 1}</p>
                <h2 className={`${type.h3} mt-2`}>{title}</h2>
                <p className="mt-3 max-w-prose text-[15px] leading-[1.6]">{text}</p>
              </div>
              <ExpandableMedia
                media={{ video }}
                title={title}
                className="aspect-[1920/1094] w-full rounded-xl bg-black ring-1 ring-ink/10 lg:col-span-8"
              />
            </li>
          ))}
        </ol>
      </section>
      <section className={`${sectionPad} border-t border-ink/10`}>
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-20`}>
          <h2 className={`${type.h2} lg:col-span-5`}>Working with your EHR</h2>
          <div className="space-y-5 lg:col-span-7">
            {ehr.map((text) => (
              <p key={text} className="max-w-prose text-[15px] leading-[1.65]">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>
      <DemoCallout title="See the setup in a demo." action="See the setup in a demo" />
    </>
  );
}

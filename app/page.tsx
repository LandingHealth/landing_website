import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import CtaBand from "@/components/CtaBand";
import LoadSignal from "@/components/LoadSignal";
import ProductFrame from "@/components/ProductFrame";
import RecoverySignalIsland from "@/components/RecoverySignalIsland";
import SectionHeader from "@/components/SectionHeader";
import { card, container, sectionPad, stagger, type } from "@/lib/site";

const audiences = [
  {
    label: "For therapists",
    heading: "Plan the practice",
    text: "Plan availability, prepare exercise guides, coordinate follow ups.",
  },
  {
    label: "For patients",
    heading: "Care at home",
    text: "Book online sessions and get home exercise guides with clear instructions and schedules.",
  },
  {
    label: "Between visits",
    heading: "Context beyond the clinic",
    text: "SafeSock adds a view of weight bearing outside the clinic.",
  },
];

const platform = [
  {
    heading: "Scheduling",
    text: "Landing helps therapists anticipate demand and plan appointment availability around the needs of their practice. Patients can book online sessions, while AI agents help coordinate scheduling, reminders, and follow ups.",
  },
  {
    heading: "Exercise planning",
    text: "For exercise planning, Landing helps therapists find exercises suited to treatment goals, available equipment, and the restrictions they define. Therapists can prepare personalized home exercise guides with clear instructions and schedules, giving patients a practical reference between sessions.",
  },
  {
    heading: "SafeSock",
    text: "SafeSock adds a view of how a patient bears weight outside the clinic. Its sensor sleeve is designed to sit inside a boot, cast, or brace and capture pressure patterns that can help therapists discuss recovery with more context.",
  },
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="bg-mist pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className={container}>
          <p data-reveal className={`${type.label} text-accent-deep`}>SafeSock by Landing</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1 data-reveal style={stagger(1)} className={`${type.h1} lg:col-span-7`}>
              A connected operating system for physical therapy
            </h1>
            <div data-reveal style={stagger(2)} className="lg:col-span-5">
              <p className={type.body}>
                Landing connects scheduling, exercise planning, and patient communication with SafeSock, a sensor
                sleeve designed to capture how patients bear weight between appointments.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/devices#demo" variant="primary">Watch the demo</ButtonLink>
                <ButtonLink href="/product" variant="secondary">Explore the platform</ButtonLink>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-14">
            <ProductFrame label="SafeSock · Concept render" caption="Concept render · Not live data">
              <Image
                src="/safesock-sensor-layout.jpg"
                alt="Concept render of SafeSock's pressure sensor layout across the sole"
                width={1600}
                height={871}
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto w-full"
              />
            </ProductFrame>
          </div>
        </div>
      </section>

      <section className={`border-t border-ink/10 bg-paper ${sectionPad}`}>
        <div className={`${container} grid gap-6 md:grid-cols-3`}>
          {audiences.map(({ label, heading, text }, index) => (
            <div key={label} data-reveal style={stagger(index)}>
              <div className="h-full border-t border-ink/10 pt-6">
                <p className={`${type.label} text-accent-deep`}>{label}</p>
                <h2 className={`${type.h3} mt-3`}>{heading}</h2>
                <p className="mt-3 max-w-prose text-base leading-7 text-slate">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`bg-mist ${sectionPad}`}>
        <div className={`${container} space-y-12`}>
          <SectionHeader eyebrow="Workflow" title="From step to insight" />
          <LoadSignal />
        </div>
      </section>

      <section className={`border-t border-ink/10 bg-paper ${sectionPad}`}>
        <div className={`${container} space-y-12`}>
          <SectionHeader eyebrow="Platform" title="Support for your practice and your patients" />
          <div className="grid gap-4 md:grid-cols-3">
            {platform.map(({ heading, text }, index) => (
              <div key={heading} data-reveal style={stagger(index)}>
                <article className={`${card} h-full p-6`}>
                  <p className={`${type.label} text-accent-deep`}>{String(index + 1).padStart(2, "0")}</p>
                  <h3 className={`${type.h3} mt-4`}>{heading}</h3>
                  <p className="mt-3 text-base leading-7 text-slate">{text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-ink text-paper ${sectionPad}`}>
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div data-reveal className="lg:col-span-5">
            <p className={`${type.label} text-accent-soft`}>Care</p>
            <h2 className={`${type.h2} mt-4`}>More time for patient care</h2>
            <p className={`${type.bodyOnInk} mt-5`}>
              Our goal is to help physical therapists support more patients while preserving the attention each
              person deserves. Landing’s devices provide meaningful context, and its AI agents help with the
              coordination and administrative work surrounding care. Therapists remain responsible for exercise
              plans and clinical decisions, with one connected system supporting their work.
            </p>
            <div className="mt-8">
              <ButtonLink href="/devices" variant="onInk">Explore SafeSock</ButtonLink>
            </div>
          </div>
          <div data-reveal className="lg:col-span-7">
            <RecoverySignalIsland />
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

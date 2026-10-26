import ButtonLink from "@/components/ButtonLink";
import DashboardPreview from "@/components/DashboardPreview";
import CtaBand from "@/components/CtaBand";
import LoadSignal from "@/components/LoadSignal";
import RecoverySignalIsland from "@/components/RecoverySignalIsland";
import SectionHeader from "@/components/SectionHeader";
import { card, container, demoHref, sectionPad, stagger, type } from "@/lib/site";

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
      <section className="bg-mist pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1 text-[13px] font-medium">
            <span className="size-1.5 rounded-full bg-ink" />
            Built for physical therapists
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[42px] font-normal leading-[1.02] tracking-[-0.022em] text-balance sm:text-6xl lg:text-[80px]">
            Better preparation<br className="hidden sm:block" /> for every appointment.
          </h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Bring patient history, exercise activity, and session notes into one focused workspace. Arrive prepared
            with a clear summary and exercise recommendations for your review.
          </p>
          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
            <ButtonLink href="/product" variant="secondary">Explore the platform</ButtonLink>
          </div>
          <div className="mt-14 w-full max-w-5xl sm:mt-16">
            <DashboardPreview />
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

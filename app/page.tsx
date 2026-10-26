import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import DashboardPreview from "@/components/DashboardPreview";
import { container, demoHref, sectionPad, type } from "@/lib/site";

const workspace = [
  {
    title: "Appointment preparation",
    text: "Before each visit, Landing assembles a brief from the patient’s history, recent sessions, and your notes. It lists what changed and what is still missing, so you start with context.",
  },
  {
    title: "Exercise review",
    text: "Patients record their home exercises and submit the videos. Submissions with possible form issues are flagged and sorted oldest first, so you know where to look.",
  },
  {
    title: "Patient progress",
    text: "Each patient page brings completed and skipped sessions, exercise history, and your notes into one view.",
  },
];

const proposalFields = [
  { term: "Rationale", detail: "Why the change is suggested." },
  { term: "Dose", detail: "Sets, reps, and holds." },
  { term: "Precautions", detail: "What to watch for." },
  { term: "PT checks", detail: "What to confirm during the session." },
  { term: "Patient evidence", detail: "The sessions, videos, and notes it draws on." },
  { term: "Reference evidence", detail: "Reviewed reference passages, when available." },
];

const alsoInLanding = [
  {
    title: "Scheduling",
    text: "Plan availability around demand, let patients book online sessions, and keep reminders and follow-ups coordinated.",
    href: "/schedule",
    link: "Read about scheduling",
  },
  {
    title: "Home exercise guides",
    text: "Build plans around treatment goals, equipment, and the restrictions you set, with clear instructions patients can follow at home.",
    href: "/product",
    link: "Read about the platform",
  },
  {
    title: "SafeSock",
    text: "A sensor sleeve designed to sit inside a boot, cast, or brace and show how a patient bears weight between visits.",
    href: "/devices",
    link: "Meet SafeSock",
  },
];

const section = `border-t border-ink/10 ${sectionPad}`;

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
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

      <section className={section}>
        <div className={container}>
          <p className={type.label}>The workspace</p>
          <h2 className={`${type.h2} mt-4 max-w-3xl`}>Everything you need before the next visit.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {workspace.map(({ title, text }) => (
              <article key={title} className="rounded-xl border border-ink/10 bg-white p-6 sm:p-7">
                <h3 className={type.h3}>{title}</h3>
                <p className="mt-3 text-base leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <p className={type.label}>Your judgment</p>
            <h2 className={`${type.h2} mt-4`}>You decide what changes.</h2>
            <p className={`${type.lead} mt-5 max-w-prose`}>
              Landing suggests exercises to continue, progress, or adjust, with the patient evidence behind each one.
              Nothing is assigned, sent to the patient, or charted on its own.
            </p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6 sm:p-7 lg:col-span-7">
            <h3 className="text-base font-semibold">Each proposal shows</h3>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {proposalFields.map(({ term, detail }) => (
                <div key={term}>
                  <dt className="font-medium">{term}</dt>
                  <dd className="mt-1 text-[15px] leading-6">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <p className={type.label}>Also in Landing</p>
          <h2 className={`${type.h2} mt-4 max-w-3xl`}>Support around the visit, too.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {alsoInLanding.map(({ title, text, href, link }) => (
              <div key={title} className="border-t border-ink/15 pt-6">
                <h3 className={type.h3}>{title}</h3>
                <p className="mt-3 text-base leading-7">{text}</p>
                <Link
                  href={href}
                  className="mt-4 inline-block text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={`${container} flex flex-col items-center text-center`}>
          <h2 className={`${type.h2} max-w-3xl`}>See how Landing fits your clinic.</h2>
          <p className={`${type.lead} mt-5 max-w-[36rem] text-pretty`}>
            Book an intro meeting with the team. We’ll walk through the workspace with sample patients and answer
            questions about your setup.
          </p>
          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
            <ButtonLink href="/about" variant="secondary">Meet the team</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

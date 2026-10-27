import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import DashboardPreview from "@/components/DashboardPreview";
import ExpandableVideo from "@/components/ExpandableVideo";
import Marquee from "@/components/Marquee";
import { container, demoHref, sectionPad, type } from "@/lib/site";

const workspace = [
  {
    title: "Appointment preparation",
    text: "Before each visit, Landing assembles a brief from the patient’s history, recent sessions, and your notes. It lists what changed and what is still missing, so you start with context.",
  },
  {
    title: "Exercise review",
    text: "Patients record their home exercises and submit the videos. Submissions with possible form issues are flagged and sorted oldest first, so you know where to look.",
    video: { src: "/workspace/exercise-review.mp4", poster: "/workspace/exercise-review.jpg" },
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

const awards = [
  { name: "America250", src: "/awards/america250.svg", aspectRatio: 4.471 },
  { name: "TEDCO", src: "/awards/tedco.png", aspectRatio: 2.713 },
  { name: "Johns Hopkins University", src: "/awards/johns-hopkins.png", aspectRatio: 4.115 },
  { name: "Johns Hopkins Pava Center", src: "/awards/pava-center.svg", aspectRatio: 0.896 },
  { name: "Baylor University", src: "/awards/baylor.svg", aspectRatio: 5.449 },
  { name: "TCU", src: "/awards/tcu.svg", aspectRatio: 2.047 },
  { name: "Duquesne University", src: "/awards/duquesne.png", aspectRatio: 3.576 },
  { name: "Sasin School of Management, Chulalongkorn University", src: "/awards/sasin.svg", aspectRatio: 7.23 },
  { name: "KBank", src: "/awards/kbank.svg", aspectRatio: 4.056 },
  { name: "London Business School", src: "/awards/london-business-school.svg", aspectRatio: 1 },
  { name: "University of Manitoba", src: "/awards/university-of-manitoba.svg", aspectRatio: 2.066 },
  { name: "U.S. National Science Foundation", src: "/awards/nsf.png", aspectRatio: 0.999 },
  { name: "O’Shaughnessy Ventures", src: "/awards/oshaughnessy-ventures.svg", aspectRatio: 3.192 },
  { name: "FOX45 Baltimore", src: "/awards/fox45.svg", aspectRatio: 2.201 },
] as const satisfies ReadonlyArray<{ name: string; src: string; aspectRatio: number }>;

const logoWeight = 62;

function logoSize(aspectRatio: number) {
  const height = Math.min(52, Math.max(24, Math.round(logoWeight / Math.sqrt(aspectRatio))));
  return { height, width: Math.round(height * aspectRatio) };
}

const tile = "[--ratio:1920/1094] aspect-(--ratio) w-full rounded-xl bg-mist";

const section = `border-t border-ink/10 ${sectionPad}`;

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>
            The Operating System<br className="hidden sm:block" /> for Physical Therapy.
          </h1>
          <p className={`${type.lead} mt-6 max-w-[30rem] text-pretty`}>
            Connected recovery devices and clinic software that bring patient progress, daily operations, and care at home into one platform.
          </p>
          <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
          </div>
          <div className="mt-14 w-full max-w-5xl sm:mt-16">
            <DashboardPreview />
          </div>
        </div>
        <h2 className={`${type.label} mt-14 text-center sm:mt-16`}>Awarded by</h2>
        <Marquee className="mt-6 [--gap:2rem] sm:[--gap:3rem]">
          {awards.map(({ name, src, aspectRatio }) => {
            const { width, height } = logoSize(aspectRatio);
            return (
              <li key={name} className="flex shrink-0 items-center">
                <Image src={src} alt={name} width={width} height={height} loading="eager" className="grayscale" />
              </li>
            );
          })}
        </Marquee>
      </section>

      <section className={section}>
        <div className={container}>
          <p className={`${type.label} text-center`}>The workspace</p>
          <h2 className={`${type.h2} mx-auto mt-4 max-w-3xl text-center`}>Everything you need before the next visit.</h2>
        </div>
        <div className="mt-12 grid gap-x-3 gap-y-12 px-6 lg:grid-cols-3 lg:px-4">
          {workspace.map(({ title, text, video }) => (
            <article key={title}>
              {video ? (
                <ExpandableVideo src={video.src} poster={video.poster} title={title} className={tile} />
              ) : (
                <div className={tile} />
              )}
              <h3 className="mt-4 text-[15px] font-medium leading-snug">{title}</h3>
              <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>
            </article>
          ))}
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
                <p className="mt-3 text-[15px] leading-[1.6]">{text}</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}

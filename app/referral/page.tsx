import type { Metadata } from "next";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import { demoHref, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referral | Landing",
  description: "Earn $500 when a clinic you refer integrates Landing. See Landing’s open internship roles.",
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

type Copy = { title: string; paragraphs: ReadonlyArray<string> };

const referrals: Copy = {
  title: "Who to refer",
  paragraphs: [
    "Landing is built for physical therapy clinics. It helps most where physical therapists spend hours on notes after visits, and where patients follow a home exercise program between visits.",
    "Introduce us to the person who runs the clinic, such as the owner or the clinic director. You don’t need to explain how Landing works. We explain it when we meet the clinic’s team.",
  ],
};

const pitch: Copy = {
  title: "What to tell the clinic",
  paragraphs: [
    "Landing is an agentic platform for physical therapy, built on the AWS cloud. It takes repetitive work off a physical therapist’s schedule and gives the clinic a new revenue stream between visits.",
  ],
};

type Point = { title: string; text: string };

const points: ReadonlyArray<Point> = [
  {
    title: "About 30 minutes back on every visit",
    text: "AI agents prep each visit, transcribe the session, and draft the clinical note. The physical therapist reviews the note and signs off.",
  },
  {
    title: "A new monthly program",
    text: "Patients record their home exercises, and physical therapists review the videos between visits. The clinic can charge for that review as a monthly program.",
  },
  {
    title: "Set up in less than half an hour",
    text: "We add the clinic and its physical therapists. Landing runs in the browser next to the clinic’s EHR, and nothing in the EHR changes.",
  },
];

const hiring: Copy = {
  title: "Open roles",
  paragraphs: ["We’re hiring interns in research and engineering. Both roles are remote."],
};

type Role = { title: string; department: string; employment: string; location: string };

const roleColumns: ReadonlyArray<{ key: keyof Role; label: string }> = [
  { key: "title", label: "Title" },
  { key: "department", label: "Department" },
  { key: "employment", label: "Employment type" },
  { key: "location", label: "Location type" },
];

const roles: ReadonlyArray<Role> = [
  {
    title: "Computer Vision Research Assistant",
    department: "Research",
    employment: "Internship",
    location: "Remote",
  },
  {
    title: "Hardware Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
  },
];

const [titleColumn, ...detailColumns] = roleColumns;

function Intro({ title, paragraphs, className }: Copy & { className?: string }) {
  return (
    <div className={`grid gap-x-3 gap-y-8 ${edgePad} lg:grid-cols-2 ${className ?? ""}`}>
      <h2 className={`${type.h2} max-w-xl`}>{title}</h2>
      <div className="max-w-xl space-y-5 text-[15px] leading-[1.6]">
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
}

export default function ReferralPage() {
  return (
    <main className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <section>
        <div className={edgePad}>
          <h1 className={type.h1}>Refer a clinic. Earn $500.</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Introduce us to a physical therapy clinic that could use Landing. When the clinic integrates Landing, we pay you $500.
          </p>
          <div className="mt-9">
            <ButtonLink href={demoHref} variant="primary">
              Book a call
            </ButtonLink>
          </div>
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
        <Intro {...referrals} className="mt-20 sm:mt-24" />
        <Intro {...pitch} className="mt-20 sm:mt-24" />
        <ul className={`mt-16 grid gap-3 ${edgePad} sm:mt-20 lg:grid-cols-3`}>
          {points.map(({ title, text }) => (
            <li key={title} className="rounded-xl bg-mist p-5 sm:p-6">
              <h3 className="text-[15px] font-medium leading-snug">{title}</h3>
              <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-24 sm:mt-32">
        <Intro {...hiring} />
        <div className={`mt-10 sm:mt-14 ${edgePad}`}>
          <table className="w-full">
            <caption className="sr-only">Open roles</caption>
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-ink/15">
                {roleColumns.map(({ key, label }) => (
                  <th key={key} scope="col" className="pb-3 text-left text-sm font-normal sm:w-1/4">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.title} className="border-b border-ink/15 align-top">
                  <th scope="row" className="py-6 pr-4 text-left text-[15px] font-normal">
                    {role[titleColumn.key]}
                    <span className="mt-1 block sm:hidden">
                      {detailColumns.map(({ key }) => role[key]).join(" · ")}
                    </span>
                  </th>
                  {detailColumns.map(({ key }) => (
                    <td key={key} className="hidden py-6 pr-4 text-[15px] sm:table-cell">
                      {role[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

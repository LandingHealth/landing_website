import type { Metadata } from "next";
import type { ReactNode } from "react";
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
    text: "After the clinic integrates Landing, we pay you $500.",
  },
];

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

export default function ReferralPage() {
  return (
    <main className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <section>
        <h1 className={`${type.h1} ${edgePad}`}>Refer a clinic. Earn $500.</h1>
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
      <section className="mt-24 sm:mt-32">
        <h2 className={`${type.h2} ${edgePad}`}>Open roles</h2>
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

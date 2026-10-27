import type { Metadata } from "next";
import Link from "next/link";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | Landing",
  description: "Writing from Landing on physical therapy, recovery, and the data between visits.",
};

const resources: ReadonlyArray<{ kind: "Essay"; title: string; summary: string; href: string }> = [
  {
    kind: "Essay",
    title: "The recovery world model",
    summary: "Physical therapy runs open-loop. Here’s why a model of healing needs PT judgment, and how it can raise clinic revenue and help patients recover more.",
    href: "/resources/recovery-world-model",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Resources</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Writing from Landing on physical therapy, recovery, and the data between visits.
          </p>
        </div>
        <ul className="mx-auto mt-14 max-w-3xl px-6 sm:mt-16">
          {resources.map(({ kind, title, summary, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-xl p-6 ring-1 ring-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <p className={type.label}>{kind}</p>
                <h2 className={`${type.h3} mt-3`}>{title}</h2>
                <p className="mt-3 text-[15px] leading-[1.6]">{summary}</p>
                <p className="mt-4 text-[15px] font-medium">Read the essay</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

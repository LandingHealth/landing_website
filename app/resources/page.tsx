import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/Article";
import CtaSheet from "@/components/ui/CtaSheet";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { groups, resources, type ArticleGroup } from "@/lib/resources";
import { flyerHref, focusRing, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | Landing",
  description:
    "Guides for clinics evaluating Landing, a clinic planning page with time and program calculators, and articles on Landing’s product, research, and perspective.",
};

const guides = [
  {
    kind: "Guide",
    title: "Getting started",
    text: "What a clinic needs before starting, how accounts and patients are set up, and how Landing works beside your EHR.",
    href: "/getting-started",
  },
  {
    kind: "Guide",
    title: "Security",
    text: "Where patient data is stored, who can access it, how it is encrypted, and how retention and deletion work.",
    href: "/security",
  },
  {
    kind: "Calculators",
    title: "Clinic planning",
    text: "Estimate weekly hours saved and a between-visit program’s gross revenue from numbers you enter.",
    href: "/resources/clinic-planning",
  },
  {
    kind: "PDF",
    title: "Clinic flyer",
    text: "A one-page summary of how Landing works at home, in the review queue, and before the visit, to share with your team.",
    href: flyerHref,
    download: true,
  },
] as const;

const groupOrder: readonly ArticleGroup[] = ["product", "research", "perspective"];

export default function ResourcesPage() {
  return (
    <main>
      <Sheet>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Resources"
          title="Learn how Landing works and why we build it"
          lead="Practical guides for clinics that are evaluating Landing, and articles by our team on the product, our research, and the ideas behind it."
        />
      </Sheet>

      <Sheet tone="fog" round="top">
        <SectionHeading eyebrow="Practical guides" title="Plan your clinic’s first steps." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => (
            <li key={guide.title}>
              <Link
                href={guide.href}
                download={"download" in guide ? true : undefined}
                prefetch={"download" in guide ? false : undefined}
                className={`group flex h-full flex-col rounded-3xl bg-white p-6 transition-colors duration-150 hover:bg-white/70 motion-reduce:transition-none sm:p-8 ${focusRing}`}
              >
                <span className={`${type.label} text-blue`}>{guide.kind}</span>
                <h3 className={`${type.h3} mt-10 group-hover:text-blue`}>{guide.title}</h3>
                <p className={`${type.body} mt-3 flex-1`}>{guide.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-base font-medium text-blue">
                  {"download" in guide ? "Download PDF" : "Open guide"}
                  <span aria-hidden>{"download" in guide ? "↓" : "→"}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>

      <Sheet round="top" className="flex flex-col gap-20 lg:gap-28">
        <SectionHeading eyebrow="Articles" title="Product, research, and perspective." />
        {groupOrder.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`} className="border-t border-hair pt-10 lg:grid lg:grid-cols-3 lg:gap-x-10">
            <div className="max-w-md">
              <Eyebrow>{groups[group].label}</Eyebrow>
              <h2 id={`group-${group}`} className="sr-only">{groups[group].label}</h2>
              <p className={`${type.body} mt-4`}>{groups[group].description}</p>
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-2 lg:mt-0">
              {resources
                .filter((resource) => resource.group === group)
                .map((resource) => (
                  <li key={resource.slug}>
                    <ArticleCard resource={resource} showGroup={false} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Sheet>

      <CtaSheet heading="Have a question these resources don’t answer?" lead="Book a demo and we will walk through Landing with a sample patient." />
    </main>
  );
}

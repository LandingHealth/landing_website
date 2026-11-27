import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/Article";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { resources } from "@/lib/resources";
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
                className={`group flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center transition-colors duration-150 hover:bg-white/70 motion-reduce:transition-none sm:p-8 ${focusRing}`}
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

      <Sheet round="top">
        <SectionHeading eyebrow="Articles" title="Product, research, and perspective." />
        <ul className="mt-10 grid gap-x-10 gap-y-[30px] sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.slug} className="min-w-0">
              <ArticleCard resource={resource} rowOnPhones />
            </li>
          ))}
        </ul>
      </Sheet>
    </main>
  );
}

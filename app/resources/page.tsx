import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { coverImage, resources } from "@/lib/resources";
import { container, edgePad, flyerHref, type } from "@/lib/site";

const guides = [
  { title: "Getting started", text: "How a clinic gets set up on Landing, step by step.", href: "/getting-started" },
  { title: "Security questions", text: "Where patient data lives, who can access it, and how deletion works.", href: "/security" },
  { title: "Model your clinic’s numbers", text: "Estimate time saved and between-visit program revenue with your own inputs.", href: "/product#revenue" },
  { title: "Clinic flyer (PDF)", text: "A one-page summary of Landing to share with your team.", href: flyerHref },
] as const;

export const metadata: Metadata = {
  title: "Resources | Landing",
  description: "Practical guides for clinics, and the long-term vision behind Landing.",
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Resources</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Practical guides for clinics, and the long-term vision behind Landing.
          </p>
        </div>
        <div className={`${container} mt-14 sm:mt-16`}>
          <h2 className={type.h2}>Guides</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map(({ title, text, href }) => (
              <li key={title}>
                <a
                  href={href}
                  className="block h-full rounded-xl bg-paper p-5 hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-6"
                >
                  <p className="text-[15px] font-medium leading-snug">{title}</p>
                  <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>
                </a>
              </li>
            ))}
          </ul>
          <h2 className={`${type.h2} mt-20 sm:mt-24`}>Articles</h2>
        </div>
        <ul className={`${edgePad} mt-8 grid gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3`}>
          {resources.map(({ kind, title, summary, href, cover }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  className={`${coverImage} aspect-3/2`}
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <p className="mt-5 text-[15px]">{kind}</p>
                <h3 className={`${type.h3} mt-2`}>{title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6]">{summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { coverImage, resources } from "@/lib/resources";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | Landing",
  description: "Writing from Landing on physical therapy, recovery, and the data between visits.",
};

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
        <ul className="mx-auto mt-14 max-w-3xl space-y-16 px-6 sm:mt-16">
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
                  className={coverImage}
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                />
                <p className="mt-5 text-[15px]">{kind}</p>
                <h2 className={`${type.h3} mt-2 sm:text-3xl`}>{title}</h2>
                <p className="mt-2 text-[15px] leading-[1.6]">{summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

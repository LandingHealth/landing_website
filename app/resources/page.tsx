import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { coverImage, resources } from "@/lib/resources";
import { container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | Landing",
  description: "Our long-term vision for physical therapy, and the bets we’re making to get there.",
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Resources</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Our long-term vision for physical therapy, and the bets we’re making to get there.
          </p>
        </div>
        <ul className={`${edgePad} mt-14 grid gap-x-3 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3`}>
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <p className="mt-5 text-[15px]">{kind}</p>
                <h2 className={`${type.h3} mt-2`}>{title}</h2>
                <p className="mt-2 text-[15px] leading-[1.6]">{summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

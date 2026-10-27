import Image from "next/image";
import Link from "next/link";
import { coverImage, type Resource } from "@/lib/resources";
import { container, type } from "@/lib/site";

export const text = "text-[15px] leading-[1.6]";
export const body = `mt-5 ${text}`;

export default function Article({ resource, children }: { resource: Resource; children: React.ReactNode }) {
  const { kind, title, summary, cover } = resource;
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <p className="text-[15px]">{kind}</p>
          <h1 className={`${type.h1} mt-4 max-w-4xl`}>{title}</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>{summary}</p>
        </div>
        <div className="mx-auto mt-14 max-w-4xl px-6 sm:mt-16">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            className={coverImage}
            priority
            sizes="(min-width: 896px) 848px, 100vw"
          />
        </div>
        <article className="mx-auto mt-14 max-w-[38rem] px-6 sm:mt-16">
          {children}
          <p className={`mt-12 ${text}`}>
            <Link href="/resources" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              Back to resources
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}

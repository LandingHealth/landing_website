import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ShareLink from "@/components/ShareLink";
import { coverImage, type Resource } from "@/lib/resources";
import { container, edgePad, type } from "@/lib/site";

export const text = "text-[15px] leading-[1.6]";
export const body = `mt-5 ${text}`;

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type ArticleSection = { heading: string; content: ReactNode };

const slug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function Note({ children }: { children: ReactNode }) {
  return (
    <span className="group">
      <label className="-mr-1 -my-2 inline-block cursor-pointer py-2 pl-px pr-2 align-super text-[11px] leading-none text-accent-text [counter-increment:note] after:content-[counter(note)] xl:pointer-events-none xl:m-0 xl:p-0 xl:pl-px">
        <input type="checkbox" className="sr-only xl:hidden" />
        <span className="sr-only">Note </span>
      </label>
      <span className="my-2 hidden text-[13px] leading-[1.55] [&_a]:rounded-sm [&_a]:underline [&_a]:underline-offset-2 [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-ink before:mr-1 before:text-accent-text before:content-[counter(note)] group-has-checked:block xl:float-right xl:clear-right xl:-mr-[17rem] xl:my-0 xl:mb-3 xl:block xl:w-56">
        {children}
      </span>
    </span>
  );
}

export default function Article({
  resource,
  intro,
  sections,
}: {
  resource: Resource;
  intro: ReactNode;
  sections: ReadonlyArray<ArticleSection>;
}) {
  const { kind, title, summary, authors, cover } = resource;
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <p className="text-[15px]">{kind}</p>
          <h1 className={`${type.h1} mt-4 max-w-4xl`}>{title}</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>{summary}</p>
          <div className="mt-8 text-[15px]">
            <p>Written by</p>
            <ul className="mt-1 flex flex-wrap justify-center gap-x-3">
              {authors.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`rounded-sm underline underline-offset-4 ${focusRing}`}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${edgePad} mt-14 sm:mt-16`}>
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            className={`${coverImage} aspect-3/2 sm:aspect-5/2`}
            priority
            sizes="100vw"
          />
        </div>
        <div className={`${edgePad} mt-14 sm:mt-16 xl:grid xl:grid-cols-[minmax(14rem,1fr)_minmax(0,45rem)_minmax(14rem,1fr)] xl:gap-x-12`}>
          <nav aria-label="Jump to" className="hidden xl:block">
            <div className="sticky top-24">
              <p className="text-[13px]">Jump to</p>
              <ul className="mt-3 space-y-2 border-l border-ink/15 pl-4">
                {sections.map(({ heading }) => (
                  <li key={heading}>
                    <a href={`#${slug(heading)}`} className={`rounded-sm text-[15px] leading-[1.4] hover:underline ${focusRing}`}>
                      {heading}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ShareLink />
              </div>
            </div>
          </nav>
          <article className="mx-auto max-w-[45rem] [counter-reset:note] xl:max-w-none">
            {intro}
            {sections.map(({ heading, content }) => (
              <section key={heading} id={slug(heading)} className="scroll-mt-24">
                <h2 className={`${type.h3} mt-12`}>{heading}</h2>
                {content}
              </section>
            ))}
            <p className={`mt-12 ${text}`}>
              <Link href="/resources" className={`rounded-sm hover:underline ${focusRing}`}>
                Back to resources
              </Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

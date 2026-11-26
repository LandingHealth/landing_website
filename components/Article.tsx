import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ShareLink from "@/components/ShareLink";
import BackLink from "@/components/ui/BackLink";
import CtaSheet from "@/components/ui/CtaSheet";
import { formatPublished, groups, resourceBySlug, statusLabel, type Resource, type Slug } from "@/lib/resources";
import { container, focusRing, type } from "@/lib/site";

const text = type.prose;
export const body = `mt-5 ${text}`;

const link = `rounded-sm text-blue underline decoration-blue/30 underline-offset-2 hover:decoration-blue ${focusRing}`;

const prose = `${text} [&_a]:rounded-sm [&_a]:text-blue [&_a]:underline [&_a]:decoration-blue/30 [&_a]:underline-offset-2 [&_a:hover]:decoration-blue [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-ink [&>h2]:mt-12 [&>h2]:text-2xl [&>h2]:leading-[1.2] [&>h2]:font-semibold [&>h2]:tracking-[-0.01em] [&>h2]:text-balance [&>p]:mt-5 [&>p:first-child]:mt-0`;

const measure = "mx-auto w-full max-w-[680px]";

export function articleMetadata(slug: Slug): Metadata {
  const { title, description } = resourceBySlug[slug];
  return { title: `${title} | Landing`, description };
}

export type Sources<Key extends string> = { cite: (key: Key) => ReactNode; list: readonly ReactNode[] };

// Numbers follow the order of the map, so list the sources in the order the body cites them.
export function defineSources<Key extends string>(entries: Record<Key, ReactNode>): Sources<Key> {
  const keys = Object.keys(entries) as Key[];
  return {
    cite: (key) => {
      const n = keys.indexOf(key) + 1;
      return (
        <sup className="ml-px text-[0.7em] leading-none">
          <a href={`#source-${n}`} id={`cite-${n}`} aria-label={`Source ${n}`} className="no-underline!">
            {n}
          </a>
        </sup>
      );
    },
    list: keys.map((key) => entries[key]),
  };
}

export function ArticleTags({ resource, showGroup = true, className = "" }: { resource: Resource; showGroup?: boolean; className?: string }) {
  if (!showGroup && !resource.status) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      {showGroup && <span className={`${type.label} text-blue`}>{groups[resource.group].label}</span>}
      {resource.status && (
        <span className={`${type.label} rounded-[4px] bg-blue/10 px-2 py-1 text-blue`}>{statusLabel[resource.status]}</span>
      )}
    </div>
  );
}

export function ArticleCard({ resource, showGroup = true }: { resource: Resource; showGroup?: boolean }) {
  const { href, title, description, cover, published } = resource;
  return (
    <Link href={href} className={`group flex h-full flex-col rounded-3xl ${focusRing}`}>
      <Image
        src={cover.src}
        alt=""
        width={cover.width}
        height={cover.height}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-3/2 w-full rounded-2xl bg-fog object-cover ring-1 ring-ink/5 transition-opacity duration-300 group-hover:opacity-90 motion-reduce:transition-none"
      />
      <ArticleTags resource={resource} showGroup={showGroup} className="mt-5" />
      <h3 className={`${type.h3} ${showGroup || resource.status ? "mt-3" : "mt-5"} text-balance group-hover:text-blue`}>{title}</h3>
      <p className={`${type.body} mt-3`}>{description}</p>
      <p className="mt-4 text-sm text-mute">
        <time dateTime={published}>{formatPublished(published)}</time>
      </p>
    </Link>
  );
}

export default function Article({
  slug,
  sources,
  children,
}: {
  slug: Slug;
  sources: Pick<Sources<string>, "list">;
  children: ReactNode;
}) {
  const resource = resourceBySlug[slug];
  const { title, author, published, takeaway, related } = resource;
  return (
    <main>
      <article className={`${container} pt-16 pb-20 sm:pt-24 lg:pb-28`}>
        <header className={measure}>
          <BackLink href="/resources" label="Resources" />
          <ArticleTags resource={resource} className="mt-8" />
          <h1 className={`${type.h1} mt-4`}>{title}</h1>
          <div className={`${type.small} mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-hair py-4`}>
            <p className="text-slate">
              By{" "}
              <a href={author.href} target="_blank" rel="noopener noreferrer" className={link}>
                {author.name}
              </a>
              <span aria-hidden className="mx-2 text-hair">|</span>
              <time dateTime={published}>{formatPublished(published)}</time>
            </p>
            <ShareLink />
          </div>
        </header>

        <aside aria-label="Takeaway" className={`${measure} mt-10 rounded-2xl bg-fog p-6 sm:p-8`}>
          <p className={`${type.label} text-blue`}>Takeaway</p>
          <p className={`${text} mt-3 text-pretty`}>{takeaway}</p>
        </aside>

        <div className={`${measure} ${prose} mt-12`}>{children}</div>

        <section aria-labelledby="sources" className={`${measure} mt-16 border-t border-hair pt-10`}>
          <h2 id="sources" className={type.h3}>Notes and sources</h2>
          <ol className={`${type.small} mt-6 list-decimal space-y-3 pl-6 leading-[1.55] text-slate marker:text-blue`}>
            {sources.list.map((source, index) => (
              <li
                key={index}
                id={`source-${index + 1}`}
                className="scroll-mt-28 pl-1 break-words [&_a]:rounded-sm [&_a]:text-blue [&_a]:underline [&_a]:decoration-blue/30 [&_a]:underline-offset-2 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-ink"
              >
                {source}{" "}
                <a href={`#cite-${index + 1}`} aria-label={`Back to citation ${index + 1}`} className="no-underline!">
                  ↑
                </a>
              </li>
            ))}
          </ol>
        </section>
      </article>

      <section aria-labelledby="related" className="bg-fog [--reveal-mask:var(--color-fog)]">
        <div className={`${container} py-16 lg:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related" className={type.h2}>Related reading</h2>
            <Link href="/resources" className={`${link} text-base`}>All resources</Link>
          </div>
          <ul className={`mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 ${related.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {related.map((relatedSlug) => (
              <li key={relatedSlug}>
                <ArticleCard resource={resourceBySlug[relatedSlug]} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSheet heading="Questions about this article? Talk with us." lead="Book a demo to see Landing, or email the team about anything in this article." />
    </main>
  );
}

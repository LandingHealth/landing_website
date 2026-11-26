import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import IndexNumber from "@/components/ui/IndexNumber";
import { container, focusRing, type } from "@/lib/site";

export const proseLink = `rounded-sm text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue ${focusRing}`;

export type JumpLink = { id: string; label: string; note?: string };

export function TrustHero({
  eyebrow,
  title,
  lead,
  meta,
  jumpLinks,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  meta?: ReactNode;
  jumpLinks: readonly JumpLink[];
}) {
  return (
    <section className={`${container} pt-16 pb-16 lg:pt-24 lg:pb-20`}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h1 className={type.h1}>{title}</h1>
        <p className={`${type.lead} mt-6 max-w-2xl text-pretty`}>{lead}</p>
        {meta && <p className={`${type.label} mt-6 text-mute`}>{meta}</p>}
      </div>
      <nav aria-label="On this page" className="mx-auto mt-14 max-w-5xl lg:mt-16">
        <p className={`${type.label} text-mute`}>On this page</p>
        <ol className="mt-3 grid border-t border-hair md:grid-cols-3 md:gap-x-10">
          {jumpLinks.map(({ id, label, note }, index) => (
            <li key={id} className="border-b border-hair">
              <a href={`#${id}`} className={`group flex gap-4 py-3.5 ${focusRing}`}>
                <IndexNumber index={index} />
                <span>
                  <span className="block font-medium text-ink group-hover:text-blue">{label}</span>
                  {note && <span className={`${type.small} mt-1 block leading-[1.4] text-slate`}>{note}</span>}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

export function TrustSection({
  id,
  index,
  title,
  aside,
  children,
}: {
  id: string;
  index: number;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 first:pt-0 last:pb-0 lg:grid lg:grid-cols-4 lg:gap-x-10">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <IndexNumber index={index} />
        <h2 id={`${id}-title`} className={`${type.h3} mt-3 text-balance`}>{title}</h2>
        {aside}
      </div>
      <div className="mt-8 min-w-0 lg:col-span-3 lg:mt-0">{children}</div>
    </section>
  );
}

export type TrustRow = { label: string; body: ReactNode };

export function RuledRows({ rows }: { rows: readonly TrustRow[] }) {
  return (
    <dl className="border-t border-hair">
      {rows.map(({ label, body }) => (
        <div key={label} className="grid gap-2 border-b border-hair py-5 md:grid-cols-3 md:gap-10">
          <dt className="font-medium leading-[1.35] text-ink">{label}</dt>
          <dd className={`${type.body} md:col-span-2`}>{body}</dd>
        </div>
      ))}
    </dl>
  );
}

import type { Metadata } from "next";
import ExpandableMedia from "@/components/ExpandableMedia";
import { safesock } from "@/lib/safesock";
import { container, sectionPad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "SafeSock | Landing",
  description: safesock.summary,
};

const section = `${sectionPad} border-t border-ink/10`;

export default function SafeSockPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <span className="rounded-full bg-blue/10 text-blue px-3 py-1 text-xs font-medium">{safesock.status}</span>
          <h1 className={`${type.h1} mt-6 max-w-4xl`}>A closer look at loading between visits.</h1>
          <p className={`${type.lead} mt-6 max-w-[38rem] text-pretty`}>{safesock.summary}</p>
        </div>
        <div className={`${container} mt-12 sm:mt-14`}>
          <ExpandableMedia
            media={{ video: safesock.video }}
            title="SafeSock"
            className="aspect-[2084/1134] w-full rounded-xl bg-black ring-1 ring-ink/10"
          />
        </div>
        <dl className={`${container} mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4`}>
          {safesock.atAGlance.map(({ term, detail }) => (
            <div key={term} className="border-t border-ink pt-4">
              <dt className="text-[15px] font-medium">{term}</dt>
              <dd className="mt-2 text-[15px] leading-[1.6]">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={section}>
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-20`}>
          <h2 className={`${type.h2} lg:col-span-5`}>The limit is set in the clinic. The loading happens at home.</h2>
          <div className="space-y-5 lg:col-span-7">
            {safesock.problem.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-[15px] leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <h2 className={`${type.h2} max-w-3xl`}>How a PT would use it</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {safesock.steps.map(({ title, text }, i) => (
              <li key={title} className="border-t border-ink pt-4">
                <p className="text-[15px] font-medium">
                  {i + 1}. {title}
                </p>
                <p className="mt-2 text-[15px] leading-[1.6]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

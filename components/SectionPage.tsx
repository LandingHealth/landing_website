import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";
import { card, container, sectionPad, stagger, type } from "@/lib/site";

type SectionPageProps = {
  label: string;
  title: string;
  intro: string;
  sectionTitle: string;
  details: ReadonlyArray<{ heading: string; text: string }>;
  team?: ReadonlyArray<string>;
  children?: React.ReactNode;
};

const index = (i: number) => String(i + 1).padStart(2, "0");
export default function SectionPage({
  label,
  title,
  intro,
  sectionTitle,
  details,
  team,
  children,
}: SectionPageProps) {
  return (
    <main className="overflow-x-clip">
      <section className="bg-mist pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className={container}>
          <p data-reveal className={`${type.label} text-accent-deep`}>Landing / {label}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1 data-reveal style={stagger(1)} className={`${type.h1} lg:col-span-7`}>{title}</h1>
            <p data-reveal style={stagger(2)} className={`${type.body} lg:col-span-5`}>{intro}</p>
          </div>
        </div>
      </section>

      <section className={`border-t border-ink/10 bg-paper ${sectionPad}`}>
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={label} title={sectionTitle} />
          </div>
          <div className="space-y-4 lg:col-span-8">
            {details.map(({ heading, text }, i) => (
              <div key={heading} data-reveal style={stagger(i)}>
                <article className={`${card} grid gap-3 p-6 sm:grid-cols-[3rem_1fr] sm:gap-6`}>
                  <span aria-hidden="true" className={`${type.label} pt-1.5 text-accent-deep`}>{index(i)}</span>
                  <div>
                    <h3 className={type.h3}>{heading}</h3>
                    <p className="mt-2 max-w-prose text-[15px] leading-[1.6] text-slate">{text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {team && (
        <section className={`bg-ink text-paper ${sectionPad}`}>
          <div className={`${container} space-y-12`}>
            <SectionHeader eyebrow="Team" title="Meet the team" onInk />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((entry, i) => {
                const [name, role] = entry.split(" · ");
                return (
                  <li key={entry} data-reveal style={stagger(i)}>
                    <div className="h-full rounded-xl border border-white/15 p-6 transition-colors duration-200 hover:border-white/30">
                      <p className="text-xl font-semibold tracking-[-0.02em]">{name}</p>
                      <p className={`${type.label} mt-2 text-on-ink/70`}>{role}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </main>
  );
}

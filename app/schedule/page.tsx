import type { Metadata } from "next";
import Image from "next/image";
import { container, edgePad, stagger, type } from "@/lib/site";
import { demoAnchor, team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Schedule | Landing",
  description: "Book an intro meeting with the Landing team.",
};

const hosts = team.flatMap(({ demo, ...member }) => (demo ? [{ ...member, demo }] : []));

export default function SchedulePage() {
  return (
    <main className="overflow-x-clip">
      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className={container}>
          <p data-reveal className={`${type.label} text-accent-deep`}>Landing / Schedule</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1 data-reveal style={stagger(1)} className={`${type.h1} lg:col-span-7`}>Make more room for care.</h1>
            <p data-reveal style={stagger(2)} className={`${type.body} lg:col-span-5`}>
              We’re building scheduling tools to help you set availability around demand and give patients a simple way to book online sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className={`${edgePad} flex flex-col gap-6`}>
          {hosts.map(({ name, role, photo, demo }) => (
            <article
              key={name}
              id={demoAnchor(demo.host)}
              className="isolate scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-ink text-white md:grid md:grid-cols-[320px_1fr]"
            >
              <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="aspect-square h-auto w-full max-w-48 rounded-xl object-cover md:max-w-none"
                />
                <p className="mt-4 text-[15px] font-medium leading-snug">{name}</p>
                <p className="mt-1 text-[15px] leading-[1.5] text-white/70">{role}</p>
                <h2 className="mt-4 font-display text-2xl font-medium">Landing Health intro meeting</h2>
              </div>
              {demo.calendly ? (
                // Calendly's color params need a paid plan, so the iframe is inverted and screened onto the navy card.
                <iframe
                  src={`${demo.calendly}?embed_type=Inline&embed_domain=getlandinghealth.com&hide_event_type_details=1&hide_gdpr_banner=1`}
                  title={`Book a meeting with ${name}`}
                  loading="lazy"
                  className="h-[700px] w-full border-0 mix-blend-screen [filter:invert(1)_hue-rotate(180deg)]"
                />
              ) : (
                <div className="flex min-h-48 items-center justify-center p-6 text-center">
                  <p className="text-[15px]">{demo.host}’s calendar is coming soon.</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

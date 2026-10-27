import type { Metadata } from "next";
import Image from "next/image";
import { container, demoHref, edgePad, type } from "@/lib/site";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Schedule | Landing",
  description: "Book an intro meeting with the Landing team.",
};

const hosts = team.filter((member) => member.demoHost);

export default function SchedulePage() {
  return (
    <main className="overflow-x-clip">
      <section className="pb-4 pt-10 sm:pt-12 lg:pt-6">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Schedule a demo</h1>
          <p className={`${type.lead} mt-3 max-w-[40rem] text-pretty`}>
            Pick a time to meet our team. We’ll walk you through the workspace and answer your questions.
          </p>
        </div>
        <div className={`${edgePad} mt-6`}>
          <div className="isolate overflow-hidden rounded-2xl border border-white/10 bg-ink text-white lg:grid lg:grid-cols-[176px_1fr]">
            <div className="grid grid-cols-3 gap-3 border-b border-white/10 p-5 lg:flex lg:flex-col lg:justify-center lg:border-b-0 lg:border-r">
              {hosts.map(({ name, photo }) => (
                <figure key={name}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 136px, 30vw"
                    className="aspect-square h-auto w-full rounded-xl object-cover"
                  />
                  <figcaption className="mt-2 text-[15px] font-medium leading-snug">{name}</figcaption>
                </figure>
              ))}
            </div>
            {/* Calendly's color params need a paid plan. */}
            <div className="bg-mist">
              <iframe
                src={`${demoHref}?embed_type=Inline&embed_domain=getlandinghealth.com&hide_event_type_details=1&hide_gdpr_banner=1`}
                title="Book a demo with Landing"
                loading="lazy"
                className="block h-[700px] w-full border-0 mix-blend-multiply lg:h-[clamp(560px,calc(100svh-15rem),700px)]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

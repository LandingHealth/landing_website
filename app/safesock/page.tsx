import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import LoadHistoryPreview from "@/components/sections/safesock/LoadHistoryPreview";
import RenderStills from "@/components/sections/safesock/RenderStills";
import ScrubStage from "@/components/sections/safesock/ScrubStage";
import CtaSheet from "@/components/ui/CtaSheet";
import DarkCard from "@/components/ui/DarkCard";
import GradientFrame from "@/components/ui/GradientFrame";
import NumberedRows from "@/components/ui/NumberedRows";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { safesock } from "@/lib/safesock";
import { container, demoHref, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "SafeSock | Landing",
  description: safesock.summary,
};

const noScript = "[data-safesock-stage]{display:none!important}[data-safesock-stills]{display:block!important}";

function ConceptLabel() {
  return (
    <span className={`${type.label} absolute top-4 left-4 rounded-[4px] bg-white/85 px-2 py-1 text-slate sm:top-5 sm:left-5`}>
      Concept render
    </span>
  );
}

export default function SafeSockPage() {
  return (
    <main>
      <noscript>
        <style>{noScript}</style>
      </noscript>

      <section className={`${container} flex flex-col items-center pt-16 pb-14 text-center lg:pt-24 lg:pb-16`}>
        <p className={`${type.label} inline-flex items-center gap-2 rounded-[4px] bg-fog px-3 py-1.5 text-ink`}>
          <span aria-hidden className="size-1.5 rounded-full bg-blue" />
          In development
        </p>
        <h1 className={`${type.h1} mt-6`}>SafeSock</h1>
        <p className={`${type.lead} mt-6 max-w-xl text-pretty`}>{safesock.purpose}</p>
        <p className={`${type.small} mt-4 max-w-xl leading-[1.45] text-mute text-pretty`}>{safesock.status}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={demoHref} variant="primary">Talk about SafeSock</ButtonLink>
          <ButtonLink href="#workflow" variant="secondary">How it would work</ButtonLink>
        </div>
      </section>

      <Sheet tone="fog" round="top" bleed label="SafeSock concept render">
        <ScrubStage {...safesock.scrub} beats={safesock.beats} />
        <RenderStills beats={safesock.beats} />
      </Sheet>

      <Sheet tone="white" round="top">
        <SectionHeading
          eyebrow="Design"
          title="A closer look."
          lead="The sleeve, how it fits, and where the sensors sit. These are concept renders of the design, not photos of the prototype."
        />
        <div className="mt-12 grid gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-2 lg:gap-y-16">
          {safesock.closeUps.map(({ title, body, image }, index) => (
            <figure key={title} data-reveal className={index === 0 ? "lg:col-span-2" : ""}>
              <div className="relative overflow-hidden rounded-3xl bg-fog">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={index === 0 ? "(min-width: 1440px) 1280px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                  className="w-full"
                />
                <ConceptLabel />
              </div>
              <figcaption className={`${type.body} mt-5 max-w-xl`}>
                <span className="font-semibold text-ink">{title}</span> {body}
              </figcaption>
            </figure>
          ))}
        </div>
      </Sheet>

      <Sheet tone="fog" round="top">
        <SectionHeading
          align="split"
          eyebrow="Why it matters"
          title="The limit is set in the clinic. The loading happens at home."
        />
        <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-x-10">
          <div className="space-y-4 lg:col-span-2 lg:col-start-2">
            {safesock.problem.map((paragraph) => (
              <p key={paragraph} className={type.body}>{paragraph}</p>
            ))}
          </div>
        </div>

        <h2 className={`${type.h2} mt-20 lg:mt-28`}>What SafeSock is designed to measure.</h2>
        <NumberedRows items={safesock.measures} reveal="line" className="mt-10" />
      </Sheet>

      <Sheet tone="white" round="top" id="workflow">
        <SectionHeading
          eyebrow="Proposed workflow"
          title="How it would help you review loading."
          lead="Nothing in Landing reads SafeSock data yet. This is how we intend it to work with the rest of the patient’s care."
        />
        <GradientFrame className="mt-12 lg:mt-16">
          <LoadHistoryPreview />
        </GradientFrame>
        <NumberedRows items={safesock.steps} reveal="fade" className="mt-12" />
      </Sheet>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard
          eyebrow="Development status"
          title="In development."
          body="Here is where each part of SafeSock stands today."
          items={safesock.development}
        />
      </div>

      <CtaSheet heading="Talk about SafeSock" primary={{ label: "Talk about SafeSock", href: demoHref }} lead="Tell us how you manage weight-bearing limits today, and we’ll walk you through where SafeSock stands." />
    </main>
  );
}

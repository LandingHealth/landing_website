import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import LoadingChart from "@/components/sections/safesock/LoadingChart";
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

export default function SafeSockPage() {
  return (
    <main>
      <section className={`${container} grid items-center gap-x-16 gap-y-12 pt-12 pb-16 lg:grid-cols-2 lg:pt-16 lg:pb-20`}>
        <div className="flex flex-col items-center text-center">
          <h1 className={type.h1}>SafeSock</h1>
          <p className={`${type.lead} mt-6 max-w-xl text-pretty`}>{safesock.purpose}</p>
          <p className={`${type.small} mt-4 max-w-xl leading-[1.45] text-mute text-pretty`}>{safesock.status}</p>
          <div data-header-cta className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={demoHref} variant="primary">Talk about SafeSock</ButtonLink>
            <ButtonLink href="#workflow" variant="secondary">How it would work</ButtonLink>
          </div>
        </div>
        <figure className="relative overflow-hidden rounded-3xl bg-[#f1f1ee]">
          <Image
            src={safesock.hero.src}
            alt={safesock.hero.alt}
            width={safesock.hero.width}
            height={safesock.hero.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="w-full"
          />
          <figcaption className={`${type.label} absolute right-4 bottom-4 text-ink/45 sm:right-5 sm:bottom-5`}>
            Concept render
          </figcaption>
        </figure>
      </section>

      <Sheet tone="fog" round="top">
        <SectionHeading align="center" title="The limit is set in the clinic. The loading happens at home." />
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-center">
          {safesock.problem.map((paragraph) => (
            <p key={paragraph} className={`${type.body} mx-auto`}>{paragraph}</p>
          ))}
        </div>

        <DarkCard
          eyebrow="What it measures"
          title="What SafeSock is designed to measure."
          items={safesock.measures}
          className="mt-20 lg:mt-28"
        />
      </Sheet>

      <Sheet tone="white" round="top" id="workflow">
        <SectionHeading
          eyebrow="Proposed workflow"
          title="How it would help you review loading."
        />
        <GradientFrame className="mt-12 lg:mt-16">
          <LoadingChart />
        </GradientFrame>
        <NumberedRows items={safesock.steps} reveal="fade" className="mt-12" />
      </Sheet>
    </main>
  );
}

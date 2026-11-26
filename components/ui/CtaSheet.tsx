import ButtonLink from "@/components/ButtonLink";
import { demo, demoHref, type } from "@/lib/site";

// Rendered once by the root layout, so every page closes on the same call to action.
export default function CtaSheet() {
  return (
    <section className="bg-cta px-4 py-32 text-center text-white sm:px-10 lg:py-48">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <h2 className={type.h2}>{demo.heading}</h2>
        <p className="mt-5 max-w-xl text-base leading-[1.45] text-pretty text-white/85 sm:text-lg">{demo.sees}</p>
        <ButtonLink href={demoHref} variant="light" className="mt-8">Book a demo</ButtonLink>
      </div>
    </section>
  );
}

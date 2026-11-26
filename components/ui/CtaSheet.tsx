import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import { contactHref, demoHref, type } from "@/lib/site";

type Action = { label: string; href: string };

export default function CtaSheet({
  heading = "See how Landing fits your clinic.",
  lead,
  secondary = { label: "Contact us", href: contactHref },
  children,
}: {
  heading?: string;
  lead?: string;
  secondary?: Action | null;
  children?: ReactNode;
}) {
  return (
    <section className="bg-cta relative overflow-hidden rounded-3xl px-4 pt-20 text-center sm:rounded-[2.5rem] sm:px-10 lg:pt-30">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-7.5">
        <h2 className={type.h2}>{heading}</h2>
        {lead && <p className={`${type.lead} max-w-xl text-pretty`}>{lead}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={demoHref} variant="primary">Book a demo</ButtonLink>
          {secondary && <ButtonLink href={secondary.href} variant="secondary">{secondary.label}</ButtonLink>}
        </div>
        {children}
      </div>
      <p
        aria-hidden
        className="mt-12 -mb-[0.24em] bg-linear-to-b from-white/80 to-white/25 bg-clip-text text-[clamp(5.5rem,23.3vw,21rem)] leading-none font-semibold tracking-[-0.03em] text-transparent select-none lg:mt-16"
      >
        Landing
      </p>
    </section>
  );
}

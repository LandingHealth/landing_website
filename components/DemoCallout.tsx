import ButtonLink from "@/components/ButtonLink";
import { container, demo, demoHref, sectionPad, type } from "@/lib/site";
import type { ReactNode } from "react";

export default function DemoCallout({
  title = "See how Landing fits your clinic.",
  action = "Book a demo",
  children,
}: {
  title?: string;
  action?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`${sectionPad} border-t border-ink/10`}>
      <div className={`${container} flex flex-col items-center text-center`}>
        <h2 className={`${type.h2} max-w-3xl`}>{title}</h2>
        <p className={`${type.lead} mt-5 max-w-[36rem] text-pretty`}>{demo.sees}</p>
        <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.6] text-pretty">{demo.prep}</p>
        <div className="mt-10">
          <ButtonLink href={demoHref} variant="primary">
            {action}
          </ButtonLink>
        </div>
        {children}
      </div>
    </section>
  );
}

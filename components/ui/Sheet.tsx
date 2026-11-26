import type { ReactNode } from "react";
import { container, sectionPad } from "@/lib/site";

const tones = {
  white: { sheet: "bg-white", under: "bg-fog" },
  fog: { sheet: "bg-fog [--reveal-mask:var(--color-fog)]", under: "bg-white" },
} as const;

const corners = {
  top: "rounded-t-3xl sm:rounded-t-[2.5rem]",
  bottom: "rounded-b-3xl sm:rounded-b-[2.5rem]",
  both: "rounded-3xl sm:rounded-[2.5rem]",
} as const;

// The rounded corners reveal the other tone, which reads as this sheet overlapping its neighbor without negative margins.
export default function Sheet({
  tone = "white",
  round,
  id,
  label,
  bleed = false,
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  round?: keyof typeof corners;
  id?: string;
  label?: string;
  bleed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const section = (
    <section
      id={id}
      aria-label={label}
      className={`scroll-mt-24 ${tones[tone].sheet} ${round ? corners[round] : ""} ${bleed ? className : sectionPad}`}
    >
      {bleed ? children : <div className={`${container} ${className}`}>{children}</div>}
    </section>
  );
  return round ? <div className={tones[tone].under}>{section}</div> : section;
}

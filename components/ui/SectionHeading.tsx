import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { type } from "@/lib/site";

const layout = {
  left: { root: "max-w-3xl", text: "" },
  center: { root: "mx-auto flex max-w-3xl flex-col items-center text-center", text: "" },
  split: { root: "lg:grid lg:grid-cols-4 lg:gap-x-10", text: "lg:col-span-2" },
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  onDark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: keyof typeof layout;
  as?: "h1" | "h2";
  onDark?: boolean;
  className?: string;
}) {
  const { root, text } = layout[align];
  return (
    <div className={`${root} ${onDark ? "text-white" : ""} ${className}`}>
      {eyebrow && <Eyebrow onDark={onDark} className={align === "split" ? "mb-4 lg:mb-0 lg:pt-2" : "mb-4"}>{eyebrow}</Eyebrow>}
      <div className={text}>
        <Heading className={Heading === "h1" ? type.h1 : type.h2}>{title}</Heading>
        {lead && <p className={`${onDark ? type.leadOnDark : type.lead} ${Heading === "h1" ? "mt-6" : "mt-4"} max-w-2xl text-pretty`}>{lead}</p>}
      </div>
    </div>
  );
}

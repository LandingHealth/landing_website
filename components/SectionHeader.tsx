import { type } from "@/lib/site";

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  onInk = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onInk?: boolean;
}) {
  return (
    <div data-reveal>
      <p className={`${type.label} ${onInk ? "text-accent-soft" : "text-accent-deep"}`}>{eyebrow}</p>
      <h2 className={`${type.h2} mt-4 max-w-3xl`}>{title}</h2>
      {lead && <p className={`${onInk ? type.bodyOnInk : type.body} mt-5`}>{lead}</p>}
    </div>
  );
}

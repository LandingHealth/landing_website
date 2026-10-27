import { type } from "@/lib/site";

export default function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div data-reveal>
      <p className={`${type.label} text-accent-deep`}>{eyebrow}</p>
      <h2 className={`${type.h2} mt-4 max-w-3xl`}>{title}</h2>
      {lead && <p className={`${type.body} mt-5`}>{lead}</p>}
    </div>
  );
}

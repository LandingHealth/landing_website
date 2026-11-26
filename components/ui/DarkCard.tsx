import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/ui/Eyebrow";
import IndexNumber from "@/components/ui/IndexNumber";
import { type } from "@/lib/site";

export type DarkCardItem = { title: string; body: string };

export default function DarkCard({
  eyebrow,
  title,
  body,
  items,
  action,
  stat,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  items: readonly DarkCardItem[];
  action?: { label: string; href: string };
  stat?: { value: string; label: string };
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-blue px-6 py-10 text-white sm:p-12 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:p-16 ${className}`}>
      <div className="flex flex-col items-start">
        {eyebrow && <Eyebrow onDark className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className={type.h2}>{title}</h2>
        {body && <p className={`${type.bodyOnDark} mt-3`}>{body}</p>}
        {stat && (
          <div className="mt-10 w-full border-t border-white/25 pt-6 lg:mt-auto">
            <p className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none font-[380] tracking-[-0.02em] [font-stretch:110%]">
              {stat.value}
            </p>
            <p className={`${type.bodyOnDark} mt-3`}>{stat.label}</p>
          </div>
        )}
        {action && (
          <ButtonLink href={action.href} variant="onDark" className={stat ? "mt-8" : "mt-8 lg:mt-auto"}>
            {action.label}
          </ButtonLink>
        )}
      </div>
      <ol className="mt-10 divide-y divide-white/25 lg:mt-0">
        {items.map(({ title: itemTitle, body: itemBody }, index) => (
          <li key={itemTitle} className="grid grid-cols-[2.5rem_1fr] items-baseline py-6 first:pt-0 last:pb-0">
            <IndexNumber index={index} onDark />
            <h3 className={type.h3}>{itemTitle}</h3>
            <p className={`${type.bodyOnDark} col-start-2 mt-2`}>{itemBody}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

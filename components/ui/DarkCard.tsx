import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/ui/Eyebrow";
import { type } from "@/lib/site";

export type DarkCardItem = { title: string; body: string };

export default function DarkCard({
  eyebrow,
  title,
  body,
  items,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  items: readonly DarkCardItem[];
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-night px-6 py-12 text-white sm:p-12 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:p-20 ${className}`}>
      <div>
        {eyebrow && <Eyebrow onDark className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className={type.h2}>{title}</h2>
        {body && <p className={`${type.bodyOnDark} mt-8`}>{body}</p>}
        {action && <ButtonLink href={action.href} variant="onDark" className="mt-8">{action.label}</ButtonLink>}
      </div>
      <ol className="mt-12 lg:mt-0">
        {items.map(({ title: itemTitle, body: itemBody }, index) => (
          <li key={itemTitle} className="border-b border-blue-light/40 py-6 first:pt-0">
            <span aria-hidden className="font-mono text-base text-blue-light">{String(index + 1).padStart(2, "0")}</span>
            <h3 className={`${type.h3} mt-3`}>{itemTitle}</h3>
            <p className={`${type.bodyOnDark} mt-4`}>{itemBody}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

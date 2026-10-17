import Link from "next/link";
import { button, type ButtonVariant } from "@/lib/site";

export default function ButtonLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: ButtonVariant;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={button[variant]}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

import Link from "next/link";
import { button, buttonSize, type ButtonSize, type ButtonVariant } from "@/lib/site";

export default function ButtonLink({
  href,
  variant,
  size = "md",
  children,
}: {
  href: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${button[variant]} ${buttonSize[size]}`}>
      {children}
    </Link>
  );
}

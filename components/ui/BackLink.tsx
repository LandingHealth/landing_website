import Link from "next/link";
import { focusRing, type } from "@/lib/site";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={`${type.label} rounded-sm text-slate hover:text-ink ${focusRing}`}>
      {label}
    </Link>
  );
}

import type { ReactNode } from "react";
import { type } from "@/lib/site";

export default function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return <p className={`${type.eyebrow} ${onDark ? "text-white/80" : "text-blue"} ${className}`}>{children}</p>;
}

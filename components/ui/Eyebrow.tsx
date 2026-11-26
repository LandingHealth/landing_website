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
  return <p className={`${type.eyebrow} ${onDark ? "text-blue-light" : "text-blue"} ${className}`}>{children}</p>;
}

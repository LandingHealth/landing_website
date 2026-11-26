import type { ReactNode } from "react";

const sizes = {
  lg: "rounded-3xl p-4 sm:p-10 lg:p-16",
  md: "rounded-2xl p-4 sm:p-8",
} as const;

export default function GradientFrame({
  size = "lg",
  className = "",
  children,
}: {
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`bg-frame flex items-center justify-center overflow-hidden border border-blue/15 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}

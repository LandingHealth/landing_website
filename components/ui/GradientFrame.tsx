import type { ReactNode } from "react";

// Below sm a feature frame is vitalize.care's media tile: 3:2, edge border, glow, with the content centered at 79% width.
// The empty ::before holds the 3:2 height, so taller content grows the tile instead of being cut off.
const phoneTile =
  "max-sm:grid max-sm:grid-cols-1 max-sm:place-items-center max-sm:border-edge max-sm:bg-frame-glow max-sm:p-0 max-sm:before:col-start-1 max-sm:before:row-start-1 max-sm:before:pb-[66.667%] max-sm:before:content-['']";

const sizes = {
  lg: "rounded-3xl p-4 sm:p-10 lg:p-16",
  md: `rounded-2xl p-4 sm:p-8 ${phoneTile}`,
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
      {size === "md" ? <div className="col-start-1 row-start-1 w-[79%] py-3 sm:contents">{children}</div> : children}
    </div>
  );
}

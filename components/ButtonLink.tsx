"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { button, buttonSize, type ButtonSize, type ButtonVariant } from "@/lib/site";

type Ripple = { key: number; x: number; y: number; size: number };

const rippleColor = {
  primary: "bg-white/45",
  secondary: "bg-ink/12",
  onInk: "bg-white/25",
} as const satisfies Record<ButtonVariant, string>;

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
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextKey = useRef(0);

  function addRipple(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples((current) => [
      ...current,
      {
        key: nextKey.current++,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ]);
  }

  function removeRipple(key: number) {
    setRipples((current) => current.filter((ripple) => ripple.key !== key));
  }

  return (
    <Link
      href={href}
      onPointerDown={addRipple}
      className={`${button[variant]} ${buttonSize[size]} relative isolate overflow-hidden`}
    >
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            onAnimationEnd={() => removeRipple(ripple.key)}
            className={`absolute animate-rippling rounded-full ${rippleColor[variant]}`}
            style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
          />
        ))}
      </span>
      <span className="relative">{children}</span>
    </Link>
  );
}

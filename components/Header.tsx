"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { button, container, navigation } from "@/lib/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-mist/80 backdrop-blur-md">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-4 py-2.5 md:flex-nowrap`}>
        <Link
          href="/"
          aria-label="Landing home"
          className={`order-1 flex shrink-0 items-center gap-2.5 rounded-sm ${focusRing}`}
        >
          <Image src="/home-icon.png" alt="" width={1408} height={1408} loading="eager" unoptimized className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-[-0.035em]">Landing</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="order-3 -mx-2 mt-1 flex basis-full overflow-x-auto md:order-2 md:mx-0 md:mt-0 md:basis-auto md:justify-center"
        >
          {navigation.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 rounded-sm px-2 py-2 sm:px-3 text-sm font-medium transition-colors duration-200 hover:text-ink ${focusRing} ${active ? "text-ink" : "text-slate"}`}
              >
                {label}
                {active && <span aria-hidden="true" className="absolute inset-x-2 bottom-0.5 sm:inset-x-3 h-0.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>
        <div className="order-2 md:order-3">
          <Link href="/devices#demo" className={button.primary}>
            Watch the demo
            <span aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

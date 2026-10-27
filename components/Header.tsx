"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import { demoHref, navigation } from "@/lib/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-4 px-6 py-2.5 md:flex-nowrap lg:px-4">
        <Link
          href="/"
          aria-label="Landing Health home"
          className={`order-1 shrink-0 rounded-sm md:mr-auto ${focusRing}`}
        >
          <BrandLogo />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="order-3 mt-1 flex basis-full flex-wrap gap-x-4 overflow-x-auto sm:-mx-3 sm:flex-nowrap sm:gap-1 md:order-2 md:mx-0 md:mt-0 md:basis-auto"
        >
          {navigation.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-md px-1 py-1.5 sm:px-3 md:px-2 lg:px-3 text-sm text-black ${focusRing} ${active ? "font-semibold" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="order-2 md:order-3">
          <ButtonLink href={demoHref} variant="primary" size="sm">Book a demo</ButtonLink>
        </div>
      </div>
    </header>
  );
}

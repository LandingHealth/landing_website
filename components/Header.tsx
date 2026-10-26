"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLockup from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import { container, demoHref, navigation } from "@/lib/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-mist">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-4 py-2.5 md:flex-nowrap`}>
        <Link
          href="/"
          aria-label="Landing Health home"
          className={`order-1 shrink-0 rounded-sm ${focusRing}`}
        >
          <BrandLockup />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="order-3 mt-1 flex basis-full justify-between overflow-x-auto sm:-mx-3 sm:justify-start sm:gap-1 md:order-2 md:mx-0 md:mt-0 md:basis-auto md:justify-center"
        >
          {navigation.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-md px-1.5 py-1.5 sm:px-3 text-sm text-black transition-colors duration-150 ${focusRing} ${active ? "bg-white font-medium" : "hover:bg-ink/5"}`}
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

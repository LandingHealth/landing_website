"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import { demoHref, linkedinHref, navigation } from "@/lib/site";

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
                className={`shrink-0 rounded-md px-1 py-1.5 sm:px-2 md:px-1.5 lg:px-3 text-sm text-black ${focusRing} ${active ? "font-semibold" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="order-2 flex items-center gap-3 md:order-3">
          {/* Ported from Uiverse.io by akshat-patel28 (MIT). */}
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex justify-center rounded-md bg-[#0077b5] p-2 font-semibold text-white drop-shadow-xl transition-all duration-500 hover:translate-y-3 hover:rounded-[50%] ${focusRing}`}
          >
            <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden className="h-5 w-5">
              <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
            </svg>
            <span className="absolute opacity-0 duration-700 group-hover:translate-y-10 group-hover:text-sm group-hover:text-gray-700 group-hover:opacity-100">
              LinkedIn
            </span>
          </a>
          <ButtonLink href={demoHref} variant="primary" size="sm">Book a demo</ButtonLink>
        </div>
      </div>
    </header>
  );
}

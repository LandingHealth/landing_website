"use client";

import { Button, Link as MenuLink, Popover, RouterProvider } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import Icon from "@/components/Icon";
import { demoHref, navigation } from "@/lib/site";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

function PhoneMenu({ pathname }: { pathname: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button isIconOnly variant="ghost" aria-label="Menu" className="size-9 rounded-md text-ink md:hidden">
        <Icon name="menu" className="size-5" />
      </Button>
      <Popover.Content placement="bottom end" className="rounded-xl border border-ink/10">
        <Popover.Dialog aria-label="Menu" className="p-2">
          <RouterProvider navigate={(href) => router.push(href)}>
            <nav aria-label="Phone navigation" className="flex w-52 flex-col">
              {navigation.map(({ label, href }) => (
                <MenuLink
                  key={href}
                  href={href}
                  aria-current={isActive(pathname, href) ? "page" : undefined}
                  onPress={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-base text-ink no-underline ${isActive(pathname, href) ? "font-semibold" : ""}`}
                >
                  {label}
                </MenuLink>
              ))}
            </nav>
          </RouterProvider>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

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
          className="order-3 mt-1 hidden basis-full flex-wrap gap-x-3 overflow-x-auto sm:-mx-3 sm:flex-nowrap sm:gap-1 md:order-2 md:mx-0 md:mt-0 md:flex md:basis-auto"
        >
          {navigation.map(({ label, href }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-md px-1 py-1.5 sm:px-2 md:px-1.5 lg:px-3 text-sm text-ink ${focusRing} ${active ? "font-semibold" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="order-2 flex items-center gap-2 md:order-3 md:gap-3">
          <ButtonLink href={demoHref} variant="primary" size="sm">Book a demo</ButtonLink>
          <PhoneMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

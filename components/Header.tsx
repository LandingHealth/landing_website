"use client";

import { Button, Link as MenuLink, Popover, RouterProvider } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import BrandLockup from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import Icon from "@/components/Icon";
import { contactHref, container, demoHref, focusRing, navigation } from "@/lib/site";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

function PhoneMenu({ pathname }: { pathname: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button isIconOnly variant="ghost" aria-label="Menu" className="size-9 rounded-[4px] text-ink lg:hidden">
        <Icon name="menu" className="size-5" />
      </Button>
      <Popover.Content placement="bottom end" className="rounded-xl border border-hair">
        <Popover.Dialog aria-label="Menu" className="p-2">
          <RouterProvider navigate={(href) => router.push(href)}>
            <nav aria-label="Phone navigation" className="flex w-56 flex-col">
              {[...navigation, { label: "Contact", href: contactHref }].map(({ label, href }) => (
                <MenuLink
                  key={href}
                  href={href}
                  aria-current={isActive(pathname, href) ? "page" : undefined}
                  onPress={() => setOpen(false)}
                  className={`rounded-[4px] px-3 py-2.5 text-base font-medium no-underline ${isActive(pathname, href) ? "text-ink" : "text-slate"}`}
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
    <header className="sticky top-0 z-40 bg-white">
      <div className={`${container} flex h-16 items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]`}>
        <Link href="/" aria-label="Landing Health home" className={`shrink-0 justify-self-start rounded-sm ${focusRing}`}>
          <BrandLockup wordmarkClassName="hidden h-[15px] min-[380px]:block" />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navigation.map(({ label, href }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-[4px] p-2 text-base font-medium transition-colors hover:text-ink ${focusRing} ${active ? "text-ink" : "text-slate"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 justify-self-end lg:gap-3">
          <div className="hidden lg:block">
            <ButtonLink href={contactHref} variant="secondary" size="sm">Contact</ButtonLink>
          </div>
          <ButtonLink href={demoHref} variant="primary" size="sm">Book a demo</ButtonLink>
          <PhoneMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

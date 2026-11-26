"use client";

import { Button, Link as MenuLink, Popover, RouterProvider } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLockup from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import Icon from "@/components/Icon";
import { demoHref, focusRing, navigation } from "@/lib/site";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

// Pages whose hero holds its own demo button (marked data-header-cta). Listed so the server render already hides the header copy.
const heroCtaPaths = new Set(["/", "/product", "/getting-started", "/safesock"]);

function useHeroCtaVisible(pathname: string) {
  const [observed, setObserved] = useState<{ pathname: string; visible: boolean } | null>(null);

  useEffect(() => {
    const target = document.querySelector("[data-header-cta]");
    if (!target) return;
    const header = document.querySelector("header");
    const observer = new IntersectionObserver(([entry]) => setObserved({ pathname, visible: entry.isIntersecting }), {
      rootMargin: `-${header?.offsetHeight ?? 0}px 0px 0px 0px`,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return observed?.pathname === pathname ? observed.visible : heroCtaPaths.has(pathname);
}

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
              {navigation.map(({ label, href }) => (
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
  const heroCtaVisible = useHeroCtaVisible(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-white">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" aria-label="Landing Health home" className={`shrink-0 rounded-sm ${focusRing}`}>
          <BrandLockup wordmarkClassName="hidden h-[15px] min-[380px]:block" />
        </Link>
        <div className="flex items-center gap-2 lg:gap-8">
          <nav aria-label="Primary navigation" className="hidden items-center gap-2 lg:flex xl:gap-5">
            {navigation.map(({ label, href }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-[4px] p-2 text-sm font-medium transition-colors hover:text-ink ${focusRing} ${active ? "text-ink" : "text-slate"}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div
            inert={heroCtaVisible}
            className={`overflow-hidden transition-[max-width,opacity] duration-700 ease-out motion-reduce:transition-none ${heroCtaVisible ? "max-w-0 opacity-0" : "max-w-48 opacity-100"}`}
          >
            <ButtonLink href={demoHref} variant="primary" size="sm" className="whitespace-nowrap">Book a demo</ButtonLink>
          </div>
          <PhoneMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

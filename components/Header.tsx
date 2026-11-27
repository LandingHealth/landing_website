"use client";

import { Button, Drawer, Link as MenuLink, Popover, RouterProvider } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type CSSProperties, useEffect, useState, useSyncExternalStore } from "react";
import BrandLockup from "@/components/Brand";
import ButtonLink from "@/components/ButtonLink";
import Icon from "@/components/Icon";
import { contactHref, demoHref, focusRing, navigation } from "@/lib/site";

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

const phoneQuery = "(max-width: 639.98px)";

function subscribeToPhone(onChange: () => void) {
  const query = matchMedia(phoneQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const usePhone = () => useSyncExternalStore(subscribeToPhone, () => matchMedia(phoneQuery).matches, () => false);

const menuTrigger = (
  <Button isIconOnly variant="ghost" aria-label="Menu" className="size-9 rounded-[4px] text-ink lg:hidden">
    <Icon name="menu" className="size-5" />
  </Button>
);

function PhoneMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(0);

  const onOpenChange = (next: boolean) => {
    if (next) setTop(Math.max(0, document.querySelector("header")?.getBoundingClientRect().top ?? 0));
    setOpen(next);
  };
  const close = () => setOpen(false);

  return (
    <Drawer isOpen={open} onOpenChange={onOpenChange}>
      {menuTrigger}
      <Drawer.Backdrop variant="transparent" style={{ "--menu-top": `${top}px` } as CSSProperties} className="menu-backdrop transition-none">
        <Drawer.Content placement="top" className="menu-panel top-(--menu-top) bottom-0 h-auto">
          <Drawer.Dialog aria-label="Menu" className="flex h-full max-h-none w-full flex-col rounded-none p-0 shadow-none">
            <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-hair px-4">
              <Link href="/" aria-label="Landing Health home" onClick={close} className={`shrink-0 rounded-sm ${focusRing}`}>
                <BrandLockup wordmarkClassName="hidden h-[15px] min-[380px]:block" />
              </Link>
              <Button isIconOnly variant="ghost" aria-label="Close menu" onPress={close} className="size-9 rounded-[4px] text-ink">
                <Icon name="close" className="size-5" />
              </Button>
            </div>
            <div className="flex flex-1 flex-col p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <nav aria-label="Phone navigation" className="flex flex-col gap-1">
                {navigation.map(({ label, href }) => {
                  const active = isActive(pathname, href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                      className={`self-start rounded-[4px] p-2 text-base leading-[1.2] font-medium ${focusRing} ${active ? "text-ink" : "text-slate"}`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-2">
                <ButtonLink href={contactHref} variant="secondary" className="max-sm:h-[39px]">Contact</ButtonLink>
                <ButtonLink href={demoHref} variant="primary" className="max-sm:h-[39px]">Book a demo</ButtonLink>
              </div>
            </div>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

function DropdownMenu({ pathname }: { pathname: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      {menuTrigger}
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
  const phone = usePhone();

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
          {phone ? <PhoneMenu pathname={pathname} /> : <DropdownMenu pathname={pathname} />}
        </div>
      </div>
    </header>
  );
}

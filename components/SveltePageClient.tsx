"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { hydrate, unmount } from "svelte";
import { pages, type PageName } from "$lib/pages";

type Props = { name: PageName; head: string; body: string };

export default function SveltePageClient({ name, head, body }: Props) {
  const target = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let live = true;
    let instance: ReturnType<typeof hydrate> | undefined;
    pages[name]()
      .then(({ default: Body }) => {
        if (live && target.current) instance = hydrate(Body, { target: target.current });
      })
      .catch((error: unknown) => console.error(`Svelte page "${name}" did not hydrate; the static HTML stays.`, error));
    return () => {
      live = false;
      if (instance) void unmount(instance);
    };
  }, [name]);

  const intent = (event: React.SyntheticEvent) => {
    const href = appHref(event.target);
    if (href) router.prefetch(href);
  };

  return (
    <>
      {head && <div hidden dangerouslySetInnerHTML={{ __html: head }} />}
      <div
        ref={target}
        onClick={(event) => {
          const href = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey ? appHref(event.target) : null;
          if (!href || event.defaultPrevented) return;
          event.preventDefault();
          router.push(href);
        }}
        onPointerOver={intent}
        onFocus={intent}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  );
}

function appHref(target: EventTarget): string | null {
  const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return null;
  const url = new URL(anchor.href);
  if (url.origin !== location.origin) return null;
  if (url.hash && url.pathname === location.pathname && url.search === location.search) return null;
  return url.pathname + url.search + url.hash;
}

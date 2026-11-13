"use client";

import { useEffect, useRef } from "react";
import type { Component } from "svelte";

type SvelteModule = { default: Component<never> };

type SvelteIslandProps = {
  load: () => Promise<SvelteModule>;
  props?: Record<string, unknown>;
  className?: string;
};

export default function SvelteIsland({
  load,
  props,
  className,
}: SvelteIslandProps) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let dispose: (() => void) | undefined;

    void Promise.all([import("svelte"), load()])
      .then(([{ mount, unmount }, { default: component }]) => {
        if (!active || !target.current) return;

        const instance = mount(component as Component<Record<string, unknown>>, { target: target.current, props });
        dispose = () => void unmount(instance);
      })
      .catch((error) => {
        if (active) console.error("Unable to mount Svelte component", error);
      });

    return () => {
      active = false;
      dispose?.();
    };
  }, [load, props]);

  return <div ref={target} className={className} />;
}

"use client";

import { useEffect, useRef } from "react";
import type { Component } from "svelte";

export default function SvelteIsland<Props extends Record<string, unknown>>({
  load,
  props,
  className,
}: {
  load: () => Promise<{ default: Component<Props> }>;
  props: Props;
  className?: string;
}) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let dispose: (() => void) | undefined;

    void Promise.all([import("svelte"), load()])
      .then(([{ mount, unmount }, { default: component }]) => {
        if (!active || !target.current) return;

        const instance = mount(component, { target: target.current, props });
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

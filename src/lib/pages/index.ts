import type { Component } from "svelte";

export const pages = {
  home: () => import("./Home.svelte"),
  product: () => import("./Product.svelte"),
  solution: () => import("./Solution.svelte"),
  devices: () => import("./Devices.svelte"),
  schedule: () => import("./Schedule.svelte"),
  about: () => import("./About.svelte"),
} satisfies Record<string, () => Promise<{ default: Component }>>;

export type PageName = keyof typeof pages;

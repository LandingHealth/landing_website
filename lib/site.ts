export const navigation: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Product", href: "/product" },
  { label: "Solution", href: "/solution" },
  { label: "Devices", href: "/devices" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
];

const buttonBase =
  "group inline-flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

export const button = {
  primary: `${buttonBase} border-ink bg-ink text-white hover:border-slate hover:bg-slate`,
  secondary: `${buttonBase} border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5`,
  onInk: `${buttonBase} border-white/25 text-white hover:border-white/50 hover:bg-white/10`,
} as const;

export type ButtonVariant = keyof typeof button;

export const container = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-8";
export const sectionPad = "py-20 sm:py-24 lg:py-28";

export const type = {
  h1: "text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]",
  h2: "text-[clamp(1.875rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]",
  h3: "text-xl font-semibold leading-snug tracking-[-0.02em]",
  body: "max-w-prose text-base leading-7 text-slate sm:text-lg sm:leading-8",
  bodyOnInk: "max-w-prose text-base leading-7 text-on-ink sm:text-lg sm:leading-8",
  mono: "font-mono text-xs uppercase tracking-[0.08em]",
} as const;

export const card =
  "rounded-xl border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/20";

export const stagger = (i: number) => ({ "--reveal-i": i }) as React.CSSProperties;

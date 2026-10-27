export const navigation: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Integration", href: "/integration" },
  { label: "Solution", href: "/solution" },
  { label: "Schedule", href: "/schedule" },
  { label: "Security", href: "/security" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Revenue", href: "/revenue" },
];

export const demoHref = "https://calendly.com/rajnpatel05/landing-health-intro-meeting";
export const linkedinHref = "https://www.linkedin.com/company/landinghealth/posts/?feedView=all";

const buttonBase =
  "inline-flex items-center justify-center rounded-md border font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const button = {
  primary: `${buttonBase} border-transparent bg-accent text-black hover:bg-accent/90`,
  secondary: `${buttonBase} border-ink/20 text-black hover:bg-ink/5`,
  onInk: `${buttonBase} border-white/25 text-white hover:border-white/50 hover:bg-white/10`,
} as const;

export const buttonSize = {
  md: "h-11 px-5 text-[15px]",
  sm: "h-9 px-4 text-sm",
} as const;

export type ButtonSize = keyof typeof buttonSize;
export type ButtonVariant = keyof typeof button;

export const container = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-8";
export const edgePad = "px-6 lg:px-4";
export const sectionPad = "py-20 sm:py-24 lg:py-28";

export const type = {
  h1: "font-display text-[clamp(2.75rem,6.3vw,5.0625rem)] font-medium leading-none tracking-[-0.025em] text-balance",
  h2: "font-display text-[clamp(1.875rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.025em] text-balance",
  h3: "font-display text-2xl font-medium leading-tight tracking-[-0.015em]",
  body: "max-w-prose text-[15px] leading-[1.6] text-slate",
  bodyOnInk: "max-w-prose text-[15px] leading-[1.6] text-on-ink",
  lead: "text-[15px] leading-[1.45]",
  label: "text-xs font-medium uppercase tracking-[0.08em]",
} as const;


export const navigation: ReadonlyArray<{ label: string; href: string }> = [
  { label: "About", href: "/about" },
  { label: "Integration", href: "/integration" },
  { label: "Resources", href: "/resources" },
  { label: "Devices", href: "/devices" },
  { label: "Security", href: "/security" },
  { label: "Revenue", href: "/revenue" },
  { label: "Team", href: "/team" },
  { label: "Schedule", href: "/schedule" },
  { label: "Referral", href: "/referral" },
];

export const demoHref = "https://calendly.com/rajnpatel05/landing-health-intro-meeting";
export const linkedinHref = "https://www.linkedin.com/company/landinghealth/posts/?feedView=all";

const buttonBase =
  "inline-flex items-center justify-center rounded-md border font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const button = {
  primary: `${buttonBase} border-transparent bg-mist text-black hover:bg-mist/80`,
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
export const sectionPad = "py-24 sm:py-28 lg:py-32";

export const type = {
  h1: "font-display text-[clamp(3rem,6.4vw,5.25rem)] font-normal leading-[1.02] tracking-[-0.012em] text-balance",
  h2: "font-display text-[clamp(2.375rem,4vw,3.25rem)] font-normal leading-[1.06] tracking-[-0.01em] text-balance",
  h3: "font-display text-[1.75rem] font-normal leading-[1.1] tracking-[-0.005em]",
  body: "max-w-prose text-[15px] leading-[1.65] text-slate",
  bodyOnInk: "max-w-prose text-[15px] leading-[1.65] text-on-ink",
  lead: "text-base leading-[1.6] sm:text-[17px]",
  label: "text-xs font-medium uppercase tracking-[0.08em]",
} as const;


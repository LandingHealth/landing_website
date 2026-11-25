export const navigation: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Product", href: "/product" },
  { label: "SafeSock", href: "/safesock" },
  { label: "Getting Started", href: "/getting-started" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export const demoHref = "https://calendly.com/rajnpatel05/landing-health-intro-meeting";
export const flyerHref = "/landing-clinic-flyer.pdf";

export const demo = {
  sees: "We walk through the workspace with a sample patient, from a home exercise video to the next appointment brief, and answer questions about your clinic’s setup.",
  prep: "No preparation needed. If you can, bring a rough count of your weekly visits and the EHR you use.",
} as const;

export const linkedinHref = "https://www.linkedin.com/company/landinghealth/posts/?feedView=all";

export const footerLinks: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Security", href: "/security" },
  { label: "Referral", href: "/referral" },
  { label: "Careers", href: "/careers" },
  { label: "LinkedIn", href: linkedinHref },
  { label: "Contact", href: "mailto:neildrp5@gmail.com" },
  { label: "Privacy", href: "/privacy" },
];

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
  h1: "font-display text-[clamp(2.75rem,5.6vw,4.5rem)] font-[380] [font-stretch:110%] leading-[1.05] tracking-[-0.025em] text-balance",
  h2: "font-display text-[clamp(2.125rem,3.6vw,3rem)] font-[380] [font-stretch:110%] leading-[1.08] tracking-[-0.02em] text-balance",
  h3: "font-display text-[1.625rem] font-[380] [font-stretch:110%] leading-[1.15] tracking-[-0.015em]",
  body: "max-w-prose text-[15px] leading-[1.65] text-slate",
  bodyOnInk: "max-w-prose text-[15px] leading-[1.65] text-on-ink",
  lead: "text-base leading-[1.6] sm:text-[17px]",
  label: "text-xs font-medium uppercase tracking-[0.08em]",
} as const;


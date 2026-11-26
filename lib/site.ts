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
  heading: "Monitor home exercise and bill for it in one system",
  sees: "Discover how Landing can help your clinic keep patients on track between visits, review home exercise in less time, and bill for the monitoring you already do.",
  prep: "No preparation needed. If you can, bring a rough count of your weekly visits and the EHR you use.",
} as const;

export const linkedinHref = "https://www.linkedin.com/company/landinghealth/posts/?feedView=all";
export const contactEmail = "pragat@getlandinghealth.com";
export const contactHref = `mailto:${contactEmail}`;

export type Announcement = { text: string; shortText: string; href: string; action: string };

export const announcement: Announcement | null = {
  text: "Know a clinic that would love Landing? Refer them and earn $500.",
  shortText: "Refer a clinic, earn $500",
  href: "/referral",
  action: "How it works",
};

type FooterLink = { label: string; href: string };

export const footerColumns: ReadonlyArray<ReadonlyArray<FooterLink>> = [
  [
    { label: "Product", href: "/product" },
    { label: "SafeSock", href: "/safesock" },
    { label: "Getting Started", href: "/getting-started" },
    { label: "Company", href: "/company" },
    { label: "Careers", href: "/careers" },
    { label: "Resources", href: "/resources" },
    { label: "Referral", href: "/referral" },
    { label: "Security", href: "/security" },
    { label: "Privacy", href: "/privacy" },
  ],
  [
    { label: "Email", href: contactHref },
    { label: "LinkedIn", href: linkedinHref },
  ],
];

const buttonBase =
  "inline-flex items-center justify-center rounded-[4px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2";

export const button = {
  primary: `${buttonBase} bg-blue text-white hover:bg-blue/90 focus-visible:outline-ink`,
  secondary: `${buttonBase} bg-fog/85 text-ink ring-1 ring-inset ring-ink/5 hover:bg-hair/50 focus-visible:outline-ink`,
  light: `${buttonBase} bg-white text-ink hover:bg-white/90 focus-visible:outline-white`,
  onDark: `${buttonBase} bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20 focus-visible:outline-white`,
} as const;

export const buttonSize = {
  md: "h-10 px-5 text-base",
  sm: "h-9 px-4 text-[15px]",
} as const;

export type ButtonSize = keyof typeof buttonSize;
export type ButtonVariant = keyof typeof button;

export const gutter = "px-4 sm:px-10 lg:px-20";
export const container = `mx-auto w-full max-w-[1440px] ${gutter}`;
export const sectionPad = "py-16 lg:py-20";
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const type = {
  h1: "font-display font-[380] [font-stretch:110%] text-[clamp(2.5rem,1.6rem+3vw,3.75rem)] leading-[1] tracking-[-0.02em] text-balance",
  h2: "font-display font-[380] [font-stretch:110%] text-[clamp(2rem,1.5rem+1.6vw,2.5rem)] leading-[1.1] tracking-[-0.015em] text-balance",
  h3: "font-display font-[380] [font-stretch:110%] text-2xl leading-[1.2] tracking-[-0.01em]",
  lead: "text-lg leading-[1.35] text-slate sm:text-xl sm:leading-[1.2]",
  leadOnDark: "text-lg leading-[1.35] text-white/85 sm:text-xl sm:leading-[1.2]",
  body: "max-w-prose text-base leading-[1.45] text-slate",
  bodyOnDark: "max-w-prose text-base leading-[1.45] text-white/85",
  eyebrow: "font-mono text-base font-medium uppercase leading-[1.2]",
  label: "font-mono text-xs font-medium uppercase tracking-[0.04em]",
  prose: "text-base leading-[1.6] sm:text-[17px]",
  small: "text-[15px]",
  caption: "text-[13px]",
} as const;

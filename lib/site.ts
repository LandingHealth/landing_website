import { resources } from "@/lib/resources";

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
export const contactHref = "mailto:neildrp5@gmail.com";

export type Announcement = { text: string; href: string; action: string };

const latestArticle = resources[0];

export const announcement: Announcement | null = {
  text: `New article: ${latestArticle.title}`,
  href: latestArticle.href,
  action: "Read more",
};

type FooterColumn = { title: string; links: ReadonlyArray<{ label: string; href: string }> };

export const footerColumns: ReadonlyArray<FooterColumn> = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/product" },
      { label: "SafeSock", href: "/safesock" },
      { label: "Getting Started", href: "/getting-started" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Company", href: "/company" },
      { label: "Careers", href: "/careers" },
      { label: "Resources", href: "/resources" },
      { label: "LinkedIn", href: linkedinHref },
      { label: "Contact", href: contactHref },
    ],
  },
  {
    title: "Legal and trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Referral", href: "/referral" },
    ],
  },
];

const buttonBase =
  "inline-flex items-center justify-center rounded-[4px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2";

export const button = {
  primary: `${buttonBase} bg-blue text-white hover:bg-blue/90 focus-visible:outline-ink`,
  secondary: `${buttonBase} bg-fog/85 text-ink ring-1 ring-inset ring-ink/5 hover:bg-hair/50 focus-visible:outline-ink`,
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
  h1: "text-[clamp(2.5rem,1.6rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.02em] text-balance",
  h2: "text-[clamp(2rem,1.5rem+1.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-balance",
  h3: "text-2xl font-semibold leading-[1.2] tracking-[-0.01em]",
  lead: "text-lg leading-[1.35] text-slate sm:text-xl sm:leading-[1.2]",
  leadOnDark: "text-lg leading-[1.35] text-white/70 sm:text-xl sm:leading-[1.2]",
  body: "max-w-prose text-base leading-[1.45] text-slate",
  bodyOnDark: "max-w-prose text-base leading-[1.45] text-white/70",
  eyebrow: "font-mono text-base font-medium uppercase leading-[1.2]",
  label: "font-mono text-xs font-medium uppercase tracking-[0.04em]",
} as const;

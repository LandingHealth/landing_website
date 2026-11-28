import Image from "next/image";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/ui/Eyebrow";
import InDevelopment from "@/components/ui/InDevelopment";
import { contactEmail, contactHref, container, type } from "@/lib/site";

const builds = [
  {
    title: "Home exercise a PT can see",
    body: "Patients record their sets at home, and Landing flags moments for the PT to check.",
  },
  {
    title: "Visits that start with context",
    body: "A brief before each visit, written from recent sessions and the PT’s notes.",
  },
  {
    title: "SafeSock",
    body: "A sensor sleeve designed to show how much weight a patient puts on an injured leg between visits.",
    inDevelopment: true,
  },
] as const satisfies ReadonlyArray<{ title: string; body: string; inDevelopment?: boolean }>;

const awards = [
  { name: "America250", src: "/awards/america250.svg", aspectRatio: 4.471 },
  { name: "TEDCO", src: "/awards/tedco.png", aspectRatio: 2.713 },
  { name: "Johns Hopkins University", src: "/awards/johns-hopkins.png", aspectRatio: 4.115 },
  { name: "Johns Hopkins Pava Center", src: "/awards/pava-center.svg", aspectRatio: 0.896 },
  { name: "Baylor University", src: "/awards/baylor.svg", aspectRatio: 5.449 },
  { name: "TCU", src: "/awards/tcu.svg", aspectRatio: 2.047 },
  { name: "Duquesne University", src: "/awards/duquesne.png", aspectRatio: 3.576 },
  { name: "Sasin School of Management, Chulalongkorn University", src: "/awards/sasin.svg", aspectRatio: 7.23 },
  { name: "KBank", src: "/awards/kbank.svg", aspectRatio: 4.056 },
  { name: "London Business School", src: "/awards/london-business-school.svg", aspectRatio: 1 },
  { name: "University of Manitoba", src: "/awards/university-of-manitoba.svg", aspectRatio: 2.066 },
  { name: "U.S. National Science Foundation", src: "/awards/nsf.png", aspectRatio: 0.999 },
  { name: "O’Shaughnessy Ventures", src: "/awards/oshaughnessy-ventures.svg", aspectRatio: 3.192 },
  { name: "FOX45 Baltimore", src: "/awards/fox45.svg", aspectRatio: 2.201 },
] as const;

// Equal visual weight in a fixed cell: a wide wordmark gets less height than a square seal.
function logoSize(aspectRatio: number) {
  const height = Math.min(44, Math.max(20, Math.round(52 / Math.sqrt(aspectRatio))));
  return { height, width: Math.min(150, Math.round(height * aspectRatio)) };
}

const next = [
  {
    title: "Careers",
    body: "We’re hiring for operations, sales, engineering and research. Every role is remote.",
    href: "/careers",
    action: "See open roles",
    variant: "primary",
  },
  {
    title: "Contact",
    body: "Questions about Landing, a security review, or working with us. Email the team.",
    href: contactHref,
    action: contactEmail,
    variant: "secondary",
  },
] as const;

const rowGrid = "border-t border-hair py-8 lg:grid lg:grid-cols-4 lg:gap-x-10 lg:py-10";
const term = `${type.label} text-slate max-lg:mb-5 lg:pt-1`;
const itemTitle = "text-base font-medium leading-[1.45] text-ink";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={rowGrid}>
      <dt className={term}>{label}</dt>
      <dd className="lg:col-span-3">{children}</dd>
    </div>
  );
}

export default function VersionC() {
  return (
    <>
      <section className={`${container} pt-16 pb-12 sm:pt-24 lg:grid lg:grid-cols-4 lg:gap-x-10 lg:pt-28 lg:pb-16`}>
        <Eyebrow className="mb-4 lg:mb-0 lg:pt-3">Company</Eyebrow>
        <div className="lg:col-span-3">
          <h1 className={`${type.h1} max-w-4xl`}>We’re building the between‑visit layer for physical therapy</h1>
          <p className={`${type.lead} mt-6 max-w-2xl text-pretty`}>
            Our goal is better outcomes from care that adjusts between visits, with less work for the people who deliver it.
          </p>
        </div>
      </section>

      <section aria-label="Company profile" className={container}>
        <dl>
          <Row label="What we build">
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
              {builds.map((item) => (
                <li key={item.title}>
                  <p className={`${itemTitle} flex flex-wrap items-center gap-x-2 gap-y-1`}>
                    {item.title}
                    {"inDevelopment" in item && <InDevelopment />}
                  </p>
                  <p className={`${type.body} mt-1.5`}>{item.body}</p>
                </li>
              ))}
            </ul>
          </Row>

          <Row label="Who it’s for">
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
              <p className={`${itemTitle} sm:col-span-1`}>Physical therapy clinics, their PTs, and their patients.</p>
              <p className={`${type.body} sm:col-span-2`}>
                Landing runs in the browser alongside the EHR you already use. Your EHR stays your system of record.
              </p>
            </div>
          </Row>

          <Row label="Where we’re headed">
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
              <p className={`${itemTitle} sm:col-span-1`}>Care that keeps going after the visit ends.</p>
              <p className={`${type.body} sm:col-span-2`}>
                Landing gathers what happens at home and handles the routine work. The PT makes the clinical calls.
              </p>
            </div>
          </Row>

          <Row label="Awarded by">
            <ul className="grid grid-cols-2 border-l border-t border-hair sm:grid-cols-4 lg:grid-cols-7">
              {awards.map(({ name, src, aspectRatio }) => {
                const { width, height } = logoSize(aspectRatio);
                return (
                  <li key={name} className="flex h-16 items-center justify-center border-r border-b border-hair px-3 sm:h-20 sm:px-4">
                    <Image src={src} alt={name} width={width} height={height} className="max-w-full object-contain grayscale" />
                  </li>
                );
              })}
            </ul>
          </Row>

          <Row label="Origin">
            <div className="grid items-start gap-x-10 gap-y-6 sm:grid-cols-3">
              <p className={`${type.body} sm:col-span-2`}>
                Landing began with a broken tibia and fibula. The surgery went well, and so did the physical therapy. Between
                visits, though, nobody could say whether the leg was being loaded the right way, and the PT had little idea
                what happened at home until the next visit. We built Landing to connect those parts of care.
              </p>
              <figure className="max-w-xs">
                <Image
                  src="/about/neil-x-ray.jpg"
                  alt="X-rays of a fractured right tibia and fibula"
                  width={1053}
                  height={702}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 320px"
                  className="aspect-[3/2] w-full rounded-xl bg-fog object-cover"
                />
                <figcaption className={`${type.caption} mt-2 text-mute`}>The X-ray, February 2025</figcaption>
              </figure>
            </div>
          </Row>
        </dl>
      </section>

      <section aria-label="Careers and contact" className={`${container} pb-16 lg:pb-20`}>
        <div className="grid rounded-3xl bg-fog sm:grid-cols-2">
          {next.map(({ title, body, href, action, variant }, index) => (
            <div
              key={title}
              className={`flex flex-col items-start p-8 lg:p-10 ${index > 0 ? "border-hair max-sm:border-t sm:border-l" : ""}`}
            >
              <h2 className={type.h3}>{title}</h2>
              <p className={`${type.body} mt-3`}>{body}</p>
              <ButtonLink href={href} variant={variant} className="mt-6 max-w-full">
                {action}
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

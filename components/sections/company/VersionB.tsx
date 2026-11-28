import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import DarkCard from "@/components/ui/DarkCard";
import Eyebrow from "@/components/ui/Eyebrow";
import IndexNumber from "@/components/ui/IndexNumber";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { safesock } from "@/lib/safesock";
import { contactEmail, contactHref, container, type } from "@/lib/site";

const principles = [
  {
    title: "Care continues between visits.",
    body: "Patients spend 98.8% of their week outside the clinic. Recovery happens there, so that is where Landing works.",
  },
  {
    title: "The PT makes the clinical calls.",
    body: "Landing flags the moments that may need attention. The PT interprets every flag and decides what the patient needs.",
  },
  {
    title: "Software takes the routine work.",
    body: "Landing prepares the brief before each visit and points the PT to the reps worth watching, instead of every minute of every video.",
  },
  {
    title: "Measure what happens at home.",
    body: "Today the PT learns what happened from what the patient remembers. We want a record from home instead.",
  },
] as const;

const building = [
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
    body: `${safesock.purpose} ${safesock.status}`,
  },
] as const;

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

// Equal visual weight: a wide wordmark gets less height than a square seal, and nothing outgrows its cell.
function logoSize(aspectRatio: number) {
  const height = Math.min(56, Math.max(24, Math.round(68 / Math.sqrt(aspectRatio))));
  const width = Math.min(150, Math.round(height * aspectRatio));
  return { width, height: Math.round(width / aspectRatio) };
}

const doors = [
  {
    eyebrow: "Careers",
    title: "Help build it.",
    body: "We’re hiring for operations, sales, engineering and research. Every role is remote.",
    href: "/careers",
    action: "See open roles",
  },
  {
    eyebrow: "Contact",
    title: "Talk to the team.",
    body: `Questions about Landing, a security review, or working with us. Write to ${contactEmail}.`,
    href: contactHref,
    action: "Email the team",
  },
] as const;

export default function VersionB() {
  return (
    <>
      <section className={`${container} pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-24`}>
        <Eyebrow className="mb-6">Company</Eyebrow>
        <h1 className={`${type.h1} max-w-5xl`}>We’re building the between‑visit layer for physical therapy.</h1>
        <div className="mt-12 grid gap-8 border-t-2 border-ink pt-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          <p className={`${type.lead} max-w-2xl text-pretty lg:col-span-2`}>
            Our goal is better outcomes from care that adjusts between visits, with less work for the people who deliver it.
          </p>
          <div className="lg:col-span-2 lg:text-right">
            <p className={`${type.h1} text-blue tabular-nums`}>98.8%</p>
            <p className={`${type.body} mt-3 lg:ml-auto`}>of a patient’s week is spent outside the clinic.</p>
          </div>
        </div>
      </section>

      <Sheet tone="fog" round="top">
        <SectionHeading align="split" eyebrow="What we believe" title="Four ideas shape every part of Landing." />
        <ol className="mt-12 grid border-t border-hair md:grid-cols-2 lg:mt-16">
          {principles.map(({ title, body }, index) => (
            <li
              key={title}
              data-reveal
              className="flex flex-col gap-4 border-b border-hair py-10 md:px-10 md:odd:border-r md:odd:pl-0 md:even:pr-0 lg:py-14"
            >
              <IndexNumber index={index} />
              <h3 className={type.h2}>{title}</h3>
              <p className={type.body}>{body}</p>
            </li>
          ))}
        </ol>
      </Sheet>

      <div className="bg-fog">
        <div className={`${container} pb-16 lg:pb-20`}>
          <DarkCard
            eyebrow="What we’re building"
            title="Care that keeps going after the visit ends."
            body="Landing gathers what happens at home and handles the routine work. The PT makes the clinical calls."
            items={building}
            action={{ label: "See the product", href: "/product" }}
          />
        </div>
      </div>

      <Sheet tone="white" round="top">
        <SectionHeading align="split" eyebrow="Recognition" title="Awarded by universities, programs and funders." />
        <ul className="mt-12 grid grid-cols-2 border-t border-l border-hair sm:grid-cols-3 lg:mt-16 lg:grid-cols-7">
          {awards.map(({ name, src, aspectRatio }) => {
            const { width, height } = logoSize(aspectRatio);
            return (
              <li key={name} className="flex aspect-[3/2] items-center justify-center border-r border-b border-hair p-4">
                <Image src={src} alt={name} width={width} height={height} loading="eager" className="max-w-full object-contain grayscale" />
              </li>
            );
          })}
        </ul>
      </Sheet>

      <section className={`${container} pb-16 lg:pb-20`}>
        <ul className="grid gap-4 md:grid-cols-2 lg:gap-10">
          {doors.map(({ eyebrow, title, body, href, action }) => (
            <li key={eyebrow} className="flex flex-col items-start rounded-3xl bg-fog p-8 max-sm:rounded-2xl sm:p-12">
              <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
              <h2 className={type.h2}>{title}</h2>
              <p className={`${type.body} mt-3 break-words`}>{body}</p>
              <ButtonLink href={href} variant="primary" className="mt-8">{action}</ButtonLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

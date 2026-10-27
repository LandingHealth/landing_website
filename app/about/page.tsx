import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import type { Photo } from "@/components/ExpandableMedia";
import Icon from "@/components/Icon";
import LoopVideo from "@/components/LoopVideo";
import TileRow, { type Tiles } from "@/components/TileRow";
import { button, buttonSize, container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Landing",
  description: "Meet the Landing team.",
};

const cofounders: Tiles = [
  {
    title: "Akash’s femur fracture",
    image: {
      src: "/about/akash-femur-fracture.jpg",
      alt: "Akash on a hospital bed with his leg in a traction splint, giving a thumbs up",
      width: 960,
      height: 640,
    },
  },
  {
    title: "Neil’s tib-fib fracture",
    image: {
      src: "/about/neil-tib-fib-fracture.jpg",
      alt: "Neil’s leg wrapped in bandages, resting on pillows",
      width: 1197,
      height: 798,
    },
  },
  {
    title: "Neil’s X-ray",
    image: {
      src: "/about/neil-x-ray.jpg",
      alt: "X-rays of Neil’s fractured right tibia and fibula",
      width: 1053,
      height: 702,
    },
  },
];

const story = [
  {
    title: "The injuries",
    text: "Akash broke his femur and Neil broke his tibia and fibula. Both of us went through physical therapy to walk again.",
  },
  {
    title: "The recovery",
    text: "Most of the work happens at home, between visits. It’s hard to know if you’re doing an exercise right, and your therapist can’t see it either.",
  },
  {
    title: "Landing",
    text: "Landing gives physical therapy clinics software and connected recovery devices that keep patient progress, home exercise, and daily operations in one place.",
  },
] as const;

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: Photo;
  demo?: { host: string; href?: string };
};

const team: readonly Member[] = [
  {
    name: "Raj Patel",
    role: "Founder + CEO",
    bio: "14 publications, consulting partner at Cobalt Consulting Group, America250 startup winner, and raised $100K in non-dilutive funding for Landing.",
    photo: { src: "/about/team/raj-patel.jpg", alt: "Raj Patel speaking at Baylor University", width: 800, height: 800 },
    demo: { host: "Raj", href: "https://calendly.com/rajnpatel05/landing-health-intro-meeting" },
  },
  {
    name: "Pragat Patel",
    role: "Founder + COO",
    bio: "BA in Neuroscience with minors in healthcare management and chemistry at UPenn, and an MS in Bioengineering at UPenn. ELITE Fellow at UPenn, a fellowship jointly supported by Wharton, Penn Medicine, and Penn Engineering, and one of four fellows selected in the current cohort.",
    photo: { src: "/about/team/pragat-patel.jpg", alt: "Pragat Patel in a suit", width: 800, height: 800 },
    demo: { host: "Pragat" },
  },
  {
    name: "Matthew Amunategui",
    role: "CMO",
    bio: "BA in Molecular and Cellular Biology and BS in Business Administration at Berkeley. Former research intern at UPenn and Harvard, consultant at Merck, Perplexity AI, and KIND Snacks, and project manager at AMD.",
    photo: { src: "/about/team/matthew-amunategui.jpg", alt: "Matthew Amunategui in a gray suit", width: 800, height: 800 },
    demo: { host: "Matt" },
  },
  {
    name: "Evan Batten",
    role: "Founder + Co-CTO",
    bio: "Computer Science and Applied Math at Johns Hopkins. Ex-Microsoft AI, JHU Applied Physics Lab, and Entrepreneur in Residence F26.",
    photo: { src: "/about/team/evan-batten.jpg", alt: "Evan Batten outdoors on a campus lawn", width: 800, height: 800 },
  },
  {
    name: "Akash Patel",
    role: "Founder",
    bio: "BS in Chemical and Biomolecular Engineering at Johns Hopkins, now in the #1 bioengineering master’s program in the world. Partner at Cobalt Consulting Group and clinical research assistant at Johns Hopkins Medicine and the Johns Hopkins School of Medicine. Raised $100K in non-dilutive funding for Landing.",
    photo: { src: "/about/team/akash-patel.jpg", alt: "Akash Patel speaking at Baylor University", width: 800, height: 800 },
  },
  {
    name: "Neil Patel",
    role: "Co-CEO, Co-CTO + Founder",
    bio: "Computer Science, Computer Engineering, and Applied Math at Johns Hopkins. Research at the NeuroEngineering Biomedical Instrumentation Lab at Johns Hopkins, work on the dVRK with Intuitive, former software engineering intern at the Atlantic League of Professional Baseball, and Marble (YC\u00a0S26).",
    photo: { src: "/about/team/neil-patel.jpg", alt: "Neil Patel", width: 354, height: 354 },
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet our cofounders</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>Akash and Neil</p>
        </div>
        <TileRow tiles={cofounders} ratio="3/2" className="mt-14 sm:mt-16" />
        <div className={`mt-20 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-24 lg:grid-cols-2`}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[15px]">Our story</p>
            <h2 className={`${type.h2} mt-4 max-w-xl`}>We built Landing after our own recoveries.</h2>
            <div className="mt-12 max-w-xl border-t border-black lg:mt-20">
              {story.map(({ title, text }, i) => (
                <details key={title} name="story" open={i === 0} className="group border-black/15 not-last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-xl font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                    {title}
                    <Icon name="plus" className="size-5 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-lg pb-8 text-[15px] leading-[1.6]">{text}</p>
                </details>
              ))}
            </div>
          </div>
          <LoopVideo
            src="/about/clinic-visit.mp4"
            poster="/about/clinic-visit.jpg"
            className="aspect-9/16 w-full rounded-xl bg-mist ring-1 ring-black"
          />
        </div>
        <div className={`mt-20 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-24 md:grid-cols-3`}>
          {team.map(({ name, role, bio, photo, demo }) => (
            <article key={name} className="flex flex-col text-center">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-square h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black"
              />
              <h3 className="mt-4 text-[15px] font-medium leading-snug">{name}</h3>
              <p className="mt-1 text-[15px] leading-[1.5]">{role}</p>
              <p className="mt-1 text-[15px] leading-[1.5]">{bio}</p>
              {demo && (
                <div className="mt-auto pt-6">
                  {demo.href ? (
                    <ButtonLink href={demo.href} variant="primary">
                      Book a demo with {demo.host}
                    </ButtonLink>
                  ) : (
                    <button type="button" disabled className={`${button.primary} ${buttonSize.md}`}>
                      Book a demo with {demo.host}
                    </button>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

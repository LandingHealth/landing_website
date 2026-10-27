import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import type { Photo } from "@/components/ExpandableMedia";
import { container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team | Landing",
  description: "Meet the Landing team.",
};

type Member = { name: string; role: string; bio: string; photo: Photo; demoHost?: string };

const team: readonly Member[] = [
  {
    name: "Raj Patel",
    role: "Founder + CEO",
    bio: "14 publications, consulting partner at Cobalt Consulting Group, and America250 startup winner. Raised $100K in non-dilutive funding for Landing.",
    photo: { src: "/about/team/raj-patel.jpg", alt: "Raj Patel speaking at Baylor University", width: 800, height: 800 },
    demoHost: "Raj",
  },
  {
    name: "Pragat Patel",
    role: "Founder + COO",
    bio: "BA in Neuroscience with minors in Healthcare Management and Chemistry, and MS in Bioengineering, both at UPenn. ELITE Fellow at UPenn, one of four selected in the current cohort. The fellowship is jointly supported by Wharton, Penn Medicine, and Penn Engineering.",
    photo: { src: "/about/team/pragat-patel.jpg", alt: "Pragat Patel in a suit", width: 800, height: 800 },
    demoHost: "Pragat",
  },
  {
    name: "Matthew Amunategui",
    role: "CMO",
    bio: "BA in Molecular and Cellular Biology and BS in Business Administration at Berkeley. Former research intern at UPenn and Harvard; consultant at Merck, Perplexity AI, and KIND Snacks; and project manager at AMD.",
    photo: { src: "/about/team/matthew-amunategui.jpg", alt: "Matthew Amunategui in a gray suit", width: 800, height: 800 },
    demoHost: "Matt",
  },
  {
    name: "Evan Batten",
    role: "Founder + Co-CTO",
    bio: "Computer Science and Applied Math at Johns Hopkins. Ex-Microsoft AI and JHU Applied Physics Lab. Entrepreneur in Residence at Antler (F26).",
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
    bio: "Computer Science, Computer Engineering, and Applied Math at Johns Hopkins. Researcher at the NeuroEngineering Biomedical Instrumentation Lab at Johns Hopkins. Worked on the dVRK with Intuitive. Former software engineering intern at the Atlantic League of Professional Baseball and Marble (YC\u00a0S26).",
    photo: { src: "/about/team/neil-patel.jpg", alt: "Neil Patel", width: 354, height: 354 },
  },
];

export default function TeamPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet the team</h1>
        </div>
        <div className={`mt-14 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-16 md:grid-cols-3`}>
          {team.map(({ name, role, bio, photo, demoHost }) => (
            <article key={name} className="flex flex-col text-center">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-square h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black"
              />
              <h2 className="mt-4 text-[15px] font-medium leading-snug">{name}</h2>
              <p className="mt-1 text-[15px] leading-[1.5]">{role}</p>
              <p className="mt-1 text-[15px] leading-[1.5]">{bio}</p>
              {demoHost && (
                <div className="mt-auto pt-6">
                  <ButtonLink href="/schedule" variant="primary">
                    Book a demo with {demoHost}
                  </ButtonLink>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

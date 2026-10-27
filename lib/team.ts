import type { Photo } from "@/components/ExpandableMedia";

export type Member = { name: string; role: string; bio: string; photo: Photo; demoHost?: string };

export const team: readonly Member[] = [
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

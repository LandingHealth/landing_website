export type Author = { name: string; href: string };

export type ArticleGroup = "product" | "research" | "perspective";

export type ArticleStatus = "concept" | "in-development";

export const groups: Record<ArticleGroup, { label: string; description: string }> = {
  product: {
    label: "Product",
    description: "How the parts of Landing that are built today work, and why we built them this way.",
  },
  research: {
    label: "Research",
    description: "The measurement science behind SafeSock, and the device concepts we are exploring.",
  },
  perspective: {
    label: "Company perspective",
    description: "The ideas that shape what Landing builds and where we want it to go.",
  },
};

export const statusLabel: Record<ArticleStatus, string> = {
  concept: "Future concept",
  "in-development": "In development",
};

const slugs = [
  "the-partnership-licklider-imagined-in-1960",
  "a-sleeve-that-reads-the-bones-own-alarm",
  "how-we-track-the-166-hours-of-recovery-outside-the-clinic",
  "betting-on-computer-vision-in-rehabilitation",
  "betting-on-ai-agents-in-healthcare",
  "recovery-world-model",
] as const;

export type Slug = (typeof slugs)[number];

export type Resource = {
  slug: Slug;
  href: string;
  group: ArticleGroup;
  status?: ArticleStatus;
  title: string;
  description: string;
  takeaway: string;
  published: string;
  author: Author;
  related: readonly Slug[];
  cover: { src: string; alt: string; width: number; height: number };
};

const neilPatel: Author = { name: "Neil Patel", href: "https://www.linkedin.com/in/patel-neil-d/" };

const articles: Record<Slug, Omit<Resource, "slug" | "href" | "author">> = {
  "the-partnership-licklider-imagined-in-1960": {
    group: "perspective",
    title: "The partnership Licklider imagined in 1960",
    description:
      "What J. C. R. Licklider’s “Man-Computer Symbiosis” proposed, which of its 1960 hurdles have since been solved, and how Landing splits a PT’s work the same way.",
    takeaway:
      "Licklider proposed that people set goals and judge results while computers do the routine work that prepares for a decision. The tools he lacked now exist. Landing gives the computer the visit brief and the rep flagging, and the PT keeps every treatment decision.",
    published: "2026-10-28",
    related: ["betting-on-ai-agents-in-healthcare", "betting-on-computer-vision-in-rehabilitation", "recovery-world-model"],
    cover: {
      src: "/resources/man-computer-symbiosis.png",
      alt: "The title block of J. C. R. Licklider’s 1960 paper. “Man-Computer Symbiosis” is set in large bold serif type above his name and the citation, IRE Transactions on Human Factors in Electronics, volume HFE-1, pages 4-11, March 1960.",
      width: 3000,
      height: 2000,
    },
  },
  "a-sleeve-that-reads-the-bones-own-alarm": {
    group: "research",
    status: "concept",
    title: "A sleeve that reads the bone’s own alarm",
    description:
      "How tibial bone stress injuries progress and are graded, why load estimates from wearables are fragile, and the staged study that would test a sleeve reading the shin’s own response.",
    takeaway:
      "Periost is a concept, not a product. It would read two signs of how the shin responds to load, the pressure pain threshold and calf muscle fatigue, to flag bone stress early. Nothing is built yet, and the claim it depends on, a threshold drop at least 7 days before symptoms, is untested.",
    published: "2026-10-28",
    related: ["how-we-track-the-166-hours-of-recovery-outside-the-clinic", "recovery-world-model"],
    cover: {
      src: "/resources/periost.webp",
      alt: "A hardware lab bench. A wall monitor shows an oscilloscope trace above a stereo microscope, probe arms, and a lit circuit board on an optical breadboard. Two fiber-optic light sources sit at the right.",
      width: 1600,
      height: 1067,
    },
  },
  "how-we-track-the-166-hours-of-recovery-outside-the-clinic": {
    group: "research",
    status: "concept",
    title: "How we track the 166 hours of recovery outside the clinic",
    description:
      "How gait forces are measured in a lab, how the DP-RGNet model estimates them from foot pressure, what its published results show, and what a model for SafeSock would have to match.",
    takeaway:
      "Pressure sensors can’t measure ground reaction forces directly, so a model has to estimate them. DP-RGNet, from Johns Hopkins, did that well for healthy adults in a lab. We plan to train a model on SafeSock data with the same method, and it has to hold that accuracy on injured gait before a PT relies on it.",
    published: "2026-10-28",
    related: ["a-sleeve-that-reads-the-bones-own-alarm", "recovery-world-model"],
    cover: {
      src: "/resources/outside-the-clinic.jpg",
      alt: "Pietro Perugino’s fresco of Christ handing the keys to Saint Peter, from the Sistine Chapel. Peter kneels among the apostles in a wide piazza, with a domed temple and two triumphal arches behind them.",
      width: 600,
      height: 400,
    },
  },
  "betting-on-computer-vision-in-rehabilitation": {
    group: "product",
    title: "Betting on computer vision in rehabilitation",
    description:
      "How Landing flags moments in home exercise videos for the PT to review, what a small trial found about video feedback and adherence, and how faster review could add clinic capacity.",
    takeaway:
      "For the exercises Landing supports, it analyzes each rep in a patient’s home video and flags the moments that may need attention. The PT interprets every flag and decides what the patient needs. Feedback between visits may help patients keep exercising.",
    published: "2026-10-27",
    related: ["betting-on-ai-agents-in-healthcare", "the-partnership-licklider-imagined-in-1960"],
    cover: {
      src: "/resources/betting-on-computer-vision.jpg",
      alt: "A hand-colored engraving of the Copernican system from Andreas Cellarius’s 1660 star atlas. The Sun is at the center of pink orbit rings inside a green band of zodiac signs. A scholar sits in each lower corner.",
      width: 621,
      height: 414,
    },
  },
  "betting-on-ai-agents-in-healthcare": {
    group: "product",
    title: "Betting on AI agents in healthcare",
    description:
      "How physicians use AI today, according to the AMA’s 2026 survey, what Landing’s next-visit brief agent does, and what the exercise-proposal agent still in development is meant to do.",
    takeaway:
      "An agent is worth building when it owns one defined part of a workflow and prepares that work for a person to review. Landing’s first agent writes a brief before each visit. A second, still in development, would propose exercise options. The PT makes every treatment decision.",
    published: "2026-10-27",
    related: ["betting-on-computer-vision-in-rehabilitation", "the-partnership-licklider-imagined-in-1960"],
    cover: {
      src: "/resources/betting-on-ai-agents.jpg",
      alt: "A steel engraving of Gutenberg’s print shop. Gutenberg, in a fur-trimmed robe, reads the first proof with two printers while a pressman waits at the press.",
      width: 1488,
      height: 992,
    },
  },
  "recovery-world-model": {
    group: "perspective",
    status: "concept",
    title: "The recovery world model",
    description:
      "Why physical therapy runs open-loop today, how video and SafeSock could measure the hours outside the clinic, and how each PT verdict could teach a model what healing looks like.",
    takeaway:
      "Nobody measures whether healing tissue is ready for more load. Landing’s aim is to capture the fast mechanics outside the clinic with video and SafeSock, and to turn each PT verdict into a labeled example, so a model can learn the slow biology of healing from the PT’s own calls.",
    published: "2026-10-27",
    related: ["how-we-track-the-166-hours-of-recovery-outside-the-clinic", "betting-on-computer-vision-in-rehabilitation"],
    cover: {
      src: "/resources/recovery-world-model.jpg",
      alt: "A hand-colored woodcut of a medieval hospital ward. Nuns tend patients in shared beds while a crowned king kneels in the center.",
      width: 1200,
      height: 800,
    },
  },
};

export const resourceBySlug = Object.fromEntries(
  slugs.map((slug) => [slug, { ...articles[slug], slug, href: `/resources/${slug}`, author: neilPatel }]),
) as Record<Slug, Resource>;

export const resources: readonly Resource[] = slugs.map((slug) => resourceBySlug[slug]);

const published = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export const formatPublished = (date: string) => published.format(new Date(`${date}T00:00:00Z`));

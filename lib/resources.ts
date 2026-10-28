export type Author = { name: string; href: string };

export type Resource = {
  kind: string;
  title: string;
  summary: string;
  authors: readonly Author[];
  href: string;
  cover: { src: string; alt: string; width: number; height: number };
};

const neilPatel: Author = { name: "Neil Patel", href: "https://www.linkedin.com/in/patel-neil-d/" };

export const recoveryWorldModel: Resource = {
  kind: "Vision",
  title: "The recovery world model",
  summary: "Why physical therapy needs a model of healing, and why PTs are the ones who can build it.",
  authors: [neilPatel],
  href: "/resources/recovery-world-model",
  cover: {
    src: "/resources/recovery-world-model.jpg",
    alt: "A hand-colored woodcut of a medieval hospital ward. Nuns tend patients in shared beds while a crowned king kneels in the center.",
    width: 1200,
    height: 800,
  },
};

export const bettingOnAiAgents: Resource = {
  kind: "Vision",
  title: "Betting on AI Agents in Healthcare",
  summary: "Why Landing builds AI agents that prepare the work and leave every treatment decision with the PT.",
  authors: [neilPatel],
  href: "/resources/betting-on-ai-agents-in-healthcare",
  cover: {
    src: "/resources/betting-on-ai-agents.jpg",
    alt: "A steel engraving of Gutenberg’s print shop. Gutenberg, in a fur-trimmed robe, reads the first proof with two printers while a pressman waits at the press.",
    width: 1488,
    height: 992,
  },
};

export const outsideTheClinic: Resource = {
  kind: "Approach",
  title: "How We Track the 166 Hours of Recovery Outside the Clinic",
  summary: "How Landing estimates gait forces from SafeSock data, so PTs can see how a patient walks between visits.",
  authors: [neilPatel],
  href: "/resources/how-we-track-the-166-hours-of-recovery-outside-the-clinic",
  cover: {
    src: "/resources/outside-the-clinic.jpg",
    alt: "Pietro Perugino’s fresco of Christ handing the keys to Saint Peter, from the Sistine Chapel. Peter kneels among the apostles in a wide piazza, with a domed temple and two triumphal arches behind them.",
    width: 600,
    height: 400,
  },
};

export const bettingOnComputerVision: Resource = {
  kind: "Vision",
  title: "Betting on Computer Vision in Rehabilitation",
  summary: "Why Landing analyzes home exercise videos and leaves every finding for the PT to interpret.",
  authors: [neilPatel],
  href: "/resources/betting-on-computer-vision-in-rehabilitation",
  cover: {
    src: "/resources/betting-on-computer-vision.jpg",
    alt: "A hand-colored engraving of the Copernican system from Andreas Cellarius’s 1660 star atlas. The Sun is at the center of pink orbit rings inside a green band of zodiac signs. A scholar sits in each lower corner.",
    width: 621,
    height: 414,
  },
};

export const resources: readonly Resource[] = [outsideTheClinic, bettingOnComputerVision, bettingOnAiAgents, recoveryWorldModel];

export const coverImage = "aspect-3/2 h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black";

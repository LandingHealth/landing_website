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

export const periost: Resource = {
  kind: "Research",
  title: "A Sleeve That Reads the Bone’s Own Alarm",
  summary: "Why Landing is exploring a sleeve that reads how the shin responds to training load, not only how much load it took.",
  authors: [neilPatel],
  href: "/resources/a-sleeve-that-reads-the-bones-own-alarm",
  cover: {
    src: "/resources/periost.webp",
    alt: "A hardware lab bench. A wall monitor shows an oscilloscope trace above a stereo microscope, probe arms, and a lit circuit board on an optical breadboard. Two fiber-optic light sources sit at the right.",
    width: 1600,
    height: 1067,
  },
};

export const manComputerSymbiosis: Resource = {
  kind: "Vision",
  title: "The Partnership Licklider Imagined in 1960",
  summary: "Why Landing pairs the PT’s judgment with a computer’s speed and accuracy, a partnership J.\u00a0C.\u00a0R.\u00a0Licklider could only describe in 1960.",
  authors: [neilPatel],
  href: "/resources/the-partnership-licklider-imagined-in-1960",
  cover: {
    src: "/resources/man-computer-symbiosis.png",
    alt: "The title block of J. C. R. Licklider’s 1960 paper. “Man-Computer Symbiosis” is set in large bold serif type above his name and the citation, IRE Transactions on Human Factors in Electronics, volume HFE-1, pages 4-11, March 1960.",
    width: 3000,
    height: 2000,
  },
};

export const resources: readonly Resource[] = [manComputerSymbiosis, periost, outsideTheClinic, bettingOnComputerVision, bettingOnAiAgents, recoveryWorldModel];

export const coverImage = "h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black";

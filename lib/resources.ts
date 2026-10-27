export type Resource = {
  kind: string;
  title: string;
  summary: string;
  href: string;
  cover: { src: string; alt: string; width: number; height: number };
};

export const recoveryWorldModel: Resource = {
  kind: "Vision",
  title: "The recovery world model",
  summary: "Why physical therapy needs a model of healing, and why PTs are the ones who can build it.",
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
  href: "/resources/betting-on-ai-agents-in-healthcare",
  cover: {
    src: "/resources/betting-on-ai-agents.jpg",
    alt: "A steel engraving of Gutenberg’s print shop. Gutenberg, in a fur-trimmed robe, reads the first proof with two printers while a pressman waits at the press.",
    width: 1488,
    height: 992,
  },
};

export const resources: readonly Resource[] = [bettingOnAiAgents, recoveryWorldModel];

export const coverImage = "aspect-3/2 h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black";

export type Still = { src: string; alt: string; width: number; height: number };

export const safesock = {
  summary:
    "SafeSock is a sensor sleeve we’re designing to sit inside a boot, cast, or brace and show how much weight a patient puts on an injured leg between visits.",
  status: "In development with our engineering partners.",
  purpose: "A sensor sleeve designed to show how much weight a patient puts on an injured leg between visits.",
  hero: {
    src: "/safesock/render-white.jpg",
    alt: "Concept render of the SafeSock sleeve, a white sock-like sleeve with a small pod at the calf.",
    width: 1031,
    height: 1168,
  } satisfies Still,
  problem: [
    "After a lower-leg injury or surgery, a patient often goes home with a weight-bearing limit. The limit sets how much of their body weight they can put through the injured leg while it heals.",
    "Between visits, nobody measures it. The patient has to judge the load by feel, and the PT learns what happened from what the patient remembers at the next appointment.",
    "SafeSock is designed to fill that gap with a record of the load from every step, so the limit you set can be checked against what actually happened.",
  ],
  measures: [
    { title: "The load on each step.", body: "How much weight goes through the injured leg every time the patient takes a step." },
    { title: "Pressure under the foot.", body: "How that pressure spreads under the foot through each step." },
    { title: "Day by day.", body: "A record that builds across the weeks of healing, not one reading taken in the clinic." },
  ],
  steps: [
    { title: "Set the limit", body: "You set the patient’s weight-bearing limit in Landing, the same way you prescribe their home plan." },
    { title: "The patient wears SafeSock", body: "The sleeve sits inside their boot, cast, or brace and records the load on the leg as they move through the day." },
    {
      title: "Review it before the visit",
      body: "The load history appears in the patient’s record and in the next appointment brief, beside their home exercise sessions.",
    },
  ],
} as const;

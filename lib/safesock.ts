export const safesock = {
  summary:
    "SafeSock is a sensor sleeve we’re designing to sit inside a boot, cast, or brace and show how much weight a patient puts on an injured leg between visits.",
  status: "In development with our engineering partners. Not yet available to clinics.",
  video: { src: "/safesock-demo.mp4", poster: "/safesock-demo-poster.jpg" },
  atAGlance: [
    { term: "What it is", detail: "A thin sensor sleeve worn inside a walking boot, cast, or brace." },
    {
      term: "Who it’s for",
      detail:
        "Patients recovering from a lower-leg injury or surgery under a weight-bearing limit, and the physical therapists who treat them.",
    },
    { term: "What it’s designed to measure", detail: "The load on the leg with each step, day by day, across the weeks of healing." },
    {
      term: "How a PT would use it",
      detail: "See whether a patient stayed within the limit you set, and adjust the plan at the next visit with that history in view.",
    },
  ],
  problem: [
    "After a lower-leg injury or surgery, a patient often goes home with a weight-bearing limit. The limit sets how much of their body weight they can put through the injured leg while it heals.",
    "Between visits, nobody measures it. The patient has to judge the load by feel, and the PT learns what happened from what the patient remembers at the next appointment.",
    "SafeSock is designed to fill that gap with a record of the load from every step, so the limit you set can be checked against what actually happened.",
  ],
  steps: [
    { title: "Set the limit", text: "You set the patient’s weight-bearing limit in Landing, the same way you prescribe their home plan." },
    { title: "The patient wears SafeSock", text: "The sleeve sits inside their boot, cast, or brace and records the load on the leg as they move through the day." },
    {
      title: "Review it before the visit",
      text: "The load history appears in the patient’s record and in the next appointment brief, beside their home exercise sessions.",
    },
  ],
} as const;

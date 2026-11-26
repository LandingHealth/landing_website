export type Still = { src: string; alt: string; width: number; height: number };

// A beat is one stretch of the concept render, in seconds, with the caption shown while it plays.
export type Beat = { id: string; from: number; to: number; title: string; body: string; still: Still };

const renderStill = (name: string, alt: string): Still => ({ src: `/safesock/${name}.jpg`, alt, width: 1600, height: 870 });

const stills = {
  sleeve: renderStill("sleeve", "Concept render of the SafeSock sleeve, a white sock-like sleeve with a small pod at the calf."),
  sole: renderStill("sole", "Concept render of the underside of the SafeSock sleeve."),
  sensors: renderStill("sensors", "Concept render of pressure sensors under the sole of the SafeSock sleeve."),
  load: renderStill("load", "Concept render of load paths lighting up between the sensors under the foot, in blue and in red."),
  fit: renderStill("fit", "Concept render close-up of the SafeSock sleeve around the heel and ankle."),
  pod: renderStill("pod", "Concept render close-up of the small pod on the calf of the SafeSock sleeve."),
} as const;

export const safesock = {
  summary:
    "SafeSock is a sensor sleeve we’re designing to sit inside a boot, cast, or brace and show how much weight a patient puts on an injured leg between visits.",
  status: "In development with our engineering partners. Not yet available to clinics.",
  purpose: "A sensor sleeve designed to show how much weight a patient puts on an injured leg between visits.",
  video: { src: "/safesock-demo.mp4", poster: "/safesock-demo-poster.jpg" },
  scrub: { src: "/safesock/scrub.mp4", poster: "/safesock/poster.jpg", duration: 8 },
  beats: [
    {
      id: "sleeve",
      from: 0,
      to: 2.5,
      title: "A thin sensor sleeve.",
      body: "Designed to sit inside a walking boot, cast, or brace.",
      still: stills.sleeve,
    },
    {
      id: "sole",
      from: 2.5,
      to: 3.6,
      title: "Sensors under the sole.",
      body: "In this concept, pressure sensors sit under the foot, where each step lands.",
      still: stills.sole,
    },
    {
      id: "pressure",
      from: 3.6,
      to: 4.4,
      title: "Every step, mapped.",
      body: "Designed to record how pressure spreads under the foot through each step.",
      still: stills.sensors,
    },
    {
      id: "limit",
      from: 4.4,
      to: 5.3,
      title: "The limit, made visible.",
      body: "Designed to show whether each step stays within the weight-bearing limit you set.",
      still: stills.load,
    },
    {
      id: "fit",
      from: 5.3,
      to: 6.2,
      title: "Worn through the day.",
      body: "Designed to be worn inside the boot, cast, or brace as the patient moves through the day.",
      still: stills.fit,
    },
    {
      id: "record",
      from: 6.2,
      to: 8,
      title: "Day by day, across the weeks of healing.",
      body: "Designed to keep a record of the load from every step, ready for you before the next visit.",
      still: stills.pod,
    },
  ] satisfies readonly Beat[],
  closeUps: [
    {
      title: "The sleeve.",
      body: "A thin sleeve shaped like a sock, with a small pod at the calf.",
      image: stills.pod,
    },
    {
      title: "The fit.",
      body: "Made to sit inside a walking boot, cast, or brace, from the heel up past the ankle.",
      image: stills.fit,
    },
    {
      title: "Sensor placement.",
      body: "In this concept, sensors sit under the forefoot, the midfoot, and the heel, so the sleeve can follow how load moves through each step.",
      image: {
        src: "/safesock-sensor-layout.jpg",
        alt: "Four concept render views of the sole: the sensor layout, then the sensors lighting up in blue, then in red as load moves through the step.",
        width: 1600,
        height: 871,
      },
    },
  ],
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
  development: [
    { title: "The sleeve", body: "In development with our engineering partners. Not yet available to clinics." },
    { title: "Landing integration", body: "Proposed. Landing doesn’t read SafeSock data yet, so the workflow on this page is how we intend it to work." },
    { title: "The images", body: "Every image on this page is a concept render of the design, not a photo of the prototype." },
  ],
} as const;

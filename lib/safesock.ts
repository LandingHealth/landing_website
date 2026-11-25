import type { Tiles } from "@/components/TileRow";

export const safesockSummary =
  "Movement changes with every step. Healing unfolds over weeks. SafeSock measures the mechanics to help connect the two.";

export const timescales: Tiles = [
  {
    title: "Physics",
    text: "The fast one is mechanics. Each step of gait brings ground reaction forces and moments, joint angles, and vertical load. Physics already models it well. All three of our founding engineers studied at the top-ranked biomedical engineering school on the planet. Two of them helped train a dual-path, attention-guided deep learning model to predict gait cycle data.",
    image: {
      src: "/devices/mechanics-plate.jpg",
      alt: "An 1816 engraving of the mechanical powers, with screws, presses, pulleys, and force diagrams",
      width: 1600,
      height: 2123,
      focus: "50% 46%",
    },
  },
  {
    title: "Biology",
    text: "The slow one is biology: healing, remodeling, and strength gain. Nobody models it well, because nobody has measured it.",
    image: {
      src: "/devices/vitruvian-man.jpg",
      alt: "Leonardo da Vinci’s Vitruvian Man, a figure with outstretched arms and legs inside a circle and a square",
      width: 1600,
      height: 2234,
      focus: "50% 30%",
    },
  },
  {
    title: "SafeSock",
    text: "A sensor sleeve we’re designing to measure load with every step, across the weeks of healing. Our team brings the gait modeling and the training to move a health device from the lab, to patients, to the frontier.",
    video: { src: "/safesock-demo.mp4", poster: "/safesock-demo-poster.jpg" },
  },
];

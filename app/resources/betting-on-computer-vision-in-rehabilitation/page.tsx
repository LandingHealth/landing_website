import type { Metadata } from "next";
import Article, { Note, body, text } from "@/components/Article";
import { bettingOnComputerVision } from "@/lib/resources";

const { title, summary } = bettingOnComputerVision;

export const metadata: Metadata = {
  title: `${title} | Landing`,
  description: summary,
};

const intro = (
  <p className={text}>
    Much of a patient’s exercise program happens at home, where the physical therapist sees little of how the patient moves. Patients may struggle with technique or be unsure whether they’re doing the exercises correctly. At Landing, we think computer vision can help PTs see what happens between visits and give patients better support through recovery.
  </p>
);

const sections = [
  {
    heading: "Landing flags the moments for the PT to review",
    content: (
      <>
        <p className={body}>
          The workflow starts with a short video that the patient records on their phone during an exercise. For the exercises we support, Landing analyzes each repetition and flags the moments that may need attention. The PT jumps to those moments, reviews the movement, and gives feedback.
        </p>
        <p className={body}>
          We’re building this workflow so that reviewing exercise videos takes less effort. The PT still interprets what Landing flags and decides what the patient needs.
        </p>
      </>
    ),
  },
  {
    heading: "Feedback between visits can help patients keep exercising",
    content: (
      <>
        <p className={body}>
          Clearer feedback may also help patients follow their exercise plan. In a small randomized trial, 45 adults with chronic conditions did home exercise programs for 24 weeks.
          <Note>
            Van de Winckel A, et al.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8075043/">PLACEHOLDER-TITLE</a>. JMIR Formative Research, 2021.
          </Note>{" "}
          One group received weekly exercise videos, filmed themselves doing the exercises, and got feedback from a physical therapist on the recordings. That group kept exercising 4 to 5 times a week. The other group received paper handouts and no feedback, and dropped from 4 to 3 times a week.
        </p>
        <p className={body}>
          Our goal is to make that kind of feedback easier to give. If a PT can spot a movement problem between visits, they can adjust treatment with more information. We expect better-informed adjustments to help patients recover.
        </p>
      </>
    ),
  },
  {
    heading: "Faster review can raise what PTs earn",
    content: (
      <>
        <p className={body}>
          For PTs, we see a path to higher earnings through faster review and more engaged patients. If computer vision cuts the time a PT spends on each submitted video, the clinic gains capacity. It can see more patients or give more follow-up care where that care is clinically appropriate. When patients stay engaged with their treatment, retention and clinic revenue may improve too.
        </p>
        <p className={body}>
          We think computer vision is worth building when it helps PTs give better care with less work per review.
        </p>
      </>
    ),
  },
];

export default function BettingOnComputerVisionPage() {
  return <Article resource={bettingOnComputerVision} intro={intro} sections={sections} />;
}

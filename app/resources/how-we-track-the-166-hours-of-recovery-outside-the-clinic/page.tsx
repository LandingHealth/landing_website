import type { Metadata } from "next";
import Link from "next/link";
import Article, { Note, body, text } from "@/components/Article";
import { outsideTheClinic } from "@/lib/resources";

const { title, summary } = outsideTheClinic;

export const metadata: Metadata = {
  title: `${title} | Landing`,
  description: summary,
};

const intro = (
  <p className={text}>
    A week has 168 hours. A patient who sees their physical therapist twice a week, for about an hour each visit, spends about 2 of those hours in the clinic. Recovery happens in the other 166, in every step the patient takes at home and at work. The PT sees none of those steps. At Landing, we’re designing SafeSock to measure them, and we trained a model that turns its readings into gait measures a PT can use.
  </p>
);

const sections = [
  {
    heading: "Force plates measure gait, but only in a lab",
    content: (
      <>
        <p className={body}>
          When a foot lands, the ground pushes back. Ground reaction forces measure that push in three directions: up and down, front to back, and side to side. Ground reaction moments measure how much the push twists the foot. Together they show how a person loads each leg.
        </p>
        <p className={body}>
          The standard tool for measuring them is a force plate, a plate set into the floor of a gait lab. A force plate is accurate, but it measures only the steps that land on it. It can’t follow a patient through a normal day.
        </p>
      </>
    ),
  },
  {
    heading: "We adapted a model built for small datasets",
    content: (
      <>
        <p className={body}>
          SafeSock is a pressure sensor sleeve we’re designing to sit inside a boot, cast, or brace. Its sensors record how pressure spreads under the foot through each step. Pressure sensors don’t measure ground reaction forces directly, so a model has to estimate the forces from the pressure.
        </p>
        <p className={body}>
          Two things make that estimate hard. To learn forces, a model needs steps where a force plate recorded the true forces alongside the sensors. Lab time is expensive, so these datasets stay small. Common image models also treat the readings as a flat picture and ignore the anatomy of the foot.
        </p>
        <p className={body}>
          Xuan Li and Samuel Bello at Johns Hopkins designed the Dual-Path Region-Guided Attention Network (DP-RGNet) for both problems.
          <Note>
            The paper is a preprint. Li X, Bello S.{" "}
            <a href="https://arxiv.org/abs/2512.05030">Dual-Path Region-Guided Attention Network for Ground Reaction Force and Moment Regression</a>. arXiv:2512.05030. 2025.
          </Note>{" "}
          We used their method to train a model on SafeSock data. It takes the pressure readings from a step and estimates that step’s ground reaction forces and moments.
        </p>
      </>
    ),
  },
  {
    heading: "The model reads the foot by region and as a whole",
    content: (
      <>
        <p className={body}>
          DP-RGNet reads a step as a sequence of pressure frames. It sends each frame down two paths.
        </p>
        <p className={body}>
          The first path splits the foot into six regions. The forefoot, the midfoot, and the heel each have an inner half and an outer half. The model starts with two hints. It knows which sensors belong to each region, and it knows the order in which the regions usually take load during a step. The hints weight the model’s attention toward the right region at the right moment. They are soft hints, so the model can still use other sensors when the data calls for it.
        </p>
        <p className={body}>
          The second path reads the whole foot at once, with no regions. Both paths also get each sensor’s position on the foot and the center of pressure at each moment. The model adds the estimates from the two paths to produce the final forces and moments.
        </p>
        <p className={body}>
          In the authors’ tests, the region path mattered. Removing it raised the error on all six forces and moments.
        </p>
      </>
    ),
  },
  {
    heading: "The paper’s results set the bar for SafeSock",
    content: (
      <>
        <p className={body}>
          The authors trained DP-RGNet on 2,343 steps from four healthy adults walking on a treadmill with a force plate. Across the six forces and moments, its average normalized error (NRMSE) was 5.78%. The strongest standard model, a CNN with an LSTM, averaged 6.35%.
          <Note>
            The 6.35% is the mean of the six CNN+LSTM values in the paper’s Table 4. Both models were scored with 5-fold cross-validation over steps, so the test steps came from the same four people the models trained on.
          </Note>{" "}
          On a public dataset of 150 people walking barefoot over a pressure walkway, its vertical force error was 1.42%.
          <Note>
            The dataset is UNB StepUP-P150. The authors split it by person, so the model was tested on people it had not seen. Larracy R, et al.{" "}
            <a href="https://doi.org/10.1038/s41597-025-05792-1">A dataset of high-resolution plantar pressures for gait analysis across varying footwear and walking speeds</a>. Sci Data. 2025.
          </Note>
        </p>
        <p className={body}>
          Those are the paper’s results, not SafeSock’s. They come from healthy adults in a lab, and the authors list the limits themselves. The insole dataset has four people, and the region hints come from group averages. A patient after surgery walks differently from a healthy adult. Our model has to hold that accuracy on SafeSock data, including injured gait, before a PT relies on what it reports.
        </p>
      </>
    ),
  },
  {
    heading: "The PT reads how loading changes between visits",
    content: (
      <>
        <p className={body}>
          Once SafeSock is in patients’ hands, we want PTs to see the 166 hours. A PT could see how much load a patient puts on the injured leg compared with the other leg, and how that balance changes over the weeks of recovery. The PT decides what those numbers mean for the treatment plan.
        </p>
        <p className={body}>
          Those numbers are also the fast mechanics that{" "}
          <Link href="/resources/recovery-world-model" className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            the recovery world model
          </Link>{" "}
          needs. We think a model of healing has to learn from the hours a patient spends outside the clinic, and SafeSock is how we plan to measure them.
        </p>
      </>
    ),
  },
];

export default function OutsideTheClinicPage() {
  return <Article resource={outsideTheClinic} intro={intro} sections={sections} />;
}

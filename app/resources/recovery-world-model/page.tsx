import type { Metadata } from "next";
import Article, { Note, body, text } from "@/components/Article";
import { recoveryWorldModel } from "@/lib/resources";

const { title, summary } = recoveryWorldModel;

export const metadata: Metadata = {
  title: `${title} | Landing`,
  description: summary,
};

const intro = (
  <>
    <p className={text}>
      Physical therapy today is open-loop. A surgeon writes “partial weight-bearing for six weeks.”
      <Note>
        In a 2025 survey of 151 orthopedic trauma surgeons, restricted weight bearing after tibial plateau fracture surgery lasted 2 to 12 weeks, depending on the surgeon. Granlund AS, von Keudell AG. <a href="https://doi.org/10.1016/j.injury.2025.112599">Weight bearing after surgical treatment of tibial plateau fractures - an international survey of orthopaedic trauma surgeons</a>. Injury. 2025.
      </Note>{" "}
      A PT picks a protocol from a table. Nobody measures whether the tissue is actually in its healing window.
    </p>
    <p className={body}>
      The gap is widest outside the clinic. A patient might spend two hours a week with their PT. The other 166 hours are when they do their home exercises and put weight on the repair. Most of the recovery happens in those hours, and nobody sees them.
    </p>
    <p className={body}>
      The body in rehab is a physical system with two timescales. The fast one is mechanics: forces, moments, and joint angles. Physics already models it well.
      <Note>
        Seth A, et al. <a href="https://doi.org/10.1371/journal.pcbi.1006223">OpenSim: Simulating musculoskeletal dynamics and neuromuscular control to study human and animal movement</a>. PLoS Comput Biol. 2018.
      </Note>{" "}
      The slow one is biology: healing, remodeling, and strength gain. Nobody models it well, because nobody has measured it.
    </p>
  </>
);

const closing = (
  <p className={`mt-12 ${text}`}>
    Every patient a PT treats on Landing adds labels to the model. The longer a clinic uses Landing, the better its flags and advice should get.
  </p>
);

const sections = [
  {
    heading: "The PT is the missing measurement",
    content: (
      <>
        <p className={body}>
          One person already reads slow biology every day. A good PT watches a patient squat and can tell whether the knee is ready for more load. That judgment is the best signal anyone has on the slow timescale. Today it lives in chart notes and in the PT’s head, where no model can learn from it. A model can’t learn slow biology without it.
        </p>
      </>
    ),
  },
  {
    heading: "Landing measures the 166 hours",
    content: (
      <>
        <p className={body}>
          Patients film their home exercises with a phone or laptop and send the videos to Landing. Computer vision finds each rep, measures the joint angles, and flags reps with possible form issues, such as a knee caving inward on rep 3. Each flag carries the timestamp and the measurement behind it.
        </p>
        <p className={body}>
          We’re also designing SafeSock, a pressure sensor sleeve meant to sit inside a boot, cast, or brace and show how a patient bears weight between visits.
          <Note>
            In one study, patients wore a pressure-sensing insole for up to six weeks after fracture surgery. Despite physical therapy training, only 14 of 30 stayed within 30% of their ordered weight bearing. Braun BJ, et al. <a href="https://doi.org/10.1007/s00264-017-3481-7">Weight-bearing recommendations after operative fracture treatment-fact or fiction? Gait results with and feasibility of a dynamic, continuous pedobarography insole</a>. Int Orthop. 2017.
          </Note>{" "}
          Together, video and SafeSock are meant to capture the fast mechanics where the recovery happens.
        </p>
      </>
    ),
  },
  {
    heading: "The PT’s verdict closes the loop",
    content: (
      <>
        <p className={body}>
          The PT opens a flag, watches the rep, and agrees or rejects. We’re building Landing so each verdict becomes a labeled example for the next video. The PT decides what the patient hears.
        </p>
        <p className={body}>
          When the PT progresses, holds, or regresses the plan, that decision labels the slow timescale: this tissue, at this point, was ready or it wasn’t. Over time the flags get closer to what this PT would catch, and the model learns what healing looks like from the PT’s own calls.
        </p>
      </>
    ),
  },
  {
    heading: "The PT earns more",
    content: (
      <>
        <p className={body}>
          Today a PT’s judgment between visits is unpaid work, or it doesn’t happen at all. Flags point the PT to the reps worth watching, instead of every minute of every video. We want that review to count as remote therapeutic monitoring time, which clinics can bill.
          <Note>
            Since 2022, Medicare has let therapists bill the remote therapeutic monitoring codes. Treatment management time also needs at least one interactive communication with the patient each month. CMS. <a href="https://www.federalregister.gov/documents/2021/11/19/2021-23972/medicare-program-cy-2022-payment-policies-under-the-physician-fee-schedule-and-other-changes-to-part">CY 2022 Physician Fee Schedule final rule</a>. Federal Register. 2021.
          </Note>
        </p>
        <p className={body}>
          Patients who see their PT respond to their home sessions have a reason to keep coming, so the clinic keeps visits it already booked. A PT who knows how each patient did between visits spends less of each visit finding out, and can carry more patients.
        </p>
      </>
    ),
  },
  {
    heading: "The patient recovers more",
    content: (
      <>
        <p className={body}>
          Load follows the tissue, not the calendar. A patient who heals fast moves to the next phase sooner. A patient who heals slowly gets held back before a setback, not after one. A patient whose knee caves in on Tuesday’s squats hears about it from their PT before the next visit, not at it.
        </p>
        {closing}
      </>
    ),
  },
];

export default function RecoveryWorldModelPage() {
  return <Article resource={recoveryWorldModel} intro={intro} sections={sections} />;
}

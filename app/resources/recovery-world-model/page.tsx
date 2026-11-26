import Article, { articleMetadata, defineSources } from "@/components/Article";

const slug = "recovery-world-model";

export const metadata = articleMetadata(slug);

const sources = defineSources({
  granlund: (
    <>
      In a 2025 survey of 151 orthopedic trauma surgeons, restricted weight bearing after tibial plateau fracture surgery lasted 2 to 12 weeks, depending on the surgeon. Granlund AS, von Keudell AG.{" "}
      <a href="https://doi.org/10.1016/j.injury.2025.112599">Weight bearing after surgical treatment of tibial plateau fractures - an international survey of orthopaedic trauma surgeons</a>. Injury. 2025.
    </>
  ),
  seth: (
    <>
      Seth A, et al.{" "}
      <a href="https://doi.org/10.1371/journal.pcbi.1006223">OpenSim: Simulating musculoskeletal dynamics and neuromuscular control to study human and animal movement</a>. PLoS Comput Biol. 2018.
    </>
  ),
  braun: (
    <>
      In one study, patients wore a pressure-sensing insole for up to six weeks after fracture surgery. Despite physical therapy training, only 14 of 30 stayed within 30% of their ordered weight bearing. Braun BJ, et al.{" "}
      <a href="https://doi.org/10.1007/s00264-017-3481-7">Weight-bearing recommendations after operative fracture treatment-fact or fiction? Gait results with and feasibility of a dynamic, continuous pedobarography insole</a>. Int Orthop. 2017.
    </>
  ),
  cms: (
    <>
      Since 2022, Medicare has let therapists bill the remote therapeutic monitoring codes. Treatment management time also needs at least one interactive communication with the patient each month. CMS.{" "}
      <a href="https://www.federalregister.gov/documents/2021/11/19/2021-23972/medicare-program-cy-2022-payment-policies-under-the-physician-fee-schedule-and-other-changes-to-part">CY 2022 Physician Fee Schedule final rule</a>. Federal Register. 2021.
    </>
  ),
});

export default function RecoveryWorldModelPage() {
  return (
    <Article slug={slug} sources={sources}>
      <p>
        Physical therapy today is open-loop. A surgeon writes “partial weight-bearing for six weeks.”{sources.cite("granlund")} A PT picks a protocol from a table. Nobody measures whether the tissue is actually in its healing window.
      </p>
      <p>
        The gap is widest outside the clinic. A patient might spend two hours a week with their PT. The other 166 hours are when they do their home exercises and put weight on the repair. Most of the recovery happens in those hours, and nobody sees them.
      </p>
      <p>
        The body in rehab is a physical system with two timescales. The fast one is mechanics: forces, moments, and joint angles. Physics already models it well.{sources.cite("seth")} The slow one is biology: healing, remodeling, and strength gain. Nobody models it well, because nobody has measured it.
      </p>

      <h2>The PT is the missing measurement</h2>
      <p>
        One person already reads slow biology every day. A good PT watches a patient squat and can tell whether the knee is ready for more load. That judgment is the best signal anyone has on the slow timescale. Today it lives in chart notes and in the PT’s head, where no model can learn from it. A model can’t learn slow biology without it.
      </p>

      <h2>What Landing records between visits</h2>
      <p>
        Patients film their home exercises with a phone or laptop and send the videos to Landing. Computer vision finds each rep, measures the joint angles, and flags reps with possible form issues, such as a knee caving inward on rep 3. Each flag carries the timestamp and the measurement behind it.
      </p>
      <p>
        We’re also designing SafeSock, a pressure sensor sleeve meant to sit inside a boot, cast, or brace and show how a patient bears weight between visits.{sources.cite("braun")} Together, video and SafeSock are meant to capture the fast mechanics where the recovery happens.
      </p>

      <h2>The PT’s verdict closes the loop</h2>
      <p>
        The PT opens a flag, watches the rep, and agrees or rejects. We’re building Landing so each verdict becomes a labeled example for the next video. The PT decides what the patient hears.
      </p>
      <p>
        When the PT progresses, holds, or regresses the plan, that decision labels the slow timescale: this tissue, at this point, was ready or it wasn’t. Over time the flags should get closer to what this PT would catch, and the model should learn what healing looks like from the PT’s own calls.
      </p>

      <h2>How review could be paid for</h2>
      <p>
        Today a PT’s judgment between visits is unpaid work, or it doesn’t happen at all. Flags point the PT to the reps worth watching, instead of every minute of every video. We want that review to count as remote therapeutic monitoring time, which clinics can bill.{sources.cite("cms")}
      </p>
      <p>
        Patients who see their PT respond to their home sessions could have more reason to keep coming, which would help the clinic keep visits it already booked. A PT who knows how each patient did between visits could spend less of each visit finding out, and could carry more patients.
      </p>

      <h2>How patients could benefit</h2>
      <p>
        Load follows the tissue, not the calendar. A patient who heals fast moves to the next phase sooner. A patient who heals slowly gets held back before a setback, not after one. A patient whose knee caves in on Tuesday’s squats hears about it from their PT before the next visit, not at it.
      </p>
      <p>
        Our aim is for every patient a PT treats on Landing to add labels to the model. The longer a clinic uses Landing, the better its flags and advice should get.
      </p>
    </Article>
  );
}

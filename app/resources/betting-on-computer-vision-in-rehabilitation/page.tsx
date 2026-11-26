import Article, { articleMetadata, defineSources } from "@/components/Article";

const slug = "betting-on-computer-vision-in-rehabilitation";

export const metadata = articleMetadata(slug);

const sources = defineSources({
  escolar: (
    <>
      In focus groups, patients with chronic neck or back pain said poor instruction left them unsure whether they were doing their home exercises correctly, and less likely to keep doing them. Escolar-Reina P, et al.{" "}
      <a href="https://doi.org/10.1186/1472-6963-10-60">How do care-provider and home exercise program characteristics affect patient adherence in chronic neck and back pain: a qualitative study</a>. BMC Health Serv Res. 2010.
    </>
  ),
  vandeWinckel: (
    <>
      Participants reported their own exercise sessions. Van de Winckel A, Nawshin T, Byron C.{" "}
      <a href="https://doi.org/10.2196/22659">Combining a Hudl App With Telehealth to Increase Home Exercise Program Adherence in People With Chronic Diseases Experiencing Financial Distress: Randomized Controlled Trial</a>. JMIR Form Res. 2021.
    </>
  ),
});

export default function BettingOnComputerVisionPage() {
  return (
    <Article slug={slug} sources={sources}>
      <p>
        Much of a patient’s exercise program happens at home, where the physical therapist sees little of how the patient moves. Patients may struggle with technique or be unsure whether they’re doing the exercises correctly.{sources.cite("escolar")} At Landing, we think computer vision can help PTs see what happens between visits and give patients better support through recovery.
      </p>

      <h2>Landing flags the moments for the PT to review</h2>
      <p>
        The workflow starts with a short video that the patient records on their phone during an exercise. For the exercises we support, Landing analyzes each repetition and flags the moments that may need attention. The PT jumps to those moments, reviews the movement, and gives feedback.
      </p>
      <p>
        We’re building this workflow so that reviewing exercise videos takes less effort. The PT still interprets what Landing flags and decides what the patient needs.
      </p>

      <h2>Feedback between visits can help patients keep exercising</h2>
      <p>
        Clearer feedback may also help patients follow their exercise plan. In a small randomized trial, 45 adults with chronic conditions did home exercise programs for 24 weeks.{sources.cite("vandeWinckel")} One group received weekly exercise videos, filmed themselves doing the exercises, and got feedback from a physical therapist on the recordings. That group kept exercising 4 to 5 times a week. The other group received paper handouts and no feedback, and dropped from 4 to 3 times a week.
      </p>
      <p>
        Our goal is to make that kind of feedback easier to give. If a PT can spot a movement problem between visits, they can adjust treatment with more information. We expect better-informed adjustments to help patients recover.
      </p>

      <h2>Faster review can raise what PTs earn</h2>
      <p>
        For PTs, we see a path to higher earnings through faster review and more engaged patients. If computer vision cuts the time a PT spends on each submitted video, the clinic gains capacity. It can see more patients or give more follow-up care where that care is clinically appropriate. When patients stay engaged with their treatment, retention and clinic revenue may improve too.
      </p>
      <p>We think computer vision is worth building when it helps PTs give better care with less work per review.</p>
    </Article>
  );
}

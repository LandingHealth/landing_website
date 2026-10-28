import type { Metadata } from "next";
import Link from "next/link";
import Article, { Note, body, text } from "@/components/Article";
import { periost } from "@/lib/resources";

const { title, summary } = periost;

export const metadata: Metadata = {
  title: `${title} | Landing`,
  description: summary,
};

const intro = (
  <p className={text}>
    The bone stress wearables we know of measure dose, an estimate of how much load the shin took. None of them measures how the shin responds to that load. The body already reports that response in two ways. The tissue around the bone grows more sensitive, and the muscles that protect the bone begin to fatigue. Periost, our working name, is a concept for a below-knee sleeve that would read both responses each day. Nothing is built yet, and the claim it depends on is untested.
  </p>
);

const sections = [
  {
    heading: "A higher grade at diagnosis means a longer return to sport",
    content: (
      <>
        <p className={body}>
          A tibial bone stress injury, a stress injury of the shin bone, starts as damage too small to see. Repeated loading leaves microdamage in the tibia, and bone repairs that damage by remodeling. Cells remove the damaged bone and lay down new bone in its place. When load outpaces repair, the injury progresses. On MRI, it first appears as edema in the periosteum, the thin membrane that covers the bone. Edema in the marrow comes next, and a fracture line comes last.
        </p>
        <p className={body}>
          Radiologists grade the injury on MRI with a scale that Fredericson and colleagues published in 1995.
          <Note>
            <a href="https://doi.org/10.1177/036354659502300418">Fredericson M, et al. Am J Sports Med. 1995.</a>
          </Note>{" "}
          Grade 1 is edema in the periosteum alone, and grade 4 adds a visible fracture line. In a five-year study of college track and field athletes, mean return to sport rose from 11.4 weeks at grade 1 to 31.7 weeks at grade 4.
          <Note>
            From 43 injuries graded on MRI at all bone sites, not only the tibia.{" "}
            <a href="https://doi.org/10.1177/0363546513490645">Nattiv A, et al. Am J Sports Med. 2013.</a>
          </Note>
        </p>
        <p className={body}>
          These injuries are common in military basic training. In 8-week Army basic combat training, reported stress fracture rates range from 0.9 to 5.2 percent of men and 3.4 to 21 percent of women.
          <Note>
            The review takes these ranges from Jones and colleagues.{" "}
            <a href="https://doi.org/10.3390/ijerph19010422">Lennox GM, et al. Int J Environ Res Public Health. 2021.</a>
          </Note>{" "}
          Among Air Force Special Warfare trainees, 5.41 percent had a bone stress injury in their first 120 days.
          <Note>
            That is 124 of 2,290 trainees.{" "}
            <a href="https://doi.org/10.1093/milmed/usae017">Johnson AS, et al. Mil Med. 2024.</a>
          </Note>{" "}
          We want to learn whether Periost could flag more of these injuries at grade 1 or 2, when the return to sport is shortest.
        </p>
      </>
    ),
  },
  {
    heading: "Estimating load from outside the body is fragile",
    content: (
      <>
        <p className={body}>
          Many running wearables and smart insoles report ground reaction force or the shock of each impact. Matijevich, Zelik, and colleagues at Vanderbilt tested how well those measures track the load on the tibia itself. Across running speeds and slopes, ground reaction force metrics were not strongly correlated with tibial bone load.
          <Note>
            The study had 10 runners. Tibial load came from a model of the leg, not a sensor in the bone.{" "}
            <a href="https://doi.org/10.1371/journal.pone.0210000">Matijevich ES, et al. PLoS One. 2019.</a>
          </Note>{" "}
          During running, most of the load on the tibia comes from the muscles that pull on it, not from the ground.
        </p>
        <p className={body}>
          A later study from the same group showed why small errors in force matter. Bone damage rises steeply with load. An estimate of peak tibial force from loading rate was off by 9.9 percent on average, and that error grew to 104 percent in estimated bone damage.
          <Note>
            That is no better than a step counter that assumes the same force for every stride.{" "}
            <a href="https://doi.org/10.1016/j.humov.2020.102690">Matijevich ES, et al. Hum Mov Sci. 2020.</a>
          </Note>
        </p>
        <p className={body}>
          We think error growth is the weak point of measuring dose from outside the body. Each estimate has to rebuild the load inside the leg from signals outside it, and the step from force to damage multiplies any error. Periost would read the tissue’s response instead of rebuilding the input. We expect that response to reflect all the load the tibia took, including the pull of the muscles.
        </p>
      </>
    ),
  },
  {
    heading: "Nerves report bone wear as an alarm, not a gauge",
    content: (
      <>
        <p className={body}>
          The tissues that wear out tend to have the fewest sensory nerves. Articular cartilage, the tissue that wears down in osteoarthritis, has no nerves at all. Bone is different at its surface. The periosteum is the most densely innervated part of bone.
          <Note>
            Both papers report data from mice.{" "}
            <a href="https://doi.org/10.1016/s0306-4522(02)00165-3">Mach DB, et al. Neuroscience. 2002.</a>{" "}
            <a href="https://doi.org/10.1111/ejn.12462">Mantyh PW. Eur J Neurosci. 2014.</a>
          </Note>
        </p>
        <p className={body}>
          Nociceptors, the nerve endings that signal tissue damage, have a threshold. Below it they stay quiet, so they report wear as an alarm rather than a gauge. In one study of cat knees, about 30 percent of the thin sensory nerve fibers from the joint did not respond to movement or pressure. Most of them became active once the joint was inflamed.
          <Note>
            The count was 16 of 51 fibers, and 11 of the 16 became active during arthritis.{" "}
            <a href="https://doi.org/10.1152/jn.1988.60.6.2180">Schaible HG, Schmidt RF. J Neurophysiol. 1988.</a>
          </Note>
        </p>
        <p className={body}>
          Inflammation lowers that threshold, so a press that was painless starts to hurt. A threshold can be measured, even when nothing hurts at rest. Clinicians already rely on that tenderness. The standard sign of medial tibial stress syndrome is pain when a clinician presses along the posteromedial border of the tibia.
          <Note>
            Medial tibial stress syndrome is a separate diagnosis from bone stress injury.{" "}
            <a href="https://doi.org/10.1007/s00113-019-0667-z">Winters M. Unfallchirurg. 2020.</a>
          </Note>{" "}
          As far as we know, routine care doesn’t measure that tenderness as a number or track it from day to day.
        </p>
      </>
    ),
  },
  {
    heading: "Fatigued calf muscles change the strain on the tibia",
    content: (
      <>
        <p className={body}>
          The calf muscles also protect the tibia. When they contract, they compress the bone and reduce the bending strain on its surfaces. Fatigue changes that strain.
        </p>
        <p className={body}>
          Yoshikawa and colleagues measured tibial strain in dogs before and after 20 minutes of fatiguing exercise. Peak strain on the anterior and anterolateral tibia rose 26 to 35 percent.
          <Note>
            The study used 10 foxhounds.{" "}
            <a href="https://doi.org/10.1242/jeb.188.1.217">Yoshikawa T, et al. J Exp Biol. 1994.</a>
          </Note>
        </p>
        <p className={body}>
          Fyhrie and colleagues ran a similar test in seven people who walked with strain gauges on the tibia. Strain did not rise after fatigue. A post hoc analysis suggested that strain rate rose, but the authors called that finding not conclusive.
          <Note>
            <a href="https://doi.org/10.1114/1.103">Fyhrie DP, et al. Ann Biomed Eng. 1998.</a>
          </Note>{" "}
          The evidence in people is thin, so it is still open whether calf fatigue matters for the human tibia. Periost would read the calf muscles as well as the periosteum, which would let us test it.
        </p>
      </>
    ),
  },
  {
    heading: "Periost would read two responses and one measure of load",
    content: (
      <>
        <p className={body}>
          The first response is the alarm. Each morning, Periost would measure how sensitive the tissue along the inner shin is to pressure. The measure would be the pressure pain threshold, the pressure at which the tissue first becomes painful. Pressure pain threshold testing is an established lab method.
          <Note>
            A computer-controlled version of the test.{" "}
            <a href="https://doi.org/10.1016/s0304-3959(02)00162-8">Polianskis R, et al. Pain. 2002.</a>
          </Note>{" "}
          Periost would look for a threshold lower than the athlete’s usual one.
        </p>
        <p className={body}>
          The second response is fatigue. During training, Periost would read the electrical activity of the calf muscles and note when they start to fatigue. A motion sensor on the shin would add context. It would count steps and record the impact of each one.
        </p>
        <p className={body}>
          The morning test would take about 90 seconds, and the athlete would keep the sleeve on through training. Periost would compare each athlete with their own baseline, never with other athletes. It would not diagnose. A flag would go to a trainer or clinician, who would examine the athlete and decide whether to order imaging.
        </p>
      </>
    ),
  },
  {
    heading: "One claim has to hold before any of this matters",
    content: (
      <>
        <p className={body}>
          Periost depends on one claim we haven’t tested. The claim is that the threshold drop shows up at least 7 days before the injury presents clinically. We think a week would give a trainer time to change an athlete’s load while the injury is still low grade.
        </p>
        <p className={body}>
          We plan to test the claim in stages. Bench tests of the sensors would come first. A reliability study in about 30 healthy adults over 14 days would follow, to see whether daily thresholds are steady enough to trend. Next, we would compare about 40 people who have medial tibial stress syndrome or a bone stress injury with 40 people who don’t. Last, a cohort of about 800 trainees would wear Periost through one training cycle, with MRI to confirm each injury.
        </p>
        <p className={body}>
          The idea fails if daily thresholds prove too noisy to trend, or if the threshold drop does not lead symptoms by a week. There is also an open question we can’t answer yet. People whose pain-free Achilles or patellar tendons look abnormal on ultrasound are about five times as likely to develop tendinopathy later.
          <Note>
            A meta-analysis with a pooled relative risk of 4.97.{" "}
            <a href="https://doi.org/10.1136/bjsports-2016-096288">McAuliffe S, et al. Br J Sports Med. 2016.</a>
          </Note>{" "}
          In those tendons, the tissue changes before it hurts. If bone works the same way, the threshold may drop only after the bone has changed. The alarm would then give less warning.
        </p>
      </>
    ),
  },
  {
    heading: "Periost would add the response to SafeSock’s dose",
    content: (
      <>
        <p className={body}>
          SafeSock is the pressure sensor sleeve we’re designing to sit inside a boot, cast, or brace. It would estimate dose from the pressure under the foot. Periost would add the response, how the tissue answers that load. Paired over weeks, dose and response would show how much load one person’s tibia tolerates. A population study gives only an average across many people.
        </p>
        <p className={body}>
          A PT or trainer would see a flagged athlete in the same queue as a flagged exercise video. Tissue tolerance paired with MRI grades is also the kind of data that{" "}
          <Link href="/resources/recovery-world-model" className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            the recovery world model
          </Link>{" "}
          needs. We think a model of healing has to learn how each person’s tissue responds to load. Periost is one way we’re exploring to measure that response.
        </p>
      </>
    ),
  },
];

export default function PeriostPage() {
  return <Article resource={periost} intro={intro} sections={sections} />;
}

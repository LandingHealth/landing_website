import type { Metadata } from "next";
import Link from "next/link";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "The recovery world model | Landing",
  description: "Why physical therapy needs a model of healing, and why PTs are the ones who can build it.",
};

const sections: ReadonlyArray<{ heading: string; paragraphs: readonly string[] }> = [
  {
    heading: "The PT is the missing measurement",
    paragraphs: [
      "One person already reads slow biology every day. A good PT watches a patient squat and can tell whether the knee is ready for more load. That judgment is the best signal anyone has on the slow timescale. Today it lives in chart notes and in the PT’s head, where no model can learn from it. A model can’t learn slow biology without it.",
    ],
  },
  {
    heading: "Landing measures the 166 hours",
    paragraphs: [
      "Patients film their home exercises with a phone or laptop and send the videos to Landing. Computer vision finds each rep, measures the joint angles, and flags reps with possible form issues, such as a knee caving inward on rep 3. Each flag carries the timestamp and the measurement behind it.",
      "We’re also designing SafeSock, a pressure sensor sleeve meant to sit inside a boot, cast, or brace and show how a patient bears weight between visits. Together, video and SafeSock are meant to capture the fast mechanics where the recovery happens.",
    ],
  },
  {
    heading: "The PT’s verdict closes the loop",
    paragraphs: [
      "The PT opens a flag, watches the rep, and agrees or rejects. We’re building Landing so each verdict becomes a labeled example for the next video. The PT decides what the patient hears.",
      "When the PT progresses, holds, or regresses the plan, that decision labels the slow timescale: this tissue, at this point, was ready or it wasn’t. Over time the flags get closer to what this PT would catch, and the model learns what healing looks like from the PT’s own calls.",
    ],
  },
  {
    heading: "The PT earns more",
    paragraphs: [
      "Today a PT’s judgment between visits is unpaid work, or it doesn’t happen at all. Flags point the PT to the reps worth watching, instead of every minute of every video. We want that review to count as remote therapeutic monitoring time, which clinics can bill.",
      "Patients who see their PT respond to their home sessions have a reason to keep coming, so the clinic keeps visits it already booked. A PT who knows how each patient did between visits spends less of each visit finding out, and can carry more patients.",
    ],
  },
  {
    heading: "The patient recovers more",
    paragraphs: [
      "Load follows the tissue, not the calendar. A patient who heals fast moves to the next phase sooner. A patient who heals slowly gets held back before a setback, not after one. A patient whose knee caves in on Tuesday’s squats hears about it from their PT before the next visit, not at it.",
    ],
  },
];

const body = "mt-5 text-[15px] leading-[1.6]";

export default function RecoveryWorldModelPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>The recovery world model</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Why physical therapy needs a model of healing, and why PTs are the ones who can build it.
          </p>
        </div>
        <article className="mx-auto mt-14 max-w-[38rem] px-6 sm:mt-16">
          <p className="text-[15px] leading-[1.6]">
            Physical therapy today is open-loop. A surgeon writes “partial weight-bearing for six weeks.” A PT picks a protocol from a table. Nobody measures whether the tissue is actually in its healing window.
          </p>
          <p className={body}>
            The gap is widest outside the clinic. A patient might spend two hours a week with their PT. The other 166 hours are when they do their home exercises and put weight on the repair. Most of the recovery happens in those hours, and nobody sees them.
          </p>
          <p className={body}>
            The body in rehab is a physical system with two timescales. The fast one is mechanics: forces, moments, and joint angles. Physics already models it well. The slow one is biology: healing, remodeling, and strength gain. Nobody models it well, because nobody has measured it.
          </p>
          {sections.map(({ heading, paragraphs }) => (
            <section key={heading}>
              <h2 className={`${type.h3} mt-12`}>{heading}</h2>
              {paragraphs.map((text) => (
                <p key={text} className={body}>
                  {text}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 text-[15px] leading-[1.6]">
            Every patient a PT treats on Landing adds labels to the model. The longer a clinic uses Landing, the better its flags and advice should get.
          </p>
          <p className="mt-12 text-[15px] leading-[1.6]">
            <Link href="/resources" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              Back to resources
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}

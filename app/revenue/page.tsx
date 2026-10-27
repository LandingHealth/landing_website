import type { Metadata } from "next";
import { container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Revenue | Landing",
  description: "How Landing saves physical therapists time and opens a new revenue stream between visits.",
};

type Block = { title: string; text: string; top?: string; ink?: boolean };

type Group = { top?: "stat" | "label"; blocks: ReadonlyArray<Block> };

const columns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const outcomes: ReadonlyArray<Block> = [
  {
    title: "Save time on repetitive work",
    text: "AI agents prep each visit, transcribe the session, and draft the clinical note. You review and sign off instead of starting from a blank page.",
  },
  {
    title: "Do more of the work you love",
    text: "Landing gives back about 30 minutes on every visit, so more of your day goes to hands-on care.",
  },
  {
    title: "Earn more from your expertise",
    text: "Between-visit care is a new monthly program built on your review of patients’ home exercise videos.",
  },
];

const sections: ReadonlyArray<{ title: string; paragraphs: ReadonlyArray<string>; groups: ReadonlyArray<Group> }> = [
  {
    title: "How we save you time",
    paragraphs: [
      "Landing’s agentic workflows handle the prep before a visit, the support during it, and the documentation after it.",
      "Each agent works from the patient’s data in Landing’s AWS cloud, including past visits, check-ins, and home exercise videos. You stay the clinician and sign off on everything the agents draft.",
    ],
    groups: [
      {
        top: "stat",
        blocks: [
          {
            top: "20 min",
            title: "Pre-visit prep",
            text: "Before the visit starts, Landing handles exercise familiarization and reviews the patient’s pain and progress. Agents write a next-visit brief and draft the exercise plan.",
          },
          {
            top: "2 min",
            title: "Visit support",
            text: "During the visit, Landing transcribes the session. Ask for the patient’s history at any point, and get substitute exercises when one doesn’t suit the patient.",
          },
          {
            top: "8 min",
            title: "Documentation and care planning",
            text: "After the visit, agents complete the clinical note, draft the home exercise program, and update the plan of care and the patient record. You review and sign off before anything is final.",
          },
        ],
      },
      {
        top: "stat",
        blocks: [
          {
            top: "30 min",
            title: "Saved on every visit",
            text: "20 minutes before the visit, 2 during it, and 8 after it.",
            ink: true,
          },
          {
            top: "1,500 hours",
            title: "Saved per physical therapist each year",
            text: "Based on 3,000 visits per therapist each year, at 30 minutes saved per visit.",
            ink: true,
          },
        ],
      },
    ],
  },
  {
    title: "New revenue stream: optimized between-visit care",
    paragraphs: [
      "Between visits, patients follow a home exercise program on their own. Landing gives you a way to guide that time and charge for it as a monthly program.",
      "Patients record their exercises at home. Landing’s ingestion pipeline uploads each video to encrypted AWS storage, and computer vision flags the movement that needs your attention. You review, adjust the plan, and approve every message before the patient sees it.",
    ],
    groups: [
      {
        top: "label",
        blocks: [
          {
            top: "At home",
            title: "Personalized home program",
            text: "Each patient gets a personalized program with pre-recorded exercise demos. The goal is better recovery and higher completion of the plan of care.",
          },
          {
            top: "At home",
            title: "Video and check-in",
            text: "Patients record videos of their exercises, rate pain and difficulty, and note any exercises they skipped. Landing ingests each video and check-in into the AWS cloud.",
          },
          {
            top: "PT-led review",
            title: "Optimized review",
            text: "Computer vision highlights movement concerns, so you watch the relevant clips instead of full videos. A prioritized worklist puts the patients who need you first, with skipped exercises and patient notes beside each video.",
          },
          {
            top: "PT-led review",
            title: "Plan updates and approved feedback",
            text: "You adjust exercises as needed. Agents draft a message to the patient, and you edit and approve it. The patient gets the updated plan with personalized feedback.",
          },
        ],
      },
    ],
  },
  {
    title: "New revenue stream: simulated",
    paragraphs: ["This simulation shows what between-visit care could earn one clinic. It is an estimate, not a forecast."],
    groups: [
      {
        top: "stat",
        blocks: [
          { top: "50", title: "Patients enrolled", text: "Patients from your caseload who join between-visit care." },
          { top: "$299", title: "Per patient each month", text: "The monthly fee for each enrolled patient." },
          { top: "$14,950", title: "Revenue each month", text: "50 patients at $299 each." },
          { top: "$179,400", title: "Annualized revenue", text: "$14,950 a month for 12 months.", ink: true },
        ],
      },
    ],
  },
];

function Blocks({
  blocks,
  top,
  className = "",
}: {
  blocks: ReadonlyArray<Block>;
  top?: "stat" | "label";
  className?: string;
}) {
  return (
    <ul className={`grid gap-3 ${edgePad} ${columns[blocks.length]} ${className}`}>
      {blocks.map((block) => (
        <li
          key={block.title}
          className={`rounded-xl p-5 sm:p-6 ${block.ink ? "bg-ink text-white" : "bg-mist"}`}
        >
          {top === "stat" && (
            <p className="font-display text-4xl font-medium leading-none tracking-[-0.025em]">{block.top}</p>
          )}
          {top === "label" && <p className={`${type.label} text-accent-deep`}>{block.top}</p>}
          <h3 className={`text-[15px] font-medium leading-snug ${top ? "mt-10" : ""}`}>{block.title}</h3>
          <p className="mt-1 text-[15px] leading-[1.5]">{block.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default function RevenuePage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>What Landing can do for you.</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Landing is an agentic platform for physical therapy, built on the AWS cloud. It takes repetitive work off your
            schedule and opens a new revenue stream between visits.
          </p>
        </div>
        <Blocks blocks={outcomes} className="mt-14 sm:mt-16" />
        {sections.map(({ title, paragraphs, groups }) => (
          <div key={title}>
            <div className={`mt-20 grid gap-x-3 gap-y-8 ${edgePad} sm:mt-24 lg:grid-cols-2`}>
              <h2 className={`${type.h2} max-w-xl`}>{title}</h2>
              <div className="max-w-xl space-y-5 text-[15px] leading-[1.6]">
                {paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
            {groups.map(({ top, blocks }, index) => (
              <Blocks
                key={blocks[0].title}
                blocks={blocks}
                top={top}
                className={index === 0 ? "mt-16 sm:mt-20" : "mt-3"}
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

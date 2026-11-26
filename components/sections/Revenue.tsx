import RevenueCalculator, { type CalculatorKind } from "@/components/RevenueCalculator";
import { container, gutter, type } from "@/lib/site";

type Block = { title: string; text: string; top?: string };

type Group = { top?: "label"; blocks: ReadonlyArray<Block> };

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
    text: "With prep and documentation drafted for you, more of your day can go to hands-on care.",
  },
  {
    title: "Earn more from your expertise",
    text: "Between-visit care is a new monthly program built on your review of patients’ home exercise videos.",
  },
];

const sections: ReadonlyArray<{
  title: string;
  paragraphs: ReadonlyArray<string>;
  groups: ReadonlyArray<Group>;
  calculator?: CalculatorKind;
}> = [
  {
    title: "How we save you time",
    paragraphs: [
      "Landing’s agentic workflows handle the prep before a visit, the support during it, and the documentation after it.",
      "Each agent works from the patient’s data in Landing’s AWS cloud, including past visits, check-ins, and home exercise videos. You stay the clinician and sign off on everything the agents draft.",
      "Time saved depends on your caseload and how your clinic works today. Enter your weekly visits and your own estimate of minutes saved per visit to see the hours it adds up to.",
    ],
    groups: [
      {
        top: "label",
        blocks: [
          {
            top: "Before the visit",
            title: "Pre-visit prep",
            text: "Landing handles exercise familiarization and reviews the patient’s pain and progress. Agents write a next-visit brief and draft the exercise plan.",
          },
          {
            top: "During the visit",
            title: "Visit support",
            text: "Landing transcribes the session. Ask for the patient’s history at any point, and get substitute exercises when one doesn’t suit the patient.",
          },
          {
            top: "After the visit",
            title: "Documentation and care planning",
            text: "Agents complete the clinical note, draft the home exercise program, and update the plan of care and the patient record. You review and sign off before anything is final.",
          },
        ],
      },
    ],
    calculator: "time",
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
    title: "Model your own program",
    paragraphs: [
      "Enter the patients you’d enroll, the monthly fee you’d set, and the time you expect to spend reviewing each patient. The calculator shows estimated gross revenue and the staff review hours behind it.",
      "Fees in the calculator start at $50 a month. That is an input limit, not Landing’s pricing. The result is before any costs and is an estimate, not a forecast.",
    ],
    groups: [],
    calculator: "program",
  },
];

function Blocks({
  blocks,
  top,
  className = "",
}: {
  blocks: ReadonlyArray<Block>;
  top?: "label";
  className?: string;
}) {
  return (
    <ul className={`grid gap-3 ${gutter} ${columns[blocks.length]} ${className}`}>
      {blocks.map((block) => (
        <li
          key={block.title}
          className="rounded-xl bg-fog p-5 sm:p-6"
        >
          {top === "label" && <p className={`${type.label} text-blue`}>{block.top}</p>}
          <h3 className={`text-[15px] font-medium leading-snug ${top ? "mt-10" : ""}`}>{block.title}</h3>
          <p className="mt-1 text-[15px] leading-[1.5]">{block.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default function RevenueSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="revenue" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className={`${container} flex flex-col items-center text-center`}>
        <Heading className={`${type.h1} max-w-4xl`}>What Landing can do for you.</Heading>
        <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
          Landing is an agentic platform for physical therapy, built on the AWS cloud. It takes repetitive work off your
          schedule and opens a new revenue stream between visits.
        </p>
      </div>
      <Blocks blocks={outcomes} className="mt-14 sm:mt-16" />
      {sections.map(({ title, paragraphs, groups, calculator }) => (
        <div key={title}>
          <div className={`mt-20 grid gap-x-3 gap-y-8 ${gutter} sm:mt-24 lg:grid-cols-2`}>
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
          {calculator && (
            <div className={groups.length ? "mt-3" : "mt-16 sm:mt-20"}>
              <RevenueCalculator kind={calculator} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

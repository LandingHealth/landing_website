import type { Metadata } from "next";
import Article, { Note, body, text } from "@/components/Article";
import { bettingOnAiAgents } from "@/lib/resources";

const { title, summary } = bettingOnAiAgents;

export const metadata: Metadata = {
  title: `${title} | Landing`,
  description: summary,
};

const intro = (
  <p className={text}>
    An AI agent is worth building when it owns one defined part of a workflow. It gathers the information that part needs and prepares the work for a person to review. A system of agents coordinates several of those parts. People spend less time searching for information and repeating routine work, and the person who makes each decision gets the context for it.
  </p>
);

const sections = [
  {
    heading: "Healthcare already uses AI to summarize and document",
    content: (
      <>
        <p className={body}>
          The AMA’s 2026 Physician Survey on Augmented Intelligence asked 1,692 physicians how they use AI. Nearly 4 in 10 use it to summarize medical research and standards of care, the most common use in the survey.
          <Note>
            The use percentages are among the 1,342 physicians who answered that question. American Medical Association.{" "}
            <a href="https://www.ama-assn.org/sites/ama-assn.org/files/2026-03/physician-ai-sentiment-report_0.pdf">2026 Physician Survey on Augmented Intelligence</a>. March 2026.
          </Note>{" "}
          Documentation and chart summaries are the uses physicians most expect to adopt next.
        </p>
        <p className={body}>
          Ongoing care asks more of an agent. Patient information can be incomplete or contradictory. A recommendation needs evidence behind it. Before acting on an output, a clinician needs to know what it’s based on.
        </p>
      </>
    ),
  },
  {
    heading: "Landing’s agents prepare the PT for each visit",
    content: (
      <>
        <p className={body}>
          We started with the work a physical therapist does before a visit. One agent combines the patient’s history, earlier session notes, and exercise activity into a brief for the next visit. A second agent, which we’re still building, proposes exercise options from the same patient context and from reviewed clinical references.
        </p>
        <p className={body}>
          Both agents are built to cite their sources and flag missing information. The PT makes every treatment decision.
        </p>
      </>
    ),
  },
  {
    heading: "What we’re betting on",
    content: (
      <>
        <p className={body}>
          Our bet is that agents can cut preparation time and leave PTs more attention for their patients. A PT can review what changed and which options have support, without rebuilding the patient’s history before every visit. For patients, that can mean better continuity and plan changes based on more information.
        </p>
        <p className={body}>
          Landing’s goal is better outcomes from care that adjusts between visits, with less work for the people who deliver it.
        </p>
      </>
    ),
  },
];

export default function BettingOnAiAgentsPage() {
  return <Article resource={bettingOnAiAgents} intro={intro} sections={sections} />;
}

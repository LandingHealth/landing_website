import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";

export const metadata: Metadata = {
  title: "Solution | Landing",
  description: "Support for physical therapy before, during, and between appointments.",
};

export default function SolutionPage() {
  return (
    <SectionPage
      label="Solution"
      title="Support for the whole course of care."
      intro="Physical therapy doesn’t stop when the visit ends. Landing keeps each patient’s exercise plan and progress in one place, so you can follow their recovery between visits."
      sectionTitle="Before, during, and between"
      details={[
        {
          heading: "Before a visit",
          text: "Patient check-ins, and later SafeSock weight-bearing trends, help you prepare for the next conversation.",
        },
        {
          heading: "During care planning",
          text: "Landing helps you find exercises that fit the treatment goals, the patient’s equipment, and the restrictions you set.",
        },
        {
          heading: "Between visits",
          text: "Each patient gets a personalized home exercise guide with clear instructions and a schedule to follow at home.",
        },
      ]}
    />
  );
}

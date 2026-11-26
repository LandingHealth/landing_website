import type { Metadata } from "next";
import RevenueSection from "@/components/sections/Revenue";
import BackLink from "@/components/ui/BackLink";
import CtaSheet from "@/components/ui/CtaSheet";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";

export const metadata: Metadata = {
  title: "Clinic planning | Landing",
  description:
    "Two calculators for clinic owners. Estimate weekly hours from your own time-saved estimate, and the gross monthly revenue and review hours of a between-visit program.",
};

export default function ClinicPlanningPage() {
  return (
    <main>
      <Sheet className="flex flex-col items-center text-center">
        <BackLink href="/resources" label="Resources" />
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Clinic planning"
          title="Work through the numbers with your own inputs"
          lead="Two calculators for clinic owners. Each one multiplies the numbers you enter and shows its formula. Neither uses data from Landing or from other clinics."
          className="mt-8"
        />
      </Sheet>
      <RevenueSection />
      <CtaSheet heading="Walk through your clinic’s numbers with us." lead="On a demo call, we’ll go through these calculators with your clinic’s own numbers." />
    </main>
  );
}

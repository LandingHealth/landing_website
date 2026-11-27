import type { Metadata } from "next";
import RevenueSection from "@/components/sections/Revenue";
import BackLink from "@/components/ui/BackLink";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";

export const metadata: Metadata = {
  title: "Clinic planning | Landing",
  description:
    "Two ways Landing adds revenue to a clinic. Estimate monthly remote therapeutic monitoring revenue in recovery and a paid home exercise program after discharge, from numbers you enter.",
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
          title="Two ways Landing adds revenue to your clinic"
          lead="Monitoring patients in recovery, and a paid program after discharge. The calculator uses only the numbers you enter. It uses no data from Landing or from other clinics."
          className="mt-8"
        />
      </Sheet>
      <RevenueSection />
    </main>
  );
}

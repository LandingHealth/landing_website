import type { Metadata } from "next";
import Link from "next/link";
import RevenueSection from "@/components/sections/Revenue";
import CtaSheet from "@/components/ui/CtaSheet";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { focusRing, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinic planning | Landing",
  description:
    "Two calculators for clinic owners. Estimate weekly hours from your own time-saved estimate, and the gross monthly revenue and review hours of a between-visit program.",
};

export default function ClinicPlanningPage() {
  return (
    <main>
      <Sheet className="pt-4 sm:pt-8">
        <Link href="/resources" className={`${type.label} rounded-sm text-slate hover:text-ink ${focusRing}`}>
          Resources
        </Link>
        <SectionHeading
          as="h1"
          eyebrow="Clinic planning"
          title="Work through the numbers with your own inputs."
          lead="Two calculators for clinic owners. Each one multiplies the numbers you enter and shows its formula. Neither uses data from Landing or from other clinics."
          className="mt-8"
        />
      </Sheet>
      <RevenueSection />
      <CtaSheet heading="Walk through your clinic’s numbers with us." />
    </main>
  );
}

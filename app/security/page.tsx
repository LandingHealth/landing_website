import type { Metadata } from "next";
import SecuritySection from "@/components/sections/Security";
import CtaSheet from "@/components/ui/CtaSheet";

export const metadata: Metadata = {
  title: "Security | Landing",
  description: "How Landing stores, encrypts, and controls access to patient data for physical therapy clinics.",
};

export default function SecurityPage() {
  return (
    <main>
      <SecuritySection />
      <CtaSheet heading="Bring your security questions to a demo." lead="We’ll walk through how Landing stores and protects patient data, and take your security questionnaire from there." />
    </main>
  );
}

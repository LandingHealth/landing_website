import type { Metadata } from "next";
import SecuritySection from "@/components/sections/Security";
import CtaSheet from "@/components/ui/CtaSheet";
import { demo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security | Landing",
  description: "How Landing stores, encrypts, and controls access to patient data for physical therapy clinics.",
};

export default function SecurityPage() {
  return (
    <main>
      <SecuritySection />
      <CtaSheet heading="Bring your security questions to a demo." lead={demo.sees} />
    </main>
  );
}

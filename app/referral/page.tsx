import type { Metadata } from "next";
import ReferralSection from "@/components/sections/Referral";
import CtaSheet from "@/components/ui/CtaSheet";

export const metadata: Metadata = {
  title: "Referral | Landing",
  description: "Earn $500 when a clinic you refer starts using Landing.",
};

export default function ReferralPage() {
  return (
    <main>
      <ReferralSection />
      <CtaSheet heading="Know a clinic that could use Landing?" />
    </main>
  );
}

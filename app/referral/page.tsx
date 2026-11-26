import type { Metadata } from "next";
import ReferralSection from "@/components/sections/Referral";

export const metadata: Metadata = {
  title: "Referral | Landing",
  description: "Earn $500 when a clinic you refer starts using Landing.",
};

export default function ReferralPage() {
  return (
    <main>
      <ReferralSection />
    </main>
  );
}

import type { Metadata } from "next";
import IntegrationSection from "@/components/sections/Integration";
import ReferralSection from "@/components/sections/Referral";

export const metadata: Metadata = {
  title: "Getting started | Landing",
  description: "How a clinic gets set up on Landing in less than half an hour, and how to earn $500 for referring one.",
};

export default function GettingStartedPage() {
  return (
    <main>
      <IntegrationSection />
      <div className="border-t border-ink/10">
        <ReferralSection heading="h2" />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import IntegrationSection from "@/components/sections/Integration";

export const metadata: Metadata = {
  title: "Getting started | Landing",
  description: "How a clinic gets set up on Landing in less than half an hour.",
};

export default function GettingStartedPage() {
  return (
    <main>
      <IntegrationSection />
    </main>
  );
}

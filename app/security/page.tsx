import type { Metadata } from "next";
import SecuritySection from "@/components/sections/Security";

export const metadata: Metadata = {
  title: "Security | Landing",
  description: "How Landing protects patient information for physical therapy clinics.",
};

export default function SecurityPage() {
  return (
    <main>
      <SecuritySection />
    </main>
  );
}

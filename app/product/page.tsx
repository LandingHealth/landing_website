import type { Metadata } from "next";
import RevenueSection from "@/components/sections/Revenue";
import SecuritySection from "@/components/sections/Security";

export const metadata: Metadata = {
  title: "Product | Landing",
  description: "How Landing saves physical therapists time, opens a new revenue stream between visits, and protects patient information.",
};

export default function ProductPage() {
  return (
    <main>
      <RevenueSection />
      <div className="border-t border-ink/10">
        <SecuritySection heading="h2" />
      </div>
    </main>
  );
}

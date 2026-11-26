import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Why we built Landing, the founders behind it, and what we're building toward.",
};

export default function CompanyPage() {
  return (
    <main className="overflow-x-clip">
      <AboutSection />
    </main>
  );
}

import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";
import CareersSection from "@/components/sections/Careers";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Meet the Landing cofounders, read our story, and apply for an open internship.",
};

export default function CompanyPage() {
  return (
    <main>
      <AboutSection />
      <div className="border-t border-ink/10">
        <CareersSection heading="h2" />
      </div>
    </main>
  );
}

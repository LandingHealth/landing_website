import type { Metadata } from "next";
import CompanySection from "@/components/sections/Company";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Why we built Landing and what we're building toward.",
};

export default function CompanyPage() {
  return (
    <main className="overflow-x-clip">
      <CompanySection />
    </main>
  );
}

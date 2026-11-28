import type { Metadata } from "next";
import VersionA from "@/components/sections/company/VersionA";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Why we built Landing and what we're building toward.",
  robots: { index: false },
};

export default function CompanyVersionAPage() {
  return (
    <main className="overflow-x-clip">
      <VersionA />
    </main>
  );
}

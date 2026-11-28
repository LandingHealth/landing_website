import type { Metadata } from "next";
import VersionB from "@/components/sections/company/VersionB";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "What Landing believes and what we're building for physical therapy between visits.",
  robots: { index: false },
};

export default function CompanyVersionBPage() {
  return (
    <main className="overflow-x-clip">
      <VersionB />
    </main>
  );
}

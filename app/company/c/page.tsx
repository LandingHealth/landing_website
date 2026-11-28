import type { Metadata } from "next";
import VersionC from "@/components/sections/company/VersionC";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "What Landing builds, who it’s for, and where we’re headed.",
  robots: { index: false },
};

export default function CompanyVersionCPage() {
  return (
    <main className="overflow-x-clip">
      <VersionC />
    </main>
  );
}

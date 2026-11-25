import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Meet the Landing cofounders and read our story.",
};

export default function CompanyPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}

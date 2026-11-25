import type { Metadata } from "next";
import CareersSection from "@/components/sections/Careers";

export const metadata: Metadata = {
  title: "Careers | Landing",
  description: "See Landing's open internship roles and apply.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersSection />
    </main>
  );
}

import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";
import CtaSheet from "@/components/ui/CtaSheet";

export const metadata: Metadata = {
  title: "Company | Landing",
  description: "Why we built Landing, the founders behind it, and what we're building toward.",
};

export default function CompanyPage() {
  return (
    <main className="overflow-x-clip">
      <AboutSection />
      <CtaSheet heading="Talk with the team building Landing." lead="Book a time to see Landing, or look through the roles we’re hiring for." secondary={{ label: "See open roles", href: "/careers" }} />
    </main>
  );
}

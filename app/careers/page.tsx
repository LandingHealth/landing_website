import type { Metadata } from "next";
import CareersSection from "@/components/sections/Careers";
import CtaSheet from "@/components/ui/CtaSheet";

export const metadata: Metadata = {
  title: "Careers | Landing",
  description: "Landing's open roles: full-time operations and sales, plus engineering and research internships. Every role is remote.",
};

export default function CareersPage() {
  return (
    <main className="overflow-x-clip">
      <CareersSection />
      <div className="bg-fog">
        <CtaSheet heading="See the product you’d help build." />
      </div>
    </main>
  );
}

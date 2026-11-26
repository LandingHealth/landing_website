import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import CtaSheet from "@/components/ui/CtaSheet";
import RevenueSection from "@/components/sections/Revenue";
import { container, demo, flyerHref, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product | Landing",
  description: "How Landing saves physical therapists time, opens a new revenue stream between visits, and protects patient information.",
};

export default function ProductPage() {
  return (
    <main>
      <RevenueSection />
      <section id="security" className="scroll-mt-16 border-t border-ink/10 py-20 sm:py-24">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h2 className={`${type.h2} max-w-3xl`}>Peace of mind for physical therapists.</h2>
          <p className={`${type.lead} mt-5 max-w-[36rem] text-pretty`}>
            Landing encrypts patient data, keeps it on a private network in AWS, and limits sign-in to invited clinic staff.
          </p>
          <div className="mt-10">
            <ButtonLink href="/security" variant="secondary">See how we protect patient data</ButtonLink>
          </div>
        </div>
      </section>
      <CtaSheet lead={demo.sees}>
        <p className="text-[15px]">
          Want something to share with your team?{" "}
          <a href={flyerHref} download className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            Download the clinic flyer (PDF)
          </a>
        </p>
      </CtaSheet>
    </main>
  );
}

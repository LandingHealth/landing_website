import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import { type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply | Landing",
  robots: { index: false },
};

export default function ApplyPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-14 sm:py-20">
      <p className={`${type.label} inline-block rounded-full bg-mist px-3 py-1`}>Research internship</p>
      <h1 className={`${type.h2} mt-5`}>Landing Health Research Internship Application</h1>
      <p className={`${type.lead} mt-4`}>
        No experience or technical skills required. We’re looking for curious, reliable people willing to learn!
      </p>
      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6 sm:p-8">
        <ApplicationForm />
      </div>
    </main>
  );
}

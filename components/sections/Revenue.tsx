import RevenueCalculator from "@/components/RevenueCalculator";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { type } from "@/lib/site";

const streams = [
  {
    eyebrow: "In recovery",
    title: "Bill the PT’s review of home exercise.",
    text: "Patients use Landing during their plan of care. Where the patient qualifies, the PT’s review of that home exercise can be billed as remote therapeutic monitoring. Reimbursement depends on the payer and the patient’s eligibility.",
  },
  {
    eyebrow: "After discharge",
    title: "Keep patients on a paid monthly program.",
    text: "When the plan of care ends, patients can stay on your clinic’s monthly home exercise program. You set the fee. It is your program, not Landing’s pricing.",
  },
] as const;

export default function RevenueSection() {
  return (
    <>
      <Sheet tone="fog" round="top">
        <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {streams.map(({ eyebrow, title, text }) => (
            <li key={eyebrow} className="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-inset ring-hair sm:p-8">
              <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
              <h2 className={type.h3}>{title}</h2>
              <p className={`${type.body} mt-3`}>{text}</p>
            </li>
          ))}
        </ul>
      </Sheet>
      <Sheet id="calculator" tone="white" round="top">
        <SectionHeading
          eyebrow="Calculator"
          title="Add up both streams with your own numbers."
          lead="Every input is your clinic’s own estimate. The monitoring figure is yours, not a Landing rate, and the program fee is yours to set."
        />
        <div className="mt-10 lg:mt-14">
          <RevenueCalculator />
        </div>
      </Sheet>
    </>
  );
}

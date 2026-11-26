import RevenueCalculator, { type CalculatorKind } from "@/components/RevenueCalculator";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { type } from "@/lib/site";

const calculators: ReadonlyArray<{
  kind: CalculatorKind;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
}> = [
  {
    kind: "time",
    eyebrow: "Time",
    title: "See what your own time estimate adds up to.",
    paragraphs: [
      "Landing doesn’t publish a measured time savings figure, and time saved depends on your caseload and how your clinic works today.",
      "Enter your weekly visits and your own estimate of minutes saved per visit. The calculator multiplies the two and shows the weekly hours, with the formula under the total.",
    ],
  },
  {
    kind: "program",
    eyebrow: "Between-visit program",
    title: "Model a monthly program for home exercise review.",
    paragraphs: [
      "Some clinics may offer a monthly program built on the PT’s review of patients’ home exercise videos. Enter the patients you’d enroll, the monthly fee you’d set, and the time you expect to spend reviewing each patient.",
      "Fees in the calculator start at $50 a month. That is an input limit, not Landing’s pricing. The result is before any costs and is an estimate, not a forecast.",
    ],
  },
];

export default function RevenueSection() {
  return (
    <>
      {calculators.map(({ kind, eyebrow, title, paragraphs }, index) => (
        <Sheet key={kind} id={kind} tone={index % 2 === 0 ? "fog" : "white"} round="top">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
            <SectionHeading eyebrow={eyebrow} title={title} />
            <div className="mt-6 space-y-4 lg:mt-10">
              {paragraphs.map((text) => (
                <p key={text} className={type.body}>{text}</p>
              ))}
            </div>
          </div>
          <div className="mt-10 lg:mt-14">
            <RevenueCalculator kind={kind} />
          </div>
        </Sheet>
      ))}
    </>
  );
}

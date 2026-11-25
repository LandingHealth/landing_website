import ApplicationForm from "@/components/ApplicationForm";
import { container, type } from "@/lib/site";

type Role = { title: string; department: string; employment: "Full-time" | "Internship"; location: "Remote" };

const roles: ReadonlyArray<Role> = [
  { title: "Founding Operations Lead", department: "Operations", employment: "Full-time", location: "Remote" },
  { title: "Founding Account Executive", department: "Sales", employment: "Full-time", location: "Remote" },
  { title: "Founding Electrical Engineering Intern", department: "Engineering", employment: "Internship", location: "Remote" },
  { title: "Hardware Engineering Intern", department: "Engineering", employment: "Internship", location: "Remote" },
  { title: "Computer Vision Research Assistant", department: "Research", employment: "Internship", location: "Remote" },
];

export default function CareersSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="careers" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className={`${container} flex flex-col items-center text-center`}>
        <Heading className={`${type.h1} max-w-4xl`}>Careers</Heading>
        <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
          We’re a small team building the between-visit layer for physical therapy. Every role is remote.
        </p>
      </div>
      <div className={`${container} mt-14 sm:mt-16`}>
        <div className="mx-auto max-w-4xl">
          <h2 className={type.label}>Open roles</h2>
          <ul className="mt-4 border-t border-ink/15">
            {roles.map(({ title, department, employment, location }) => (
              <li
                key={title}
                className="flex flex-col gap-1 border-b border-ink/15 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-[17px] font-medium leading-snug">{title}</p>
                  <p className="mt-1 text-[15px]">
                    {department} · {employment} · {location}
                  </p>
                </div>
                <a
                  href="#apply"
                  className="mt-2 shrink-0 self-start text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink sm:mt-0 sm:self-center"
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="apply" className={`${container} mt-20 scroll-mt-24 sm:mt-24`}>
        <div className="mx-auto grid max-w-4xl gap-x-12 gap-y-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <h2 className={type.h2}>Apply</h2>
            <p className="mt-4 text-[15px] leading-[1.6]">
              Tell us which role you’re applying for in your first answer. We read every application and reply by email.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}

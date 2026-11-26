import ApplicationForm from "@/components/ApplicationForm";
import ButtonLink from "@/components/ButtonLink";
import DarkCard from "@/components/ui/DarkCard";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { container, focusRing } from "@/lib/site";

type Role = {
  title: string;
  department: string;
  employment: "Full-time" | "Internship";
  location: "Remote";
};

const roles: ReadonlyArray<Role> = [
  {
    title: "Founding Operations Lead",
    department: "Operations",
    employment: "Full-time",
    location: "Remote",
  },
  {
    title: "Founding Account Executive",
    department: "Sales",
    employment: "Full-time",
    location: "Remote",
  },
  {
    title: "Founding Electrical Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
  },
  {
    title: "Hardware Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
  },
  {
    title: "Computer Vision Research Assistant",
    department: "Research",
    employment: "Internship",
    location: "Remote",
  },
];

const expectations = [
  { title: "Location", body: "Every role is remote." },
  {
    title: "Commitment",
    body: "Two roles are full-time and three are internships. Tell us your weekly hours and when you could start, and we’ll find a schedule that works.",
  },
] as const;

export default function CareersSection() {
  return (
    <>
      <section className="pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-20">
        <div className={container}>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Careers"
            title="Help build the between‑visit layer for physical therapy"
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="#apply" variant="primary">Apply now</ButtonLink>
          </div>

          <div className="mt-16 lg:mt-24">
            <Eyebrow>Open roles</Eyebrow>
            <ul className="mt-8 border-t border-hair">
              {roles.map((role) => (
                <li key={role.title} className="border-b border-hair">
                  <a
                    href="#apply"
                    aria-label={`Apply for ${role.title}`}
                    className={`group block py-6 sm:grid sm:grid-cols-[1.3fr_1fr_1fr_1fr] sm:items-baseline sm:gap-6 ${focusRing}`}
                  >
                    <span className="block text-lg leading-snug transition-colors group-hover:text-blue">{role.title}</span>
                    <span className="mt-1 block text-slate sm:hidden">
                      {role.department} · {role.employment} · {role.location}
                    </span>
                    <span className="hidden text-slate sm:block">{role.department}</span>
                    <span className="hidden text-slate sm:block">{role.employment}</span>
                    <span className="hidden text-slate sm:block">{role.location}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className={`${container} pb-16 lg:pb-20`}>
        <DarkCard eyebrow="Expectations" title="Remote, with hours that fit." items={expectations} />
      </div>

      <Sheet tone="fog" round="top" id="apply">
        <SectionHeading eyebrow="Application process" title="Apply" />
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 sm:p-10">
          <ApplicationForm />
        </div>
      </Sheet>
    </>
  );
}

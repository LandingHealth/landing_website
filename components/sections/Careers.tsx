import ApplicationForm from "@/components/ApplicationForm";
import ButtonLink from "@/components/ButtonLink";
import DarkCard from "@/components/ui/DarkCard";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { container, focusRing, type } from "@/lib/site";

type Role = {
  title: string;
  department: string;
  employment: "Full-time" | "Internship";
  location: "Remote";
  summary: string;
};

const roles: ReadonlyArray<Role> = [
  {
    title: "Founding Operations Lead",
    department: "Operations",
    employment: "Full-time",
    location: "Remote",
    summary: "Run clinic onboarding and the day-to-day operations behind it, from setup to support.",
  },
  {
    title: "Founding Account Executive",
    department: "Sales",
    employment: "Full-time",
    location: "Remote",
    summary: "Sell Landing to physical therapy clinics, from the first call to a clinic that’s set up and using it.",
  },
  {
    title: "Founding Electrical Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
    summary: "Help design and test the sensor electronics for SafeSock.",
  },
  {
    title: "Hardware Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
    summary: "Help build and test SafeSock prototypes.",
  },
  {
    title: "Computer Vision Research Assistant",
    department: "Research",
    employment: "Internship",
    location: "Remote",
    summary: "Work on the computer vision that flags movement in patients’ home exercise videos.",
  },
];

const expectations = [
  { title: "Location", body: "Every role is remote." },
  {
    title: "Commitment",
    body: "Two roles are full-time and three are internships. Tell us your weekly hours and when you could start, and we’ll find a schedule that works.",
  },
] as const;

const process = [
  { title: "Fill in one form", body: "Name the role you’re applying for in your first answer." },
  { title: "We read it", body: "We read every application and reply to everyone by email." },
] as const;

const meta = (role: Role) => `${role.department} · ${role.employment} · ${role.location}`;

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
            lead="We’re a small team with two full-time roles and three internships open. Every role is remote."
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="#apply" variant="primary">Apply now</ButtonLink>
          </div>

          <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-4 lg:gap-x-10">
            <div>
              <Eyebrow className="mb-4">Open roles</Eyebrow>
              <h2 className={type.h2}>Five roles</h2>
            </div>
            <ul className="mt-8 border-t border-hair lg:col-span-3 lg:mt-0">
              {roles.map((role) => (
                <li key={role.title} className="flex flex-col gap-1 border-b border-hair py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{role.title}</h3>
                    <p className="mt-1 text-slate">{meta(role)}</p>
                    <p className={`${type.body} mt-2`}>{role.summary}</p>
                  </div>
                  <a
                    href="#apply"
                    aria-label={`Apply for ${role.title}`}
                    className={`mt-2 shrink-0 self-start rounded-sm font-medium text-blue underline-offset-4 hover:underline sm:mt-0 sm:self-center ${focusRing}`}
                  >
                    Apply <span aria-hidden>→</span>
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

      <div className="bg-white">
        <section id="apply" className="scroll-mt-24 rounded-t-3xl bg-fog py-16 [--reveal-mask:var(--color-fog)] sm:rounded-t-[2.5rem] lg:py-20">
          <div className={`${container} lg:grid lg:grid-cols-4 lg:gap-x-10`}>
            <div className="lg:col-span-2 lg:pr-10">
              <Eyebrow className="mb-4">Application process</Eyebrow>
              <h2 className={type.h2}>Apply</h2>
              <ol className="mt-8 border-t border-hair">
                {process.map(({ title, body }, index) => (
                  <li key={title} className="border-b border-hair py-5">
                    <span aria-hidden className="font-mono text-blue">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                    <p className={`${type.body} mt-1`}>{body}</p>
                  </li>
                ))}
              </ol>
              <h3 className="mt-8 text-lg font-semibold">Your information</h3>
              <p className={`${type.body} mt-2`}>
                We use your answers only to review your application. They go to a private spreadsheet. To have your application deleted, email us from the Contact link at the bottom of this page.
              </p>
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 sm:p-10 lg:col-span-2 lg:mt-0">
              <ApplicationForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

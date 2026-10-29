import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import { container, edgePad, type } from "@/lib/site";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team | Landing",
  description: "Meet the Landing team and see our open internship roles.",
};

type Role = { title: string; department: string; employment: string; location: string };

const roleColumns: ReadonlyArray<{ key: keyof Role; label: string }> = [
  { key: "title", label: "Title" },
  { key: "department", label: "Department" },
  { key: "employment", label: "Employment type" },
  { key: "location", label: "Location type" },
];

const roles: ReadonlyArray<Role> = [
  {
    title: "Computer Vision Research Assistant",
    department: "Research",
    employment: "Internship",
    location: "Remote",
  },
  {
    title: "Hardware Engineering Intern",
    department: "Engineering",
    employment: "Internship",
    location: "Remote",
  },
];

const [titleColumn, ...detailColumns] = roleColumns;

export default function TeamPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet the team</h1>
        </div>
        <div className={`mt-14 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-16 md:grid-cols-3`}>
          {team.map(({ name, role, bio, photo, demoHost }) => (
            <article key={name} className="flex flex-col text-center">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-square h-auto w-full rounded-xl bg-mist object-cover ring-1 ring-black"
              />
              <h2 className="mt-4 text-[15px] font-medium leading-snug">{name}</h2>
              <p className="mt-1 text-[15px] leading-[1.5]">{role}</p>
              <p className="mt-1 text-[15px] leading-[1.5]">{bio}</p>
              {demoHost && (
                <div className="mt-auto pt-6">
                  <ButtonLink href="/schedule" variant="primary">
                    Book a demo with {demoHost}
                  </ButtonLink>
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="mt-24 sm:mt-32">
          <div className={`grid gap-x-3 gap-y-8 ${edgePad} lg:grid-cols-2`}>
            <h2 className={`${type.h2} max-w-xl`}>Open roles</h2>
            <div className="max-w-xl space-y-5 text-[15px] leading-[1.6]">
              <p>We’re hiring interns in research and engineering. Both roles are remote.</p>
            </div>
          </div>
          <div className={`mt-10 sm:mt-14 ${edgePad}`}>
            <table className="w-full">
              <caption className="sr-only">Open roles</caption>
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-ink/15">
                  {roleColumns.map(({ key, label }) => (
                    <th key={key} scope="col" className="pb-3 text-left text-sm font-normal sm:w-1/4">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.title} className="border-b border-ink/15 align-top">
                    <th scope="row" className="py-6 pr-4 text-left text-[15px] font-normal">
                      {role[titleColumn.key]}
                      <span className="mt-1 block sm:hidden">
                        {detailColumns.map(({ key }) => role[key]).join(" · ")}
                      </span>
                    </th>
                    {detailColumns.map(({ key }) => (
                      <td key={key} className="hidden py-6 pr-4 text-[15px] sm:table-cell">
                        {role[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

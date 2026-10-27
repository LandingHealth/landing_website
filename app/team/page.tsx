import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import { container, edgePad, type } from "@/lib/site";
import { demoAnchor, team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team | Landing",
  description: "Meet the Landing team.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Meet the team</h1>
        </div>
        <div className={`mt-14 grid gap-x-3 gap-y-12 ${edgePad} sm:mt-16 md:grid-cols-3`}>
          {team.map(({ name, role, bio, photo, demo }) => (
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
              {demo && (
                <div className="mt-auto pt-6">
                  <ButtonLink href={`/schedule#${demoAnchor(demo.host)}`} variant="primary">
                    Book a demo with {demo.host}
                  </ButtonLink>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

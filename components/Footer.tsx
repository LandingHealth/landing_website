import Link from "next/link";
import BrandLockup from "@/components/Brand";
import { container, focusRing, footerColumns } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 lg:pt-20">
      <div className={`${container} grid gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-x-10`}>
        <Link href="/" aria-label="Landing Health home" className={`self-start justify-self-start rounded-sm ${focusRing}`}>
          <BrandLockup wordmarkClassName="h-[17px]" />
        </Link>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-10">
          {footerColumns.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-sm text-mute">{title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("https://") && { target: "_blank", rel: "noopener noreferrer" })}
                      className={`rounded-sm text-base text-ink underline-offset-4 hover:underline ${focusRing}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className={`${container} mt-16 text-sm text-mute`}>© {new Date().getFullYear()} Landing Health</p>
    </footer>
  );
}

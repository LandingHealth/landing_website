import { footerColumns } from "@/lib/site";

const focusRingOnDark = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/12 bg-graphite px-4 pt-6 pb-16 text-white sm:px-6">
      <div className="grid gap-y-10 lg:grid-cols-2">
        <p className="text-base text-white/55">© {new Date().getFullYear()} Landing Health</p>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6">
          {footerColumns.map((links, index) => (
            <ul key={index} className="flex flex-col gap-4">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("https://") && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`rounded-sm text-base font-medium text-white underline-offset-4 hover:underline ${focusRingOnDark}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </div>
    </footer>
  );
}

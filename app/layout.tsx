import type { Metadata } from "next";
import { Geist, Roboto_Serif } from "next/font/google";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { container, footerLinks, type } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "wdth"],
  variable: "--font-roboto-serif",
  display: "swap",
});

const description = "Clinic software and connected recovery devices that keep patient progress, home exercise, and your daily operations in one place.";

export const metadata: Metadata = {
  title: "Landing Health",
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${robotoSerif.variable}`}>
      <body className="bg-white font-sans text-black antialiased">
        <Reveal />
        <Header />
        {children}
        <footer className="border-t border-ink/10 py-12">
          <div className={`${container} ${type.label} flex flex-wrap items-center justify-between gap-x-6 gap-y-4`}>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("https://") && { target: "_blank", rel: "noopener noreferrer" })}
                      className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span>© {new Date().getFullYear()} Landing Health</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

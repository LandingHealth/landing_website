import type { Metadata } from "next";
import { Inter_Tight, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import BrandLockup from "@/components/Brand";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import TextRotate from "@/components/TextRotate";
import { container, navigation, type } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

const schools = ["Johns Hopkins", "University of Pennsylvania", "University of California, Berkeley"];

const description = "Clinic software and connected recovery devices that keep patient progress, home exercise, and your daily operations in one place.";

export const metadata: Metadata = {
  title: "Landing Health",
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${interTight.variable} ${sourceSerif.variable}`}>
      <body className="bg-white font-sans text-black antialiased">
        <Reveal />
        <Header />
        {children}
        <footer className="border-t border-ink/10 py-12">
          <div className={`${container} grid gap-10 md:grid-cols-12`}>
            <div className="md:col-span-6">
              <Link href="/" aria-label="Landing Health home" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <BrandLockup />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6">{description}</p>
            </div>
            <nav aria-label="Footer navigation" className="md:col-span-6 md:justify-self-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navigation.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="rounded-sm text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`${type.label} flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-ink/10 pt-6 md:col-span-12`}>
              <span>
                Made by students at <TextRotate texts={schools} />
              </span>
              <span>© {new Date().getFullYear()} Landing Health</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { container, navigation, type } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description = "Landing connects physical therapy practice tools with SafeSock movement insights.";

export const metadata: Metadata = {
  title: "Landing",
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-mist font-sans text-ink antialiased">
        <Reveal />
        <Header />
        {children}
        <footer className="border-t border-ink/10 bg-mist py-12">
          <div className={`${container} grid gap-10 md:grid-cols-12`}>
            <div className="md:col-span-6">
              <Link href="/" className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <Image src="/home-icon.png" alt="" width={1408} height={1408} unoptimized className="h-8 w-8" />
                <span className="text-lg font-semibold tracking-[-0.035em]">Landing</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate">{description}</p>
            </div>
            <nav aria-label="Footer navigation" className="md:col-span-6 md:justify-self-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navigation.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="rounded-sm text-sm text-slate transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`${type.mono} flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-ink/10 pt-6 text-slate md:col-span-12`}>
              <span>Built by students at Johns Hopkins.</span>
              <span>© {new Date().getFullYear()} Landing</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

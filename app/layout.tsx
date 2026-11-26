import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { container, footerColumns, type } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-geist-mono",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">
        <Reveal />
        <Header />
        {children}
        <footer className="border-t border-hair py-12">
          <div className={`${container} ${type.label} flex flex-wrap items-center justify-between gap-x-6 gap-y-4`}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerColumns.flatMap(({ links }) => links).map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
            <span>© {new Date().getFullYear()} Landing Health</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

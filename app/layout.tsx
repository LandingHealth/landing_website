import type { Metadata } from "next";
import { Inter_Tight, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import TextRotate from "@/components/TextRotate";
import { container, type } from "@/lib/site";
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
          <div className={`${container} ${type.label} flex flex-wrap justify-between gap-x-6 gap-y-2`}>
            <span>
              Made by students at <TextRotate texts={schools} />
            </span>
            <span>© {new Date().getFullYear()} Landing Health</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

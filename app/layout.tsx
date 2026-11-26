import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CtaSheet from "@/components/ui/CtaSheet";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
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
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${robotoSerif.variable} ${geistMono.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">
        <Reveal />
        <AnnouncementBar />
        <Header />
        {children}
        <CtaSheet />
        <Footer />
      </body>
    </html>
  );
}

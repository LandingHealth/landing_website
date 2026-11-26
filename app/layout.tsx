import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
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
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

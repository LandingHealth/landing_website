import type { Metadata } from "next";
import SveltePage from "@/components/SveltePage";

export const metadata: Metadata = {
  title: "About | Landing",
  description: "Meet the four Johns Hopkins students building Landing.",
};

export default function AboutPage() {
  return <SveltePage name="about" />;
}

import type { Metadata } from "next";
import SveltePage from "@/components/SveltePage";

export const metadata: Metadata = {
  title: "Solution | Landing",
  description: "Support for physical therapy before, during, and between appointments.",
};

export default function SolutionPage() {
  return <SveltePage name="solution" />;
}

import type { Metadata } from "next";
import SveltePage from "@/components/SveltePage";

export const metadata: Metadata = {
  title: "Schedule | Landing",
  description: "Landing's approach to appointment availability, online sessions, and follow ups.",
};

export default function SchedulePage() {
  return <SveltePage name="schedule" />;
}

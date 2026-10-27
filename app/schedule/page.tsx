import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";

export const metadata: Metadata = {
  title: "Schedule | Landing",
  description: "Scheduling tools we’re building for appointment availability, online sessions, and follow-ups.",
};

export default function SchedulePage() {
  return (
    <SectionPage
      label="Schedule"
      title="Make more room for care."
      intro="We’re building scheduling tools to help you set availability around demand and give patients a simple way to book online sessions."
      sectionTitle="What we’re working toward"
      details={[
        {
          heading: "Plan around demand",
          text: "Landing aims to help you see when patients need appointments and set your availability to match.",
        },
        {
          heading: "Book online",
          text: "Patients should be able to find and book online sessions on their own and know what happens next.",
        },
        {
          heading: "Stay coordinated",
          text: "AI agents are meant to help with reminders and follow-ups, so your team spends less time coordinating by hand.",
        },
      ]}
    />
  );
}

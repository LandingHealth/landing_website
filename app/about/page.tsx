import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";

export const metadata: Metadata = {
  title: "About | Landing",
  description: "Meet the four Johns Hopkins students building Landing.",
};

export default function AboutPage() {
  return (
    <SectionPage
      label="About"
      title="Meet the team behind Landing."
      intro="Four Johns Hopkins students are building Landing. We want to make physical therapy easier to coordinate and to show therapists what happens between visits."
      sectionTitle="Our story"
      details={[
        {
          heading: "How it started",
          text: "Raj and Akash Patel started with one question. How can a clinician follow a patient’s recovery once the patient leaves the clinic? That question led to SafeSock, and then to the rest of Landing.",
        },
        {
          heading: "Who we are",
          text: "Neil Patel brings experience in gait analysis and sensing to the software and signal work. Vivaan Gupta leads hardware development. Together, we build tools that give therapists more context and leave every clinical decision with them.",
        },
      ]}
    />
  );
}

import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

const steps: Tiles = [
  {
    title: "Landing sets up the clinic",
    text: "We add your clinic and your PTs. All we need is the clinic’s name and each PT’s name and email. Each PT then creates an account with that email.",
    video: { src: "/integration/clinic-setup.mp4", poster: "/integration/clinic-setup.jpg" },
  },
  {
    title: "Add patients",
    text: "Add each patient with one short form: their name, email, injury, and dates. Then assign their exercise sessions. Patients sign up with that email in a phone or laptop browser, with no app to download.",
    video: { src: "/integration/add-patients.mp4", poster: "/integration/add-patients.jpg" },
  },
  {
    title: "Onboarding complete",
    text: "Those two steps are the whole setup. Onboarding takes less than half an hour, and nobody installs software or buys new hardware.",
    video: { src: "/integration/onboarding-complete.mp4", poster: "/integration/onboarding-complete.jpg" },
  },
];

export default function IntegrationSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="integration" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className={`${container} flex flex-col items-center text-center`}>
        <Heading className={type.h1}>Integration</Heading>
        <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
          Landing runs in the browser next to the EHR you already use. We set up your clinic for you, and nothing in your EHR changes.
        </p>
      </div>
      <TileRow tiles={steps} className="mt-14 sm:mt-16" />
    </section>
  );
}

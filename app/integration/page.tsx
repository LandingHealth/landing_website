import type { Metadata } from "next";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integration | Landing",
  description: "How a clinic gets set up on Landing in less than half an hour.",
};

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

export default function IntegrationPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={type.h1}>Integration</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Landing runs in the browser next to the EHR you already use. We set up your clinic for you, and nothing in your EHR changes.
          </p>
        </div>
        <TileRow tiles={steps} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integration | Landing",
  description: "How a clinic gets set up on Landing, from its site and PTs to its first patients, in less than half an hour.",
};

const steps: Tiles = [
  {
    title: "Landing sets up the clinic",
    text: "We create your site and invite your PTs.",
    video: { src: "/integration/clinic-setup.mp4", poster: "/integration/clinic-setup.jpg" },
  },
  {
    title: "Add patients",
    text: "Enter injuries and assign exercise sessions.",
    video: { src: "/integration/add-patients.mp4", poster: "/integration/add-patients.jpg" },
  },
  {
    title: "Onboarding complete",
    text: "Your clinic is ready to go. Onboarding takes less than half an hour.",
    video: { src: "/integration/onboarding-complete.mp4", poster: "/integration/onboarding-complete.jpg" },
  },
];

export default function IntegrationPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={type.h1}>Integration</h1>
        </div>
        <TileRow tiles={steps} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

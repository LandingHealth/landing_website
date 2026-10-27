import type { Metadata } from "next";
import Image from "next/image";
import ProductFrame from "@/components/ProductFrame";
import SectionPage from "@/components/SectionPage";
import { container, sectionPad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Devices | Landing",
  description: "Meet SafeSock, the sensor sleeve Landing is designing to track weight bearing during recovery.",
};

export default function DevicesPage() {
  return (
    <SectionPage
      label="Devices"
      title="Meet SafeSock."
      intro="SafeSock is a sensor sleeve we’re designing to show how patients bear weight between visits. It fits inside a walking boot, cast, or brace and records pressure as the patient moves."
      sectionTitle="How SafeSock is meant to work"
      details={[
        {
          heading: "Wear the sensor sleeve",
          text: "The thin sleeve is meant to sit inside common recovery supports, with no adhesive and no external wires.",
        },
        {
          heading: "Follow weight bearing",
          text: "Pressure sensors in the sleeve are meant to record where the patient puts weight and how weight bearing changes over the course of recovery.",
        },
        {
          heading: "Review the trend",
          text: "We’re planning a clinician view that shows these trends, so you have more context when you make clinical decisions.",
        },
      ]}
    >
      <section id="demo" className={`scroll-mt-24 bg-ink text-paper ${sectionPad}`}>
        <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div data-reveal className="lg:col-span-5">
            <p className={`${type.label} text-accent-soft`}>Demo</p>
            <h2 className={`${type.h2} mt-4`}>See the SafeSock concept</h2>
            <p className={`${type.bodyOnInk} mt-5`}>A short video of the SafeSock concept and how it’s meant to measure weight bearing. The measurements are for illustration only.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2">
              <Image src="/safesock-mark.png" alt="SafeSock product mark" width={56} height={56} className="h-12 w-12 rounded-lg object-cover" />
              <span className="text-sm font-semibold tracking-wide">SafeSock <span className="font-normal text-on-ink">by Landing</span></span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProductFrame label="SafeSock · Concept video" caption="Illustrative data">
              <video className="aspect-video w-full bg-black object-cover" controls playsInline preload="metadata" poster="/safesock-demo-poster.jpg" aria-label="SafeSock product concept video">
                <source src="/safesock-demo.mp4" type="video/mp4" />
                Your browser can’t play this video.
              </video>
            </ProductFrame>
          </div>
        </div>
      </section>
    </SectionPage>
  );
}

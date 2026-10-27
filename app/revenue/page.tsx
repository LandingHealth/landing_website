import type { Metadata } from "next";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Revenue | Landing",
};

export default function RevenuePage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={container}>
          <p className={`${type.label} text-accent-deep`}>Landing / Revenue</p>
          <h1 className={`${type.h1} mt-5`}>Revenue</h1>
        </div>
      </section>
    </main>
  );
}

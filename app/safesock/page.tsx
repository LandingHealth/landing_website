import type { Metadata } from "next";
import TileRow from "@/components/TileRow";
import { safesockSummary, timescales } from "@/lib/safesock";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "SafeSock | Landing",
  description: safesockSummary,
};

export default function SafeSockPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Two timescales. One recovery.</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>{safesockSummary}</p>
        </div>
        <TileRow tiles={timescales} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

import type { CSSProperties } from "react";
import ExpandableMedia from "@/components/ExpandableMedia";
import GradientFrame from "@/components/ui/GradientFrame";

// Ratios are each file's encoded size, so the frame fits the video and never crops it.
export const demoVideos = {
  exerciseRecording: { title: "Patient app exercise recording", src: "/workspace/exercise-recording.mp4", poster: "/workspace/exercise-recording.jpg", ratio: "1742/1094" },
  exerciseReview: { title: "PT app exercise review", src: "/workspace/exercise-review.mp4", poster: "/workspace/exercise-review.jpg", ratio: "1720/1094" },
  clinicSetup: { title: "Adding a clinic site", src: "/integration/clinic-setup.mp4", poster: "/integration/clinic-setup.jpg", ratio: "1920/1094" },
  addPatients: { title: "Adding a new patient", src: "/integration/add-patients.mp4", poster: "/integration/add-patients.jpg", ratio: "1920/1094" },
} as const satisfies Record<string, { title: string; src: string; poster: string; ratio: string }>;

export type DemoName = keyof typeof demoVideos;

export function DemoClip({ name }: { name: DemoName }) {
  const { title, src, poster, ratio } = demoVideos[name];
  return (
    <div style={{ "--ratio": ratio } as CSSProperties} className="w-full">
      <ExpandableMedia
        media={{ video: { src, poster } }}
        title={title}
        className="aspect-(--ratio) w-full rounded-xl bg-white shadow-preview"
      />
    </div>
  );
}

export default function DemoVideo({ name, caption }: { name: DemoName; caption?: string }) {
  return (
    <figure>
      <GradientFrame size="md">
        <DemoClip name={name} />
      </GradientFrame>
      {caption && <figcaption className="mt-3 text-center text-xs text-slate">{caption}</figcaption>}
    </figure>
  );
}

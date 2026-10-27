import type { Metadata } from "next";
import TileRow, { type Tile } from "@/components/TileRow";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security | Landing",
  description: "How Landing protects patient information for physical therapy clinics.",
};

const safeguards: ReadonlyArray<Tile> = [
  {
    title: "Encryption",
    text: "Patient records, videos, and documents are encrypted where they are stored. Every connection to Landing runs over HTTPS, and the database turns away any connection that isn’t encrypted.",
  },
  {
    title: "Private network",
    text: "The database sits in a private network with no route to or from the internet. Only Landing’s own services can reach it. Backups keep seven days of history, and the database is protected against deletion.",
  },
  {
    title: "Secure sign-in",
    text: "Clinic staff join by invitation only. Passwords need at least 12 characters, two-step verification is available, and every sign-in runs through Amazon Cognito.",
  },
  {
    title: "Ingestion",
    text: "All patient documents, videos, and records are stored in Amazon Web Services infrastructure for maximum protection. Storage is encrypted, versioned, and closed to public access, and Landing has a Business Associate Agreement with AWS.",
    video: { src: "/security/ingestion.mp4", poster: "/security/ingestion.jpg" },
  },
];

export default function SecurityPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>
            Peace of mind for<br className="hidden sm:block" /> physical therapists.
          </h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            At Landing, security is foundational. Every workflow, architecture choice, and feature is designed to protect
            your patients’ information and meet the expectations of physical therapy clinics.
          </p>
        </div>
        <TileRow tiles={safeguards} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import EncryptionLock from "@/components/EncryptionLock";
import LoadingDots from "@/components/LoadingDots";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security | Landing",
  description: "How Landing protects patient information for physical therapy clinics.",
};

const safeguards: Tiles = [
  {
    title: "Encryption",
    text: "Landing encrypts patient records, videos, and documents in storage. Every connection to Landing uses HTTPS, and the database refuses any connection that isn’t encrypted.",
    art: <EncryptionLock />,
  },
  {
    title: "Private network",
    text: "The database sits in a private network with no route to or from the internet. Only Landing’s own services can reach it. Backups keep seven days of history, and deletion protection keeps the database from being removed by mistake.",
  },
  {
    title: "Secure sign-in",
    text: "Clinic staff join by invitation only. Passwords need at least 12 characters, and two-step verification is available. Every sign-in goes through Amazon Cognito.",
    art: <LoadingDots />,
  },
  {
    title: "Ingestion",
    text: "Landing stores all patient documents, videos, and records on Amazon Web Services. Storage is encrypted, keeps earlier versions of each file for 30 days, and is closed to public access. Landing also has a Business Associate Agreement with AWS.",
    video: { src: "/security/ingestion.mp4", poster: "/security/ingestion.jpg" },
  },
];

export default function SecurityPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <h1 className={`${type.h1} max-w-4xl`}>
              Peace of mind for<br className="hidden sm:block" /> physical therapists.
            </h1>
            <a
              href="https://aws.amazon.com/what-is-cloud-computing"
              className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Image
                src="/security/powered-by-aws.png"
                alt="Powered by AWS Cloud Computing"
                width={200}
                height={72}
                className="h-auto w-30 sm:w-37.5"
              />
            </a>
          </div>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            Your patients trust you with their health information. Here’s how Landing protects it.
          </p>
        </div>
        <TileRow tiles={safeguards} className="mt-14 sm:mt-16" />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import EncryptionLock from "@/components/EncryptionLock";
import Icon, { type IconName } from "@/components/Icon";
import IngestionToAws from "@/components/IngestionToAws";
import LoadingDots from "@/components/LoadingDots";
import NetworkFeed from "@/components/NetworkFeed";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, edgePad, type } from "@/lib/site";

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
    art: <NetworkFeed />,
  },
  {
    title: "Secure sign-in",
    text: "Clinic staff join by invitation only. Passwords need at least 12 characters, and two-step verification is available. Every sign-in goes through Amazon Cognito.",
    art: <LoadingDots />,
  },
  {
    title: "Ingestion",
    text: "Landing stores all patient documents, videos, and records on Amazon Web Services. Storage is encrypted, keeps earlier versions of each file for 30 days, and is closed to public access.",
    art: <IngestionToAws video={{ src: "/security/ingestion.mp4", poster: "/security/ingestion.jpg" }} />,
  },
];

const overview = [
  "Landing is built for the information physical therapy clinics handle every day. That includes patient records, documents, and the home exercise videos patients record between visits.",
  "Therapists need a patient’s full history at every visit. Patients need to know that the videos they record at home stay private. Landing keeps that information encrypted, backed up, and stored in the United States.",
  "We keep adding protections as more clinics trust Landing with their patients’ information.",
] as const;

const standards: ReadonlyArray<{ title: string; text: string; icon: IconName }> = [
  {
    title: "Business Associate Agreement",
    icon: "fileCheck",
    text: "Landing has a Business Associate Agreement with AWS. It covers every Landing account and requires that patient health information stay encrypted in storage and in transit.",
  },
  {
    title: "Audit logs",
    icon: "scrollText",
    text: "AWS CloudTrail records every upload, download, and deletion of a patient document. Landing keeps these logs for one year, and CloudTrail can show whether anyone changed a log after it was written.",
  },
  {
    title: "Threat detection",
    icon: "shieldCheck",
    text: "Amazon GuardDuty watches Landing’s AWS account for suspicious activity and scans every uploaded patient document for malware. Download links stay blocked until the scan comes back clean.",
  },
  {
    title: "U.S. data storage",
    icon: "mapPin",
    text: "Landing stores patient records, documents, and videos in one AWS region, US East in Northern Virginia. Backups stay in the same region.",
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
            Your patients trust you with their health information. Here’s how Landing protects it.
          </p>
        </div>
        <TileRow tiles={safeguards} className="mt-14 sm:mt-16" />
        <div className={`mt-20 grid gap-x-3 gap-y-8 ${edgePad} sm:mt-24 lg:grid-cols-2`}>
          <h2 className={`${type.h2} max-w-xl`}>For sensitive patient data, in and out of the clinic</h2>
          <div className="max-w-xl space-y-5 text-[15px] leading-[1.6]">
            {overview.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <ul className={`mt-16 grid gap-3 ${edgePad} sm:mt-20 sm:grid-cols-2 lg:grid-cols-4`}>
          {standards.map(({ title, text, icon }) => (
            <li key={title} className="rounded-xl bg-mist p-5 sm:p-6">
              <div className="flex size-14 items-center justify-center rounded-lg bg-ink text-white">
                <Icon name={icon} className="size-7" />
              </div>
              <h3 className="mt-10 text-[15px] font-medium leading-snug">{title}</h3>
              <p className="mt-1 text-[15px] leading-[1.5]">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

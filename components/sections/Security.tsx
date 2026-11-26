import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import EncryptionLock from "@/components/EncryptionLock";
import IngestionToAws from "@/components/IngestionToAws";
import LoadingDots from "@/components/LoadingDots";
import NetworkFeed from "@/components/NetworkFeed";
import IndexNumber from "@/components/ui/IndexNumber";
import SectionHeading from "@/components/ui/SectionHeading";
import Sheet from "@/components/ui/Sheet";
import { contactHref, container, focusRing, type } from "@/lib/site";

type Item = { label: string; body: string };
type Topic = { id: string; title: string; art?: ReactNode; items: readonly Item[] };

const topics: readonly Topic[] = [
  {
    id: "storage",
    title: "Data storage",
    art: <NetworkFeed />,
    items: [
      {
        label: "Where data lives",
        body: "On Amazon Web Services, in one region, US East (Northern Virginia). Backups stay in the same region.",
      },
      {
        label: "What is stored",
        body: "Patient records sit in an Amazon Aurora database. Home exercise videos and patient documents sit in Amazon S3.",
      },
      {
        label: "Private network",
        body: "The database sits in a private network with no route to or from the internet, and it accepts connections only from Landing’s backend. The backend can’t be reached from the internet either.",
      },
      {
        label: "File storage",
        body: "Video and document storage is closed to public access. Uploads and downloads go through short-lived signed links.",
      },
      {
        label: "Malware scanning",
        body: "Amazon GuardDuty scans every uploaded patient document for malware. Download links stay blocked until the scan comes back clean.",
      },
    ],
  },
  {
    id: "access",
    title: "Access controls",
    art: <LoadingDots />,
    items: [
      { label: "Sign-in", body: "Every sign-in goes through Amazon Cognito." },
      { label: "Clinic staff", body: "Staff join by invitation only. There is no open sign-up for clinic accounts." },
      {
        label: "Patients",
        body: "Patients are added by their PT and sign up with the email on their record. Landing links an account to a patient only through that invited email.",
      },
      {
        label: "Passwords and two-step",
        body: "Passwords need at least 12 characters. Two-step verification with an authenticator app is available.",
      },
      {
        label: "Roles",
        body: "Each person’s role is stored in Landing’s database, and therapists see only their own patients. Landing staff with admin access can also see clinic data. The backend rejects sign-in tokens issued to a different Landing app.",
      },
    ],
  },
  {
    id: "encryption",
    title: "Encryption",
    art: <EncryptionLock />,
    items: [
      { label: "In storage", body: "Patient records, videos, and documents are encrypted in storage." },
      {
        label: "Connections into Landing",
        body: "Browsers and apps connect to Landing over HTTPS. File storage refuses requests that don’t use HTTPS.",
      },
      { label: "Database connections", body: "The database refuses any connection that isn’t encrypted." },
    ],
  },
  {
    id: "retention",
    title: "Retention and deletion",
    items: [
      {
        label: "Backups",
        body: "The database is backed up automatically, with at least seven days of history. Deletion protection keeps the database from being removed by mistake.",
      },
      { label: "File versions", body: "Storage keeps earlier versions of each video and document for at least 30 days." },
      {
        label: "When a clinic leaves",
        body: "Our policy is to delete a clinic’s data within 30 days after its agreement with Landing ends. Backups age out after that.",
      },
      {
        label: "Audit log",
        body: "AWS CloudTrail records every upload, download, and deletion of a patient document, and Landing keeps those records for at least one year. CloudTrail can show whether a record was changed after it was written. The log covers patient documents. It does not record every time someone views a video.",
      },
    ],
  },
  {
    id: "agreements",
    title: "Agreements",
    art: <IngestionToAws video={{ src: "/security/ingestion.mp4", poster: "/security/ingestion.jpg" }} />,
    items: [
      {
        label: "AWS",
        body: "Landing has a Business Associate Agreement with AWS that covers Landing’s AWS accounts. It is an agreement between Landing and AWS, not between AWS and your clinic.",
      },
      { label: "Your clinic", body: "For the agreement Landing signs with your clinic, ask us during your security review." },
    ],
  },
];

const jumpLinks = [...topics.map(({ id, title }) => ({ id, title })), { id: "reviews", title: "Security reviews" }];

// Four cells sit in one row on wide screens; otherwise three per row, centered so a short last row reads as intended.
const cellWidth = (count: number) =>
  `w-full rounded-3xl bg-white md:w-[calc((100%-1rem)/2)] ${count === 4 ? "lg:w-[calc((100%-3rem)/4)]" : "lg:w-[calc((100%-2rem)/3)]"}`;

export default function SecuritySection() {
  return (
    <>
      <section className={`${container} pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-20`}>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Security"
          title="How Landing protects patient data"
          lead="What protects patient data in Landing today, listed so your security review can start from facts."
        />
        <p className={`${type.small} mx-auto mt-4 max-w-xl text-center leading-[1.45] text-pretty text-mute`}>
          Landing is in its pilot stage. These controls run in our current environment, and our production environment is built to the same or stricter settings.
        </p>
        <nav aria-label="On this page" className="mt-10">
          <ol className="flex flex-wrap justify-center gap-2">
            {jumpLinks.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`${type.small} block rounded-[4px] bg-fog px-3 py-2 font-medium text-slate hover:text-ink ${focusRing}`}
                >
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <Sheet tone="fog" round="top" className="flex flex-col gap-20 lg:gap-28">
        {topics.map(({ id, title, art, items }, index) => {
          const cell = cellWidth(items.length + (art ? 1 : 0));
          return (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
              <div className="text-center">
                <IndexNumber index={index} />
                <h2 id={`${id}-title`} className={`${type.h2} mt-3`}>{title}</h2>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {art && (
                  <div aria-hidden className={`${cell} flex h-40 items-center justify-center sm:h-56 overflow-hidden p-3`}>
                    {art}
                  </div>
                )}
                {items.map(({ label, body }) => (
                  <div key={label} className={`${cell} p-6 sm:p-8`}>
                    <h3 className={type.h3}>{label}</h3>
                    <p className={`${type.body} mt-3`}>{body}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </Sheet>

      <Sheet round="top" id="reviews" className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Security reviews"
          title="Start your security review"
          lead="Our founders handle security questionnaires and reviews directly. Email us to start one, and send your questionnaire along."
        />
        <ButtonLink href={contactHref} variant="primary" className="mt-8">Email us</ButtonLink>
      </Sheet>
    </>
  );
}

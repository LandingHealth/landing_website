import ButtonLink from "@/components/ButtonLink";
import Sheet from "@/components/ui/Sheet";
import { contactHref, type } from "@/lib/site";
import { RuledRows, TrustHero, TrustSection, type TrustRow } from "@/components/sections/trust/TrustPage";

type Topic = { id: string; title: string; rows: readonly TrustRow[] };

const topics: readonly Topic[] = [
  {
    id: "storage",
    title: "Data storage",
    rows: [
      {
        label: "Pilot stage",
        body: "Landing is in its pilot stage. These controls run in our current environment, and our production environment is built to the same or stricter settings.",
      },
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
    rows: [
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
    rows: [
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
    rows: [
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
    rows: [
      {
        label: "AWS",
        body: "Landing has a Business Associate Agreement with AWS that covers Landing’s AWS accounts. It is an agreement between Landing and AWS, not between AWS and your clinic.",
      },
      { label: "Your clinic", body: "For the agreement Landing signs with your clinic, ask us during your security review." },
    ],
  },
];

export default function SecuritySection() {
  return (
    <>
      <TrustHero
        eyebrow="Security"
        title="How Landing protects patient data."
        lead="What protects patient data in Landing today, listed so your security review can start from facts."
        jumpLinks={[
          ...topics.map(({ id, title }) => ({ id, label: title })),
          { id: "reviews", label: "Security reviews" },
        ]}
      />
      <Sheet tone="fog" round="both">
        {topics.map(({ id, title, rows }, index) => (
          <TrustSection key={id} id={id} index={index} title={title}>
            <RuledRows rows={rows} />
          </TrustSection>
        ))}
        <TrustSection id="reviews" index={topics.length} title="Security reviews">
          <div className="border-t border-hair pt-5">
            <p className={type.body}>
              Our founders handle security questionnaires and reviews directly. Email us to start one, and send your questionnaire along.
            </p>
            <ButtonLink href={contactHref} variant="primary" className="mt-6">Email us</ButtonLink>
          </div>
        </TrustSection>
      </Sheet>
    </>
  );
}

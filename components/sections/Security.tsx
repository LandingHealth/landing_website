import EncryptionLock from "@/components/EncryptionLock";
import IngestionToAws from "@/components/IngestionToAws";
import LoadingDots from "@/components/LoadingDots";
import NetworkFeed from "@/components/NetworkFeed";
import TileRow, { type Tiles } from "@/components/TileRow";
import { container, type } from "@/lib/site";

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
    title: "Private file storage",
    text: "Landing stores all patient documents, videos, and records on Amazon Web Services. Storage is encrypted, keeps earlier versions of each file for 30 days, and is closed to public access.",
    art: <IngestionToAws video={{ src: "/security/ingestion.mp4", poster: "/security/ingestion.jpg" }} />,
  },
];

const questions: ReadonlyArray<{ question: string; answer: ReadonlyArray<string> }> = [
  {
    question: "Where are records and videos stored?",
    answer: [
      "On Amazon Web Services, in one region, US East in Northern Virginia. Patient records, documents, and home exercise videos are encrypted in storage, and backups stay in the same region.",
    ],
  },
  {
    question: "Who can access them?",
    answer: [
      "Clinic staff join by invitation only, and every sign-in goes through Amazon Cognito. Passwords need at least 12 characters, and two-step verification is available.",
      "The database sits in a private network with no route to or from the internet. Only Landing’s own services can reach it.",
    ],
  },
  {
    question: "How do clinic permissions work?",
    answer: [
      "Landing adds your clinic and invites each PT by email. Patients are added by their PT and sign up with the email on their record.",
    ],
  },
  {
    question: "What happens after a file is uploaded?",
    answer: [
      "The file goes to private, encrypted storage. Amazon GuardDuty scans every uploaded patient document for malware, and download links stay blocked until the scan comes back clean.",
      "AWS CloudTrail records every upload, download, and deletion of a patient document. Landing keeps these logs for one year, and CloudTrail can show whether anyone changed a log after it was written.",
    ],
  },
  {
    question: "How long are files kept, and how does deletion work?",
    answer: [
      "Storage keeps earlier versions of each file for 30 days, and database backups keep seven days of history. Every deletion of a patient document is logged, and deletion protection keeps the database from being removed by mistake.",
    ],
  },
  {
    question: "What agreements are in place?",
    answer: [
      "Landing has a Business Associate Agreement with AWS. It covers Landing’s own AWS account and requires that patient health information stay encrypted in storage and in transit. It is an agreement between Landing and AWS, not between AWS and your clinic.",
      "For the agreement Landing signs with your clinic, ask us during your security review.",
    ],
  },
  {
    question: "Who handles security reviews?",
    answer: [
      "Our founders handle security questionnaires and reviews directly. Email us from the Contact link at the bottom of this page.",
    ],
  },
];

export default function SecuritySection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="security" className="scroll-mt-16 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className={`${container} flex flex-col items-center text-center`}>
        <Heading className={`${type.h1} max-w-4xl`}>
          Peace of mind for<br className="hidden sm:block" /> physical therapists.
        </Heading>
        <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
          Your patients trust you with their health information. Here’s how Landing protects it.
        </p>
      </div>
      <TileRow tiles={safeguards} className="mt-14 sm:mt-16" />
      <div className={`${container} mt-20 sm:mt-24`}>
        <h2 className={`${type.h2} max-w-3xl`}>What clinics ask us</h2>
        <dl className="mt-10 border-t border-ink">
          {questions.map(({ question, answer }) => (
            <div key={question} className="grid gap-3 border-b border-ink/10 py-6 lg:grid-cols-12 lg:gap-12">
              <dt className="text-[17px] font-medium leading-snug lg:col-span-5">{question}</dt>
              <dd className="space-y-3 text-[15px] leading-[1.65] lg:col-span-7">
                {answer.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

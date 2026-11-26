import type { Metadata } from "next";
import CtaSheet from "@/components/ui/CtaSheet";
import Sheet from "@/components/ui/Sheet";
import { proseLink, RuledRows, TrustHero, TrustSection, type TrustRow } from "@/components/sections/trust/TrustPage";
import { contactHref, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy | Landing",
  description: "How Landing handles data from this website, patient and clinic data in the Landing app, and Google connections in the admin dashboard.",
};

const contactEmail = contactHref.replace(/^mailto:/, "");

const Email = () => (
  <a href={contactHref} className={proseLink}>
    {contactEmail}
  </a>
);

const list = "list-disc space-y-2 pl-5";

type Part = { id: string; title: string; scope: string; updated?: string; rows: readonly TrustRow[] };

const website: Part = {
  id: "website",
  title: "This website",
  scope: "What this marketing website collects when you visit it, apply for a job, or book a demo.",
  rows: [
    {
      label: "No accounts",
      body: "This website has no sign-in and no accounts. You can read every page without telling us who you are.",
    },
    {
      label: "Analytics",
      body: (
        <div className="space-y-4">
          <p>
            This site can use PostHog to learn which pages people visit and how they use the site. It runs only when the site is set up with a PostHog key. When it is off, the site sends nothing to PostHog.
          </p>
          <p>
            When it is on, your browser sends this data to <code className={`${type.small} font-mono`}>/ingest</code> on this site’s own address, which passes it to PostHog’s US servers. PostHog keeps an anonymous identifier in your browser, in a cookie or local storage, so it can tell repeat visits apart. This site does not send PostHog your name or email.
          </p>
        </div>
      ),
    },
    {
      label: "Job applications",
      body: (
        <>
          The careers form asks for your full name, your email address, what interests you about Landing, and your availability. When you send it, the site adds your answers and the time you sent them as a row in a Google Sheet the Landing team uses to review applications. To have your application deleted, email <Email />.
        </>
      ),
    },
    {
      label: "Booking a demo",
      body: "Book a demo opens our scheduling page on Calendly, a separate service. What you enter there goes to Calendly, and Calendly’s own privacy policy applies to it.",
    },
  ],
};

const patientData: Part = {
  id: "patient-data",
  title: "Patient and clinic data in Landing",
  scope: "The patient records, home exercise videos, documents, and messages that clinics and patients store in the Landing app.",
  rows: [
    {
      label: "Where it is stored",
      body: "On Amazon Web Services in the US East (Northern Virginia) region, under Landing’s Business Associate Agreement with AWS.",
    },
    {
      label: "Encryption",
      body: "Patient records, videos, and documents are encrypted in storage. Browsers and apps connect to Landing over HTTPS.",
    },
    {
      label: "Who can see it",
      body: "Clinic staff join by invitation, and patients are added by their PT. Therapists see only their own patients, and Landing staff with admin access can also see clinic data. Landing doesn’t send clinic, therapist, or patient records to Google.",
    },
    {
      label: "Deleting data",
      body: (
        <>
          To ask us to delete patient or clinic data, email <Email />. Deleted data can stay in database backups and earlier file versions until they age out.
        </>
      ),
    },
    {
      label: "Not yet published",
      body: (
        <>
          Landing has not yet published a patient privacy notice or a list of the service providers that handle patient data. If your clinic needs either, ask us during your security review. For what happens to a clinic’s data after it leaves Landing, see{" "}
          <a href="/security#retention" className={proseLink}>
            Retention and deletion
          </a>{" "}
          on the Security page.
        </>
      ),
    },
  ],
};

const google: Part = {
  id: "google",
  title: "Google connections in the admin dashboard",
  scope: "Data Landing gets from your Google account when you connect Google Calendar or Google Drive to the Landing admin dashboard.",
  updated: "Updated October 29, 2026",
  rows: [
    {
      label: "About this part",
      body: "People who use the Landing admin dashboard can connect their Google Calendar to it and add files from Google Drive to tasks and notes. This part covers only the data Landing gets from your Google account through the admin dashboard.",
    },
    {
      label: "What Landing reads from Google",
      body: (
        <ul className={list}>
          <li>Your Google account’s email address and account ID, so Landing knows which account is connected.</li>
          <li>
            Events on your primary Google calendar. Google’s permission covers every calendar you own, but Landing reads only your primary calendar. Landing shows these events on your Landing calendar, and only you see them there. Landing doesn’t store these events. It reads them from Google when you open the calendar.
          </li>
          <li>
            Google Drive files you pick. Landing can open only the files you choose in Google’s file picker, not the rest of your Drive.
          </li>
        </ul>
      ),
    },
    {
      label: "What Landing adds to Google",
      body: (
        <div className="space-y-4">
          <p>
            When you connect, Landing copies every event you own on the Landing calendar into your primary Google calendar, past events included. It leaves out rejected events. While your Google connection works, Landing keeps the copies up to date. It sends each event’s title, its dates and times, and its status, which is tentative while the event is pending and confirmed once it’s approved. It also tags each copy so it can find it later. Landing never adds another person’s events, and it removes an event from Google when the event is rejected or deleted in Landing.
          </p>
          <p>
            Landing reads back the events it added so it can keep them in sync. If you delete one of them in Google, Landing adds it back. If you change its title, times, or status in Google, Landing overwrites your change the next time the event changes in Landing. To change or remove an event, change it in Landing.
          </p>
          <p>
            Event titles go to Google exactly as you type them, so keep patient names out of them. Landing doesn’t send clinic, therapist, or patient records to Google.
          </p>
        </div>
      ),
    },
    {
      label: "How Landing uses Drive files",
      body: (
        <div className="space-y-4">
          <p>
            On a task, the file you pick becomes the task’s link. Landing saves the link and doesn’t change who can open the file in Drive.
          </p>
          <p>
            On a note, your browser downloads the file you pick and attaches a copy to the note, the same way it attaches a file from your computer. Google Docs, Sheets, and Slides are saved as PDFs. Landing scans each copy for malware.
          </p>
          <p>The permission Google gives for Drive stays in your browser. Landing’s servers never receive it.</p>
        </div>
      ),
    },
    {
      label: "Where Landing keeps your data",
      body: (
        <div className="space-y-4">
          <p>
            Landing stores your connection details in its database. They are your Google email address and account ID, the token Google issues when you connect, the permissions you granted, the connection’s status, the time you connected, and the time its status last changed. Landing encrypts the token before it stores it. Copies of Drive files are stored with the note’s other attachments.
          </p>
          <p>Landing’s database and file storage run on Amazon Web Services in the US East (Northern Virginia) region.</p>
        </div>
      ),
    },
    {
      label: "Who can see it",
      body: (
        <div className="space-y-4">
          <ul className={list}>
            <li>Only you see your Google Calendar events in Landing.</li>
            <li>Anyone you share your Google calendar with can see the events Landing adds to it.</li>
            <li>
              Anyone who can open a note in Landing can see the Drive files attached to it. Anyone who can open a task can see its Drive link, and the link opens the file only for people Drive already allows.
            </li>
          </ul>
          <p>Landing doesn’t sell Google user data, use it for ads, or use it to train AI models.</p>
        </div>
      ),
    },
    {
      label: "How long Landing keeps it",
      body: (
        <div className="space-y-4">
          <p>Landing keeps your connection details until it finishes disconnecting Google, as the next section explains.</p>
          <p>
            A copy of a Drive file stays on its note until someone removes it, and a task keeps its Drive link until someone changes it. Disconnecting Google doesn’t remove either one.
          </p>
          <p>Deleted data can stay in Landing’s database backups, and earlier versions of files stay in storage for 30 days.</p>
        </div>
      ),
    },
    {
      label: "Disconnect and delete your data",
      body: (
        <div className="space-y-4">
          <p>
            To disconnect, open the Calendar page in the Landing admin dashboard and click Disconnect. The dashboard shows Google as disconnected right away, and Landing finishes in the background. It deletes the events it added to your calendar, revokes its access with Google, and then deletes your connection details. If Landing can’t reach Google, or Google refuses to delete the events, Landing keeps trying for 24 hours after you disconnect. After that, it revokes its access anyway and leaves the remaining events in your calendar. Your connection details stay in Landing’s database until the revoke goes through, and Landing retries the revoke until then. Ending your admin access works the same way.
          </p>
          <p>
            Landing can’t reach your calendar after you remove its access from your Google Account, as Google’s help page on{" "}
            <a href="https://support.google.com/accounts/answer/13533235" className={proseLink}>
              managing third-party access
            </a>{" "}
            explains. While Google lists Landing’s app as in testing, Google also ends Landing’s access 7 days after you connect. In both cases the dashboard asks you to reconnect, and the events Landing added stay in your calendar. To have Landing remove them, reconnect and then disconnect, or delete them in Google. If you connect a different Google account, Landing deletes the events it added to the first account, if it can still reach that calendar, and revokes its access there.
          </p>
          <p>
            To delete a copy of a Drive file, remove it from the note. Landing then deletes the file, but it keeps a record of the file’s name and who removed it. To remove a Drive link, edit the task. A recurring task copies its link into each new occurrence, so remove the link from each occurrence that has it.
          </p>
          <p>
            For privacy questions, or to ask Landing to delete any other data it holds from your Google account, email <Email />.
          </p>
        </div>
      ),
    },
    {
      label: "Google’s user data policy",
      body: (
        <>
          {"Landing's use and transfer to any other app of information received from Google APIs will adhere to the "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" className={proseLink}>
            Google API Services User Data Policy
          </a>
          {", including the Limited Use requirements."}
        </>
      ),
    },
  ],
};

const parts: readonly Part[] = [website, patientData, google];

export default function PrivacyPage() {
  return (
    <main>
      <TrustHero
        eyebrow="Privacy"
        title="Privacy policy"
        lead="Landing Health runs this website and the Landing app for physical therapy clinics. This policy has three parts, and each one says what it covers."
        meta="Updated November 25, 2026"
        jumpLinks={parts.map(({ id, title, scope }) => ({ id, label: title, note: scope }))}
      />
      <Sheet tone="fog" round="both">
        {parts.map(({ id, title, scope, updated, rows }, index) => (
          <TrustSection
            key={id}
            id={id}
            index={index}
            title={title}
            aside={
              <>
                <p className={`${type.small} mt-3 max-w-sm leading-[1.4] text-slate`}>{scope}</p>
                {updated && <p className={`${type.label} mt-4 text-mute`}>{updated}</p>}
              </>
            }
          >
            <RuledRows rows={rows} />
          </TrustSection>
        ))}
        <TrustSection id="contact" index={parts.length} title="Contact">
          <p className={`${type.body} border-t border-hair pt-5`}>
            For questions about any part of this policy, or to make a request about your data, email <Email />.
          </p>
        </TrustSection>
      </Sheet>
      <CtaSheet heading="Questions about your data? Ask us." lead="Email us about this policy or about data Landing holds for your clinic." secondary={{ label: "Email us", href: contactHref }} />
    </main>
  );
}

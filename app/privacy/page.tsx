import type { Metadata } from "next";
import type { ReactNode } from "react";
import { body, text } from "@/components/Article";
import { container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy | Landing",
  description: "How Landing handles data from your Google account in the Landing admin dashboard.",
};

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const linkClass = `rounded-sm underline underline-offset-4 ${focusRing}`;

const listClass = `mt-5 list-disc space-y-2 pl-5 ${text}`;

const sections: ReadonlyArray<{ heading: string; content: ReactNode }> = [
  {
    heading: "What Landing reads from Google",
    content: (
      <ul className={listClass}>
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
    heading: "What Landing adds to Google",
    content: (
      <>
        <p className={body}>
          When you connect, Landing copies every event you own on the Landing calendar into your primary Google calendar, past events included. It leaves out rejected events. While your Google connection works, Landing keeps the copies up to date. It sends each event’s title, its dates and times, and its status, which is tentative while the event is pending and confirmed once it’s approved. It also tags each copy so it can find it later. Landing never adds another person’s events, and it removes an event from Google when the event is rejected or deleted in Landing.
        </p>
        <p className={body}>
          Landing reads back the events it added so it can keep them in sync. If you delete one of them in Google, Landing adds it back. If you change its title, times, or status in Google, Landing overwrites your change the next time the event changes in Landing. To change or remove an event, change it in Landing.
        </p>
        <p className={body}>
          Event titles go to Google exactly as you type them, so keep patient names out of them. Landing doesn’t send clinic, therapist, or patient records to Google.
        </p>
      </>
    ),
  },
  {
    heading: "How Landing uses Drive files",
    content: (
      <>
        <p className={body}>
          On a task, the file you pick becomes the task’s link. Landing saves the link and doesn’t change who can open the file in Drive.
        </p>
        <p className={body}>
          On a note, your browser downloads the file you pick and attaches a copy to the note, the same way it attaches a file from your computer. Google Docs, Sheets, and Slides are saved as PDFs. Landing scans each copy for malware.
        </p>
        <p className={body}>
          The permission Google gives for Drive stays in your browser. Landing’s servers never receive it.
        </p>
      </>
    ),
  },
  {
    heading: "Where Landing keeps your data",
    content: (
      <>
        <p className={body}>
          Landing stores your connection details in its database. They are your Google email address and account ID, the token Google issues when you connect, the permissions you granted, the connection’s status, the time you connected, and the time its status last changed. Landing encrypts the token before it stores it. Copies of Drive files are stored with the note’s other attachments.
        </p>
        <p className={body}>
          Landing’s database and file storage run on Amazon Web Services in the US East (Northern Virginia) region.
        </p>
      </>
    ),
  },
  {
    heading: "Who can see it",
    content: (
      <>
        <ul className={listClass}>
          <li>Only you see your Google Calendar events in Landing.</li>
          <li>Anyone you share your Google calendar with can see the events Landing adds to it.</li>
          <li>
            Anyone who can open a note in Landing can see the Drive files attached to it. Anyone who can open a task can see its Drive link, and the link opens the file only for people Drive already allows.
          </li>
        </ul>
        <p className={body}>Landing doesn’t sell Google user data, use it for ads, or use it to train AI models.</p>
      </>
    ),
  },
  {
    heading: "How long Landing keeps it",
    content: (
      <>
        <p className={body}>
          Landing keeps your connection details until it finishes disconnecting Google, as the next section explains.
        </p>
        <p className={body}>
          A copy of a Drive file stays on its note until someone removes it, and a task keeps its Drive link until someone changes it. Disconnecting Google doesn’t remove either one.
        </p>
        <p className={body}>
          Deleted data can stay in Landing’s database backups, and earlier versions of files stay in storage for 30 days.
        </p>
      </>
    ),
  },
  {
    heading: "Disconnect and delete your data",
    content: (
      <>
        <p className={body}>
          To disconnect, open the Calendar page in the Landing admin dashboard and click Disconnect. The dashboard shows Google as disconnected right away, and Landing finishes in the background. It deletes the events it added to your calendar, revokes its access with Google, and then deletes your connection details. If Landing can’t reach Google, or Google refuses to delete the events, Landing keeps trying for 24 hours after you disconnect. After that, it revokes its access anyway and leaves the remaining events in your calendar. Your connection details stay in Landing’s database until the revoke goes through, and Landing retries the revoke until then. Ending your admin access works the same way.
        </p>
        <p className={body}>
          Landing can’t reach your calendar after you remove its access from your Google Account, as Google’s help page on{" "}
          <a href="https://support.google.com/accounts/answer/13533235" className={linkClass}>
            managing third-party access
          </a>{" "}
          explains. While Google lists Landing’s app as in testing, Google also ends Landing’s access 7 days after you connect. In both cases the dashboard asks you to reconnect, and the events Landing added stay in your calendar. To have Landing remove them, reconnect and then disconnect, or delete them in Google. If you connect a different Google account, Landing deletes the events it added to the first account, if it can still reach that calendar, and revokes its access there.
        </p>
        <p className={body}>
          To delete a copy of a Drive file, remove it from the note. Landing then deletes the file, but it keeps a record of the file’s name and who removed it. To remove a Drive link, edit the task. A recurring task copies its link into each new occurrence, so remove the link from each occurrence that has it.
        </p>
        <p className={body}>
          For privacy questions, or to ask Landing to delete any other data it holds from your Google account, email{" "}
          <a href="mailto:neildrp5@gmail.com" className={linkClass}>
            neildrp5@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Google’s user data policy",
    content: (
      <p className={body}>
        {"Landing's use and transfer to any other app of information received from Google APIs will adhere to the "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" className={linkClass}>
          Google API Services User Data Policy
        </a>
        {", including the Limited Use requirements."}
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className={`${container} flex flex-col items-center text-center`}>
          <h1 className={`${type.h1} max-w-4xl`}>Privacy policy</h1>
          <p className={`${type.lead} mt-6 max-w-[36rem] text-pretty`}>
            How Landing handles data from your Google account in the Landing admin dashboard.
          </p>
          <p className="mt-4 text-[13px]">Updated October 29, 2026</p>
        </div>
        <div className={`${edgePad} mt-14 sm:mt-16`}>
          <article className="mx-auto max-w-[45rem]">
            <p className={text}>
              People who use the Landing admin dashboard can connect their Google Calendar to it and add files from Google Drive to tasks and notes. This policy covers only the data Landing gets from your Google account through the admin dashboard.
            </p>
            {sections.map(({ heading, content }) => (
              <section key={heading}>
                <h2 className={`${type.h3} mt-12`}>{heading}</h2>
                {content}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}

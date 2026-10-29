import type { Metadata } from "next";
import type { ReactNode } from "react";
import { body, text } from "@/components/Article";
import { container, edgePad, type } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy | Landing",
  description: "How Landing handles data from a Google account connected to the Landing admin dashboard.",
};

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const linkClass = `rounded-sm underline underline-offset-4 ${focusRing}`;

const listClass = `mt-5 list-disc space-y-2 pl-5 ${text}`;

const sections: ReadonlyArray<{ heading: string; content: ReactNode }> = [
  {
    heading: "What Landing reads from Google",
    content: (
      <ul className={listClass}>
        <li>Your Google account’s email address, so the dashboard can show which account is connected.</li>
        <li>
          Events on Google calendars you own. Landing shows the events from your primary calendar on your Landing calendar, and only you see them there. Landing doesn’t store these events. It reads them from Google when you open the calendar.
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
          Landing adds your own Landing calendar events to your primary Google calendar and keeps them up to date. It sends each event’s title, its dates and times, and whether it’s pending or approved, and it tags the event so it can find it later. Pending events show as tentative. Landing never adds another person’s events, and it removes an event from Google when the event is rejected or deleted in Landing.
        </p>
        <p className={body}>
          Landing reads back the events it added so it can keep them in sync. If you delete one of them in Google, Landing adds it back. If you edit one, Landing replaces your edit the next time the event changes in Landing. To change or remove an event, change it in Landing.
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
          Landing stores your Google email address in its database, along with the token Google issues when you connect. Landing encrypts the token before it stores it. Copies of Drive files are stored with the note’s other attachments.
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
            Anyone who can open a note or task in Landing can see the Drive file attached to it or linked from it. A link opens the file only for people Drive already allows.
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
          Landing keeps your Google email address and token until you disconnect Google or your admin access ends.
        </p>
        <p className={body}>
          A copy of a Drive file stays on its note until someone removes it, and a task keeps its Drive link until someone changes it. Disconnecting Google doesn’t remove either one.
        </p>
      </>
    ),
  },
  {
    heading: "Disconnect and delete your data",
    content: (
      <>
        <p className={body}>
          To disconnect, open the Calendar page in the Landing admin dashboard and click Disconnect. Landing deletes the events it added to your Google calendar, revokes its access with Google, and deletes your token and Google email address. Ending your admin access does the same.
        </p>
        <p className={body}>To delete a copy of a Drive file, remove it from the note. To remove a Drive link, edit the task.</p>
        <p className={body}>
          You can also remove Landing’s access from your Google Account, as Google’s help page on{" "}
          <a href="https://support.google.com/accounts/answer/13533235" className={linkClass}>
            managing third-party access
          </a>{" "}
          explains. After that, Landing can’t reach your calendar, so the events it added stay there until you delete them. Disconnect in Landing first if you want Landing to remove them.
        </p>
        <p className={body}>
          To ask Landing to delete any other data it holds from your Google account, email the support address that Google shows when you connect Landing.
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
            How Landing handles data from a Google account you connect to the Landing admin dashboard.
          </p>
          <p className="mt-4 text-[13px]">Updated October 28, 2026</p>
        </div>
        <div className={`${edgePad} mt-14 sm:mt-16`}>
          <article className="mx-auto max-w-[45rem]">
            <p className={text}>
              People who use the Landing admin dashboard can connect a Google account. Their Google Calendar events then show beside their Landing calendar, and they can add files from Google Drive to tasks and notes. This policy covers only the data Landing gets from Google through that connection.
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

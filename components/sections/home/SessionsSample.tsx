import { type } from "@/lib/site";

type Status = "In progress" | "Complete" | "Overdue";

const statusStyle: Record<Status, string> = {
  "In progress": "bg-blue/10 text-blue",
  Complete: "bg-fog text-ink",
  Overdue: "ring-1 ring-inset ring-blue text-blue",
};

const groups: ReadonlyArray<{ label: string; sessions: ReadonlyArray<{ title: string; detail: string; status: Status }> }> = [
  { label: "Today", sessions: [{ title: "Strength", detail: "Mon, Oct 26 · 3 exercises", status: "In progress" }] },
  {
    label: "Past",
    sessions: [
      { title: "Mobility", detail: "Thu, Oct 22 · 3 exercises", status: "Complete" },
      { title: "Strength", detail: "Mon, Oct 19 · 2 exercises", status: "Overdue" },
    ],
  },
];

export default function SessionsSample() {
  return (
    <figure aria-label="Sample session history" className="relative h-full w-full overflow-hidden rounded-xl bg-white p-4 text-left shadow-preview sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold">Sessions</p>
        <p className={`${type.label} text-slate`}>Sample data</p>
      </div>
      {groups.map(({ label, sessions }) => (
        <div key={label} className="mt-3">
          <p className={`${type.label} text-slate`}>{label}</p>
          <ul className="mt-1.5 space-y-1.5">
            {sessions.map(({ title, detail, status }) => (
              <li key={`${title}-${detail}`} className="flex items-center gap-3 rounded-md border border-hair px-3 py-2">
                <div className="min-w-0">
                  <p className={`${type.small} font-medium leading-tight`}>{title}</p>
                  <p className={`${type.caption} truncate text-slate`}>{detail}</p>
                </div>
                <span className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${statusStyle[status]}`}>
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white to-white/0" />
    </figure>
  );
}

import BrandLockup from "@/components/Brand";
import Icon, { type IconName } from "@/components/Icon";

type SessionStatus = "inProgress" | "notStarted" | "complete" | "overdue";

const sessionChip: Record<SessionStatus, { label: string; className: string }> = {
  inProgress: { label: "In progress", className: "border-transparent bg-mist" },
  notStarted: { label: "Not started", className: "border-ink/20" },
  complete: { label: "Complete", className: "border-transparent bg-ink/10" },
  overdue: { label: "Overdue", className: "border-accent" },
};

type RailItem = { icon: IconName; label: string; count?: number; active?: boolean };

const reviewItems: RailItem[] = [
  { icon: "flag", label: "Flagged", count: 2 },
  { icon: "circleCheck", label: "Unflagged", count: 3 },
  { icon: "eyeOff", label: "Unassessable", count: 1 },
  { icon: "triangleAlert", label: "Failed", count: 0 },
];

const patientItems: RailItem[] = [
  { icon: "users", label: "Patients", count: 12, active: true },
  { icon: "userPlus", label: "New patient" },
];

const patient = {
  name: "Daniel Ortiz",
  summary: "ACL reconstruction. Recovery started Sep 1, 2026.",
  stats: [
    { label: "Sessions complete", value: "2 of 3" },
    { label: "Videos to review", value: "2" },
    { label: "Next visit", value: "Thu, Nov 5" },
  ],
};

const brief = {
  nextVisit: "Thu, Nov 5, 2026",
  snapshot: [
    "Week 9 after ACL reconstruction.",
    "Completed 2 of 3 home sessions in the last 4 weeks.",
    "Reported knee discomfort, about 3 out of 10, on the last squat set.",
  ],
  proposals: [
    {
      title: "Continue: Step-up",
      dose: "2 sets of 12",
      rationale: "Three on-time submissions with no flags.",
    },
    {
      title: "Consider a regression: Squat",
      dose: "3 sets of 8 to a box",
      rationale: "Two flagged reps and reported discomfort on the last set.",
    },
  ],
  closing: "Every proposal requires PT review. Nothing has been assigned, sent to the patient, or charted.",
};

const videos = [
  { title: "Squat", detail: "Session Mon, Oct 26 · Strength", meta: "Flagged, 2 flags", flagged: true },
  { title: "Step-up", detail: "Session Mon, Oct 26 · Strength", meta: "Unflagged", flagged: false },
  { title: "Bridge", detail: "Extra submission", meta: "Analyzing", flagged: false },
];

type Session = { title: string; detail: string; status: SessionStatus };

const sessionGroups: { label: string; sessions: Session[] }[] = [
  {
    label: "Upcoming",
    sessions: [{ title: "Mobility", detail: "Thu, Nov 5 · 3 exercises", status: "notStarted" }],
  },
  {
    label: "Today",
    sessions: [{ title: "Strength", detail: "Mon, Oct 26 · 3 exercises", status: "inProgress" }],
  },
  {
    label: "Past",
    sessions: [
      { title: "Mobility", detail: "Thu, Oct 22 · 3 exercises", status: "complete" },
      { title: "Strength", detail: "Mon, Oct 19 · 2 exercises", status: "overdue" },
    ],
  },
];

const chipBase = "inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-medium";
const rowCard = "flex items-center gap-3 rounded-lg border border-ink/12 px-3 py-2.5";
const smallLabel = "text-[11px] font-medium";
const heading = "text-[15px] font-semibold";

const lockupSmall = { tileClassName: "size-7 rounded-md", wordmarkClassName: "h-3" };

function RailRow({ icon, label, count, active }: RailItem) {
  return (
    <div className={`flex h-8 items-center gap-2.5 rounded-md px-2 ${active ? "bg-white font-medium" : ""}`}>
      <Icon name={icon} className={`size-4 ${active ? "text-accent" : ""}`} />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="tabular-nums">{count}</span>}
    </div>
  );
}

function Rail() {
  return (
    <div className="hidden w-48 shrink-0 flex-col justify-between border-r border-ink/10 bg-mist px-2 py-3 md:flex">
      <div>
        <div className="px-1 pb-3">
          <BrandLockup {...lockupSmall} />
        </div>
        <p className={`${smallLabel} px-2 pb-1`}>Video review</p>
        {reviewItems.map((item) => (
          <RailRow key={item.label} {...item} />
        ))}
        <div className="mt-4">
          {patientItems.map((item) => (
            <RailRow key={item.label} {...item} />
          ))}
        </div>
      </div>
      <div>
        <p className={`${smallLabel} px-2 pb-1`}>Riverside Physical Therapy</p>
        <RailRow icon="logOut" label="Sign out" />
      </div>
    </div>
  );
}

function Chip({ status }: { status: SessionStatus }) {
  const { label, className } = sessionChip[status];
  return <span className={`${chipBase} ${className}`}>{label}</span>;
}

function Brief() {
  return (
    <div className="rounded-lg border border-ink/12 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className={heading}>Next appointment brief</p>
        <span className={`${chipBase} shrink-0 border-transparent bg-mist`}>For your review</span>
      </div>
      <p className="mt-2">Next visit · {brief.nextVisit}</p>
      <p className="mt-4 font-medium">Patient snapshot</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5">
        {brief.snapshot.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-4 font-medium">Exercise proposals for PT review</p>
      <div className="mt-2 space-y-2">
        {brief.proposals.map(({ title, dose, rationale }) => (
          <div key={title} className="rounded-md border border-ink/10 p-3">
            <p className="font-medium">{title}</p>
            <p className="mt-1.5">
              <span className="font-medium">Dose</span> {dose}
            </p>
            <p className="mt-0.5">
              <span className="font-medium">Rationale</span> {rationale}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4">{brief.closing}</p>
    </div>
  );
}

function Videos() {
  return (
    <div>
      <p className={heading}>Videos</p>
      <p className={`${smallLabel} mt-2`}>Unreviewed</p>
      <div className="mt-1.5 space-y-2">
        {videos.map(({ title, detail, meta, flagged }) => (
          <div key={title} className={rowCard}>
            <div>
              <p className="font-medium">{title}</p>
              <p>{detail}</p>
            </div>
            <p className="ml-auto flex shrink-0 items-center gap-1.5 text-[11px]">
              {flagged && <span className="size-1.5 rounded-full bg-accent" />}
              {meta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sessions() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className={heading}>Sessions</p>
        <span className="rounded border border-transparent bg-accent px-2.5 py-1 text-[12px] font-medium text-black">
          New session
        </span>
      </div>
      <p className="mt-2">2 of 3 sessions complete in the last 4 weeks</p>
      {sessionGroups.map(({ label, sessions }) => (
        <div key={label}>
          <p className={`${smallLabel} mt-3`}>{label}</p>
          <div className="mt-1.5 space-y-2">
            {sessions.map(({ title, detail, status }) => (
              <div key={`${title}-${detail}`} className={rowCard}>
                <div>
                  <p className="font-medium">{title}</p>
                  <p>{detail}</p>
                </div>
                <span className="ml-auto shrink-0">
                  <Chip status={status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <figure className="w-full">
      <div className="rounded-[20px] bg-white/40 p-1.5 ring-1 ring-white/60 shadow-preview sm:p-2">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden rounded-xl border border-ink/10 bg-white text-left text-[12px] leading-normal sm:text-[13px]"
        >
          <div className="flex">
            <Rail />
            <div className="min-w-0 flex-1">
              <div className="flex items-center border-b border-ink/10 bg-mist px-3 py-2.5 md:hidden">
                <BrandLockup {...lockupSmall} />
              </div>
              <div className="px-4 py-5 sm:px-8 sm:py-7">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Icon name="chevronLeft" className="size-4" />
                    Patients
                  </span>
                  <span className="flex items-center gap-2">
                    Next
                    <kbd className="min-w-[1.75em] rounded-[0.35em] bg-white px-[0.5em] text-center font-sans text-[0.75em] leading-[1.7em] shadow-[inset_0_-1px_0_rgb(12_14_50/0.18),0_0_0_1px_rgb(12_14_50/0.12)]">
                      J
                    </kbd>
                  </span>
                </div>
                <p className="mt-3 text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{patient.name}</p>
                <p className="mt-1">{patient.summary}</p>
                <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                  {patient.stats.map(({ label, value }) => (
                    <div key={label} className="flex gap-1.5">
                      <dt>{label}</dt>
                      <dd className="font-medium tabular-nums">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  <Brief />
                  <div className="space-y-5">
                    <Videos />
                    <Sessions />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs">Sample patient and clinic data, shown for illustration.</figcaption>
    </figure>
  );
}

export type Application = { name: string; email: string; interest: string; availability: string };

export type ApplyState =
  | { status: "editing"; values: Application; error?: string }
  | { status: "sent" };

export const applicationFields: ReadonlyArray<{
  name: keyof Application;
  label: string;
  hint?: string;
  kind: "text" | "email" | "textarea";
  max: number;
  rows?: number;
  autoComplete?: string;
}> = [
  { name: "name", label: "Full name", kind: "text", max: 200, autoComplete: "name" },
  { name: "email", label: "Email address", kind: "email", max: 254, autoComplete: "email" },
  {
    name: "interest",
    label: "What interests you about joining Landing Health?",
    hint: "Just 1–2 sentences. We’d love to hear what caught your attention.",
    kind: "textarea",
    max: 2000,
    rows: 4,
  },
  {
    name: "availability",
    label: "How many hours per week could you contribute, and when could you start?",
    kind: "textarea",
    max: 500,
    rows: 2,
  },
];

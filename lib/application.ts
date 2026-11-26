export type Application = { name: string; email: string; interest: string; availability: string };

export const emptyApplication: Application = { name: "", email: "", interest: "", availability: "" };

export type ApplyState = { status: "editing"; values: Application; error?: string } | { status: "sent" };

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
    hint: "Name the role you’re applying for, then 1–2 sentences on what caught your attention.",
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

export const resumeMaxBytes = 4 * 1024 * 1024;
export const resumeTypes: Readonly<Record<string, string>> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};
export const resumeAccept = [...Object.keys(resumeTypes), ...Object.values(resumeTypes)].join(",");

export type Resume = { name: string; type: string; data: string };

export async function parseResume(form: FormData): Promise<{ resume?: Resume; error?: string }> {
  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) return {};
  if (!(file.type in resumeTypes)) return { error: "Please upload your resume as a PDF or Word file." };
  if (file.size > resumeMaxBytes) return { error: "Please keep your resume under 4 MB." };
  const data = Buffer.from(await file.arrayBuffer()).toString("base64");
  return { resume: { name: file.name.slice(0, 200), type: file.type, data } };
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseApplication(form: FormData): { values: Application; error?: string } {
  const values: Application = { ...emptyApplication };
  let error: string | undefined;
  for (const { name, max } of applicationFields) {
    const raw = form.get(name);
    const value = typeof raw === "string" ? raw.trim() : "";
    values[name] = value;
    if (error) continue;
    if (!value) error = "Please answer every question.";
    else if (value.length > max) error = `Please keep each answer under ${max} characters.`;
  }
  if (!error && !emailPattern.test(values.email)) error = "Please enter a valid email address.";
  return { values, error };
}

export async function sendApplication(values: Application, resume?: Resume): Promise<boolean> {
  const url = process.env.APPLICATION_SHEET_URL;
  if (!url) {
    console.error("APPLICATION_SHEET_URL is not set, so applications cannot be sent.");
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, resume: resume ?? null }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
    const body: unknown = await response.json().catch(() => null);
    const ok = response.ok && typeof body === "object" && body !== null && "ok" in body && body.ok === true;
    if (!ok) console.error(`Application sheet rejected the submission (HTTP ${response.status}).`);
    return ok;
  } catch (cause) {
    console.error("Application sheet request failed.", cause);
    return false;
  }
}

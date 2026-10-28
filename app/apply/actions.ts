"use server";

import { applicationFields, type Application, type ApplyState } from "@/lib/application";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sendFailed = "We couldn’t send your application. Please try again.";

function parse(form: FormData): { values: Application; error?: string } {
  const values: Application = { name: "", email: "", interest: "", availability: "" };
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

async function send(values: Application): Promise<boolean> {
  const url = process.env.APPLICATION_SHEET_URL;
  if (!url) {
    console.error("APPLICATION_SHEET_URL is not set, so applications cannot be sent.");
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
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

export async function submitApplication(_previous: ApplyState, form: FormData): Promise<ApplyState> {
  const { values, error } = parse(form);
  if (error) return { status: "editing", values, error };
  if (!(await send(values))) return { status: "editing", values, error: sendFailed };
  return { status: "sent" };
}

"use server";

import { parseApplication, sendApplication, type ApplyState } from "@/lib/application";

export async function apply(_previous: ApplyState, form: FormData): Promise<ApplyState> {
  const trap = form.get("website");
  if (typeof trap === "string" && trap.trim()) return { status: "sent" };
  const { values, error } = parseApplication(form);
  if (error) return { status: "editing", values, error };
  if (!(await sendApplication(values))) {
    return { status: "editing", values, error: "We couldn’t send your application. Please try again. If it keeps failing, email us from the Contact link at the bottom of this page." };
  }
  return { status: "sent" };
}

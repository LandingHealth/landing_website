"use server";

import { parseApplication, parseResume, sendApplication, type ApplyState } from "@/lib/application";

export async function apply(_previous: ApplyState, form: FormData): Promise<ApplyState> {
  const trap = form.get("website");
  if (typeof trap === "string" && trap.trim()) return { status: "sent" };
  const { values, error } = parseApplication(form);
  if (error) return { status: "editing", values, error };
  const { resume, error: resumeError } = await parseResume(form);
  if (resumeError) return { status: "editing", values, error: resumeError };
  if (!(await sendApplication(values, resume))) {
    return { status: "editing", values, error: "We couldn’t send your application. Please try again. If it keeps failing, email pragat@getlandinghealth.com." };
  }
  return { status: "sent" };
}

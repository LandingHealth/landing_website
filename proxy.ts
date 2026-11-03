import { NextResponse, type NextRequest } from "next/server";
import { applicationPage } from "@/lib/gate-html";
import { emptyApplication, parseApplication, sendApplication, type Application } from "@/lib/application";

type Submission =
  | { outcome: "thanks" }
  | { outcome: "invalid" | "unsent"; values: Application; error: string };

const noStore = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

const htmlResponse = (body: string, status: number) =>
  new NextResponse(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...noStore } });

const unsentMessage = "We couldn’t send your application. Please try again.";
const statuses = { invalid: 400, unsent: 502 };

const thanks = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.search = "?sent=1";
  const response = NextResponse.redirect(url, 303);
  for (const [name, value] of Object.entries(noStore)) response.headers.set(name, value);
  return response;
};

const editing = (values: Application, error: string | undefined, status: number) =>
  htmlResponse(applicationPage({ status: "editing", values, error }), status);

async function submit(request: NextRequest): Promise<Submission> {
  const form = await request.formData().catch(() => new FormData());
  const trap = form.get("website");
  if (typeof trap === "string" && trap.trim()) return { outcome: "thanks" };
  const { values, error } = parseApplication(form);
  if (error) return { outcome: "invalid", values, error };
  if (!(await sendApplication(values))) return { outcome: "unsent", values, error: unsentMessage };
  return { outcome: "thanks" };
}

export async function proxy(request: NextRequest) {
  if (request.method === "GET") {
    return request.nextUrl.searchParams.get("sent") === "1"
      ? htmlResponse(applicationPage({ status: "sent" }), 200)
      : editing(emptyApplication, undefined, 200);
  }
  if (request.method !== "POST") return htmlResponse("Method not allowed", 405);
  const result = await submit(request);
  if (result.outcome === "thanks") return thanks(request);
  return editing(result.values, result.error, statuses[result.outcome]);
}

export const config = { matcher: "/apply" };

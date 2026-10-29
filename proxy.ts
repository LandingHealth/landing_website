import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { applicationPage, passwordPage } from "@/lib/gate-html";
import { emptyApplication, parseApplication, sendApplication, type Application } from "@/lib/application";

const maxAge = 60 * 60 * 24 * 30;

type Outcome = "allow" | "grant" | "reject" | "prompt";

type Gate = {
  scope: string;
  secretEnv: "SITE_PASSWORD";
  cookie: string;
  salt: string;
  heading: string;
};

const gates: ReadonlyArray<Gate> = [
  {
    scope: "/",
    secretEnv: "SITE_PASSWORD",
    cookie: "site_access",
    salt: "landing-site-access-v1",
    heading: "Enter the password",
  },
];

const publicPaths = new Set(["/privacy", "/icon.svg"]);

const isPublic = (pathname: string) => publicPaths.has(pathname) || pathname.startsWith("/_next/static/");

const covers = (scope: string, pathname: string) =>
  scope === "/" || pathname === scope || pathname.startsWith(`${scope}/`);

const digest = (secret: string, value: string) => createHmac("sha256", secret).update(value).digest();

const same = (secret: string, a: string, b: string) => timingSafeEqual(digest(secret, a), digest(secret, b));

function decide(method: string, cookieOk: boolean, passwordOk: boolean): Outcome {
  if (cookieOk) return "allow";
  if (method !== "POST") return "prompt";
  return passwordOk ? "grant" : "reject";
}

const noStore = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

const htmlResponse = (body: string, status: number) =>
  new NextResponse(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...noStore } });

const promptResponse = (heading: string, error: boolean) => htmlResponse(passwordPage(heading, error), 401);

const warned = new Set<string>();

async function check(gate: Gate, request: NextRequest): Promise<NextResponse | null> {
  const secret = process.env[gate.secretEnv];
  if (!secret) {
    if (!warned.has(gate.secretEnv)) {
      warned.add(gate.secretEnv);
      console.error(`${gate.secretEnv} is not set, so every request it guards is refused.`);
    }
    return promptResponse(gate.heading, request.method === "POST");
  }

  const token = digest(secret, gate.salt).toString("hex");
  const cookieOk = same(secret, request.cookies.get(gate.cookie)?.value ?? "", token);

  let passwordOk = false;
  if (!cookieOk && request.method === "POST") {
    try {
      const value = (await request.formData()).get("password");
      passwordOk = typeof value === "string" && same(secret, value, secret);
    } catch {}
  }

  const outcome = decide(request.method, cookieOk, passwordOk);
  if (outcome === "allow") return null;
  if (outcome === "prompt") return promptResponse(gate.heading, false);
  if (outcome === "reject") return promptResponse(gate.heading, true);

  const url = request.nextUrl.clone();
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(gate.cookie, token, {
    httpOnly: true,
    sameSite: "lax",
    path: gate.scope,
    maxAge,
    secure: url.protocol === "https:",
  });
  return response;
}

type Submission =
  | { outcome: "thanks" }
  | { outcome: "invalid" | "unsent"; values: Application; error: string };

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

async function apply(request: NextRequest) {
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/apply") return apply(request);
  if (isPublic(pathname)) return NextResponse.next();
  for (const gate of gates) {
    if (!covers(gate.scope, pathname)) continue;
    const response = await check(gate, request);
    if (response) return response;
  }
  return NextResponse.next();
}

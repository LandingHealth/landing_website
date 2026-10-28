import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const maxAge = 60 * 60 * 24 * 30;

type Outcome = "allow" | "grant" | "reject" | "prompt";

type Gate = {
  scope: string;
  secretEnv: "SITE_PASSWORD" | "APPLY_PASSWORD";
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
  {
    scope: "/apply",
    secretEnv: "APPLY_PASSWORD",
    cookie: "apply_access",
    salt: "landing-apply-access-v1",
    heading: "Enter the application password",
  },
];

const covers = (scope: string, pathname: string) =>
  scope === "/" || pathname === scope || pathname.startsWith(`${scope}/`);

const digest = (secret: string, value: string) => createHmac("sha256", secret).update(value).digest();

const same = (secret: string, a: string, b: string) => timingSafeEqual(digest(secret, a), digest(secret, b));

function decide(method: string, cookieOk: boolean, passwordOk: boolean): Outcome {
  if (cookieOk) return "allow";
  if (method !== "POST") return "prompt";
  return passwordOk ? "grant" : "reject";
}

function page(heading: string, error: boolean) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Landing Health</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fff;color:#000;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
main{width:100%;max-width:340px}
p.brand{margin:0 0 28px;font-size:13px;font-weight:600;letter-spacing:.02em}
h1{margin:0 0 20px;font-size:24px;font-weight:500;line-height:1.2}
label{display:block;margin-bottom:6px;font-size:14px}
input{display:block;width:100%;height:44px;padding:0 12px;border:1px solid #000;border-radius:6px;background:#fff;color:#000;font:inherit;font-size:16px}
input:focus-visible,button:focus-visible{outline:2px solid #000;outline-offset:2px}
button{margin-top:14px;width:100%;height:44px;border:0;border-radius:6px;background:#ea652b;color:#000;font:inherit;font-size:15px;font-weight:500;cursor:pointer}
button:hover{background:#d55823}
.error{margin:0 0 14px;font-size:14px;font-weight:500}
</style>
</head>
<body>
<main>
<p class="brand">Landing Health</p>
<h1>${heading}</h1>
<form method="post">
${error ? '<p class="error" role="alert">That password didn’t work. Try again.</p>\n' : ""}<label for="password">Password</label>
<input id="password" type="password" name="password" autocomplete="current-password" required autofocus>
<button type="submit">Continue</button>
</form>
</main>
</body>
</html>`;
}

const promptResponse = (heading: string, error: boolean) =>
  new NextResponse(page(heading, error), {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });

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

export async function proxy(request: NextRequest) {
  for (const gate of gates) {
    if (!covers(gate.scope, request.nextUrl.pathname)) continue;
    const response = await check(gate, request);
    if (response) return response;
  }
  return NextResponse.next();
}

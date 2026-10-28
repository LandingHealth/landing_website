import { applicationFields, type Application } from "@/lib/application";

export type ApplyView = { status: "editing"; values: Application; error?: string } | { status: "sent" };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const style = `*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fff;color:#000;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
main{width:100%;max-width:340px}
main.wide{max-width:520px}
p.brand{margin:0 0 28px;font-size:13px;font-weight:600;letter-spacing:.02em}
h1{margin:0 0 20px;font-size:24px;font-weight:500;line-height:1.2}
label{display:block;margin-bottom:6px;font-size:14px}
input,textarea{display:block;width:100%;padding:0 12px;border:1px solid #000;border-radius:6px;background:#fff;color:#000;font:inherit;font-size:16px}
input{height:44px}
textarea{padding:10px 12px;resize:vertical}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #000;outline-offset:2px}
button{margin-top:14px;width:100%;height:44px;border:0;border-radius:6px;background:#ea652b;color:#000;font:inherit;font-size:15px;font-weight:500;cursor:pointer}
button:hover{background:#d55823}
.error{margin:0 0 14px;font-size:14px;font-weight:500}
.alt{margin:24px 0 0;padding-top:20px;border-top:1px solid rgb(12 14 50 / .1);font-size:14px}
.alt a{color:#000;font-weight:500;text-decoration:underline}
.lead{margin:0 0 24px;font-size:15px;line-height:1.5}
.field{margin-bottom:18px}
.hint{margin:0 0 6px;font-size:13px;line-height:1.4}
.hp{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}
.thanks{margin:0 0 8px;font-size:18px;font-weight:500}
.sent{margin:0;font-size:15px}`;

const brand = '<p class="brand">Landing Health</p>';

function shell(main: string, wide = false) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Landing Health</title>
<style>
${style}
</style>
</head>
<body>
<main${wide ? ' class="wide"' : ""}>
${brand}
${main}
</main>
</body>
</html>`;
}

export function passwordPage(heading: string, error: boolean) {
  return shell(`<h1>${escapeHtml(heading)}</h1>
<form method="post">
${error ? '<p class="error" role="alert">That password didn’t work. Try again.</p>\n' : ""}<label for="password">Password</label>
<input id="password" type="password" name="password" autocomplete="current-password" required autofocus>
<button type="submit">Continue</button>
</form>
<p class="alt">Applying for the research internship? <a href="/apply">Apply here</a></p>`);
}

function field(
  { name, label, hint, kind, max, rows, autoComplete }: (typeof applicationFields)[number],
  value: string,
  number: number | null,
) {
  const id = `f-${name}`;
  const text = escapeHtml(label);
  const described = hint ? ` aria-describedby="${id}-hint"` : "";
  const complete = autoComplete ? ` autocomplete="${autoComplete}"` : "";
  const control =
    kind === "textarea"
      ? `<textarea id="${id}" name="${name}" rows="${rows ?? 3}" maxlength="${max}" required${described}>${escapeHtml(value)}</textarea>`
      : `<input id="${id}" type="${kind}" name="${name}" value="${escapeHtml(value)}" maxlength="${max}"${complete} required${described}>`;
  return `<div class="field">
<label for="${id}">${number === null ? "" : `${number}. `}${text}</label>
${hint ? `<p class="hint" id="${id}-hint">${escapeHtml(hint)}</p>\n` : ""}${control}
</div>`;
}

export function applicationPage(view: ApplyView) {
  const head = "<h1>Research Internship Application</h1>";
  if (view.status === "sent") {
    return shell(
      `${head}
<p class="thanks">Thanks. We got your application.</p>
<p class="sent">We’ll reply by email.</p>`,
      true,
    );
  }
  let textareas = 0;
  const fields = applicationFields
    .map((f) => field(f, view.values[f.name], f.kind === "textarea" ? ++textareas : null))
    .join("\n");
  return shell(
    `${head}
<p class="lead">No experience or technical skills required. We’re looking for curious, reliable people willing to learn!</p>
<form method="post" action="/apply">
${fields}
<div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" type="text" name="website" tabindex="-1" autocomplete="off"></div>
${view.error ? `<p class="error" role="alert">${escapeHtml(view.error)}</p>\n` : ""}<button type="submit">Submit application</button>
</form>`,
    true,
  );
}

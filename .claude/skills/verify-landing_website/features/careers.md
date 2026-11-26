# Careers

`/careers` (title `Careers | Landing`) has the h1 "Help build the between-visit layer for physical therapy.", an `Apply now` button, an "Open roles" list (two full-time, three internships, all remote), "What each role does", a dark "Remote, with hours that fit." card, and the application form in the `#apply` section under the heading "Apply".

## Sub-features

- `careers-roles` lists five roles, each with department, employment, and location, and a link named `Apply for <role title>` that goes to `#apply`. The roles are Founding Operations Lead, Founding Account Executive, Founding Electrical Engineering Intern, Hardware Engineering Intern, and Computer Vision Research Assistant.
- `careers-process` shows the two numbered steps "Fill in one form" and "We read it", and the "Your information" note.
- `careers-form` is `components/ApplicationForm.tsx` inside `#apply`. It has four required fields, `Full name`, `Email address`, "1. What interests you about joining Landing Health?" and "2. How many hours per week could you contribute, and when could you start?". The first textarea has a hint that says to name the role. The button is `Submit application`.
- `careers-validate` validates on blur and on submit. An empty field shows "This field is required." and a bad email shows "Enter a valid email address."
- `careers-resume` is the optional `Upload resume` button under the questions (PDF or Word, up to 4 MB). Choosing a file shows its name beside the button; the server action rejects other types or larger files with a `role="alert"` message, and sends the file base64-encoded with the answers.
- `careers-submit` posts through the `apply` server action (`app/company/actions.ts`, `lib/application.ts`) to `APPLICATION_SHEET_URL`. While it sends, the button reads `Sending...`. On success, a `role="status"` block reading "Thanks. We got your application." replaces the form. On failure, a `role="alert"` paragraph says "We couldn't send your application. Please try again..." and the typed values stay.
- `careers-honeypot` is a hidden `website` field (`#apply-website`) that sits 10000px off screen. If a bot fills it, the action reports success without sending.
- `careers-cta` is the shared closing call-out (see the README).

## How to get to it (user POV)

- Choose `Careers` in the footer, or `See open roles` on `/company`.
- Choose `Apply now` or any `Apply` link, which scrolls to `#apply`.
- Old links to `/team` redirect to `/careers`, and `/apply` redirects to `/careers#apply`.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.
- The held server has no `APPLICATION_SHEET_URL` in its environment, and the worktree has no `.env*` file. Never submit a real application to the production sheet from a verification run.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /careers`.
- **Deep link.** Load `base + "/careers#apply"`. The `Apply` heading sits below the sticky header (`scroll-mt-24`), and the form is visible. Choosing `Apply for Hardware Engineering Intern` ends at the same place.
- **Validation.** With a server held on `<port>`, run this.

  ```js
  await page.goto(base + "/careers#apply");
  await page.getByRole("button", { name: "Submit application" }).click();
  await page.getByText("This field is required.").first().waitFor();
  await page.getByRole("textbox", { name: "Email address" }).fill("not-an-email");
  await page.getByRole("textbox", { name: "Full name" }).click();
  await page.getByText("Enter a valid email address.").waitFor();
  await page.screenshot({ path: "<evidence>/careers-validation.png", fullPage: true });
  ```

- **Submit failure path.** Fill all four fields with valid values and submit (`getByRole("textbox", { name: /What interests you/ })` and `{ name: /How many hours/ }` for the textareas). With no sheet URL, `getByText(/couldn.t send your application/)` appears and the values stay in the fields.
- **Honeypot.** Fill all four fields, fill the hidden field with `page.locator("#apply-website").fill("x", { force: true })`, and submit. The "Thanks. We got your application." status appears, and nothing is sent.
- **Redirects.** `curl -sI` on `/apply` returns 307 to `/careers#apply`, and on `/team` returns 308 to `/careers`.

## Gotchas

- Field errors are absolutely positioned so the submit button does not move when they clear. A redesign that makes them static shifts the layout on blur.
- Textarea labels carry a number prefix, so `getByRole("textbox", { name: "What interests you..." })` with an exact string fails. Use a regex.
- The failure message and the success path need a sheet. The success path needs a real sheet URL, so prove it only against a test sheet you control, and name that sheet in the proof. The honeypot reaches the success screen without one.
- `getByRole("alert")` matches two elements, the form error and Next.js's route announcer. Match the error by text.
- The server logs `APPLICATION_SHEET_URL is not set` on the failure path. That log is expected, not a finding.

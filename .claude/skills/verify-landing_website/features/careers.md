# Careers

`/careers` (title `Careers | Landing`) lists open internship roles under "Open roles" and has an application form at `#apply` under the "Apply" heading. The form asks for Full name, Email address, "What interests you about joining Landing Health?", and "How many hours per week could you contribute, and when could you start?".

## Sub-features

- `careers-roles` renders the "Open roles" list.
- `careers-validate` validates on blur and on submit. An empty field shows "This field is required." and a bad email shows "Enter a valid email address."
- `careers-submit` posts through the `apply` server action to `APPLICATION_SHEET_URL`. On success, a status reading "Thanks. We got your application." replaces the form. On failure, an alert asks the visitor to try again.
- `careers-honeypot` has a hidden `website` field. If a bot fills it, the server action reports success without sending.

## How to get to it (user POV)

- Choose `Careers` in the footer.
- Old links to `/team` redirect here, and `/apply` redirects to `/careers#apply`.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.
- The held server has no `APPLICATION_SHEET_URL` in its environment. Never submit a real application to the production sheet from a verification run.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /careers`.
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

- **Submit failure path.** Fill all four fields with valid values and submit. With no sheet URL, the alert "We couldn't send your application..." appears and the values stay in the fields.
- **Honeypot.** Fill all four fields, fill the hidden field with `page.locator("#apply-website").fill("x", { force: true })`, and submit. The "Thanks. We got your application." status appears, and nothing is sent.

## Gotchas

- Field errors are absolutely positioned so the submit button does not move when they clear. A redesign that makes them static shifts the layout on blur.
- The success path needs a real sheet URL. Prove it only against a test sheet you control, and name that sheet in the proof.

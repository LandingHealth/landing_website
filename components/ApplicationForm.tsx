"use client";

import { Button, Description, FieldError, Form, Input, Label, Spinner, TextArea, TextField } from "@heroui/react";
import { useActionState } from "react";
import { apply } from "@/app/company/actions";
import { applicationFields, emailPattern, emptyApplication, type ApplyState } from "@/lib/application";
import { type } from "@/lib/site";

const initialState: ApplyState = { status: "editing", values: emptyApplication };

const fieldText = "text-base sm:text-base";

const fields = applicationFields.map((field, index) => {
  const question = applicationFields.slice(0, index + 1).filter(({ kind }) => kind === "textarea").length;
  return { ...field, prefix: field.kind === "textarea" ? `${question}. ` : "" };
});

const emailError = (value: string) => (value && !emailPattern.test(value) ? "Enter a valid email address." : null);

export default function ApplicationForm() {
  const [state, action, pending] = useActionState(apply, initialState);

  if (state.status === "sent") {
    return (
      <div role="status">
        <p className="text-2xl font-semibold">Thanks. We got your application.</p>
        <p className="mt-2 text-slate">We’ll reply by email.</p>
      </div>
    );
  }

  return (
    <Form action={action}>
      {fields.map(({ name, label, hint, kind, max, rows, autoComplete, prefix }) => (
        <TextField
          key={name}
          name={name}
          type={kind === "email" ? "email" : "text"}
          isRequired
          fullWidth
          defaultValue={state.values[name]}
          validate={kind === "email" ? emailError : undefined}
          className="relative gap-1.5 pb-6"
        >
          <Label className="font-medium text-ink after:content-none">
            {prefix}
            {label}
          </Label>
          {hint && <Description className={`${type.caption} block leading-snug text-slate`}>{hint}</Description>}
          {kind === "textarea" ? (
            <TextArea rows={rows ?? 3} maxLength={max} className={`${fieldText} resize-y py-2.5`} />
          ) : (
            <Input maxLength={max} autoComplete={autoComplete} className={`${fieldText} h-11`} />
          )}
          {/* Absolute so the error clearing on blur does not shift the button out from under the pointer. */}
          <FieldError className={`${type.caption} absolute inset-x-0 bottom-1.5 h-3.5 px-0 leading-[14px] data-visible:h-3.5`}>
            {({ validationDetails }) =>
              validationDetails.valueMissing ? "This field is required." : "Enter a valid email address."
            }
          </FieldError>
        </TextField>
      ))}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state.error && (
        <p role="alert" className="mb-3 text-sm font-medium text-danger">
          {state.error}
        </p>
      )}
      <Button
        type="submit"
        isPending={pending}
        className="mt-2 h-10 rounded-[4px] px-5 text-base [--button-bg-hover:color-mix(in_oklab,var(--color-blue)_90%,transparent)] md:h-10"
      >
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Sending…" : "Submit application"}
          </>
        )}
      </Button>
    </Form>
  );
}

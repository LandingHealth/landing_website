"use client";

import { useActionState } from "react";
import { submitApplication } from "@/app/apply/actions";
import { applicationFields, type ApplyState } from "@/lib/application";
import { button, buttonSize } from "@/lib/site";

const initial: ApplyState = {
  status: "editing",
  values: { name: "", email: "", interest: "", availability: "" },
};

const control =
  "mt-2 block w-full rounded-md border border-ink/20 bg-white px-3 text-base text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const questions = applicationFields.filter((field) => field.kind === "textarea");

export default function ApplicationForm() {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.status === "sent") {
    return (
      <div role="status">
        <p className="text-base font-medium">Thanks. We got your application.</p>
        <p className="mt-2 text-[15px] leading-[1.6]">Our team will reply to you by email.</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6">
      {applicationFields.map(({ name, label, hint, kind, max, rows, autoComplete }) => {
        const number = questions.findIndex((question) => question.name === name) + 1;
        return (
          <div key={name}>
            <label htmlFor={name} className="block text-[15px] font-medium leading-snug">
              {number > 0 && `${number}. `}
              {label}
            </label>
            {hint && (
              <p id={`${name}-hint`} className="mt-1 text-[15px] font-normal leading-snug">
                {hint}
              </p>
            )}
            {kind === "textarea" ? (
              <textarea
                id={name}
                name={name}
                required
                maxLength={max}
                rows={rows}
                defaultValue={state.values[name]}
                aria-describedby={hint ? `${name}-hint` : undefined}
                className={`${control} py-2.5`}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={kind}
                required
                maxLength={max}
                autoComplete={autoComplete}
                defaultValue={state.values[name]}
                className={`${control} h-11`}
              />
            )}
          </div>
        );
      })}
      {state.error && (
        <p role="alert" className="text-[15px] font-medium">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${button.primary} ${buttonSize.md} w-full disabled:opacity-60`}>
        {pending ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

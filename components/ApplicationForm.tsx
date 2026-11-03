"use client";

import { useActionState } from "react";
import { apply } from "@/app/team/actions";
import { applicationFields, emptyApplication, type ApplyState } from "@/lib/application";
import { button, buttonSize } from "@/lib/site";

const initialState: ApplyState = { status: "editing", values: emptyApplication };

const control =
  "block w-full rounded-md border border-black bg-white px-3 text-base text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const fields = applicationFields.map((field, index) => {
  const question = applicationFields.slice(0, index + 1).filter(({ kind }) => kind === "textarea").length;
  return { ...field, id: `apply-${field.name}`, prefix: field.kind === "textarea" ? `${question}. ` : "" };
});

export default function ApplicationForm() {
  const [state, action, pending] = useActionState(apply, initialState);

  if (state.status === "sent") {
    return (
      <div role="status">
        <p className="text-lg font-medium">Thanks. We got your application.</p>
        <p className="mt-2 text-[15px]">We’ll reply by email.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {fields.map(({ name, label, hint, kind, max, rows, autoComplete, id, prefix }) => (
        <div key={name}>
          <label htmlFor={id} className="mb-1.5 block text-sm">
            {prefix}
            {label}
          </label>
          {hint && (
            <p id={`${id}-hint`} className="mb-1.5 text-[13px] leading-snug">
              {hint}
            </p>
          )}
          {kind === "textarea" ? (
            <textarea
              id={id}
              name={name}
              rows={rows ?? 3}
              maxLength={max}
              required
              defaultValue={state.values[name]}
              aria-describedby={hint ? `${id}-hint` : undefined}
              className={`${control} resize-y py-2.5`}
            />
          ) : (
            <input
              id={id}
              type={kind}
              name={name}
              maxLength={max}
              autoComplete={autoComplete}
              required
              defaultValue={state.values[name]}
              aria-describedby={hint ? `${id}-hint` : undefined}
              className={`${control} h-11`}
            />
          )}
        </div>
      ))}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm font-medium">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${button.primary} ${buttonSize.md} disabled:opacity-60`}>
        {pending ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

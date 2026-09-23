"use client";

import { FormEvent, useState } from "react";
import {
  contactSchema,
  fieldErrorsFromSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const fields: { name: keyof ContactInput; label: string; type?: string }[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject" },
];

export function mailtoHref(values: ContactInput) {
  const params = new URLSearchParams({
    subject: values.subject,
    body: `${values.message}\n\n— ${values.name}\n${values.email}`,
  });
  return `mailto:${site.email}?${params.toString()}`;
}

function openMailto(href: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const website = String(data.get("website") ?? "").trim();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrorsFromSchema(parsed.error));
      setOpened(false);
      return;
    }

    setErrors({});
    if (website) return;

    openMailto(mailtoHref(parsed.data));
    setOpened(true);
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="text-sm font-medium text-charcoal">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            autoComplete={field.name === "email" ? "email" : field.name}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none"
          />
          {errors[field.name] ? (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-primary-dark">
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none"
        />
        {errors.message ? (
          <p id="message-error" className="mt-1 text-sm text-primary-dark">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-dark"
      >
        Send message
      </button>
      <div aria-live="polite" className="text-sm text-muted">
        {opened ? (
          <p>Your email app should open with this message addressed to {site.email}.</p>
        ) : (
          <p>Sending opens your email app with the message filled in.</p>
        )}
      </div>
    </form>
  );
}

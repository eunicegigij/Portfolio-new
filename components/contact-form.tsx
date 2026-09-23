"use client";

import { FormEvent, useState } from "react";
import {
  contactSchema,
  fieldErrorsFromSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "fallback"; href: string }
  | { kind: "error"; message: string };

const fields: { name: keyof ContactInput; label: string; type?: string }[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject" },
];

function mailtoHref(values: ContactInput) {
  const params = new URLSearchParams({
    subject: values.subject,
    body: `${values.message}\n\n— ${values.name}\n${values.email}`,
  });
  return `mailto:${site.email}?${params.toString()}`;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const website = String(data.get("website") ?? "");
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrorsFromSchema(parsed.error));
      setStatus({ kind: "idle" });
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        fallback?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        if (body.fieldErrors) setErrors(body.fieldErrors);
        setStatus({
          kind: "error",
          message: "Please check the form and try again.",
        });
        return;
      }

      if (body.delivered) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }

      setStatus({ kind: "fallback", href: mailtoHref(parsed.data) });
    } catch {
      setStatus({
        kind: "fallback",
        href: mailtoHref(parsed.data),
      });
    }
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
        className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
        disabled={status.kind === "submitting"}
      >
        {status.kind === "submitting" ? "Sending…" : "Send message"}
      </button>
      <div aria-live="polite" className="text-sm text-muted">
        {status.kind === "sent" ? <p>Message sent. I&apos;ll reply by email.</p> : null}
        {status.kind === "fallback" ? (
          <p>
            Email isn&apos;t configured on this server yet.{" "}
            <a className="font-medium text-primary-dark underline" href={status.href}>
              Send this message directly
            </a>{" "}
            to {site.email}.
          </p>
        ) : null}
        {status.kind === "error" ? <p>{status.message}</p> : null}
      </div>
    </form>
  );
}

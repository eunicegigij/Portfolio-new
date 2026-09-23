import { NextResponse } from "next/server";
import {
  contactSchema,
  fieldErrorsFromSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const record = payload as Record<string, unknown>;
  if (typeof record.website === "string" && record.website.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const parsed = contactSchema.safeParse({
    name: typeof record.name === "string" ? record.name : "",
    email: typeof record.email === "string" ? record.email : "",
    subject: typeof record.subject === "string" ? record.subject : "",
    message: typeof record.message === "string" ? record.message : "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: fieldErrorsFromSchema(parsed.error) },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Contact form received. Email delivery is not configured.");
    }
    return NextResponse.json({ ok: true, delivered: false, fallback: "mailto" });
  }

  const delivered = await sendWithResend(apiKey, parsed.data);
  if (!delivered) {
    return NextResponse.json({ ok: true, delivered: false, fallback: "mailto" });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

async function sendWithResend(apiKey: string, input: ContactInput) {
  const to = process.env.CONTACT_EMAIL?.trim() || site.email;
  const from = process.env.RESEND_FROM?.trim();
  if (!from) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `[Portfolio] ${input.subject}`,
        text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

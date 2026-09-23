import { afterEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

const originalKey = process.env.RESEND_API_KEY;

afterEach(() => {
  process.env.RESEND_API_KEY = originalKey;
});

describe("POST /api/contact", () => {
  it("falls back to email when Resend is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          subject: "Backend role",
          message: "I would like to talk about a payments system.",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      delivered: false,
      fallback: "mailto",
    });
  });

  it("returns field errors for an invalid body", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "" }),
      }),
    );
    expect(response.status).toBe(400);
    const body = (await response.json()) as { fieldErrors: Record<string, string> };
    expect(body.fieldErrors.email).toBeTruthy();
  });
});

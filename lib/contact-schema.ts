import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a subject.")
    .max(160, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Please write a short message (at least 20 characters).")
    .max(5000, "Message is too long."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrorsFromSchema(error: z.ZodError) {
  const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in fieldErrors)) {
      fieldErrors[key as keyof ContactInput] = issue.message;
    }
  }
  return fieldErrors;
}

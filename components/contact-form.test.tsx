import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact-form";

describe("ContactForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("opens a mailto link with the message instead of calling an API", async () => {
    const user = userEvent.setup();
    const opened: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      opened.push(this.getAttribute("href") ?? this.href);
    });

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Subject"), "Backend role");
    await user.type(
      screen.getByLabelText("Message"),
      "I would like to talk about a payments system.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(opened).toHaveLength(1);
    const href = opened[0];
    expect(href.startsWith("mailto:eunice.gigij@gmail.com?")).toBe(true);
    expect(decodeURIComponent(href.replace(/\+/g, " "))).toContain("Backend role");
    expect(decodeURIComponent(href.replace(/\+/g, " "))).toContain("Ada Lovelace");
    expect(screen.getByText(/your email app should open/i)).toBeInTheDocument();
  });

  it("keeps the mail client closed when the form is incomplete", async () => {
    const user = userEvent.setup();
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click");

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(click).not.toHaveBeenCalled();
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
  });
});

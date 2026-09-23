import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Faq } from "@/components/faq";

describe("Faq", () => {
  it("moves between questions with the arrow keys and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = screen.getByRole("button", { name: /are all your projects public/i });
    expect(first).toHaveAttribute("aria-expanded", "true");

    first.focus();
    await user.keyboard("{ArrowDown}");
    const second = screen.getByRole("button", { name: /what roles are you open to/i });
    expect(second).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Escape}");
    expect(second).toHaveAttribute("aria-expanded", "false");
  });
});

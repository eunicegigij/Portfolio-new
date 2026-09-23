"use client";

import { useState, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/section-heading";
import { faq } from "@/content/site-content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  function onKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Escape") {
      setOpen(null);
      return;
    }
    const last = faq.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? index === last
            ? 0
            : index + 1
          : index === 0
            ? last
            : index - 1;
      document.getElementById(`faq-trigger-${next}`)?.focus();
    }
  }

  return (
    <section className="py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title="A few practical questions" />
        <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
          {faq.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-charcoal"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    {item.question}
                    <span aria-hidden="true" className="font-mono text-primary">
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!expanded}
                  className="px-5 pb-5 text-sm leading-relaxed text-muted"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

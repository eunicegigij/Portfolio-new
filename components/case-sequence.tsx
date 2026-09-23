"use client";

import { useState } from "react";

type Step = {
  label: string;
  title: string;
  body: string;
};

export function CaseSequence({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Project sequence" className="flex gap-2 overflow-x-auto pb-1">
        {steps.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`sequence-tab-${index}`}
              aria-selected={selected}
              aria-controls="sequence-panel"
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
                selected
                  ? "bg-primary text-white"
                  : "bg-white text-charcoal ring-1 ring-border hover:text-primary-dark"
              }`}
            >
              {index + 1}. {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="sequence-panel"
        aria-labelledby={`sequence-tab-${active}`}
        className="mt-4 rounded-2xl border border-border bg-white p-5 md:p-6"
      >
        <h3 className="text-lg font-semibold text-charcoal">{step.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
      </div>
    </div>
  );
}

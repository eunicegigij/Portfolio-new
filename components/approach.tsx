import { SectionHeading } from "@/components/section-heading";
import { approach, flowSteps } from "@/content/site-content";

export function Approach() {
  return (
    <section className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="approach-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="approach-heading"
          eyebrow="Engineering"
          title="How I Think About Software"
        >
          The interesting part starts when a request, a provider, or a retry
          refuses to follow the happy path.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approach.map((card, index) => (
            <li
              key={card.title}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-charcoal">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{card.copy}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-3xl border border-border bg-navy p-5 text-white md:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-bright uppercase">
            A path through a request
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {flowSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-xs text-cyan-bright">
                  0{index + 1}
                </span>
                <span className="text-sm leading-snug text-blue-50">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 h-px overflow-hidden bg-white/10" aria-hidden="true">
            <div className="flow-line h-px w-1/3 bg-cyan-bright" />
          </div>
        </div>
      </div>
    </section>
  );
}

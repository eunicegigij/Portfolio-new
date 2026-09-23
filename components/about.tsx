import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div>
          <SectionHeading id="about-heading" eyebrow="About" title="A bit of context">
            I&apos;m a software engineer with 4+ years of professional experience
            building backend-heavy and full-stack systems.
          </SectionHeading>
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
            <p>
              Most of my work sits around APIs, payments, integrations,
              financial workflows, and the messy parts of production software —
              the things that happen when providers time out, events arrive
              twice, data gets out of sync, or a system has to recover from
              failure.
            </p>
            <p>
              I also enjoy frontend work and can move comfortably between a
              React interface and the backend systems behind it.
            </p>
            <p>I&apos;m based in Nigeria and open to global opportunities.</p>
          </div>
        </div>
        <aside className="rounded-3xl border border-border bg-white p-6">
          <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
            Education
          </h3>
          <p className="mt-4 text-lg font-semibold text-charcoal">Tech4Dev</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Software Development Fellowship, Advanced Backend Engineering Track.
          </p>
          <p className="mt-4 text-sm font-medium text-charcoal">
            Best Graduating Backend Track — 2023
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Continuous learning in distributed systems, system design, fintech
            infrastructure, API design, and backend engineering — including
            Harvard CS50, The Odin Project, and a Btrust Mastering Bitcoin
            cohort.
          </p>
        </aside>
      </div>
    </section>
  );
}

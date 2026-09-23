import { SectionHeading } from "@/components/section-heading";
import { journey } from "@/content/site-content";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-white py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="about-heading" eyebrow="About" title="A little unconventional.">
          I didn&apos;t start in computer science. I started in nursing.
        </SectionHeading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
          <p>
            Somewhere along the way I got interested in software and started
            teaching myself how to build things. I later went through
            Tech4Dev&apos;s Women Techsters Program, where I graduated as the
            Best Backend graduating student. Most of the
            journey since then has been self-directed: building, breaking,
            debugging, reading, asking questions, and figuring it out.
          </p>
          <p>
            Four years on, I&apos;ve worked across SaaS, health-tech, payments,
            Bitcoin infrastructure, and internal business systems.
          </p>
          <p>
            That route taught me something I still use. Don&apos;t only
            understand the part you&apos;re responsible for. Understand the
            problem, the people using the product, and what happens around
            your part of the system.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {journey.map((stage, index) => (
            <li
              key={stage.label}
              className="relative rounded-2xl border border-border bg-background p-4"
            >
              <span
                className="mb-3 block h-1.5 w-8 rounded-full bg-gradient-to-r from-primary to-accent"
                aria-hidden="true"
              />
              <p className="font-mono text-[11px] text-primary-dark">0{index + 1}</p>
              <h3 className="mt-2 text-sm font-semibold text-charcoal">{stage.label}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{stage.detail}</p>
            </li>
          ))}
        </ol>

        <aside className="mt-8 max-w-xl rounded-3xl border border-border bg-background p-6">
          <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
            Structured learning
          </h3>
          <p className="mt-3 text-lg font-semibold text-charcoal">Tech4Dev</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Women Techsters Program. Best Backend graduating student — 2023.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            I&apos;m based in Nigeria and open to global opportunities.
          </p>
        </aside>
      </div>
    </section>
  );
}

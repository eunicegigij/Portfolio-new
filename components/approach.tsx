import { SectionHeading } from "@/components/section-heading";
import { practiceCards, productFlow, strengths } from "@/content/site-content";

export function Approach() {
  return (
    <section className="scroll-mt-20 py-20 md:py-28" aria-labelledby="approach-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="approach-heading"
          eyebrow="Product engineer"
          title="I don't just build the API."
        >
          I like seeing the whole thing: the problem someone is trying to
          solve, the experience they have, and the code underneath it.
        </SectionHeading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
          <p>
            My work has rarely fit in one box. I&apos;ve built backend services
            and interfaces, integrated payment providers, debugged production,
            worked through customer issues, joined product conversations,
            supported operations, trained interns, and chased infrastructure
            problems.
          </p>
          <p>
            Some days I&apos;m writing the feature. Some days I&apos;m the
            person figuring out why something that worked yesterday
            doesn&apos;t.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productFlow.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3"
            >
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <span className="text-sm font-medium text-charcoal">{step}</span>
            </li>
          ))}
        </ol>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {practiceCards.map((card) => (
            <li key={card.title} className="rounded-2xl bg-navy px-5 py-4 text-white">
              <h3 className="font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-blue-100">{card.copy}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-2xl font-semibold tracking-tight text-charcoal">
          What I&apos;m good at
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-white p-5">
              <h4 className="font-semibold text-charcoal">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

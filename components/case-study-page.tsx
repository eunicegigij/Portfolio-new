import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CaseSequence } from "@/components/case-sequence";
import { getCaseStudyNeighbors } from "@/content/case-studies";
import type { CaseStudy } from "@/content/case-studies/types";
import { projectHref } from "@/content/projects";

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const { previous, next, others } = getCaseStudyNeighbors(study.slug);

  return (
    <article className="bg-background">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Projects
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.18em] text-cyan-bright uppercase">
            {study.category}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-blue-100">{study.lede}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-blue-100"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="text-sm text-blue-200">No public deployment.</p>
          </div>
          <figure
            className={`mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white ${
              study.heroCompact ? "mx-auto w-full max-w-md" : ""
            }`}
          >
            <Image
              src={study.hero.src}
              alt={study.hero.alt}
              width={study.hero.width}
              height={study.hero.height}
              unoptimized={study.hero.src.endsWith(".svg")}
              priority
              className="h-auto w-full"
            />
          </figure>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-5 py-16 md:px-8 md:py-20">
        <section className="reveal border-l-4 border-accent pl-5 md:pl-8" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-sm font-medium tracking-wide text-primary-dark uppercase">
            Why I built this
          </h2>
          <div className="max-w-3xl">
            <Prose paragraphs={study.why} />
          </div>
        </section>

        <section className="reveal" aria-labelledby="context-heading">
          <h2 id="context-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            The context
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-white p-6">
              <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                What I wanted to explore
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{study.context.exploring}</p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6">
              <h3 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                What I chose to build
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{study.context.built}</p>
            </div>
          </div>
        </section>

        <section className="reveal" aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            The problem
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-charcoal">{study.problem.lead}</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {study.problem.points.map((point) => (
              <li key={point.title} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <h3 className="text-lg font-semibold text-charcoal">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            The approach
          </h2>
          <div className="max-w-3xl">
            <Prose paragraphs={study.approach.paragraphs} />
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.approach.flow.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-navy p-5 text-white">
                <p className="font-mono text-xs text-cyan-bright">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {study.operations ? (
          <section className="reveal" aria-labelledby="operations-heading">
            <h2 id="operations-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
              {study.operations.heading}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{study.operations.lead}</p>
            <ol className="mt-8 space-y-3 border-l border-primary/30 pl-5">
              {study.operations.steps.map((step, index) => (
                <li key={step} className="text-charcoal">
                  <span className="font-mono text-xs text-primary-dark">0{index + 1}</span>
                  <span className="ml-3">{step}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {study.operations.questions.map((question) => (
                <li
                  key={question}
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-charcoal"
                >
                  {question}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="reveal" id="decisions" aria-labelledby="decisions-heading">
          <h2 id="decisions-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            Engineering decisions
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {study.decisions.map((decision) => (
              <article
                key={decision.decision}
                id={decision.id}
                className="scroll-mt-24 rounded-3xl border border-border bg-white p-6"
              >
                <p className="text-sm leading-relaxed text-muted">{decision.problem}</p>
                <h3 className="mt-4 text-lg font-semibold text-charcoal">{decision.decision}</h3>
                <p className="mt-2 leading-relaxed text-muted">{decision.why}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="reveal rounded-3xl bg-navy px-5 py-8 text-white md:px-8 md:py-10"
          id="failure"
          aria-labelledby="failure-heading"
        >
          <h2 id="failure-heading" className="text-3xl font-semibold tracking-tight">
            Failure and edge cases
          </h2>
          <p className="mt-3 max-w-2xl text-blue-100">
            The interesting behavior is what the system does when the happy path does not happen.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {study.failures.map((failure) => (
              <li key={failure.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="font-semibold">{failure.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">{failure.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal" aria-labelledby="built-heading">
          <h2 id="built-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            What I built
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {study.built.map((group) => (
              <div key={group.category} className="rounded-3xl border border-border bg-white p-6">
                <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                  {group.category}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal" aria-labelledby="demonstrates-heading">
          <h2 id="demonstrates-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            What this project demonstrates
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {study.demonstrates.map((item) => (
              <li key={item.title} className="rounded-3xl bg-soft p-6">
                <h3 className="text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal" aria-labelledby="scope-heading">
          <h2 id="scope-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            {study.scopeTitle}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{study.scopeLead}</p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted">
            {study.notBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="reveal" aria-labelledby="result-heading">
          <h2 id="result-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            Result
          </h2>
          <div className="max-w-3xl">
            <Prose paragraphs={study.result.paragraphs} />
          </div>
          {study.result.images.length > 0 ? (
            <div className="mt-8 space-y-4">
              {study.result.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full rounded-2xl border border-border"
                />
              ))}
            </div>
          ) : null}
          <CaseSequence steps={study.result.sequence} />
          {study.result.code ? (
            <figure className="mt-6">
              <figcaption className="font-mono text-xs tracking-wide text-primary-dark uppercase">
                {study.result.code.label}
              </figcaption>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-navy p-4 text-sm leading-relaxed text-blue-100">
                <code>{study.result.code.content}</code>
              </pre>
            </figure>
          ) : null}
        </section>

        <section className="reveal" aria-labelledby="technical-heading">
          <h2 id="technical-heading" className="sr-only">
            Technical details
          </h2>
          <details className="rounded-3xl border border-border bg-white p-6">
            <summary className="cursor-pointer text-lg font-semibold text-charcoal">
              Technical details
            </summary>
            <div className="mt-6 space-y-6">
              {(
                [
                  ["Stack", study.technical.stack],
                  ["Architecture", study.technical.architecture],
                  ["API", study.technical.api],
                  ["Data model", study.technical.dataModel],
                  ["Reliability", study.technical.reliability],
                  ["Security", study.technical.security],
                  ["Testing", study.technical.testing],
                ] as const
              ).map(([label, items]) => (
                <div key={label}>
                  <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                    {label}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                  Repository docs
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {study.technical.docs.map((doc) => (
                    <li key={doc.href}>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-dark underline"
                      >
                        {doc.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </section>

        <section className="reveal border-t border-border pt-10" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-charcoal">
            Want to see the implementation?
          </h2>
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            View on GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <h3 className="mt-12 text-xl font-semibold text-charcoal">More projects</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={projectHref(other.slug)}
                  className="block rounded-3xl border border-border bg-white p-5 hover:border-primary/40"
                >
                  <p className="font-mono text-[11px] tracking-[0.16em] text-primary-dark uppercase">
                    {other.category}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-charcoal">{other.title}</p>
                  <p className="mt-1 text-sm text-muted">{other.lede}</p>
                </Link>
              </li>
            ))}
          </ul>
          <nav
            aria-label="Case studies"
            className="mt-8 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:items-center sm:justify-between"
          >
            {previous ? (
              <Link
                href={projectHref(previous.slug)}
                className="inline-flex items-center gap-2 text-primary-dark"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Previous project
                <span className="text-muted">· {previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            <Link href="/#work" className="text-charcoal">
              All Projects
            </Link>
            {next ? (
              <Link
                href={projectHref(next.slug)}
                className="inline-flex items-center gap-2 text-primary-dark"
              >
                Next project
                <span className="text-muted">· {next.title}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </section>
      </div>
    </article>
  );
}

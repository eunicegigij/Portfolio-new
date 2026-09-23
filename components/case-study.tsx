import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visuals";
import type { Project } from "@/content/projects";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="bg-background">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Selected work
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.18em] text-cyan-bright uppercase">
            {project.subtitle}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-blue-100">
            {project.description}
          </p>
          <p className="mt-4 font-mono text-xs text-blue-200">
            {project.stack.join(" · ")}
          </p>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white"
          >
            View GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="h-fit rounded-3xl bg-navy p-3 lg:sticky lg:top-24">
          <ProjectVisual kind={project.visual} />
        </div>
        <div className="space-y-10">
          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-charcoal">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {project.screenshots ? (
            <section aria-labelledby="screenshots-heading">
              <h2
                id="screenshots-heading"
                className="text-2xl font-semibold tracking-tight text-charcoal"
              >
                Interface
              </h2>
              <div className="mt-4 space-y-4">
                {project.screenshots.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="h-auto w-full rounded-2xl border border-border"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}

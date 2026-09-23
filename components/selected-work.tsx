import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visuals";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="work-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="work-heading" eyebrow="Selected work" title="Selected Work">
          A few systems I&apos;ve built, explored, and documented.
        </SectionHeading>
        <div className="mt-10 flex flex-col gap-6">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="project-card grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[280px_minmax(0,1fr)]"
            >
              <div className="bg-navy p-4">
                <p className="px-2 font-mono text-[11px] tracking-[0.16em] text-cyan-bright uppercase">
                  0{index + 1}
                </p>
                <ProjectVisual kind={project.visual} />
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-primary-dark">{project.subtitle}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="card-meta mt-5 flex flex-wrap gap-2">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-soft px-2.5 py-1 font-mono text-[11px] text-primary-dark"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="card-meta mt-4 font-mono text-xs text-muted">
                  {project.stack.join(" · ")}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 text-primary-dark hover:text-primary"
                  >
                    View Project
                    <ArrowUpRight className="card-arrow h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-charcoal hover:text-primary-dark"
                  >
                    View GitHub
                    <ArrowUpRight className="card-arrow h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

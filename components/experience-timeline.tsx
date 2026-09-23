import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/content/experience";
import { site } from "@/lib/site";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 py-20 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Where the work has been"
        >
          A short view of the roles. The resume has the full detail.
        </SectionHeading>
        <ol className="relative mt-12 space-y-8 border-l border-border pl-6 md:pl-8">
          {experience.map((item) => (
            <li key={item.company} className="relative">
              <span
                className="absolute top-2 -left-[1.95rem] h-3 w-3 rounded-full bg-primary ring-4 ring-soft md:-left-[2.45rem]"
                aria-hidden="true"
              />
              <article className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-xl font-semibold text-charcoal">{item.company}</h3>
                  <p className="font-mono text-xs tracking-wide text-primary-dark uppercase">
                    {item.context}
                  </p>
                </div>
                <div className="mt-6 space-y-6">
                  {item.roles.map((role) => (
                    <div key={`${item.company}-${role.title}`}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="font-medium text-charcoal">{role.title}</h4>
                        <p className="font-mono text-xs text-muted">{role.dates}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{role.summary}</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
                        {role.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
        <a
          href={site.resumePath}
          className="mt-8 inline-flex text-sm font-medium text-primary-dark hover:text-primary"
        >
          Download full resume →
        </a>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/section-heading";
import { TechIcon } from "@/components/tech-icon";
import { skillGroups } from "@/content/site-content";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-b border-border bg-background py-16 md:py-20"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="skills-heading" eyebrow="Stack" title="What I work with">
          The tools I actually use. The work around them is broader than the
          logos.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const span = "span" in group ? group.span : undefined;
            const compact = "compact" in group && group.compact;
            const spanClass =
              span === 3 ? "sm:col-span-2 lg:col-span-3" : span === 2 ? "sm:col-span-2" : "";

            return (
              <li
                key={group.title}
                className={`rounded-2xl border border-border bg-white ${
                  compact ? "p-4" : "p-5"
                } ${spanClass}`}
              >
                <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-charcoal ${
                        compact ? "text-xs" : "text-sm"
                      }`}
                    >
                      <TechIcon name={item} />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

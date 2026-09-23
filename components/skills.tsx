import { SectionHeading } from "@/components/section-heading";
import { skillGroups, strengths } from "@/content/site-content";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="skills-heading" eyebrow="Toolbox" title="Skills">
          Tools I use in production work. No percentages — they would not tell
          you how I use them.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <li
              key={group.title}
              className={`rounded-2xl border border-border bg-background p-5 ${
                "wide" in group && group.wide ? "lg:col-span-2" : ""
              }`}
            >
              <h3 className="font-mono text-xs tracking-[0.16em] text-primary-dark uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-white px-3 py-1 text-sm text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 text-2xl font-semibold tracking-tight text-charcoal">
          What I bring
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border p-5">
              <h4 className="font-semibold text-charcoal">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

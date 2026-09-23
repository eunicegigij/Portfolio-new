import { SectionHeading } from "@/components/section-heading";
import { debugging } from "@/content/site-content";

export function Debugging() {
  return (
    <section className="py-16 md:py-20" aria-labelledby="debug-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="debug-heading" eyebrow="Personality" title="Things I enjoy debugging">
          The interesting bugs are usually the ones that don&apos;t sit inside
          one function.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {debugging.map((item) => (
            <li
              key={item.mark}
              className="project-card rounded-2xl border border-border bg-white px-5 py-4"
            >
              <p className="font-mono text-[11px] text-accent">{item.mark}</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { notes } from "@/content/site-content";

export function EngineeringNotes() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="notes-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="notes-heading" eyebrow="The through-line" title="Why these projects">
          They are not a random set of repositories. Each one is a problem I
          wanted to be able to explain: correctness, a payment that settles
          later, and a failed integration you can still inspect. These notes
          are not published articles.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <li key={note.title}>
              <Link
                href={note.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 hover:border-primary/40"
              >
                <p className="font-mono text-[11px] tracking-[0.16em] text-primary-dark uppercase">
                  {note.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-charcoal">{note.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {note.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-dark">
                  Read in the case study
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

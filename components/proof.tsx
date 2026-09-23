import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { proof } from "@/content/site-content";

export function Proof() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="proof-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="proof-heading" eyebrow="Evidence" title="Proof of Work">
          Public code, written decisions, tests, and CI. Nothing here is a
          testimonial or a logo I do not have permission to show.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {proof.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <li key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
                {external ? (
                  <a
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-dark hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-dark hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

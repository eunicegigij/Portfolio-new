import { SectionHeading } from "@/components/section-heading";
import { privateWorkAreas } from "@/content/site-content";

export function PrivateWork() {
  return (
    <section className="bg-navy py-20 text-white md:py-28" aria-labelledby="private-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="private-heading"
          eyebrow="Confidential work"
          title="Some of my best work isn't on GitHub."
          tone="inverse"
        >
          A lot of my professional work was built for companies and products
          that aren&apos;t open source. Some of it is covered by confidentiality
          agreements, so I can&apos;t publish the code or the sensitive
          details.
        </SectionHeading>
        <p className="mt-4 max-w-2xl leading-relaxed text-blue-100">
          The public projects are not replicas of that work. They&apos;re how I
          show the way I think about architecture, reliability, security,
          integrations, testing, and failure. I can still talk through the
          private problems, my role, and the trade-offs in an interview.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {privateWorkAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-white/15 px-3 py-1 text-sm text-blue-50"
            >
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-lg text-white">Ask me about the problems behind the code.</p>
        <a
          href="#contact"
          className="mt-4 inline-flex text-sm font-medium text-cyan-bright hover:text-white"
        >
          Discuss my experience →
        </a>
      </div>
    </section>
  );
}

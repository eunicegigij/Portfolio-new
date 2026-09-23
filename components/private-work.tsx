import { SectionHeading } from "@/components/section-heading";
import { privateWorkAreas } from "@/content/site-content";

export function PrivateWork() {
  return (
    <section className="bg-navy py-20 text-white md:py-28" aria-labelledby="private-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="private-heading"
          eyebrow="Confidential work"
          title="Some of my best work isn't public."
          tone="inverse"
        >
          A significant part of my professional experience comes from building
          software for companies and client teams. Some of that work is covered
          by NDAs, so I can&apos;t publish the repositories, screenshots,
          architecture diagrams, or internal implementation details.
        </SectionHeading>
        <p className="mt-4 max-w-2xl leading-relaxed text-blue-100">
          I can, however, discuss the engineering problems, my
          responsibilities, the decisions I made, and the outcomes at an
          appropriate level during an interview.
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

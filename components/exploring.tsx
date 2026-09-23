import { exploring } from "@/content/site-content";

export function Exploring() {
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="exploring-heading">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <h2
          id="exploring-heading"
          className="text-2xl font-semibold tracking-tight text-charcoal"
        >
          Currently exploring
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Areas I&apos;m spending time on. This is not a list of things I&apos;m
          claiming to have mastered.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {exploring.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-charcoal"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

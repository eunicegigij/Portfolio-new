import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-xs tracking-[0.18em] uppercase ${
          inverse ? "text-cyan-bright" : "text-primary-dark"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold tracking-tight md:text-4xl ${
          inverse ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            inverse ? "text-blue-100" : "text-muted"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

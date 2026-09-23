import { ArrowRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { SystemGraph } from "@/components/project-visuals";
import { site } from "@/lib/site";

const signals = ["TypeScript", "Node.js", "NestJS", "React", "Payments"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-cyan-bright uppercase">
            Software Engineer · Nigeria · Open to global roles
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 text-xl text-blue-100">{site.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-50">
            Building reliable software across backend, frontend, payments, and
            integrations.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-200/90">
            4+ years building production software with TypeScript, Node.js,
            React, payment APIs, financial workflows, and third-party
            integrations.
          </p>
          <p className="mt-5 max-w-xl border-l-2 border-accent pl-4 text-blue-50">
            I like the part of software where things stop going according to
            plan.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {signals.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-blue-100"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-dark"
            >
              View My Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.resumePath}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white hover:border-white/50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-4 text-sm text-blue-100">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href={`mailto:${site.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-3 md:p-5">
          <p className="px-2 pb-2 font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
            Systems I like working in
          </p>
          <SystemGraph />
        </div>
      </div>
    </section>
  );
}

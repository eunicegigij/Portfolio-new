import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer data-inert-with-intro className="site-footer bg-navy text-blue-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-lg font-semibold text-white">{site.name}</p>
          <p className="mt-1 text-sm">{site.title}</p>
          <p className="mt-2 text-sm text-blue-200">
            Products · APIs · Reliability
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-4">
            <a
              href={site.github}
              className="inline-flex items-center gap-2 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={site.linkedin}
              className="inline-flex items-center gap-2 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              Email
            </a>
          </div>
          <p className="text-xs text-blue-300">Built with TypeScript + Next.js</p>
        </div>
      </div>
    </footer>
  );
}

import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

const links = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    value: site.email,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    value: "eunice-jacob",
    external: true,
  },
  {
    label: "GitHub",
    href: site.github,
    value: "eunicegigijacob",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow="Have a problem worth building?"
            title="Let's talk."
          >
            I&apos;m open to Software Engineer, Backend Engineer, Frontend
            Engineer, Full-stack Engineer, and Product Engineer opportunities.
          </SectionHeading>
          <ul className="mt-8 space-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-3 text-charcoal hover:text-primary-dark"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label === "Email" ? (
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  ) : null}
                  {link.label === "GitHub" ? <GitHubIcon className="h-4 w-4" /> : null}
                  {link.label === "LinkedIn" ? (
                    <LinkedInIcon className="h-4 w-4" />
                  ) : null}
                  <span>
                    <span className="block text-xs text-muted">{link.label}</span>
                    {link.value}
                    {link.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

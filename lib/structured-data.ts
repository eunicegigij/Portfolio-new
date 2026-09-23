import { projects } from "@/content/projects";
import { getSiteUrl, site } from "@/lib/site";

export function homeStructuredData() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        jobTitle: site.title,
        email: `mailto:${site.email}`,
        url,
        address: {
          "@type": "PostalAddress",
          addressCountry: "NG",
        },
        sameAs: [site.github, site.linkedin],
        knowsAbout: [
          "TypeScript",
          "Node.js",
          "NestJS",
          "React",
          "Payments",
          "Webhooks",
          "API design",
        ],
      },
      {
        "@type": "WebSite",
        name: `${site.name} — ${site.title}`,
        url,
        description: site.description,
      },
      ...projects.map((project) => ({
        "@type": "SoftwareApplication",
        name: project.title,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        description: project.description,
        url: `${url}/work/${project.slug}`,
        codeRepository: project.github,
        author: {
          "@type": "Person",
          name: site.name,
        },
        programmingLanguage: "TypeScript",
      })),
    ],
  };
}

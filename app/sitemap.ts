import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const lastModified = new Date();

  return [
    { url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

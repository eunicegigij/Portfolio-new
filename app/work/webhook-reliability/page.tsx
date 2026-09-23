import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";
import { getProject } from "@/content/projects";

const project = getProject("webhook-reliability");

export const metadata: Metadata = {
  title: project.title,
  description: project.description,
  alternates: { canonical: "/work/webhook-reliability" },
};

export default function WebhookReliabilityPage() {
  return <CaseStudy project={project} />;
}
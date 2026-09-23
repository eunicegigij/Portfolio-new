import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";
import { getProject } from "@/content/projects";

const project = getProject("pactis");

export const metadata: Metadata = {
  title: project.title,
  description: project.description,
  alternates: { canonical: "/work/pactis" },
};

export default function PactisPage() {
  return <CaseStudy project={project} />;
}

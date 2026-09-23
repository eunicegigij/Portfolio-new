import type { Metadata } from "next";
import { CaseStudy } from "@/components/case-study";
import { getProject } from "@/content/projects";

const project = getProject("blinky");

export const metadata: Metadata = {
  title: project.title,
  description: project.description,
  alternates: { canonical: "/work/blinky" },
};

export default function BlinkyPage() {
  return <CaseStudy project={project} />;
}

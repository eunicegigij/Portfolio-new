import { blinkyCaseStudy } from "@/content/case-studies/blinky";
import { pactisCaseStudy } from "@/content/case-studies/pactis";
import type { CaseStudy } from "@/content/case-studies/types";
import { webhookCaseStudy } from "@/content/case-studies/webhook";

export const caseStudies: CaseStudy[] = [
  pactisCaseStudy,
  blinkyCaseStudy,
  webhookCaseStudy,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyNeighbors(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return {
    previous: index > 0 ? caseStudies[index - 1] : null,
    next: index >= 0 && index < caseStudies.length - 1 ? caseStudies[index + 1] : null,
    others: caseStudies.filter((study) => study.slug !== slug),
  };
}

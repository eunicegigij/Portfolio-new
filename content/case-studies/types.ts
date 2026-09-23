export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: "pactis" | "blinky" | "webhook-reliability";
  title: string;
  lede: string;
  category: string;
  tags: string[];
  github: string;
  hero: CaseImage;
  heroCompact?: boolean;
  why: string[];
  context: { exploring: string; built: string };
  problem: { lead: string; points: { title: string; body: string }[] };
  approach: { paragraphs: string[]; flow: { title: string; body: string }[] };
  operations?: {
    heading: string;
    lead: string;
    steps: string[];
    questions: string[];
  };
  decisions: { id?: string; problem: string; decision: string; why: string }[];
  failures: { title: string; body: string }[];
  built: { category: string; items: string[] }[];
  demonstrates: { title: string; body: string }[];
  scopeTitle: string;
  scopeLead: string;
  notBuilt: string[];
  result: {
    paragraphs: string[];
    images: CaseImage[];
    sequence: { label: string; title: string; body: string }[];
    code?: { label: string; content: string };
  };
  technical: {
    stack: string[];
    architecture: string[];
    api: string[];
    dataModel: string[];
    reliability: string[];
    security: string[];
    testing: string[];
    docs: { label: string; href: string }[];
  };
};

export const practiceCards = [
  { title: "Build", copy: "Frontend and backend." },
  { title: "Integrate", copy: "Payments and third-party APIs." },
  { title: "Debug", copy: "Production and infrastructure." },
  { title: "Think", copy: "Product and user problems." },
  { title: "Operate", copy: "CI/CD, deployments, and support." },
  { title: "Improve", copy: "Documentation, architecture, and reliability." },
] as const;

export const productFlow = [
  "Problem",
  "Product",
  "User experience",
  "Frontend",
  "Backend",
  "Integrations",
  "Infrastructure",
  "Operations",
] as const;

export const journey = [
  { label: "Nursing", detail: "Where I started" },
  { label: "Curiosity", detail: "Software got interesting" },
  { label: "Self-taught", detail: "Building, then breaking it" },
  { label: "Tech4Dev", detail: "Women Techsters" },
  { label: "Software Engineer", detail: "Four years of real systems" },
  { label: "Product Engineer", detail: "The problem, then the system" },
] as const;

export const debugging = [
  { mark: "01", title: "“It worked yesterday.”" },
  { mark: "02", title: "Duplicate payment requests" },
  { mark: "03", title: "A webhook that arrived much later than expected" },
  { mark: "04", title: "A transaction that says success in one place and pending in another" },
  { mark: "05", title: "A production issue nobody can reproduce locally" },
  { mark: "06", title: "A codebase whose author has moved on" },
] as const;

export const exploring = [
  "Distributed systems",
  "Reliable integrations",
  "Payment infrastructure",
  "Developer tooling",
  "System design",
  "Observability",
  "Security",
  "Performance",
  "Bitcoin and Lightning infrastructure",
] as const;

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Express.js"],
  },
  {
    title: "Databases & Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    span: 2,
  },
  {
    title: "Cloud & Deployment",
    items: [
      "AWS",
      "DigitalOcean",
      "Google Cloud",
      "Render",
      "Vercel",
      "Netlify",
      "Heroku",
    ],
    span: 2,
  },
  {
    title: "DevOps & Infrastructure",
    items: ["Docker", "Linux", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Monitoring & Observability",
    items: ["Grafana", "Datadog"],
  },
  {
    title: "Analytics & Product Measurement",
    items: ["Metabase", "AppsFlyer"],
  },
  {
    title: "Payments & Financial APIs",
    items: ["Paystack", "Flutterwave", "Mono"],
  },
  {
    title: "KYC & Identity",
    items: ["Prembly", "Youverify"],
  },
  {
    title: "Bitcoin & Lightning",
    items: [
      "Bitcoin",
      "Lightning Network",
      "LND",
      "LNbits",
      "Blink",
      "Bitnob",
      "IBEX",
      "Mavapay",
    ],
    span: 2,
  },
  {
    title: "APIs & Engineering",
    items: [
      "REST APIs",
      "Webhooks",
      "Authentication",
      "Authorization",
      "Idempotency",
      "Background Jobs",
      "Queues",
      "Testing",
    ],
    span: 3,
  },
  {
    title: "Technical Communication",
    items: [
      "Technical Writing",
      "Documentation",
      "Product/Technical Content",
      "Knowledge Sharing",
    ],
    compact: true,
  },
] as const;

export const strengths = [
  {
    title: "System thinking",
    copy: "I like understanding how the pieces connect, not only the piece assigned to me.",
  },
  {
    title: "Problem solving",
    copy: "I like taking something ambiguous or broken and working backwards until the actual problem is clear.",
  },
  {
    title: "Reliability",
    copy: "I care about duplicated requests, missing providers, failed jobs, and systems that restart.",
  },
  {
    title: "Product thinking",
    copy: "I think about the user and the business problem alongside the implementation.",
  },
  {
    title: "Ownership",
    copy: "I'm comfortable investigating an issue past the edge of the code I wrote.",
  },
  {
    title: "Communication",
    copy: "I write documentation, explain decisions, work through problems with a team, and train other developers.",
  },
] as const;

export const privateWorkAreas = [
  "SaaS",
  "Health-tech",
  "Payments",
  "Backend systems",
  "Product workflows",
  "Third-party APIs",
  "Production debugging",
  "Operations",
  "Internal tools",
] as const;

export const proof = [
  {
    title: "GitHub",
    copy: "Three public engineering projects, linked from Selected Work, with the code you can read.",
    href: "https://github.com/eunicegigijacob",
    label: "Open GitHub",
  },
  {
    title: "Technical documentation",
    copy: "Architecture notes, failure scenarios, and the decisions behind Pactis, Blinky, and the webhook service.",
    href: "/projects/webhook-reliability",
    label: "Read a case study",
  },
  {
    title: "Testing",
    copy: "Unit tests, end-to-end tests, and concurrency scenarios for money movement, webhook duplicates, and delivery retries.",
    href: "/projects/pactis",
    label: "See how Pactis is tested",
  },
  {
    title: "CI",
    copy: "GitHub Actions runs the test workflows for the public repositories.",
    href: "https://github.com/eunicegigijacob/Pactis-wallet/actions",
    label: "View Pactis CI",
  },
] as const;

export const notes = [
  {
    title: "Why at-least-once delivery is the honest webhook model",
    summary:
      "HTTP cannot promise exactly-once delivery. The useful design makes duplicates explicit and safe.",
    href: "/projects/webhook-reliability#handling",
    label: "Webhook case study",
  },
  {
    title: "Designing idempotent financial operations",
    summary:
      "A unique key in the database is what survives a retry. An in-memory set does not.",
    href: "/projects/pactis#decisions",
    label: "Pactis case study",
  },
  {
    title: "Handling concurrent wallet transactions",
    summary:
      "One-row updates can retry a version check. Two-row transfers need a lock order that cannot deadlock.",
    href: "/projects/pactis#failure",
    label: "Pactis case study",
  },
  {
    title: "Building reliable third-party integrations",
    summary:
      "Providers time out, retry, and arrive late. The integration has to know which of those happened.",
    href: "/projects/blinky#failure",
    label: "Blinky case study",
  },
  {
    title: "Why Redis shouldn't automatically become your source of truth",
    summary:
      "A queue broker and a ledger solve different problems. Mixing them up is how balances drift.",
    href: "/projects/pactis#decisions",
    label: "Pactis case study",
  },
] as const;

export const faq = [
  {
    question: "Are all your projects public?",
    answer:
      "No. A significant part of my professional work was built for companies and clients under confidentiality agreements. I share the public work I can and discuss the engineering behind private systems at an appropriate level.",
  },
  {
    question: "What roles are you open to?",
    answer:
      "Software Engineer, Backend Engineer, Frontend Engineer, Full-stack Engineer, and Product Engineer.",
  },
  {
    question: "Are you backend or full-stack?",
    answer:
      "Backend-heavy, and I work across the stack. I've built React interfaces and Node.js/NestJS backends, and I like starting from the problem rather than from one layer.",
  },
  {
    question: "Where can I see your code?",
    answer:
      "GitHub is the best place to start. The featured projects on this site link directly to their repositories.",
  },
  {
    question: "Can we talk about your private work?",
    answer:
      "Absolutely. I can discuss the problem, my role, architecture decisions, trade-offs, and outcomes without exposing confidential information.",
  },
] as const;

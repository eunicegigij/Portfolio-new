export const approach = [
  {
    title: "Correctness",
    copy: "Especially when money, state, or user actions are involved.",
  },
  {
    title: "Failure paths",
    copy: "I don't only think about what happens when everything works.",
  },
  {
    title: "Integration boundaries",
    copy: "Third-party systems are dependencies, not guarantees.",
  },
  {
    title: "Debuggability",
    copy: "If something fails at 2am, the system should help explain why.",
  },
  {
    title: "Maintainability",
    copy: "Code should be understandable to the next engineer who inherits it.",
  },
] as const;

export const flowSteps = [
  "Request",
  "Validate",
  "Authorize",
  "Persist",
  "Process",
  "External system",
  "Success / failure",
  "Retry / recover / replay / investigate",
] as const;

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Express.js"],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "GitHub Actions", "Linux"],
  },
  {
    title: "Engineering",
    items: [
      "REST APIs",
      "Authentication",
      "Authorization",
      "Queues",
      "Background jobs",
      "Webhooks",
      "Idempotency",
      "Testing",
      "API design",
    ],
    wide: true,
  },
  {
    title: "Fintech",
    items: [
      "Payment APIs",
      "Wallets",
      "Lightning Network",
      "Transaction systems",
      "Reconciliation",
    ],
    wide: true,
  },
  {
    title: "Integrations",
    items: ["Paystack", "Flutterwave", "Blink", "Third-party APIs", "Webhooks"],
  },
] as const;

export const strengths = [
  {
    title: "Problem solving",
    copy: "I enjoy investigating systems when the obvious answer isn't the right one.",
  },
  {
    title: "Ownership",
    copy: "Comfortable taking responsibility for backend systems from implementation through debugging and maintenance.",
  },
  {
    title: "Communication",
    copy: "I document systems, explain technical decisions, and work across product and engineering requirements.",
  },
  {
    title: "Learning",
    copy: "I am comfortable entering unfamiliar domains and understanding the system before changing it.",
  },
  {
    title: "Reliability",
    copy: "I think about retries, failure states, duplicate events, consistency, and recovery — not just the happy path.",
  },
] as const;

export const privateWorkAreas = [
  "Payment integrations",
  "Backend systems",
  "Financial workflows",
  "Third-party APIs",
  "Data synchronization",
  "Production debugging",
  "Internal tools",
  "Authentication and authorization",
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
    href: "/work/webhook-reliability",
    label: "Read a case study",
  },
  {
    title: "Testing",
    copy: "Unit tests, end-to-end tests, and concurrency scenarios for money movement, webhook duplicates, and delivery retries.",
    href: "/work/pactis",
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
    href: "/work/webhook-reliability#handling",
    label: "Webhook case study",
  },
  {
    title: "Designing idempotent financial operations",
    summary:
      "A unique key in the database is what survives a retry. An in-memory set does not.",
    href: "/work/pactis#decisions",
    label: "Pactis case study",
  },
  {
    title: "Handling concurrent wallet transactions",
    summary:
      "One-row updates can retry a version check. Two-row transfers need a lock order that cannot deadlock.",
    href: "/work/pactis#failure",
    label: "Pactis case study",
  },
  {
    title: "Building reliable third-party integrations",
    summary:
      "Providers time out, retry, and arrive late. The integration has to know which of those happened.",
    href: "/work/blinky#failure",
    label: "Blinky case study",
  },
  {
    title: "Why Redis shouldn't automatically become your source of truth",
    summary:
      "A queue broker and a ledger solve different problems. Mixing them up is how balances drift.",
    href: "/work/pactis#decisions",
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
      "Software Engineer, Backend Engineer, Full-Stack Engineer, Product Engineer, and roles involving payments or financial infrastructure.",
  },
  {
    question: "Are you backend or full-stack?",
    answer:
      "Backend-focused, but comfortable across the stack. I have professional experience building React/TypeScript interfaces as well as Node.js/NestJS backend systems.",
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

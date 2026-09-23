export type Project = {
  slug: "pactis" | "blinky" | "webhook-reliability";
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  github: string;
  visual: "pactis" | "blinky" | "webhook";
};

export const projects: Project[] = [
  {
    slug: "pactis",
    title: "Pactis",
    subtitle: "Wallet backend",
    category: "Financial correctness",
    description:
      "A wallet backend focused on the hard parts of financial systems: transaction integrity, concurrency, authorization, idempotency, and failure recovery.",
    highlights: [
      "NestJS",
      "MySQL",
      "Redis",
      "BullMQ",
      "JWT",
      "Locking and concurrency",
      "Idempotency",
      "Ledger",
      "Retry and DLQ",
    ],
    stack: ["TypeScript", "NestJS", "MySQL", "Redis", "BullMQ", "Docker"],
    github: "https://github.com/eunicegigijacob/Pactis-wallet",
    visual: "pactis",
  },
  {
    slug: "blinky",
    title: "Blinky",
    subtitle: "Lightning payment wallet",
    category: "Payment integration",
    description:
      "A Lightning payment application exploring provider integrations, payment state management, webhook reliability, and asynchronous payment confirmation.",
    highlights: [
      "NestJS",
      "React",
      "MongoDB",
      "Lightning",
      "Blink",
      "Provider abstraction",
      "Webhook idempotency",
      "Payment states",
      "Polling",
    ],
    stack: ["TypeScript", "NestJS", "React", "MongoDB", "Lightning", "Blink"],
    github: "https://github.com/eunicegigijacob/Blinky-wallet-complete",
    visual: "blinky",
  },
  {
    slug: "webhook-reliability",
    title: "Webhook Reliability Service",
    subtitle: "Third-party delivery",
    category: "Integration reliability",
    description:
      "A webhook delivery service built around a problem I've run into professionally: external integrations fail, providers go down, requests time out, and teams need a way to see what happened and recover.",
    highlights: [
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "HMAC signing",
      "Retries",
      "Failure classification",
      "Delivery history",
      "DLQ",
      "Replay",
      "Tenant isolation",
    ],
    stack: ["TypeScript", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Docker"],
    github: "https://github.com/eunicegigijacob/Webhook-Reliability-Service",
    visual: "webhook",
  },
];

export function projectHref(slug: Project["slug"]) {
  return `/projects/${slug}`;
}

export type CaseSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: "pactis" | "blinky" | "webhook-reliability";
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  github: string;
  visual: "pactis" | "blinky" | "webhook";
  sections: CaseSection[];
  screenshots?: ProjectScreenshot[];
};

export const projects: Project[] = [
  {
    slug: "pactis",
    title: "Pactis",
    subtitle: "Wallet Backend",
    description:
      "A production-oriented wallet backend exploring financial correctness, transaction integrity, concurrency, idempotency, ownership, and reliable asynchronous processing.",
    highlights: [
      "Wallet transactions",
      "Ledger",
      "Idempotency",
      "Optimistic locking",
      "Pessimistic locking",
      "Authorization",
      "BullMQ",
      "Redis",
      "MySQL",
      "Retries",
      "DLQ",
    ],
    stack: ["TypeScript", "NestJS", "MySQL", "Redis", "BullMQ", "Docker"],
    github: "https://github.com/eunicegigijacob/Pactis-wallet",
    visual: "pactis",
    sections: [
      {
        id: "problem",
        heading: "What problem was I solving?",
        paragraphs: [
          "Moving money is not CRUD. Two withdrawals can race. A client can retry a transfer. A worker can crash after debiting one wallet and before the credit lands.",
          "Pactis is a small NestJS wallet API that treats those problems as the product: locking, a ledger, idempotency keys, retries, and a dead-letter queue.",
        ],
      },
      {
        id: "why",
        heading: "Why did I build it?",
        paragraphs: [
          "I wanted a codebase I could explain in an interview without hiding behind infrastructure I was not actually running. The interesting part is the correctness model, not a deployment story.",
        ],
      },
      {
        id: "role",
        heading: "What was my role?",
        paragraphs: [
          "I designed and built the service: the API, authentication and ownership checks, the ledger, the queue worker, and the tests.",
        ],
      },
      {
        id: "implementation",
        heading: "What did I implement?",
        paragraphs: [
          "Balances change only inside a MySQL transaction that also writes a ledger row. Deposits and withdrawals use optimistic version checks. Transfers take SELECT … FOR UPDATE on both wallets in UUID order so opposite-direction transfers cannot deadlock.",
        ],
        bullets: [
          "JWT access tokens and ownership checks before a wallet is read or mutated",
          "Idempotency through a unique transactionId index",
          "Async transfers enqueued on Bull with that same id as the job id",
          "Exponential backoff for infrastructure errors, and a dead-letter queue when attempts are exhausted",
          "Unit tests without Docker, and end-to-end tests for concurrency, ownership, retries, and the DLQ",
        ],
      },
      {
        id: "decisions",
        heading: "What engineering decisions mattered?",
        paragraphs: [
          "MySQL is the source of truth for users, balances, and the ledger. Redis is the Bull broker. Wallet reads use an in-process cache that is invalidated after commit. The project does not claim a Redis balance cache.",
          "Amounts are decimal(15, 2), not integer cents. A cents migration is written down as future work because it was more risk than value at this size. Login issues a JWT access token. There is no refresh-token flow.",
        ],
        bullets: [
          "One-row updates retry version conflicts. Two-row transfers lock, because a lost update there moves money incorrectly.",
          "The idempotency key is stamped before enqueue, so a retry replays the same transaction instead of creating a second one.",
          "A completed key with the same payload returns the original result. The same key with a different payload is a conflict.",
        ],
      },
      {
        id: "failure",
        heading: "What could fail?",
        paragraphs: [
          "A double withdrawal. A deadlock when two transfers cross. A worker crash before commit, or after commit but before the job is acknowledged. A client reusing an idempotency key with a different amount. A business error that should not be retried.",
        ],
      },
      {
        id: "handling",
        heading: "How did I handle failure?",
        paragraphs: [
          "A crash before commit rolls the database transaction back, and Bull retries the same transaction id. A crash after commit finds the completed ledger row and returns it without moving money again. Infrastructure errors retry with backoff. 4xx business errors are discarded and copied to the dead-letter queue.",
        ],
      },
      {
        id: "learned",
        heading: "What did I learn?",
        paragraphs: [
          "The unique index is the real idempotency lock. An application-level lookup is a hint. I also got stricter about saying what Redis is for: a queue, not a second ledger.",
        ],
      },
      {
        id: "production",
        heading: "What would I change for production?",
        paragraphs: [
          "The repository already lists the next steps, and they are not implemented: integer minor units, a Redis-backed cache only if the API runs as more than one process, operator tooling for dead-letter replay, and a stronger password policy. This is not a deployed production wallet.",
        ],
      },
      {
        id: "code",
        heading: "Where is the code?",
        paragraphs: [
          "The repository includes ARCHITECTURE.md, an architecture diagram, and the test layout. There is no public live demo.",
        ],
      },
    ],
  },
  {
    slug: "blinky",
    title: "Blinky",
    subtitle: "Lightning Payment Wallet",
    description:
      "A Lightning payment wallet exploring provider abstraction, payment state management, durable webhook idempotency, and asynchronous payment confirmation.",
    highlights: [
      "Lightning invoice creation",
      "Blink integration",
      "Provider abstraction",
      "Payment state machine",
      "Webhook processing",
      "Durable webhook idempotency",
      "Duplicate events",
      "Late events",
      "Polling",
      "React frontend",
    ],
    stack: ["TypeScript", "NestJS", "React", "MongoDB", "Lightning", "Blink"],
    github: "https://github.com/eunicegigijacob/Blinky-wallet-complete",
    visual: "blinky",
    screenshots: [
      {
        src: "/work/blinky/01-payment-interface.png",
        alt: "Blinky payment screen for creating a Lightning invoice",
        width: 1440,
        height: 900,
      },
      {
        src: "/work/blinky/03-waiting-for-payment.png",
        alt: "Blinky waiting for a Lightning payment to be confirmed",
        width: 1440,
        height: 900,
      },
      {
        src: "/work/blinky/04-payment-received.png",
        alt: "Blinky showing a Lightning payment as received",
        width: 1440,
        height: 900,
      },
    ],
    sections: [
      {
        id: "problem",
        heading: "What problem was I solving?",
        paragraphs: [
          "A Lightning invoice can be created immediately. The sats arrive later, if they arrive at all. The client, the API, the payment provider, the webhook, and the database have to agree on what state the payment is in.",
        ],
      },
      {
        id: "why",
        heading: "Why did I build it?",
        paragraphs: [
          "I wanted a focused example of provider integration: create a Lightning invoice with Blink, wait, process the webhook, and only then mark the payment paid. The repository is smaller than a full ledger on purpose.",
        ],
      },
      {
        id: "role",
        heading: "What was my role?",
        paragraphs: [
          "I built the NestJS API, the Blink provider integration, webhook processing, the payment state rules, and the React interface that polls until the payment reaches a terminal state.",
        ],
      },
      {
        id: "implementation",
        heading: "What did I implement?",
        paragraphs: [
          "Blink's GraphQL API sits behind a PaymentProvider interface. Tests and local Docker use a mock provider, so the app can run without Blink credentials. Live mode is a configuration switch, not a claim that this wallet runs production Lightning infrastructure.",
        ],
        bullets: [
          "Invoice creation and outgoing invoice payment through Blink",
          "Statuses limited to PENDING, PAID, FAILED, and EXPIRED",
          "Svix webhook processing with a unique (provider, eventId) index in MongoDB",
          "Frontend polling that stops on a terminal state",
          "Mapped provider failures: timeouts become 504, outages become 503",
        ],
      },
      {
        id: "decisions",
        heading: "What engineering decisions mattered?",
        paragraphs: [
          "The rest of the app does not know it is talking to Blink. That keeps the mock honest. Webhook uniqueness lives in the database, so a process restart does not replay side effects that an in-memory set would forget.",
          "The interface polls. It does not use WebSockets. Polling is enough for this settlement UX, and Blink already pushes the source of truth through webhooks. The project does not implement LNURL or Lightning Address.",
        ],
      },
      {
        id: "failure",
        heading: "What could fail?",
        paragraphs: [
          "Blink can deliver the same webhook many times. A late PENDING event can arrive after the payment is already PAID. The provider can time out or be unavailable. An invoice can expire locally.",
        ],
      },
      {
        id: "handling",
        heading: "How did I handle failure?",
        paragraphs: [
          "The same webhook delivered repeatedly processes the payment once. Terminal states do not move backwards, so a late pending event cannot un-pay a payment. Tests cover that duplicate case, the late event, provider errors, and the polling stop conditions. They use the mock provider and do not need Blink credentials.",
        ],
      },
      {
        id: "learned",
        heading: "What did I learn?",
        paragraphs: [
          "A four-status model was enough. A generic state machine would have hidden the rule that actually matters: paid stays paid.",
        ],
      },
      {
        id: "production",
        heading: "What would I change for production?",
        paragraphs: [
          "The README already names the follow-ups: register the webhook URL from the app instead of the dashboard, reconcile invoices that expire locally but settle on Lightning afterwards, and add authentication if this were ever more than a demo wallet. None of that is a live production Lightning deployment.",
        ],
      },
      {
        id: "code",
        heading: "Where is the code?",
        paragraphs: [
          "The repository includes architecture notes, failure scenarios, and the interface screenshots shown on this page. There is no public live demo.",
        ],
      },
    ],
  },
  {
    slug: "webhook-reliability",
    title: "Webhook Reliability Service",
    subtitle: "Reliable third-party integration delivery",
    description:
      "A focused reliability service for teams that depend on third-party webhooks and need visibility into delivery, failure, retries, and replay.",
    highlights: [
      "PostgreSQL source of truth",
      "Redis/BullMQ workers",
      "Retry policies",
      "Exponential backoff",
      "HMAC signing",
      "Failure classification",
      "Delivery attempts",
      "DLQ",
      "Replay",
      "Tenant isolation",
      "Concurrency-safe claiming",
      "Timeout handling",
    ],
    stack: ["TypeScript", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Docker"],
    github: "https://github.com/eunicegigijacob/Webhook-Reliability-Service",
    visual: "webhook",
    sections: [
      {
        id: "problem",
        heading: "What problem was I solving?",
        paragraphs: [
          "I came to this from working with third-party providers. A webhook can arrive while a service is down, time out, arrive twice, fail for a temporary network problem, fail permanently, or be missed entirely.",
          "The question teams actually have is not “can we receive a webhook?” It is “what happened to this webhook?” and “can we safely retry it?”",
        ],
      },
      {
        id: "why",
        heading: "Why did I build it?",
        paragraphs: [
          "I wanted a smaller representation of the infrastructure that answers those questions: durable history, asynchronous delivery, classified failures, retries, a dead-letter state, and replay. It is intentionally not a full production webhook platform.",
        ],
      },
      {
        id: "role",
        heading: "What was my role?",
        paragraphs: [
          "I designed and implemented the API, the worker, the delivery history, tenant scoping, and the tests.",
        ],
      },
      {
        id: "implementation",
        heading: "What did I implement?",
        paragraphs: [
          "PostgreSQL stores events, endpoints, deliveries, and every attempt. Redis and BullMQ schedule the work. The worker claims a delivery, signs the request, posts it, and classifies the response. A mock consumer makes success, failure, and timeout easy to exercise locally.",
        ],
        bullets: [
          "Stable X-Webhook-ID across retries, recovery, and replay",
          "HMAC-SHA256 signatures with a timestamp",
          "Transient failures retry; most 4xx responses fail permanently",
          "Failed deliveries stay in PostgreSQL as FAILED, so they can be inspected and replayed",
          "API-key authentication and tenant-scoped resources",
          "Atomic UPDATE … RETURNING so two workers cannot claim the same delivery",
        ],
      },
      {
        id: "decisions",
        heading: "What engineering decisions mattered?",
        paragraphs: [
          "The service uses at-least-once delivery and does not claim exactly-once HTTP. A worker can send a webhook and crash before recording the response. The next attempt sends the same event id, and the receiver is expected to treat that id as an idempotency key.",
          "Replay appends another attempt to the existing event. It does not invent a new event. Redis is the execution queue. PostgreSQL remains the record of what happened, including when Redis is unavailable.",
        ],
      },
      {
        id: "failure",
        heading: "What could fail?",
        paragraphs: [
          "The receiver can return 503, time out, or return 400. Two workers can try to process the same job. A destination URL can point somewhere it should not. A signing secret can leak if it is treated casually. A queue job can be lost.",
        ],
      },
      {
        id: "handling",
        heading: "How did I handle failure?",
        paragraphs: [
          "Timeouts, 408, 429, 5xx, and connection failures are transient and follow a configurable backoff. Other 4xx responses, and redirects, are permanent and do not burn the retry budget. Every attempt stores status, response, duration, and error.",
          "Outbound URLs are checked against common SSRF targets. The README is explicit that this is not a complete enterprise SSRF defense. Private destinations are enabled only for local Docker and tests so the mock consumer can run.",
        ],
      },
      {
        id: "learned",
        heading: "What did I learn?",
        paragraphs: [
          "An event and a delivery attempt are different objects. Once that split is in the model, retries and replay stop destroying the history you need at 2am.",
        ],
      },
      {
        id: "production",
        heading: "What would I change for production?",
        paragraphs: [
          "The repository already lists the limits: no multi-region deployment, no Kafka, no Kubernetes, no throughput benchmark, no production migration system, API and worker in the same application, queue recovery by a periodic reconciler rather than a dedicated outbox, and signing secrets stored in plaintext in PostgreSQL after creation. Those are the production gaps. I am not claiming they have been closed.",
        ],
      },
      {
        id: "code",
        heading: "Where is the code?",
        paragraphs: [
          "The repository includes architecture notes, failure scenarios, and a webhook verification guide for consumers. There is no public live demo.",
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Unknown project: ${slug}`);
  }
  return project;
}

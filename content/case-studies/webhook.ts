import type { CaseStudy } from "@/content/case-studies/types";

export const webhookCaseStudy: CaseStudy = {
  slug: "webhook-reliability",
  title: "Webhook Reliability Service",
  lede: "A small delivery layer for the question I actually had during outages: what happened to this webhook?",
  category: "Integration reliability",
  tags: ["TypeScript", "NestJS", "PostgreSQL", "Redis", "BullMQ", "HMAC"],
  github: "https://github.com/eunicegigijacob/Webhook-Reliability-Service",
  hero: {
    src: "/work/webhook-reliability/overview.png",
    alt: "Webhook Reliability Service overview: incoming events go through the service into PostgreSQL and Redis, with delivery status, retries, and replay as the operational surface",
    width: 600,
    height: 782,
  },
  heroCompact: true,
  why: [
    "While working with third-party integrations, I kept hitting the same operational problem. A provider would send an event while a service was down, a request would time out, or the same event would arrive twice. Debugging meant piecing together logs and whatever the provider's dashboard remembered.",
    "I wanted to explore what a dedicated reliability layer would look like: a place that could answer what happened, how many times we tried, why it failed, and whether we could safely try again. This repository is a smaller version of that idea. It is not a complete production webhook platform, and it is not a copy of any system I have operated.",
  ],
  context: {
    exploring:
      "The question I cared about was not “can we receive a webhook?” It was “when something fails at the worst time, can we see the attempt history instead of reconstructing it?” I was looking for a record that survives the worker restarting and the queue being unavailable.",
    built: "I built a NestJS API that stores events, endpoints, deliveries, and every attempt in PostgreSQL, then hands the actual HTTP call to a BullMQ worker. Redis schedules the work. PostgreSQL remembers it. A mock consumer in Docker makes success, 400, 500, and timeout reproducible without a real provider.",
  },
  problem: {
    lead: "Once a product depends on outside providers, webhook failure stops being an edge case. It becomes how you find out that a payment, a verification, or a subscription event never landed.",
    points: [
      {
        title: "Did anyone send it?",
        body: "A missing side effect can mean the provider never called, our service was down, or we received it and then failed.",
      },
      {
        title: "Did we try, and how many times?",
        body: "A timeout after the receiver already did the work is different from a 400, and both are different from a 503 that cleared a minute later.",
      },
      {
        title: "Can we try again without inventing a new event?",
        body: "Replay has to keep the original event id. A new id would look like a new fact to every consumer that deduplicates on it.",
      },
      {
        title: "Two workers, one delivery",
        body: "A stalled job and a reconciler can both try to send the same delivery. Only one of them should claim it.",
      },
    ],
  },
  approach: {
    paragraphs: [
      "An event is what happened. A delivery attempt is one try at telling someone. I split those on purpose. Creating an event writes the row and a PENDING delivery first. The worker claims the delivery, signs the body, POSTs it, and classifies the response. The overview above is that path: events in, PostgreSQL as the record, Redis for the queue, and inspectable delivery status afterward.",
      "The service uses at-least-once delivery. I do not claim exactly-once HTTP. A worker can send the webhook and crash before it records the response. The next attempt sends the same X-Webhook-ID, and the receiver is expected to treat that id as an idempotency key.",
    ],
    flow: [
      {
        title: "Persist",
        body: "POST /events writes the event and a PENDING delivery before the outbound call.",
      },
      {
        title: "Queue",
        body: "BullMQ schedules the job. If Redis is down, the row remains and a reconciler retries enqueue later.",
      },
      {
        title: "Attempt",
        body: "The worker claims the row, signs timestamp + '.' + raw body, and POSTs with an 8 second timeout.",
      },
      {
        title: "Classify",
        body: "2xx is DELIVERED. Timeouts, 408, 429, and 5xx retry. Most 4xx responses and redirects become FAILED.",
      },
    ],
  },
  operations: {
    heading: "From “something failed” to “I know what happened”",
    lead: "The goal is not only to deliver the webhook. It is to make the failure inspectable. This project does not ship a separate operations UI. The visibility is the event, delivery, and attempt history the API stores and returns.",
    steps: [
      "Provider",
      "Event recorded",
      "Delivery attempt",
      "200, retry, timeout, or failure",
      "Visible status",
      "Replay if it failed",
    ],
    questions: [
      "What happened?",
      "When did it happen?",
      "How many times did we try?",
      "Why did it fail?",
      "Is it retrying?",
      "Did it eventually succeed?",
      "Can we replay it?",
    ],
  },
  decisions: [
    {
      problem: "If the queue is the only record, a Redis outage deletes your memory of the webhook.",
      decision: "PostgreSQL is the source of truth. Redis and BullMQ only execute and schedule.",
      why: "POST /events still persists the event when enqueue fails. A reconciler, every 30 seconds by default, re-enqueues due PENDING and RETRYING deliveries, and stale PROCESSING rows, once Redis is back. There is no separate outbox table. I would want one in a larger system. I did not pretend this reconciler is that.",
    },
    {
      id: "handling",
      problem: "HTTP cannot promise that a request was sent once.",
      decision: "At-least-once delivery, with a stable X-Webhook-ID on every attempt, retry, recovery, and replay.",
      why: "Pretending the service is exactly-once would be false. The honest contract is that duplicates can happen, and the event id is how a consumer ignores them.",
    },
    {
      problem: "Retrying by creating a new event destroys the history you need later.",
      decision: "Replay appends another attempt to the same event. It is allowed only from FAILED, and it returns 409 otherwise.",
      why: "The event id does not change. Attempt rows stay. attemptCount is kept so the retry budget starts over without erasing the earlier failures.",
    },
    {
      problem: "Not every failure should burn the retry budget.",
      decision: "Transient and permanent failures are classified in one place, failure-classifier.ts.",
      why: "408, 429, 5xx, connection errors, and timeouts retry on a schedule: immediate, 10s, 30s, 2m, 10m. Other 4xx responses, and 3xx redirects, fail immediately. Redirects are not followed.",
    },
    {
      problem: "A user-supplied URL is a way to make the server call something it should not.",
      decision: "Outbound URLs are checked before delivery, and redirects are disabled.",
      why: "The service blocks loopback, private, and link-local targets, and unsupported schemes, and it checks DNS before sending. The README is explicit that this is defense against common SSRF targets, not a complete enterprise SSRF solution. Private destinations are enabled only for local Docker and tests so the mock consumer can run.",
    },
  ],
  failures: [
    {
      title: "Consumer returns 503",
      body: "The attempt is stored, the delivery becomes RETRYING, and a delayed job is enqueued. The repository's sequence fixture is 503, then timeout, then 200.",
    },
    {
      title: "Consumer times out",
      body: "Each outbound request uses AbortController and WEBHOOK_TIMEOUT_MS, default 8 seconds. A hung consumer cannot hold the worker. The attempt records request timed out.",
    },
    {
      title: "Consumer returns 400",
      body: "That is permanent. The delivery is FAILED after one attempt. No backoff. Replay is allowed after the receiver is fixed.",
    },
    {
      title: "Retries run out",
      body: "When a transient failure hits WEBHOOK_MAX_ATTEMPTS, status becomes FAILED. That row is the dead-letter record. The attempts stay readable.",
    },
    {
      title: "Worker crashes",
      body: "A crash before claim leaves the delivery PENDING or RETRYING. A crash during HTTP leaves PROCESSING until the row is stale, then another worker can reclaim it. A crash after a successful send but before the database write can send a duplicate. The event id stays the same. A crash after DELIVERED is a no-op.",
    },
    {
      title: "Two workers, one job",
      body: "Claim is an atomic UPDATE … RETURNING from PENDING or RETRYING into PROCESSING. The loser sees a row it cannot claim and exits. The concurrency test runs ten workers against one delivery.",
    },
    {
      title: "Redis is down",
      body: "The event and PENDING delivery still commit. Health reports redis down and returns 503. The reconciler picks the row up later. GET still works for records that were already stored.",
    },
    {
      title: "Replay",
      body: "POST /deliveries/:id/replay is 404 for another tenant's delivery, 409 unless status is FAILED, then moves it back to PENDING and enqueues a new job. History is kept.",
    },
  ],
  built: [
    {
      category: "Backend",
      items: [
        "Tenant, endpoint, event, and delivery APIs",
        "Worker that claims, signs, posts, and classifies",
        "Periodic reconciler for lost queue jobs",
      ],
    },
    {
      category: "Database",
      items: [
        "PostgreSQL events, endpoints, deliveries, and attempt rows",
        "Delivery state separate from attempt history",
      ],
    },
    {
      category: "Infrastructure",
      items: [
        "Redis and BullMQ for scheduling",
        "Docker Compose with Postgres, Redis, the API, and a mock consumer",
        "Mock routes for success, 400, 500, timeout, and a 503 → timeout → 200 sequence",
      ],
    },
    {
      category: "Security",
      items: [
        "API keys, stored hashed, returned once",
        "Tenant-scoped reads and replay",
        "HMAC-SHA256 signatures and timestamp tolerance",
        "URL checks for common SSRF targets",
      ],
    },
    {
      category: "Testing",
      items: [
        "Unit tests for signatures, classification, backoff, state transitions, and URL validation",
        "End-to-end tests for delivery, isolation, replay, and health",
        "A ten-worker claim test",
      ],
    },
  ],
  demonstrates: [
    {
      title: "Operational thinking",
      body: "I designed the model around the questions an on-call engineer asks, not around a single successful POST.",
    },
    {
      title: "Reliability boundaries",
      body: "I separated the durable record from the queue, and I stated the delivery guarantee as at-least-once instead of upgrading it in the README.",
    },
    {
      title: "Third-party integrations",
      body: "Timeouts, duplicate callbacks, permanent client errors, and replay are treated as normal inputs.",
    },
    {
      title: "Security basics",
      body: "Signing, tenant isolation, and outbound URL checks are part of the delivery path, with the SSRF limits written down.",
    },
  ],
  scopeTitle: "What I intentionally didn't build",
  scopeLead:
    "This is a focused representation of an operational problem. I left out the parts that would make it look like a platform without making the failure story any clearer.",
  notBuilt: [
    "A visual operations dashboard. Inspection is through the API and the stored attempt history.",
    "Exactly-once delivery",
    "Multi-region deployment, Kafka, or Kubernetes",
    "A dedicated outbox service. Lost jobs are recovered by the periodic reconciler.",
    "A complete enterprise SSRF defense",
    "Production database migrations. Schema sync is off when NODE_ENV is production, and migrations are not implemented.",
    "Encrypted signing secrets. They are stored in plaintext in PostgreSQL and are not returned after create.",
  ],
  result: {
    paragraphs: [
      "There is no UI screenshot because the repository does not have a frontend. The repository documents this attempt history, which is the behavior the mock sequence endpoint is there to exercise.",
    ],
    images: [],
    sequence: [
      {
        label: "Recorded",
        title: "The event exists before anyone is called",
        body: "The API writes the event and a PENDING delivery, then tries to enqueue. The caller is not waiting on the receiver's HTTP response.",
      },
      {
        label: "503",
        title: "The first attempt is a transient failure",
        body: "Attempt 1 stores 503 Service Unavailable. The delivery moves to RETRYING and a job is scheduled 10 seconds later.",
      },
      {
        label: "Timeout",
        title: "The second attempt does not hang the worker",
        body: "Attempt 2 hits the timeout path, records the error, and schedules the next try. The default third delay is 30 seconds.",
      },
      {
        label: "Delivered",
        title: "The third attempt succeeds, and the id never changed",
        body: "Attempt 3 returns 200 and the delivery is DELIVERED. X-Webhook-ID is still the original event id. A consumer that deduplicates on it can ignore the earlier tries.",
      },
    ],
    code: {
      label: "Documented attempt history, from docs/demo-output.txt",
      content: `Event created
  ↓
Attempt #1 → 503
  ↓
Retry (10s)
  ↓
Attempt #2 → timeout
  ↓
Retry (30s)
  ↓
Attempt #3 → 200
  ↓
DELIVERED

X-Webhook-ID remains evt_… on every attempt.`,
    },
  },
  technical: {
    stack: [
      "TypeScript and NestJS",
      "PostgreSQL for durable state",
      "Redis and BullMQ for job execution",
      "Docker Compose for the local stack and mock consumer",
    ],
    architecture: [
      "API and worker currently run in the same application.",
      "States: PENDING, PROCESSING, DELIVERED, RETRYING, FAILED. Invalid transitions are rejected.",
      "Swagger is at /api/v1 when the API is running locally.",
    ],
    api: [
      "POST /tenants, the API key returned once; GET /tenants/me",
      "POST and GET /endpoints",
      "POST /events and GET /events/:eventId",
      "GET /deliveries/:deliveryId and POST /deliveries/:deliveryId/replay",
      "GET /health",
      "Authentication header: X-API-Key",
    ],
    dataModel: [
      "tenants → webhook_endpoints and webhook_events",
      "webhook_events → webhook_deliveries → webhook_delivery_attempts",
      "Each attempt stores status, response, duration, and error.",
    ],
    reliability: [
      "Default retry spacing: immediate, 10s, 30s, 2m, 10m. Delays and max attempts are configurable.",
      "Default outbound timeout is 8 seconds.",
      "Event payload cap defaults to 32kb. The JSON parser caps bodies at 64kb.",
      "Reconciler interval defaults to 30 seconds.",
    ],
    security: [
      "HMAC-SHA256 over timestamp + '.' + raw body, sent as X-Webhook-Signature.",
      "Consumers should verify the raw body and a timestamp tolerance. The verification guide uses 300 seconds.",
      "Endpoint secrets are returned only on create.",
      "Rate limiting and body size limits are enabled.",
      "SSRF checks are not described as a complete enterprise control.",
    ],
    testing: [
      "Unit specs for signature, failure classifier, retry policy, delivery status, URL validator, payload limits, and API keys.",
      "E2E: delivery, isolation, health, scenarios, and concurrency.",
      "The README at the time of this case study recorded 35 unit tests and 16 end-to-end tests passing. I am not treating that count as a permanent metric.",
    ],
    docs: [
      {
        label: "Architecture",
        href: "https://github.com/eunicegigijacob/Webhook-Reliability-Service/blob/main/docs/architecture.md",
      },
      {
        label: "Failure scenarios",
        href: "https://github.com/eunicegigijacob/Webhook-Reliability-Service/blob/main/docs/failure-scenarios.md",
      },
      {
        label: "Webhook verification guide",
        href: "https://github.com/eunicegigijacob/Webhook-Reliability-Service/blob/main/docs/webhook-verification.md",
      },
    ],
  },
};

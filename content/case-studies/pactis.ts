import type { CaseStudy } from "@/content/case-studies/types";

export const pactisCaseStudy: CaseStudy = {
  slug: "pactis",
  title: "Pactis",
  lede: "A small wallet API for what happens when money can move more than once.",
  category: "Financial correctness",
  tags: ["TypeScript", "NestJS", "MySQL", "Redis", "Bull", "JWT"],
  github: "https://github.com/eunicegigijacob/Pactis-wallet",
  hero: {
    src: "/work/pactis/overview.png",
    alt: "Pactis overview: a client talks to a NestJS API, which writes MySQL and uses Redis, with Bull handling background jobs and retries",
    width: 600,
    height: 785,
  },
  heroCompact: true,
  why: [
    "I built Pactis because I wanted a place to work through the problems that show up once money can move more than once. In financial systems, the hard part is rarely the happy-path endpoint. It is the second request, the request that arrives while the first one is still open, and the worker that dies after one side of a transfer has changed.",
    "This is a portfolio project: a smaller version of those problems, small enough to explain. It is not a deployed wallet.",
  ],
  context: {
    exploring:
      "I wanted to explore how a wallet stays correct when clients retry, when two operations hit the same balance, and when async work fails halfway. The question was not “can I store a balance?” It was “what has to be true before I am willing to say the money moved?”",
    built: "I built a NestJS API with a MySQL ledger, JWT ownership checks, and a Bull worker for transfers that should not block the request. Redis is the queue broker. It is not where balances live.",
  },
  problem: {
    lead: "Moving money is not CRUD. A balance column and an update statement fall apart as soon as the same action happens twice, or two actions happen together.",
    points: [
      {
        title: "The same request comes back",
        body: "A client times out and retries a transfer. If the first one already landed, the second one must not move the money again.",
      },
      {
        title: "Two operations overlap",
        body: "Two withdrawals can read the same balance. Two transfers in opposite directions can deadlock if they lock wallets in opposite orders.",
      },
      {
        title: "The worker stops in the middle",
        body: "An async transfer can crash before the database commits, or after it commits but before the job is acknowledged.",
      },
      {
        title: "Not everyone may touch the wallet",
        body: "A valid token is not enough. The caller has to own the wallet they are reading or debiting.",
      },
    ],
  },
  approach: {
    paragraphs: [
      "I kept the model small. MySQL holds users, wallets, and the ledger, and a balance change is written in the same database transaction as its ledger row. Deposit and withdraw touch one row, so they use an optimistic version check and retry conflicts. A transfer touches two rows, so it locks both with SELECT … FOR UPDATE, in UUID order, so A paying B cannot deadlock with B paying A.",
      "The overview above is the shape of the service: a client talks to the API, MySQL holds the ledger, Redis sits next to the queue, and Bull runs the background work. The API authenticates the caller, checks ownership, then either completes the transfer in the request or enqueues it. The worker runs the same transfer function. The dead-letter queue is for jobs that should not be retried, or that have already been retried enough.",
    ],
    flow: [
      {
        title: "Auth",
        body: "Register and login. Login returns a JWT access token. Wallet routes take the user from that token.",
      },
      {
        title: "Ledger",
        body: "The balance update and the ledger insert share one MySQL transaction. A throw rolls both back.",
      },
      {
        title: "Sync or async",
        body: "POST /transactions/transfer finishes in the request. transfer-async returns 202 and uses the transaction id as the Bull job id.",
      },
      {
        title: "Retry or stop",
        body: "Infrastructure errors retry. A 4xx business error is discarded and copied to transactions-dlq.",
      },
    ],
  },
  decisions: [
    {
      problem: "A queue is a convenient place to put balances. It is the wrong place.",
      decision: "MySQL is the source of truth. Redis is only the Bull broker.",
      why: "Jobs are commands. The ledger is the record of what happened. If Redis disappeared, the balances would still be in MySQL. I did not want a second ledger hiding in a cache.",
    },
    {
      problem: "One lock strategy for every write either holds locks too long or loses updates.",
      decision: "Optimistic versions for deposit and withdraw. Pessimistic locks for transfers.",
      why: "A one-row update can afford to retry a version mismatch. A two-row transfer cannot afford a lost update, because that is money moving incorrectly. Opposite-direction transfers lock wallet UUIDs in sorted order so they cannot deadlock.",
    },
    {
      problem: "A retried job can mint a second transfer if its idempotency key is created inside the worker.",
      decision: "The transaction id is stamped before enqueue, stored under a unique index, and reused as the Bull job id.",
      why: "The unique index is the real lock. An in-memory lookup dies with the process. A completed key with the same payload returns the original result. The same key with a different payload is a 409. A failed key cannot be reused.",
    },
    {
      problem: "A shared cache looks like the obvious next step, and it would have been a lie at this size.",
      decision: "Wallet reads use an in-process cache that is invalidated after commit. Transfers invalidate both wallets.",
      why: "Redis was already the queue. Claiming a Redis balance cache the code does not have would make the project sound larger than it is. A process restart drops the in-memory cache, and MySQL is read again. That is acceptable for one API process.",
    },
    {
      problem: "Integer cents are the safer money type, and migrating to them was not free.",
      decision: "Amounts stay decimal(15, 2), with rounding at cent boundaries.",
      why: "Changing every entity, DTO, ledger row, and test was more risk than value for a project this size. Integer minor units are written down as future work. I am not claiming the decimal model is how I would store money in a high-throughput system.",
    },
  ],
  failures: [
    {
      title: "Double withdrawal",
      body: "Deposit and withdraw retry optimistic version conflicts, then re-check the new balance. A second overdraft fails the business check. The retry loop does not retry business errors.",
    },
    {
      title: "Crossing transfers",
      body: "Both wallets are locked in UUID order. A transfer from A to B can run at the same time as B to A without deadlocking on opposite lock order.",
    },
    {
      title: "Crash before commit",
      body: "InnoDB rolls the transaction back. No ledger row, no balance change. Bull retries the same transaction id.",
    },
    {
      title: "Crash after commit",
      body: "The retry finds the COMPLETED ledger row and returns it. The money is not moved again.",
    },
    {
      title: "Same key, different payload",
      body: "A completed idempotency key reused with a different wallet or amount is 409. A failed key returns 400 and must be replaced with a new id.",
    },
    {
      title: "Business failure vs outage",
      body: "Infrastructure errors get three attempts, backing off at 2s, 4s, and 8s, then the job goes to transactions-dlq. A 4xx is discarded and is not retried.",
    },
    {
      title: "Someone else's wallet",
      body: "Ownership is checked before a wallet is read or mutated. A missing wallet is 404. A wallet that belongs to another user is 403. The source of a transfer must be owned. The destination can belong to someone else.",
    },
  ],
  built: [
    {
      category: "Backend",
      items: [
        "Auth, wallet, and transaction modules",
        "Sync transfer and async transfer on one code path",
        "Dead-letter copy for exhausted or discarded jobs",
      ],
    },
    {
      category: "Database",
      items: [
        "MySQL users, wallets, and ledger rows",
        "Unique transactionId index",
        "decimal(15, 2) amounts",
      ],
    },
    {
      category: "Infrastructure",
      items: [
        "Redis as the Bull broker",
        "Docker Compose for MySQL 8 and Redis 7",
        "In-process cache-aside, invalidated after commit",
      ],
    },
    {
      category: "Security",
      items: [
        "bcrypt password hashes, never returned",
        "JWT access tokens, no refresh-token flow",
        "Rate limits on login and money movement",
      ],
    },
    {
      category: "Testing",
      items: [
        "Unit tests that do not need Docker",
        "End-to-end tests for auth, concurrency, idempotency, cache, and the queue",
        "End-to-end tests fail if MySQL or Redis is down",
      ],
    },
  ],
  demonstrates: [
    {
      title: "Correctness before features",
      body: "The API surface is ordinary. The work is in locking, the ledger boundary, and what a retry is allowed to do.",
    },
    {
      title: "Concurrency",
      body: "I separated one-row updates from two-row transfers instead of using one locking story for both.",
    },
    {
      title: "Authorization",
      body: "Identity and ownership are different checks. A logged-in user still cannot read someone else's balance.",
    },
    {
      title: "Failure handling",
      body: "Crashes, business errors, and infrastructure errors take different paths, and the tests cover those paths.",
    },
  ],
  scopeTitle: "What I intentionally didn't build",
  scopeLead:
    "I kept the scope small so the correctness problem stayed visible. A longer list of features would have made it easier to hide the parts that actually matter.",
  notBuilt: [
    "A deployed or customer-facing wallet",
    "Integer minor units, which the repository lists as future work",
    "A Redis-backed cache for more than one API process",
    "Operator tooling that replays the dead-letter queue",
    "Refresh tokens, Kafka, or Kubernetes",
  ],
  result: {
    paragraphs: [
      "There is no public UI and no live deployment. What I can show is the path a transfer takes, and the API the repository actually exposes.",
    ],
    images: [],
    sequence: [
      {
        label: "Request",
        title: "A transfer arrives with a token and a transaction id",
        body: "The API checks the JWT, then checks that the caller owns the source wallet. The transaction id is the idempotency key. If the client omits it, the API generates one before any enqueue.",
      },
      {
        label: "Processing",
        title: "Both wallets lock, then the ledger and the balances commit together",
        body: "A synchronous transfer locks the wallets in UUID order, writes a PENDING ledger row, debits and credits, and marks the row COMPLETED. An async transfer returns 202. The worker calls the same function with the same id.",
      },
      {
        label: "Failure",
        title: "A crash and a business error are not the same event",
        body: "A crash before commit rolls back and Bull retries. A crash after commit becomes a no-op replay. A 4xx is discarded into transactions-dlq instead of being retried into a second charge.",
      },
      {
        label: "Final state",
        title: "The ledger row is the answer",
        body: "A completed key returns the original result. A failed key stays failed until the client sends a new transaction id. GET get-failed-transactions lists the caller's failed ledger rows.",
      },
    ],
    code: {
      label: "Async transfer, from the repository README",
      content: `POST /api/v1/transactions/transfer-async
Authorization: Bearer <accessToken>

{
  "fromWalletId": "...",
  "toWalletId": "...",
  "amount": 100.00,
  "transactionId": "optional-key"
}

202 Accepted`,
    },
  },
  technical: {
    stack: [
      "TypeScript, NestJS 10, TypeORM, MySQL 8",
      "Redis and Bull for the queue",
      "JWT via passport-jwt, bcrypt for passwords",
      "Jest unit tests and Supertest end-to-end tests",
      "Docker Compose for local MySQL and Redis",
    ],
    architecture: [
      "Global prefix /api/v1. Swagger UI is served at that prefix when the API is running locally.",
      "Cache-aside keys are invalidated only after commit.",
      "JWT lifetime comes from JWT_EXPIRES_IN, default 24h. There is no refresh token.",
    ],
    api: [
      "POST /auth/register and /auth/login",
      "POST /wallets/create-wallet, deposit, withdraw; GET balance and wallet",
      "POST /transactions/transfer and /transactions/transfer-async",
      "GET transaction history, one transaction, and failed transactions",
      "GET /health",
    ],
    dataModel: [
      "Users store a lowercased email and a bcrypt hash that is not selected by default.",
      "Wallets have a version column used for optimistic locking.",
      "Ledger rows move through PENDING, COMPLETED, and FAILED inside the same transaction as the balance change.",
    ],
    reliability: [
      "At-least-once queue delivery, made safe by the transaction id.",
      "Three attempts for infrastructure errors: 2s, 4s, 8s.",
      "4xx business errors are discarded, not retried.",
    ],
    security: [
      "Ownership checks return 403. Missing wallets return 404.",
      "Login is rate-limited to 5 requests / 60s. Register is 10 / 60s.",
      "Unknown failures become a generic 500. SQL and stack traces stay in logs.",
      "DTO validation uses whitelist and forbidNonWhitelisted.",
    ],
    testing: [
      "Unit: auth, wallet deposit/withdraw/cache, transfer, the queue processor, money rounding.",
      "E2E: auth.e2e-spec, concurrency.e2e-spec, queue.e2e-spec.",
      "Covered scenarios include insufficient funds, forced rollback, opposite-direction transfers, duplicate keys, and DLQ discard.",
    ],
    docs: [
      {
        label: "ARCHITECTURE.md",
        href: "https://github.com/eunicegigijacob/Pactis-wallet/blob/main/ARCHITECTURE.md",
      },
      {
        label: "README",
        href: "https://github.com/eunicegigijacob/Pactis-wallet/blob/main/README.md",
      },
    ],
  },
};

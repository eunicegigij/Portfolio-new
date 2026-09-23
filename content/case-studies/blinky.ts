import type { CaseStudy } from "@/content/case-studies/types";

export const blinkyCaseStudy: CaseStudy = {
  slug: "blinky",
  title: "Blinky",
  lede: "A Lightning walkthrough I built so a workshop could see the path from an ordinary app to a paid invoice.",
  category: "Payment integration",
  tags: ["TypeScript", "NestJS", "React", "MongoDB", "Blink", "Lightning"],
  github: "https://github.com/eunicegigijacob/Blinky-wallet-complete",
  hero: {
    src: "/work/blinky/03-waiting-for-payment.png",
    alt: "Blinky waiting for a Lightning payment",
    width: 1440,
    height: 900,
  },
  why: [
    "I built Blinky during Hack4Freedom Lagos, where I was participating as a mentor. I did not want another slide that described Lightning from the outside. I wanted a small app I could walk through with participants: create an invoice, show it, wait, and only mark it paid when the provider says it is paid.",
    "Blink is the Lightning provider. The app talks to Blink's API. It does not run Lightning infrastructure of its own. That was the point. People could see a practical path without having to understand a full node stack first.",
  ],
  context: {
    exploring:
      "The thing I wanted to teach was the gap between “invoice created” and “money received.” Those are different moments. A workshop demo that returned success on invoice creation would have taught the wrong lesson.",
    built: "I built a React interface and a NestJS API. The API hides Blink behind a provider interface, stores payment state in MongoDB, and accepts Blink webhooks through Svix. The screen polls until the payment reaches a terminal state. With no Blink API key, the same app runs on a mock provider so the room can still follow the flow.",
  },
  problem: {
    lead: "A Lightning invoice can be created immediately. The sats arrive later, if they arrive at all. Until then, the client, the API, the provider, and the database can all disagree.",
    points: [
      {
        title: "Created is not paid",
        body: "The invoice exists as soon as Blink returns it. The payment is still PENDING. Showing success there would be wrong.",
      },
      {
        title: "The provider will call more than once",
        body: "Blink can deliver the same webhook many times. A second delivery must not apply the payment twice.",
      },
      {
        title: "Events arrive late",
        body: "A pending event can show up after the payment is already PAID. An invoice can also expire locally and then settle on Lightning.",
      },
      {
        title: "The provider can be down",
        body: "Creating or paying an invoice can time out or fail. The API has to say which of those happened, without leaking GraphQL internals.",
      },
    ],
  },
  approach: {
    paragraphs: [
      "The UI never talks to Blink. It talks to the API: create an invoice, pay one, or read status. PaymentService owns the MongoDB record. PaymentProvider is injected, and the implementation is either BlinkProvider or MockPaymentProvider. Controllers do not call Blink themselves.",
      "Confirmation is asynchronous. Blink pushes receive.lightning and send.lightning webhooks. The processor verifies the Svix signature when a webhook secret is configured, stores the event, and applies a status transition. The invoice page polls GET /invoices/:id every 3 seconds. There is no WebSocket. There is also no architecture image in the repository, so the flow below is the one the docs describe.",
    ],
    flow: [
      {
        title: "Create",
        body: "POST /invoices asks the provider for a Lightning invoice and stores it as PENDING.",
      },
      {
        title: "Show",
        body: "The invoice page renders the payment request as a QR code and starts polling.",
      },
      {
        title: "Webhook",
        body: "Blink notifies the API. The event is stored with a unique provider and event id.",
      },
      {
        title: "Settle",
        body: "Only PENDING can move to PAID, FAILED, or EXPIRED. The poll stops on those states.",
      },
    ],
  },
  decisions: [
    {
      problem: "A workshop cannot depend on every laptop having live Blink credentials.",
      decision: "Blink sits behind PaymentProvider. MockPaymentProvider is used when PAYMENT_PROVIDER=mock or the API key is empty, and in tests.",
      why: "The rest of the app does not know which one it is calling. The mock can demonstrate the state machine without pretending the demo is on mainnet.",
    },
    {
      problem: "Remembering webhook ids in memory forgets them on restart, and then side effects run again.",
      decision: "Webhook uniqueness is a MongoDB index on (provider, eventId).",
      why: "The first insert wins. Later deliveries are acknowledged as duplicates and do not change the payment. A process restart does not wipe that memory.",
    },
    {
      problem: "A generic state machine would have hidden the only rule that matters.",
      decision: "Four statuses: PENDING, PAID, FAILED, EXPIRED. Terminal states do not move backwards.",
      why: "A late pending event cannot un-pay a payment. A second PAID does not overwrite paidAt. That rule is small enough to test directly.",
    },
    {
      problem: "WebSockets would have looked more live and taught a second problem.",
      decision: "The interface polls. It stops on a terminal status, on unmount, or after 16 minutes.",
      why: "Blink is already pushing the source of truth through webhooks. Polling is enough for this settlement screen, and it is honest about what the demo is doing.",
    },
  ],
  failures: [
    {
      title: "Same webhook, many times",
      body: "The documented test is the one I care about: the same webhook delivered 10 times processes the payment once and leaves it PAID.",
    },
    {
      title: "Late pending event",
      body: "If the record is already PAID, a later pending event is ignored. Status stays PAID.",
    },
    {
      title: "Paid after local expiry",
      body: "Incoming invoices expire after 15 minutes. A read past expiresAt marks a PENDING invoice EXPIRED. A late PAID webhook is then an invalid transition and is ignored. The repository calls this out: Lightning may still accept the invoice after the app's window. Blinky does not revive the local record.",
    },
    {
      title: "Blink times out or is down",
      body: "Timeouts become 504 Lightning provider timed out. Outages become 503 Lightning provider is unavailable. Invalid identifiers are 400. Missing payments are 404.",
    },
    {
      title: "The browser loses the connection",
      body: "Polling treats HTTP errors as a status-check failure and keeps trying until a terminal state or the 16-minute timeout. Leaving the page stops the poll.",
    },
    {
      title: "Unsigned webhooks",
      body: "Production configuration needs BLINK_WEBHOOK_SECRET. Unsigned webhooks are accepted only when NODE_ENV is test or the provider is mock, so local and CI runs do not need Blink.",
    },
  ],
  built: [
    {
      category: "Frontend",
      items: [
        "React, Vite, and Tailwind",
        "Create invoice, invoice detail with QR, pay, and history",
        "Polling hook that stops on PAID, FAILED, EXPIRED, unmount, or timeout",
      ],
    },
    {
      category: "Backend",
      items: [
        "Invoice create and status",
        "Decode a bolt11 invoice and pay it through Blink",
        "Webhook processor for receive.lightning and send.lightning",
      ],
    },
    {
      category: "Integrations",
      items: [
        "Blink GraphQL: invoice create, status by hash, and lnInvoicePaymentSend",
        "Svix signature verification when the webhook secret is set",
        "Mock provider for local Docker and tests",
      ],
    },
    {
      category: "Database",
      items: [
        "MongoDB payments collection",
        "webhook_events with a unique (provider, eventId) index",
      ],
    },
    {
      category: "Testing",
      items: [
        "Payment transition tests",
        "Provider success, error, and timeout",
        "End-to-end webhook duplicates and late events, using the mock provider",
      ],
    },
  ],
  demonstrates: [
    {
      title: "Provider integration",
      body: "I can put a third-party API behind a boundary, map its failures, and keep the rest of the app stable when the provider changes or is absent.",
    },
    {
      title: "Payment state",
      body: "The interesting behavior is the transition rule, not the number of screens.",
    },
    {
      title: "Teaching a complex system",
      body: "I used this in a workshop setting. The scope is small on purpose so someone can follow invoice, webhook, and paid without learning a production Lightning stack first.",
    },
    {
      title: "Technical communication",
      body: "The repository includes a Hack4Freedom setup guide, architecture notes, and failure scenarios. The demo and the writing are the same piece of work.",
    },
  ],
  scopeTitle: "Why this project is intentionally small",
  scopeLead:
    "Blinky is a teaching demo, not a wallet I would hand to customers. I wanted the core path to stay visible: invoice, wait, webhook, paid. A larger ledger would have buried that.",
  notBuilt: [
    "A live production Lightning deployment",
    "LNURL or Lightning Address",
    "WebSockets",
    "Authentication for anything beyond a demo wallet",
    "Registering the webhook URL from the app instead of the Blink dashboard",
    "Reconciling invoices that expire locally and later settle on Lightning",
  ],
  result: {
    paragraphs: [
      "These are the interface screenshots from the repository. There is no public deployment. Live Blink mode needs an API key, wallet id, and webhook secret. Mock mode runs without them.",
    ],
    images: [
      {
        src: "/work/blinky/01-payment-interface.png",
        alt: "Blinky payment screen for creating a Lightning invoice",
        width: 1440,
        height: 900,
      },
      {
        src: "/work/blinky/04-payment-received.png",
        alt: "Blinky showing a Lightning payment as received",
        width: 1440,
        height: 900,
      },
      {
        src: "/work/blinky/05-transaction-history.png",
        alt: "Blinky transaction history",
        width: 1440,
        height: 900,
      },
    ],
    sequence: [
      {
        label: "Request",
        title: "The app asks Blink for an invoice",
        body: "POST /api/v1/invoices creates an incoming Lightning invoice and stores it as PENDING, with the bolt11 payment request and an expiry.",
      },
      {
        label: "Waiting",
        title: "The screen polls while the invoice is unpaid",
        body: "The invoice page shows the payment request as a QR code and calls GET /invoices/:id every 3 seconds. Polling stops if the user leaves.",
      },
      {
        label: "Webhook",
        title: "Blink reports settlement, possibly more than once",
        body: "The processor stores the Svix event. A duplicate event id is acknowledged and ignored. A late pending event cannot move a PAID payment backwards.",
      },
      {
        label: "Final state",
        title: "Paid, failed, or expired",
        body: "The poll stops. An invoice past its 15-minute window is marked EXPIRED on read. A payment that later settles on Lightning does not revive that local record.",
      },
    ],
  },
  technical: {
    stack: [
      "TypeScript, NestJS, MongoDB and Mongoose",
      "React, Vite, Tailwind, qrcode.react",
      "Blink GraphQL API and Svix webhooks",
      "Jest, Vitest, GitHub Actions, Docker Compose",
    ],
    architecture: [
      "Frontend routes cover receive, invoice detail, send, and history.",
      "API prefix /api/v1. Swagger is at /api/docs on port 4001 when the API is running locally.",
      "PAYMENT_PROVIDER selects mock or blink.",
    ],
    api: [
      "POST /invoices and GET /invoices/:invoiceId",
      "POST /payments/decode and POST /payments/pay",
      "GET /payments",
      "POST /webhooks/blink",
      "GET /health, including a Mongo ping",
      "GET /providers/blink/status and wallet-balance",
    ],
    dataModel: [
      "payments: public invoiceId, provider payment hash, bolt11, amount, currency, direction incoming or outgoing, status, expiresAt, paidAt.",
      "webhook_events: unique (provider, eventId).",
    ],
    reliability: [
      "Duplicate webhooks are stored once.",
      "Terminal states are sticky.",
      "Expire-on-read after expiresAt.",
      "Polling timeout is 16 minutes. Invoice expiry on the Blink side is 15 minutes.",
    ],
    security: [
      "Svix headers svix-id, svix-timestamp, and svix-signature when the secret is set.",
      "Secrets are not logged. .env is not committed.",
      "This demo does not add user authentication. The repository lists that as follow-up work if it were ever more than a demo.",
    ],
    testing: [
      "payment-transitions.spec.ts, blink.provider.spec.ts, mock.provider.spec.ts.",
      "End-to-end coverage includes valid and invalid webhooks, ten duplicate deliveries, and a late PENDING after PAID.",
      "Tests use MockPaymentProvider and in-memory MongoDB. They do not need Blink credentials.",
    ],
    docs: [
      {
        label: "Architecture",
        href: "https://github.com/eunicegigijacob/Blinky-wallet-complete/blob/main/docs/architecture.md",
      },
      {
        label: "Failure scenarios",
        href: "https://github.com/eunicegigijacob/Blinky-wallet-complete/blob/main/docs/failure-scenarios.md",
      },
      {
        label: "Hack4Freedom setup guide",
        href: "https://github.com/eunicegigijacob/Blinky-wallet-complete/blob/main/docs/hack4freedom/hack4Freedom-2026.md",
      },
    ],
  },
};

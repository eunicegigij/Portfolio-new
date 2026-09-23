export type ExperienceRole = {
  title: string;
  dates: string;
  summary: string;
  points: string[];
};

export type ExperienceItem = {
  company: string;
  context: string;
  roles: ExperienceRole[];
};

export const experience: ExperienceItem[] = [
  {
    company: "IPayBTC Technologies",
    context: "Bitcoin and Lightning payment infrastructure",
    roles: [
      {
        title: "Lead Backend Engineer",
        dates: "Apr 2026 – Present",
        summary:
          "Leading backend engineering for wallet, payment, and integration services.",
        points: [
          "Own architecture decisions, engineering standards, and delivery across production backend services.",
          "Escalation point for production issues that cross services, data stores, and external providers.",
          "Design APIs for wallet management, payment processing, user services, and third-party integrations.",
          "Lead code reviews, system documentation, and sprint planning.",
        ],
      },
      {
        title: "Senior Backend Engineer",
        dates: "Dec 2024 – Apr 2026",
        summary:
          "Built payment services and provider integrations before the lead role.",
        points: [
          "Built and maintained REST services for payment processing and transaction troubleshooting.",
          "Led integrations with Bitnob, IBEX, and Mavapay, including webhooks and transaction monitoring.",
          "Integrated Prembly, Smile Identity, and Youverify for identity verification and onboarding.",
        ],
      },
    ],
  },
  {
    company: "Saleswave",
    context: "Contract · part-time",
    roles: [
      {
        title: "Fullstack Developer",
        dates: "Jul 2025 – Present",
        summary:
          "Working across React/TypeScript frontends and NestJS backends for product teams.",
        points: [
          "Build creator and business workflows with search, filtering, aggregation, and role-specific behavior.",
          "Implement Paystack wallet and payment flows, including verification, webhooks, reconciliation, and idempotent processing.",
          "Build reporting views and the APIs behind them for transactions, payments, and commitments.",
          "Debug production issues across the interface, the API, and the database as one system.",
        ],
      },
    ],
  },
  {
    company: "eHealth Africa",
    context: "Contract · healthcare technology",
    roles: [
      {
        title: "Backend Engineer",
        dates: "Oct 2024 – Dec 2024",
        summary: "Contract backend work on a healthcare platform.",
        points: [
          "Built FHIR-oriented REST APIs for healthcare workflows.",
          "Implemented JWT authentication and role-based access.",
          "Supported GitHub Actions workflows for deployment.",
        ],
      },
    ],
  },
  {
    company: "Charisol",
    context: "Maildrip · email marketing",
    roles: [
      {
        title: "Backend Developer",
        dates: "Aug 2023 – Dec 2024",
        summary:
          "Backend features for Maildrip, a SaaS email marketing platform.",
        points: [
          "Built campaign, subscription, and user-management workflows.",
          "Integrated Paystack and Flutterwave for subscription payments.",
          "Implemented organizations, invitations, and role-based access.",
          "Maintained the APIs behind those workflows and supported interns learning the codebase.",
        ],
      },
    ],
  },
  {
    company: "Famasi Africa",
    context: "Digital health and pharmacy",
    roles: [
      {
        title: "Fullstack Developer",
        dates: "Jun 2023 – Oct 2024",
        summary:
          "Full-stack work on customer workflows, payments, and data synchronization.",
        points: [
          "Built React and Tailwind dashboards and customer-facing flows from product requirements and customer feedback.",
          "Integrated Paystack and Flutterwave across the interface and the payment APIs.",
          "Built synchronization APIs and scripts between Zoho and MongoDB.",
          "Traced production issues from the UI through API requests, logs, and error timelines.",
        ],
      },
    ],
  },
];

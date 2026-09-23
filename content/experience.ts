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
          "I lead backend engineering for the payment infrastructure, including the operational problems that show up after the code ships.",
        points: [
          "Own architecture decisions, engineering standards, and delivery across wallet, payment, and integration services.",
          "Investigate production issues across services, databases, infrastructure, and external providers.",
          "Work through transaction and reconciliation problems with the people who have to operate them.",
          "Keep the technical documentation current, review code, and plan the engineering work with the team.",
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
          "Part-time product work across React interfaces and NestJS backends.",
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
        title: "Frontend/Fullstack Developer",
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
          "Backend for Maildrip, a SaaS email marketing product: campaigns, accounts, and the billing around them.",
        points: [
          "Built campaign, subscription, and user-management workflows.",
          "Integrated Paystack and Flutterwave for subscription payments.",
          "Implemented organizations, invitations, and role-based access.",
          "Investigated production issues in those workflows and supported interns learning the codebase.",
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
          "Health-tech product work on the pharmacy workflows customers used, and the systems behind them.",
        points: [
          "Built React and Tailwind dashboards and customer flows from product requirements and customer feedback.",
          "Worked with product and design on those flows, and traced customer-reported issues from the screen back to the cause.",
          "Integrated Paystack and Flutterwave across the interface and the payment APIs.",
          "Built synchronization between Zoho and MongoDB so the admin tools and the application database stayed aligned.",
        ],
      },
    ],
  },
];

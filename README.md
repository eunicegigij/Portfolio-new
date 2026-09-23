# Eunice Jacob — portfolio

Personal site for Eunice Jacob, a software engineer working across backend systems, full-stack product work, payments, and integrations.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion, used for the short opening transition
- Zod, for contact form validation

## Local setup

```bash
cd portfolio
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL, sitemap, and Open Graph. No trailing slash. |

The contact form validates in the browser, then opens a `mailto:` link to `eunice.gigij@gmail.com` with the message filled in.

## Resume

The navigation and hero link to `/resume.pdf`. Put the file at `public/resume.pdf`. No code change is required. The PDF is not in this repository yet.

## Scripts

```bash
npm run dev        # local development
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run test       # Vitest
npm run build      # production build
npm run start      # serve the production build
```

## Deployment

The app is set up for Vercel.

1. Import this project (the `portfolio` directory, if the git root is the parent folder).
2. Framework preset: Next.js.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
4. Deploy.

Do not commit `.env` or `.env.local`.

## Project notes

Featured work is Pactis, Blinky, and the Webhook Reliability Service. Case studies only describe behavior that exists in those public repositories. Professional experience is summarized from the public-safe CV facts. Confidential client systems are described at the level of problem and responsibility, not internal architecture.

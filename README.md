# OfferOS — AI Offer Engineering & Growth Operating System

OfferOS is a Next.js 14 MVP for a premium SaaS-style consulting operating system inspired by the Grand Slam Offer value equation. It helps service businesses submit growth information, receive value scoring, diagnose bottlenecks, assemble premium offer stacks, and model pricing architecture.

## Core workflows

- Premium landing page with growth audit CTA.
- Multi-step Business Intake Engine that writes leads, audits, value scores, offers, reports, notes, and activity logs to Supabase.
- Value Equation Engine: `(Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort & Sacrifice)`.
- Business Diagnostic Engine for knowledge, execution, logistical, psychological, market, and behavioral constraints.
- Offer Engineering, Bundle Assembly, Pricing Architecture, Objection Handling, Trim & Stack Matrix, and Final Offer presentation UI.
- Admin dashboard for pipeline, lead management, audits, notes, reports, and task visibility.
- Client dashboard for audit results, recommendations, offer stacks, milestones, and implementation roadmap.

## Tech stack

- Next.js 14 App Router
- React + TypeScript
- Tailwind CSS + shadcn/ui-style primitives
- Supabase Auth + PostgreSQL
- Recharts visualizations
- Vercel-ready deployment

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your Supabase values to `.env.local`.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Enable email/password authentication.
5. Create profiles with `admin`, `client`, or `prospect` roles.

## Deployment

1. Push the repository to GitHub or GitLab.
2. Import into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Architecture

- `app/` — Next.js routes, API handlers, landing page, dashboards, and intake flow.
- `components/ui/` — shadcn/ui-style reusable primitives.
- `components/dashboard/` — charts and operating-system widgets.
- `lib/engines/` — deterministic strategic scoring and offer-generation logic.
- `lib/supabase/` — Supabase browser/server clients.
- `supabase/schema.sql` — PostgreSQL schema, roles, RLS policies, and core tables.

## AI-ready output system

The MVP uses deterministic engines now and structures results as JSON payloads suitable for upgrading into LLM-assisted report generation. API routes store professional, consultant-grade output sections that can be rendered, exported, or sent to clients.

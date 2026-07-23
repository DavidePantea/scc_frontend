# SmartCarCompare — Frontend

SmartCarCompare is a web app that estimates the true cost of keeping your
current car versus switching to a new one. You enter your vehicle's make,
model, year, mileage, fuel type, and typical driving conditions; the app
sends that to a backend estimation service and renders back a cost
breakdown, a total estimated cost, a confidence score, and a list of common
mechanical problems for that engine/mileage combination.

This repository is the frontend only — a [Next.js](https://nextjs.org) app.
The estimation logic itself (including any AI/LLM calls) lives in a separate
backend service and is not part of this codebase.

## What it does

1. The user fills in a form (make, model, year, kilometers, fuel type, and a
   rural/urban driving slider).
2. On submit, the frontend calls `POST {NEXT_PUBLIC_API_URL}/api/estimate`
   with that data.
3. The backend responds with:
   - a per-category cost breakdown (fuel, maintenance, depreciation, etc.)
   - a total estimated cost and the period it covers (annual/monthly)
   - a confidence score for the estimate
   - a list of common problems reported for that engine, with severity and
     estimated repair cost ranges
4. The UI renders all of this across three panels: inputs, cost analysis,
   and common problems, plus a results summary bar underneath.

The app is in Romanian (all UI copy, error messages, etc.) since it targets
the Romanian used-car market.

## Project structure

```
app/
  layout.tsx           Root layout: fonts, global header/footer, Vercel Analytics
  page.tsx             Home page — renders the CostCalculator
  globals.css          Tailwind base styles
components/
  CostCalculator.tsx   Main stateful component: form state, API call, result rendering
  CalculatorHeader.tsx Banner/header for the calculator section
  CalculatorFooter.tsx Results summary bar (total cost, confidence, CTAs)
  CostBreakdownBars.tsx Bar-chart style rendering of the cost breakdown
  Header.tsx           Site-wide top navigation
  Footer.tsx           Site-wide footer
  icons.tsx            Small inline SVG icon set used across the UI
lib/
  api.ts               Typed fetch wrapper around the backend's /api/estimate endpoint
  calculator-logic.ts  Shared types/constants (fuel types, currency formatting)
public/                Static assets (banner image, default Next.js icons)
```

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- [Vercel Analytics](https://vercel.com/analytics)

## Getting started locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The app needs one environment variable, the base URL of the backend API:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend estimation API (no trailing slash), e.g. `https://your-backend.example.com` |

Copy `.env.example` to `.env` and fill in a real value for local development:

```bash
cp .env.example .env
```

`.env` is git-ignored and must never be committed — see [Deploying / configuring env vars](#deploying--configuring-env-vars) below for how production is configured.

Note: because this variable is prefixed with `NEXT_PUBLIC_`, Next.js bundles
it into the client-side JavaScript by design, so it is visible to anyone
using the site. It should only ever hold a public backend URL, never a
secret or API key — those stay server-side in the backend service.

## Deploying / configuring env vars

This project is set up to deploy on [Vercel](https://vercel.com):

1. Import this repository into Vercel.
2. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_API_URL`
   pointing at your deployed backend, for each environment (Production,
   Preview, Development) as needed.
3. Deploy. Vercel injects the environment variables at build time — no
   secrets are stored in the repository itself.

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

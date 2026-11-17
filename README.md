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
4. The UI shows a result banner with the total and confidence, then the
   cost breakdown, common problems, market value and a 5-year price chart.
   See `design-system/smartcarcompare/MASTER.md` for the visual system.

The app is in Romanian (all UI copy, error messages, etc.) since it targets
the Romanian used-car market.

## Project structure

```
app/
  layout.tsx           Root layout: fonts, global header/footer, AuthProvider, Vercel Analytics
  page.tsx             Home page — renders the CostCalculator
  login/page.tsx       Login form, calls auth-service directly
  signup/page.tsx      Signup form, calls auth-service directly
  account/page.tsx     Protected landing page: account info, guarded by RequireAuth
  globals.css          Design tokens (@theme) and component classes (.card, .btn, .input, ...)
components/
  CostCalculator.tsx   Home page: hero with the vehicle form, then the results
  CompareCalculator.tsx /compare: two vehicle forms, verdict banner, side-by-side results
  VehicleFormFields.tsx Vehicle-details fields shared by both calculators
  ResultSummary.tsx    Dark result banner (total, confidence, PDF download)
  EstimateTotal.tsx    Total-cost figure + confidence meter, used by both calculators
  CostBreakdownBars.tsx Stacked bar + ranked rows for the cost breakdown
  CommonProblems.tsx   Common engine problems list with severity
  MarketValueCard.tsx  Average market value (card and compact variants)
  PriceEvolutionChart.tsx 5-year price line chart (SVG, with table view)
  SectionCard.tsx      Standard results card with icon + title header
  PageHero.tsx         Dark page-title band used by every secondary page
  CtaBanner.tsx        Closing call-to-action band on content pages
  Header.tsx           Site-wide top navigation (active-page aware)
  AccountNav.tsx        Top-right auth controls (login/signup, or account + logout)
  RequireAuth.tsx       Client-side route guard for protected pages
  AuthFormField.tsx     Shared field wrapper for the login/signup forms
  Footer.tsx           Site-wide footer
  icons.tsx            Small inline SVG icon set used across the UI
design-system/
  smartcarcompare/MASTER.md  Design system: tokens, type, components, rules
lib/
  api.ts               Typed fetch wrapper around the backend's /api/estimate endpoint
  auth-api.ts          Typed fetch wrappers around the auth-service endpoints
  auth-context.tsx     In-memory auth state (React context) + login/signup/logout
  calculator-logic.ts  Shared types/constants (fuel types, currency formatting)
  vehicle-form.ts      Vehicle form state + request builders shared by both calculators
public/                Static assets (default Next.js icons)
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

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend estimation API (no trailing slash), e.g. `https://your-backend.example.com` |
| `NEXT_PUBLIC_AUTH_API_URL` | Base URL of the standalone auth-service (no trailing slash), e.g. `https://your-auth-service.example.com` |

Copy `.env.example` to `.env` and fill in a real value for local development:

```bash
cp .env.example .env
```

`.env` is git-ignored and must never be committed — see [Deploying / configuring env vars](#deploying--configuring-env-vars) below for how production is configured.

Note: because this variable is prefixed with `NEXT_PUBLIC_`, Next.js bundles
it into the client-side JavaScript by design, so it is visible to anyone
using the site. It should only ever hold a public backend URL, never a
secret or API key — those stay server-side in the backend service.

## Authentication

Login/signup/session logic lives entirely in a separate `auth-service`
repo — this app never implements its own auth routes. It calls
`{NEXT_PUBLIC_AUTH_API_URL}/signup` and `/login` directly from the browser
and gets back a short-lived RS256 JWT (`accessToken`) plus a longer-lived
opaque `refreshToken`.

- Both tokens are held **only** in React state/context
  (`lib/auth-context.tsx`) — never `localStorage`, never a cookie. This
  means a stolen-via-XSS token is only ever as good as the current tab, but
  it also means **reloading the page always logs the user out** — there is
  no session to rehydrate, by design. If persisting sessions across reloads
  becomes a requirement, that needs a deliberate, separate decision (e.g. a
  `httpOnly` refresh cookie), not a quiet reintroduction of `localStorage`.
- Every call to the calc-backend (`lib/api.ts`'s `fetchCostEstimate`)
  attaches the current access token as `Authorization: Bearer <token>` when
  the user is logged in; the calculator itself still works logged-out.
- `/account` is the one protected page today, guarded by
  `components/RequireAuth.tsx`. Because the token is memory-only, this is a
  **client-side** redirect (checks `lib/auth-context.tsx`'s state on mount),
  not a Next.js `proxy.ts` (the server has nothing to inspect on the request
  since there's no cookie).

## Saved research history

When the user is logged in, every research they run is saved server-side and
listed on `/account`:

- A single-vehicle lookup on `/` (`CostCalculator`) is saved automatically by
  the backend whenever `fetchCostEstimate` is called with an access token —
  no separate save call from the frontend.
- A two-vehicle comparison on `/compare` (`CompareCalculator`) runs both
  sides with `skip_history: true` (so each side doesn't also get saved on its
  own), then calls `saveComparisonResearch` once both sides succeed to save
  the pair as a single history entry.
- `/account` fetches the merged list via `fetchResearchHistory` and links
  each entry to `/?researchId=<id>` (simple) or `/compare?researchId=<id>`
  (comparison). Both pages read `researchId` from the URL (`useSearchParams`,
  which is why `app/page.tsx` and `app/compare/page.tsx` wrap their client
  component in `<Suspense>`) and fetch the saved result directly — the form
  is pre-filled and the results are shown immediately, with no new
  `/api/estimate` call.

Because the access token only lives in memory, following one of these links
from `/account` only works as a client-side navigation within the same
session (e.g. clicking the link) — reloading the page on a `researchId` URL
loses the token like anywhere else in the app, and the page shows a
login-required message instead.

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

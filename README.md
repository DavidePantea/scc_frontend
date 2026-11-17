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
  articole/            Articles index and /articole/[slug] pages (static, with SEO metadata)
  sitemap.ts, robots.ts  Generated /sitemap.xml and /robots.txt
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
  articles/            Article card, index, article view and home-page teaser
design-system/
  smartcarcompare/MASTER.md  Design system: tokens, type, components, rules
lib/
  api.ts               Typed fetch wrapper around the backend's /api/estimate endpoint
  auth-api.ts          Typed fetch wrappers around the auth-service endpoints
  auth-context.tsx     In-memory auth state (React context) + login/signup/logout
  calculator-logic.ts  Shared types/constants (fuel types, currency formatting)
  vehicle-form.ts      Vehicle form state + request builders shared by both calculators
  articles.ts          Article content (RO + EN) and helpers
  site.ts              Public site URL used for canonical links and the sitemap
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
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site (no trailing slash), used for canonical links, `sitemap.xml`, `robots.txt` and structured data. Falls back to Vercel's production domain if unset. |

Copy `.env.example` to `.env` and fill in a real value for local development:

```bash
cp .env.example .env
```

`.env` is git-ignored and must never be committed — see [Deploying / configuring env vars](#deploying--configuring-env-vars) below for how production is configured.

Note: because this variable is prefixed with `NEXT_PUBLIC_`, Next.js bundles
it into the client-side JavaScript by design, so it is visible to anyone
using the site. It should only ever hold a public backend URL, never a
secret or API key — those stay server-side in the backend service.

## Articles (SEO content)

`/articole` lists guides about the real cost of owning a car, and each guide
lives at `/articole/<slug>`. They are statically generated and
server-rendered in Romanian (the indexed language); the language toggle
switches the text to English in the browser. Each article page ships a
canonical URL, Open Graph tags and `Article` + `BreadcrumbList` JSON-LD.
`app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and
`/robots.txt`.

To add an article, append an entry to `ARTICLES` in `lib/articles.ts` with a
Romanian slug, both `ro` and `en` content (headings, paragraphs, lists,
tables and calculator/compare call-to-action blocks), and `published` /
`updated` dates. It is picked up automatically by the index page, the home
page teaser, related-article links and the sitemap. Keep figures as clearly
labelled, rounded ranges: fuel prices, insurance and local taxes change
often.

After deploying, submit `https://<your-domain>/sitemap.xml` in Google Search
Console.

## AdSense

- The AdSense script loads only on routes with substantial content, listed
  in `lib/adsense.ts` (currently the home page and `/articole/*`).
  Login/signup, account, seller, compare, contact, legal and 404 pages stay
  ad-free, as AdSense forbids ads on screens without publisher content.
- Site ownership is verified by the `google-adsense-account` meta tag (set in
  `app/layout.tsx`, shows no ads) and `public/ads.txt`.
- `/privacy`, `/terms` and `/cookies` (content in `lib/legal.ts`) carry the
  disclosures AdSense requires about Google's advertising cookies. EEA
  consent is handled by Google's consent message, configured in AdSense →
  Privacy & messaging, not in this codebase.
- Pages that read query parameters must not call `useSearchParams` at page
  level: it makes Next.js drop the whole page from the server HTML, so
  crawlers see an empty screen. Use `useUrlParams` from
  `components/UrlParams.tsx` instead.

## Security headers and dependency overrides

`next.config.ts` sends security headers on every route: anti-framing
(`frame-ancestors 'none'` + `X-Frame-Options: DENY`), `nosniff`, a strict
referrer policy, a permissions policy, HSTS, and no `X-Powered-By`. The CSP is
deliberately limited to directives that can't break the page; a full
`script-src` allowlist would need nonces and every AdSense domain.

`package.json` → `pnpm.overrides` pins patched versions of a few transitive
dependencies (DOMPurify under jsPDF, plus PostCSS/nanoid/source-map-js and
some lint tooling), each kept within its current major version. Run
`pnpm audit` after upgrading Next.js or jsPDF and drop any override the new
release makes unnecessary.

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

# SmartCarCompare — Design System (Master)

The single source of truth for how the frontend looks. Page-specific
overrides, if ever needed, go in `design-system/smartcarcompare/pages/<page>.md`
and win over this file for that page only.

Tokens live in `app/globals.css` (`@theme`), so every rule below maps to a
Tailwind class such as `text-ink`, `bg-brand-soft` or `border-line`.
**Never hard-code hex values in components.** The only exceptions are SVG
chart series colours, which have to be literal strings.

---

## 1. Concept: "The honest ledger"

The product answers one question with one number: *what does this car really
cost me per year?* The design is built around that number.

- **Calm surfaces, loud result.** Pages are light and quiet. The result banner
  and verdict are the only dark, high-contrast blocks after the hero, so the
  eye goes straight to the total.
- **Money looks like money.** Every amount uses tabular figures (`.tabular`)
  so columns line up the way they do on a statement.
- **Trust through restraint.** One brand colour (blue) for data and links. One
  action colour (orange) used only for primary actions. Status colours (green,
  amber, red) carry meaning and are always paired with a text label.

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F172A` | Primary text |
| `ink-950` | `#0A1020` | Hero, footer, result banner (dark surfaces) |
| `muted` | `#5B6475` | Secondary text (6:1 on white) |
| `canvas` | `#F4F6F9` | Page background, input fill |
| `surface` | `#FFFFFF` | Cards |
| `line` / `line-soft` | `#E3E7EE` / `#EEF1F5` | Borders / inner dividers |
| `brand` | `#2563EB` | Data, links, selection, focus rings |
| `brand-soft` | `#EEF3FF` | Icon tiles, selected states |
| `brand-on-dark` | `#8FB1FF` | Blue text on `ink-950` (8:1; plain `brand` is only ~4:1 there) |
| `accent` | `#F97316` | **Primary buttons only**, plus small highlights on dark |
| `accent-ink` | `#C2410C` | Orange used as text on light backgrounds |
| `success` / `danger` | `#0F8A5F` / `#DC2626` | Status, with `-soft` backgrounds |

**Primary buttons use ink text on orange, never white.** White on `#F97316`
is 2.8:1 and fails WCAG AA; ink on orange is about 7:1.

Chart series: side A `#2563EB`, side B `#EA580C`. B is the darker orange so
the line keeps 3:1 contrast against white.

Cost breakdown: every category has a **fixed position and colour**, so two
vehicles line up row for row on the compare page. The rows are never
re-sorted by amount:

| Order | Category | Colour |
|---|---|---|
| 1 | Fuel | `#1D4ED8` |
| 2 | Maintenance | `#3B82F6` |
| 3 | Unforeseen repairs | `#93C5FD` |
| 4 | Insurance | `#F97316` |
| 5 | Taxes | `#FDBA74` |
| 6 | Depreciation | `#64748B` |
| — | Unknown keys (last, API order) | `#CBD5E1` |

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display & headings | **Bricolage Grotesque** (`font-heading`) | Variable, optical-size axis; characterful but serious. Sentence case — no ALL-CAPS headlines. |
| Body & UI | **Inter** (`font-sans`) | 15–16px base, `cv11`/`ss01` features on. |
| Numbers | Inter + `.tabular` | Tabular figures for all money, km, years, scores. |
| Kickers | `.eyebrow` | 12px, 600, +0.08em, uppercase — the only place uppercase is used. |

Both fonts load `latin` **and `latin-ext`**. The Romanian diacritics (ă, ș, ț)
live in `latin-ext`.

Scale: hero 36 / 48 / 60px → page title 36 / 48px → section 18–20px →
body 14–16px → caption 12px. Never go below 12px.

## 4. Layout & spacing

- Container: `max-w-6xl`, gutters `px-4 sm:px-6 lg:px-8`.
- Cards: `.card` (radius 20px, 1px `line` border, hairline shadow), padding
  `p-5 sm:p-7`. Use `.card-raised` for cards that float over a hero.
- Grid gaps: 24px between cards, 12–16px inside forms.
- The **overlap pattern**: secondary pages use a dark `PageHero` with
  `variant="overlap"`; the first card is pulled up with `-mt-24` so it
  straddles the hero edge. Only light cards may straddle: a dark card
  (such as the comparison verdict) must never cross the dark hero band.
  On `/compare`, `variant="tuck"` + `-mt-10` lets only the slim stepper cross
  the edge, and everything below it sits on the page background.
- Breakpoints checked: 375, 768, 1024, 1440.

## 5. Components

| Component | File | Notes |
|---|---|---|
| Buttons | `.btn` + `.btn-primary / -brand / -secondary / -ghost / -on-dark`, `.btn-lg` | Min height 44px (52px for `-lg`). Visible focus ring. 0.98 press scale. |
| Inputs | `.input`, `.field-label` | Visible label above every field (no placeholder-only labels). 46px tall. Blue focus ring. Custom chevron on `select`. |
| Section card | `SectionCard` | Icon tile + title + optional subtitle and right-hand action. |
| Page hero | `PageHero` | Dark band with grid texture and soft blue/orange glows (`.hero-surface`). Optional eyebrow. |
| Result banner | `ResultSummary` / `EstimateTotal` | Dark card: vehicle, total per period, confidence meter (`role="meter"`), verification, PDF button. |
| Comparison verdict | `Verdict` in `CompareCalculator` | States the answer in words ("Dacia Duster costă cu 12,060 RON mai puțin / an") above both totals. |
| Problems list | `CommonProblems` | Severity = coloured edge + dot + text pill. |
| Vehicle form | `VehicleFormFields` | Shared by `/` and `/compare`; seller source is a segmented control. |
| CTA band | `CtaBanner` | Closing call to action on content pages. |

## 6. Page structure

**Home (`/`)** — the hero holds the form itself (pitch on the left, form on
the right), so the primary action is above the fold on desktop. Before a
search, a three-tile "What you'll get" row replaces the old empty
placeholder boxes. After a search:
1. Result banner (total, confidence, download)
2. Cost breakdown | Common problems
3. Market value | Price evolution (5-year chart)

**Compare (`/compare`)** — hero (`tuck`) → stepper straddling its edge → A/B forms (colour-coded
badges, no more duplicate "1." headings) → verdict banner → shared price
chart → per-side columns.

**Content pages** — `PageHero` with eyebrow → card grid → `CtaBanner`.

**Articles (`/articole`)** — `PageHero` → card grid with the newest article
featured (spanning two columns) → `CtaBanner`. An article page has a dark
header (breadcrumb, category, H1, description, author/date/read time), a
body column limited to about 70 characters per line (17px / 32px line
height), a sticky sidebar from `lg` up (table of contents + calculator
card), an inline dark CTA block, a disclaimer and three related articles.
Whole cards are clickable through a stretched link on the title.

**Auth & account** — the form card overlaps the hero; errors appear inline
with `role="alert"`.

## 7. Motion

- Micro-interactions 150–200ms. Results enter with `.animate-in` (400ms, fade
  + 6px rise). Bars and meters animate their width (700ms).
- `prefers-reduced-motion: reduce` turns all of it off globally, and the
  scroll-to-results on submit is instant.

## 8. Accessibility checklist

- [x] Text contrast ≥ 4.5:1 (orange buttons use ink text; blue on dark uses `brand-on-dark`)
- [x] Visible focus rings on every interactive element
- [x] Touch targets ≥ 44px (nav menu button, buttons, mobile menu rows)
- [x] Desktop nav only from `xl` (1280px); below that the menu button is used, so nothing overflows
- [x] Active nav item marked with `aria-current="page"`
- [x] Decorative SVG icons `aria-hidden`
- [x] Colour never the only signal (severity, chart series, confidence)
- [x] Loading regions announce politely (`role="status"` / `aria-live`)
- [x] Choice groups use `fieldset`/`legend` or `role="group"` + `aria-pressed`

## 9. Avoid

- Raw hex classes like `text-[#2563EB]`; use tokens.
- White text on `accent`.
- ALL-CAPS headlines.
- Large empty placeholder cards before the user has done anything.
- Adding a second accent colour. Blue = information, orange = action.

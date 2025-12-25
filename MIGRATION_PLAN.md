# CLG Site – Migration / Refactor Plan (Planning Notes)

This document is **planning-only**: it captures an assessment of the current repo and a suggested path to evolve the UI toward the “**Primitives → Patterns → Pages**” approach described in `primer://global/frontend_preferences`.

No code changes are implemented as part of this document.

---

## 1) Current Project Snapshot (Repo Reality)

### Stack
- Next.js **16** (App Router) + React **19** + TypeScript (strict).
- Tailwind CSS **v4** (CSS-first): `app/styles/globals.css` uses `@import "tailwindcss"`, `@theme`, `@custom-variant`.
- shadcn/ui primitives in `components/ui/*` (CVA + `cn()` helper).
- `next-themes` for dark/light mode (ThemeProvider + ThemeToggle).

### Routes
- `app/(site)/page.tsx`: Home (`/`) with featured carousel + multiple sections.
- `app/(site)/gallery/page.tsx`: Gallery category index (`/gallery`).
- `app/(site)/gallery/[category]/page.tsx`: Category image grid (`/gallery/<category>`) generated with `generateStaticParams`.
- `app/(site)/about/page.tsx`: About + optional photo grid from `public/images/about`.
- `app/(site)/commissions/page.tsx`: Commissions page (mailto-based “contact”, not a backend submission).
- `app/(site)/ebay-store/page.tsx`, `app/(site)/paintfinity/page.tsx`: Placeholder pages.

### Styling model in practice
- Global theme tokens are defined via CSS variables in `app/styles/globals.css`.
- Reusable “house style” utilities exist as classes like:
  - `.site-section`, `.site-card`, `.page-header`, `.link-pill`
  - gallery-specific `.gallery-*` utilities
- There is still **inline style duplication** (notably in header/nav/theme-toggle) for the same “card surface” gradient + shadow.

---

## 2) What’s Already Good (Keep / Lean Into)

### Strong foundations
- Clear app/router structure (`(site)` route group + shared header/footer layout).
- Good separation of UI primitives (`components/ui/*`) vs feature components.
- Theme system is coherent (OKLCH tokens, consistent light/dark).
- Gallery is data-driven from disk structure + metadata (`lib/gallery.ts`, `lib/gallery-config.ts`).

### Existing patterns worth promoting
- `components/gallery-category-header.tsx` already acts like a “page title/hero” pattern (title + description + actions).
- Global “card surface” aesthetic exists and is consistent via `.site-card`.

---

## 3) Gaps vs Frontend Preferences (Primitives → Patterns → Pages)

### Main gap: “Patterns” folder doesn’t exist yet
Right now, most reusable “pattern-level” components live directly under `components/` (mixed with primitives and feature components). Creating `components/app/*` would make reusability intentional.

### Main gap: repeated “house style” in inline styles
Header/nav/theme-toggle all repeat the same surface styling via `style={{ background, boxShadow }}` + an overlay `<div>`.

**Goal:** move that into shared utilities (preferred) or a small pattern wrapper component so we don’t drift.

---

## 4) High-Value Reusable Scaffolds (Minimal, Practical)

This is the smallest set of patterns that will pay off for future pages without overbuilding.

### A) `PageTitleCard` (generalize `GalleryCategoryHeader`)
**Current:** `components/app/gallery-category-header.tsx` (gallery-specific naming, but page-agnostic behavior).

**Proposed:** `components/app/page-title-card.tsx`
- Slots:
  - `title: ReactNode`
  - `description?: ReactNode`
  - `actions?: ReactNode` (top-right)
- Use on: `/gallery`, `/gallery/<category>`, `/about`, `/commissions`, placeholder pages, and any new “tool/linktree” pages.

Migration option:
- Keep `GalleryCategoryHeader` as a thin wrapper re-export for backwards compatibility, or rename usages in one sweep.

### B) `AppPage` wrapper (optional but nice)
**Proposed:** `components/app/app-page.tsx`
- Centralizes “page container” decisions:
  - default `className="site-section"`
  - optional `flushTop` (home currently does `pt-0`)
  - optional `maxWidth` variants (wide vs reading)

This reduces repeated `div className="site-section ..."` and makes width decisions explicit.

### C) `Surface` utilities (replace inline styles with Tailwind v4 `@utility`)
**Goal:** eliminate the repeated inline gradient/shadow/overlay markup used by:
- `components/site-header.tsx` (logo card + nav items)
- `components/theme-toggle.tsx`

Suggested approach (Tailwind v4):
- Move “surface card” styling into one or more custom utilities using `@utility` (supported in v4 docs).
- Examples (names are illustrative):
  - `.surface-card` (base: background + border + shadow)
  - `.surface-card-overlay` (the primary overlay using `::before` or a child)
  - `.surface-card--lift` (hover translate/shadow)
  - `.surface-card--tight` (padding presets)

Then header elements become normal markup + classes (no inline styles), improving consistency and maintainability.

---

## 5) Risky or Potentially Broken Bits (Verify Before Expanding)

### A) `prose` classes without Typography plugin
`components/app/text-card-rem60.tsx` uses `prose prose-slate`.
- If `@tailwindcss/typography` is not installed/configured, these classes may not do anything.
- Recommendation: **remove** reliance on `prose` (preferred: no new deps), or explicitly adopt the typography plugin (ask-first because it’s a dependency change).

### B) `max-w-240` utility
Used in multiple places (About/Commissions/TextCard).
- Confirm Tailwind v4 is generating `max-w-240` in this project.
- If not, replace with `max-w-[60rem]` or define the appropriate theme variable in the `--spacing-*` namespace so the utility exists.

### C) Server-only modules
`lib/gallery.ts` and `lib/public-images.ts` import `node:fs` and `node:path`.
- Today they are only used from server components/routes, but it’s easy to accidentally import them into a client component later.
- Recommendation: mark these as server-only (e.g. `import 'server-only'`) or move them under `lib/server/*`.

---

## 6) Performance / UX Opportunities (High ROI)

### A) Image payload optimization
`public/images/featured/*` contains multiple very large JPGs (multi‑MB each).
- Next’s image optimization helps, but the repo still carries a large asset footprint, and direct-file loads still exist (category pages open images in a new tab).

Suggested “no new deps” path:
- Establish an image prep workflow outside the app (manual or scripted) to:
  - convert JPG → WEBP/AVIF
  - cap max dimension (ex: 2400px wide for featured)
  - tune quality

Also compress:
- `public/images/brand/BMAC-QR-Code.png` (currently large for a QR code).

### B) Consistent alt text strategy
Category page has a smart `altFromFilename()` helper; other grids use generic alt text.
- Recommendation: centralize alt generation + allow overrides in metadata (future-proof for accessibility).

---

## 7) Repo Hygiene / Maintenance Notes

### A) Encoding artifacts in docs
`README.md` and `PROJECT_CONTEXT.md` contain garbled tree characters (e.g. `ÃÄÄ`, ``).
- Recommended: replace the tree blocks with plain ASCII (or remove), and ensure files are UTF‑8.

### B) Formatting drift
Some pages (notably About/Commissions) have trailing whitespace / inconsistent formatting.
- Use `npm run format` when you’re ready to implement changes (not part of this planning pass).

---

## 8) Proposed Migration Sequence (Small, Reversible Steps)

### Phase 1 — Create “Patterns” layer (low risk)
1. Add `components/app/page-title-card.tsx` (based on `GalleryCategoryHeader`).
2. Migrate existing pages to use it.
3. Decide what to do with `GalleryCategoryHeader` (rename vs wrapper).

### Phase 2 — Remove inline surface styles (medium risk, high payoff)
1. Define shared surface utilities using Tailwind v4 `@utility`.
2. Update `SiteHeader` and `ThemeToggle` to use those utilities.

### Phase 3 — Fix fragile utilities (low-to-medium risk)
1. Validate `max-w-240` + replace/define as needed.
2. Remove reliance on `prose` or explicitly add typography plugin (ask-first).
3. Mark server-only `lib/*` modules.

### Phase 4 — Image optimization workflow (content risk, high ROI)
1. Decide target sizes/quality for featured + gallery + about photos.
2. Convert the biggest featured images first.
3. (Optional) Add a documented “image prep” guide in repo (not code).

---

## 9) Concrete “Scaffold Targets” for Future Pages

If you add more “hub/linktree” pages later (eBay, Paintfinity, etc.), this is the minimal component set that will keep them consistent:
- `PageTitleCard` (title/description/actions)
- `TextCard` (replace `TextCardRem60` naming; optional width variants)
- `LinkCardGrid` (a standard grid of “cards that link out”)
- `CTASection` (standard “primary action + secondary action” block)

---

## 10) Suggested First TODOs (Highest Value)

These are also added to the external CLG Site TODO list via MCP tooling (see next step in the workflow).

1. Introduce `components/app/page-title-card.tsx` and migrate existing pages.
2. Replace header/nav/theme-toggle inline “surface” styles with shared utilities (Tailwind v4 `@utility`).
3. Validate/fix `max-w-240` and remove `prose` dependency in `TextCardRem60`.
4. Add server-only guardrails for filesystem helpers (`lib/gallery.ts`, `lib/public-images.ts`).
5. Reduce large image assets (featured JPGs + QR PNG) via a documented conversion workflow.

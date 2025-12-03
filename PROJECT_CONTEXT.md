# Chief Live Gaming – Project Context

> Project context and workflow log. Append new entries at the end; do not remove prior entries.

---

## Project Overview

**Project:** Chief Live Gaming website (`www.chieflivegaming.com`)  
**Purpose:** Commission miniature painting business — landing page, portfolio, contact  
**Owner:** Jake

---

## V1 Scope

**In scope:**
- Home: hero, quick links, CTA card
- Gallery: responsive image grid (placeholder for now)
- About: short bio
- Commissions: process overview, contact form

**Deferred (post-v1):**
- Blog/Notes
- eBay page
- Paintfinity/3D printing section
- Dark mode toggle (theme tokens ready, toggle not wired)

---

## Design & Architecture Constraints

- **shadcn/ui for primitives:** Button, Input, Textarea, Label, Card, Dialog, Sheet, Accordion, Form
- **Global providers** at root layout level (theme, toasts, etc.)
- **Prefer Server Components** unless interactivity required
- **Custom utility classes** in `globals.css`: `.site-section`, `.site-card`, `.page-header`, `.link-pill`
- **Theme tokens:** oklch color format, cool gray palette (background ~94% lightness)

---

## Current Priority

1. ~~Tailwind v4 + shadcn wiring~~ ✅
2. ~~Root layout + SiteShell (header/footer)~~ ✅
3. ~~Base shadcn primitives~~ ✅
4. ~~Page skeletons (Home, Gallery, About, Commissions)~~ ✅
5. Define color palette / brand colors
6. Add real gallery images
7. Wire contact form submission
8. Dark mode toggle

---

## Workflow Log

### [2024-12-02] Initial scaffold + structure

**What was done:**
- Confirmed Tailwind v4 + shadcn wiring correct (no v3 patterns)
- Moved `components/` and `lib/` to project root to match shadcn aliases
- Added custom utility classes to `globals.css`
- Created `(site)` route group with shared layout
- Built `SiteHeader` (navbar) and `SiteFooter` components
- Scaffolded page stubs: Home, Gallery, About, Commissions
- Commissions page includes process cards + contact form skeleton
- Adjusted light mode background from pure white to soft cool gray (`oklch(0.94 0.008 250)`)
- Cards/popovers set to subtle lift (`oklch(0.96 0.006 250)`)

**Files created/modified:**
- `components/site-header.tsx` (new)
- `components/site-footer.tsx` (new)
- `app/(site)/layout.tsx` (new)
- `app/(site)/page.tsx` (new)
- `app/(site)/gallery/page.tsx` (new)
- `app/(site)/about/page.tsx` (new)
- `app/(site)/commissions/page.tsx` (new)
- `app/styles/globals.css` (utility classes + adjusted theme colors)
- `README.md` (replaced boilerplate)
- `PROJECT_CONTEXT.md` (consolidated from CLAUDE_CONTEXT.md)

**Deleted:**
- `app/page.tsx` (moved to `app/(site)/page.tsx`)
- `CLAUDE_CONTEXT.md` (merged into this file)

**Tests:** `npm run dev` verified locally by Jake.

---

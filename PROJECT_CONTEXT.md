# Chief Live Gaming – Project Context

> High-level project context, scope, and architecture decisions. For workflow details see `CLG_SITE_LOGS.md`; for tasks see `CLG_SITE_TODO.md`.

---

## Project Overview

**Project:** Chief Live Gaming website (`www.chieflivegaming.com`)  
**Purpose:** Commission miniature painting business — landing page, portfolio, contact  
**Owner:** Jake

---

## V1 Scope

**In scope:**
- Home: hero, quick links, CTA card
- Gallery: responsive image grid
- About: short bio
- Commissions: process overview, contact form

**Deferred (post-v1):**
- Blog/Notes
- eBay page
- Paintfinity/3D printing section

---

## Design & Architecture Constraints

- **shadcn/ui for primitives:** Button, Input, Textarea, Label, Card, Dialog, Sheet, Accordion, Form
- **Global providers** at root layout level (theme, toasts, etc.)
- **Prefer Server Components** unless interactivity required
- **Custom utility classes** in `globals.css`: `.site-section`, `.site-card`, `.page-header`, `.link-pill`
- **Theme tokens:** oklch color format, cool gray palette (background ~94% lightness, cards ~96%)

---

## Key Decisions Log

### [12-02-25] Directory structure
- `(site)` route group for public pages with shared SiteShell layout
- `components/` and `lib/` at project root (matches shadcn aliases)
- Custom utility classes use shadcn theme tokens for light/dark compatibility

### [12-02-25] Theme colors
- Light mode background: `oklch(0.94 0.008 250)` (soft cool gray)
- Cards/popovers: `oklch(0.96 0.006 250)` (subtle lift)
- Dark mode: shadcn defaults (to be refined when toggle is added)

---

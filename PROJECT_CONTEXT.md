# Chief Live Gaming – Project Context

## Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui

## Scope for v1
- Pages:
  - Home: hero, nav, gallery teaser, quick links
  - Gallery: responsive grid, simple lightbox
  - About: short “who I am”
  - Commissions: process, FAQ, contact form
- To add later (not in v1):
  - Blog/Notes
  - eBay page
  - Paintfinity section

## Design & architecture constraints
- Use shadcn/ui for primitives:
  - Button, Input, Textarea, Label, Card, Dialog, Sheet, Accordion, Form.
- Keep global providers (theme, toasts, etc.) at the root layout level.
- Prefer Server Components for pages unless they need interactivity.
- Use Tailwind v4 design tokens and a few global utilities in `styles/globals.css`:
  - `.site-section`
  - `.site-card`
  - `.page-header`
  - `.link-pill`

## Current priority
1. Make sure Tailwind v4 + shadcn are wired correctly.
2. Set up root layout + providers and a minimal SiteShell (header, main, footer).
3. Add base shadcn primitives and verify they render.
4. Build minimal page skeletons for: Home, Gallery, About, Commissions.

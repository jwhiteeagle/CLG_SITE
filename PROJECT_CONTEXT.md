# Chief Live Gaming – Project Context

> High-level project context, scope, and architecture decisions. For workflow details see `CLG_SITE_LOGS.md`; for tasks see `CLG_SITE_TODO.md`.

---

## Project Overview

**Project:** Chief Live Gaming website (`www.chieflivegaming.com`)  
**Purpose:** Commission miniature painting business — landing page, portfolio, contact  
**Owner:** Jake

---

## Current Status

**Theme system:** Complete — Bilibili-style color system with dark/light modes  
**Logo & branding:** Complete — Gradient logo implemented with Orbitron header font  
**Header styling:** Complete — Unified card-style design across all header elements  
**Page structure:** Complete — Home, Gallery, About, Commissions pages scaffolded  
**Brand kit:** Complete — Palette docs, visual previews, color theory reference, logo variations  
**Next focus:** Add real content (gallery images, contact form wiring)

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
- **Theme tokens:** oklch color format, Bilibili-style chromatic grays
- **Typography:** Orbitron (extrabold) for header branding, Geist Sans for body text

---

## Color System

### Dark Mode: "Midnight Atmosphere"
- Background: `oklch(15% 0.031 272)` — deep blue-violet
- Primary: `oklch(75% 0.114 232)` — steel blue
- Warm accent: `oklch(44% 0.162 359)` — magenta (used at 5-10% opacity for card washes)

### Light Mode: "Pastel Twilight"
- Background: `oklch(88% 0.025 270)` — soft lavender-gray (not flashbang white)
- Primary: `oklch(45% 0.12 232)` — steel blue (darker for light bg)
- Warm accent: `oklch(55% 0.14 359)` — magenta

### Logo Gradient
- Direction: 135° diagonal (top-left to bottom-right)
- Dark mode: `oklch(62% 0.18 30)` → `oklch(75% 0.114 232)` (orange-red → steel blue)
- Light mode: `oklch(50% 0.20 30)` → `oklch(45% 0.12 232)` (darker, more saturated)

### Design Principles
- Chromatic grays (violet-tinted, not neutral)
- Value compression (atmospheric feel)
- One primary pop + warm accent whisper
- Soft text contrast (92% light / 20% dark, not pure white/black)

---

## Key Decisions Log

### [12-06-25] Logo refresh + header unification
- Selected diagonal gradient logo (Option 5: orange-red → steel blue at 135°)
- Logo implemented at 72x72px card with 70x70px image (tightly cropped)
- Unified all header elements with `.site-card` styling (logo, nav buttons, theme toggle)
- Added Orbitron font (extrabold, 2xl) for "Chief Live Gaming" header text
- Increased header height from 64px to 80px to accommodate larger logo
- Logo and text separated into independent clickable elements for cleaner styling

### [12-06-25] Bilibili-style color system locked in
- Dark mode: "Midnight Atmosphere" with steel blue primary + magenta warm accent
- Light mode: "Pastel Twilight" — soft lavender-gray, same accent hues
- Warm accent used at low opacity (5-10%) for nav links, cards, inputs
- Brand kit created in `/brand_kit_clg/` with palette docs and visual previews

### [12-03-25] Dark mode toggle added
- next-themes for theme switching
- ThemeToggle component with inset button styling
- Inset shadow styling for cards (borderless)

### [12-02-25] Directory structure
- `(site)` route group for public pages with shared SiteShell layout
- `components/` and `lib/` at project root (matches shadcn aliases)
- Custom utility classes use shadcn theme tokens for light/dark compatibility

---

## File Structure Reference

```
clg_site/
├── app/
│   ├── (site)/           # Public pages route group
│   │   ├── page.tsx      # Home
│   │   ├── gallery/
│   │   ├── about/
│   │   ├── commissions/
│   │   └── layout.tsx    # SiteShell (header/footer)
│   ├── layout.tsx        # Root layout (ThemeProvider, Orbitron font)
│   └── styles/globals.css
├── components/
│   ├── ui/               # shadcn primitives
│   ├── site-header.tsx   # Logo + Orbitron text + nav + theme toggle
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── public/images/
│   ├── brand/
│   │   └── clg-logo-2025-crop500.png  # Gradient logo (cropped)
│   ├── featured/
│   └── gallery/
└── brand_kit_clg/        # Palette docs + visual previews + logo files
    ├── 500x500 logo2025.png
    ├── clg-logo-2025-crop500.png
    ├── CLG_DARK_PALETTE.md
    ├── CLG_Dark_Palette_Preview.html
    └── COLOR_THEORY_REFERENCE.md
```

---

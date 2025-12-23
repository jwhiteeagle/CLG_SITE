# Chief Live Gaming – Project Context

> High-level project context, scope, and architecture decisions. For workflow logs/TODOs see README “Documentation Suite” (managed via `jake_mcp`).

---

## Project Overview

**Project:** Chief Live Gaming website (`www.chieflivegaming.com`)  
**Purpose:** Commission miniature painting business — landing page, portfolio, contact  
**Owner:** Jake

---

## Current Status

**Theme system:** Complete — Bilibili-style color system with dark/light modes  
**Logo & branding:** Complete — Gradient logo implemented with Orbitron header font + tagline  
**Header styling:** Complete — Unified iOS-inspired card design across all header elements  
**Featured carousel:** Complete - Auto-playing showcase sourced from `/public/images/featured`  
**Design system:** Complete — iOS-inspired styling with gradient overlays, outer shadows, crisp borders  
**Page structure:** Complete — Home with carousel, Gallery/About/Commissions pages scaffolded  
**Brand kit:** Complete — Palette docs, visual previews, color theory reference, logo variations  
**Next focus:** Add real content (gallery grid, about page, commissions details, contact form)

---

## V1 Scope

**In scope:**
- Home: featured carousel, quick links, CTA card ✅
- Gallery: responsive image grid
- About: short bio
- Commissions: process overview, contact form

**Deferred (post-v1):**
- Blog/Notes
- eBay page
- Paintfinity/3D printing section

---

## Design & Architecture Constraints

- **shadcn/ui primitives in repo:** Button, Card, Carousel, Input, Label, Textarea
- **Carousel:** embla-carousel-react with autoplay plugin (4s delay)
- **Global providers** at root layout level (theme)
- **Prefer Server Components** unless interactivity required
- **Custom utility classes** in `globals.css`: `.site-section`, `.site-card`, `.page-header`, `.link-pill`
- **Theme tokens:** oklch color format, Bilibili-style chromatic grays
- **Typography:** Orbitron (extrabold, 2xl) for header branding + (bold, base) for tagline; Geist Sans for body text
- **iOS-inspired design:** Gradient overlays (8% opacity), outer shadows, crisp borders, subtle rounded corners

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

### iOS-Inspired Design Elements
- **Gradient overlay:** Primary color at 8% opacity via `::before` pseudo-element
- **Outer shadows:** Two-layer soft shadows (8px + 4px blur) for floating effect
- **Crisp borders:** 1px solid white at 10% (light) / 5% (dark) opacity
- **Corner radius:** `rounded-lg` (10px) for cards, `rounded-md` (6px) for buttons
- **Hover lift:** Elements translate up 0.5px with enhanced shadow

### Design Principles
- Chromatic grays (violet-tinted, not neutral)
- Value compression (atmospheric feel)
- One primary pop + warm accent whisper
- Soft text contrast (92% light / 20% dark, not pure white/black)
- iOS-inspired depth through gradients and shadows

---

## Featured Carousel

Home page features an auto-playing carousel showcasing Jake's work:
- **Images** from `/public/images/featured/` (auto-detected at build time)
- **Auto-play:** 4 second delay
- **Interaction:** Pauses on hover and user interaction
- **Aspect ratio:** 16:9 (aspect-video)
- **Navigation:** Previous/Next arrows positioned at left-4/right-4
- **Styling:** iOS-inspired gradient overlay + border
- **Layout:** Full-width, flush with header (pt-0 on home page)

---

## Key Decisions Log

### [12-07-25] iOS-inspired design system + featured carousel
- Analyzed iOS 18 design language from iPhone screenshot
- Implemented gradient overlays (primary at 8% opacity) across all cards/buttons
- Added two-layer outer shadows for floating effect
- Added crisp white borders at low opacity (10% light / 5% dark)
- Corner radius kept at `rounded-lg` and `rounded-md` (not iOS's larger radius)
- Installed shadcn carousel + embla-carousel-autoplay
- Created FeaturedCarousel component with 4s autoplay
- Added "Miniature Painting Services" tagline to header with matching width
- Theme toggle sized to match nav buttons (34x34px square)

### [12-06-25] Logo refresh + header unification
- Selected diagonal gradient logo (Option 5: orange-red → steel blue at 135°)
- Logo implemented at 72x72px card with 70x70px image (tightly cropped)
- Unified all header elements with card styling (logo, nav buttons, theme toggle)
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
- ThemeToggle component with card styling
- Card styling evolved from inset-only to iOS-inspired outer shadows

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
│   │   ├── page.tsx      # Home (carousel, quick links, CTA)
│   │   ├── gallery/
│   │   ├── about/
│   │   ├── commissions/
│   │   └── layout.tsx    # SiteShell (header/footer)
│   ├── layout.tsx        # Root layout (ThemeProvider, Orbitron font)
│   └── styles/globals.css # Tailwind v4 + iOS-inspired styling
├── components/
│   ├── ui/               # shadcn primitives (Button, Card, Carousel, etc.)
│   ├── site-header.tsx   # Logo + Orbitron text/tagline + nav + theme toggle
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx  # 34x34 square button with iOS styling
│   └── featured-carousel.tsx # Auto-playing carousel (4s)
├── public/images/
│   ├── brand/
│   │   └── clg-logo-2025-crop500.png  # Gradient logo (cropped)
│   ├── featured/         # carousel images
│   └── gallery/
└── brand_kit_clg/        # Palette docs + visual previews + logo files
    ├── 500x500 logo2025.png
    ├── clg-logo-2025-crop500.png
    ├── CLG_DARK_PALETTE.md
    ├── CLG_Dark_Palette_Preview.html
    └── COLOR_THEORY_REFERENCE.md
```

---

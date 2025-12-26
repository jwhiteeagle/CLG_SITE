# Chief Live Gaming

Commission miniature painting business website for [chieflivegaming.com](https://www.chieflivegaming.com).

---

## Tech Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Framework       | Next.js 16 (App Router)    |
| Language        | TypeScript                 |
| Styling         | Tailwind CSS v4            |
| Components      | shadcn/ui (new-york style) |
| Carousel        | embla-carousel-react       |
| Package Manager | npm                        |

---

## Directory Structure

```txt
clg_site/
  app/
    (site)/                       # Route group (no URL segment)
      layout.tsx                  # SiteShell: header + footer
      page.tsx                    # Home (/) with featured carousel
      gallery/page.tsx            # /gallery (category index)
      gallery/[category]/page.tsx # /gallery/<category>
      about/page.tsx              # /about
      commissions/page.tsx        # /commissions
      ebay-store/page.tsx         # /ebay-store
      paintfinity/page.tsx        # /paintfinity
    layout.tsx                    # Root: html, body, fonts (Orbitron), providers
    styles/globals.css            # Tailwind v4 + theme tokens + site utilities
  components/
    ui/                           # shadcn primitives (Button, Card, Carousel, etc.)
    app/                          # app patterns (Primitives -> Patterns -> Pages)
      site-header.tsx
      site-footer.tsx
      theme-toggle.tsx
      theme-provider.tsx
      featured-carousel.tsx
      brand-mark.tsx
      gallery-category-header.tsx
      text-card-rem60.tsx
      copyable-template-box.tsx
      buy-me-a-coffee-button.tsx
      bmac.qr.block.tsx
  lib/
    gallery-config.ts
    gallery.ts
    public-images.ts
    contact.ts
    utils.ts                      # cn() helper
  public/
    images/
      brand/                      # Logo files
      featured/                   # Featured work images for carousel
      gallery/                    # Gallery categories (1 folder per category)
  brand_kit_clg/                  # Palette docs, logo variations
  PROJECT_CONTEXT.md              # Project context
  package.json
```

---

## App Router Patterns

- **Root layout (`app/layout.tsx`):** Wraps entire app - `<html>`, `<body>`, Orbitron font, global CSS, ThemeProvider.
- **Route group `(site)`:** Groups public pages under shared layout without adding `/site/` to URLs.
- **Site layout (`app/(site)/layout.tsx`):** Wraps pages with `<SiteHeader />` and `<SiteFooter />`.
- **Page files:** Each `page.tsx` renders content only; layout handles chrome.
- **Layouts persist:** Don't remount on navigation - good for nav state, scroll position.

---

## Custom Utility Classes

Defined in `app/styles/globals.css`:

| Class           | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `.site-section` | Responsive container (`max-w-7xl`, responsive padding)        |
| `.site-hero`    | Wider hero container (`max-w-screen-2xl`, responsive padding) |
| `.site-card`    | iOS-inspired card with gradient overlay, outer shadow, border |
| `.surface-clickable` | Shared clickable surface (hover/focus styling)          |

All classes use shadcn theme tokens for light/dark compatibility.

---

## Design System

### iOS-Inspired Styling

- **Gradient overlays:** Subtle diagonal gradient (primary color at 8% opacity)
- **Outer shadows:** Two-layer soft shadows for floating effect
- **Crisp borders:** Thin white borders at 10% (light) / 5% (dark) opacity
- **Rounded corners:** `rounded-lg` and `rounded-md` for modern feel
- **Hover animations:** Lift elements with enhanced shadows

### Typography

- **Headers:** Orbitron (extrabold, 2xl) for "Chief Live Gaming"
- **Subheaders:** Orbitron (bold, base) for "Miniature Painting Services"
- **Body:** Geist Sans

---

## Featured Carousel

The home page features an auto-playing carousel:

- **Images** from `/public/images/featured/` (auto-detected at build time)
- **4 second** auto-play delay
- **Controls**: Previous / Play-Pause / Next (no hover pause)
- **Aspect ratio:** 16:9 (aspect-video)
- **Navigation:** Buttons + swipe/drag support

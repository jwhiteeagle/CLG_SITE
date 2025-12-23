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

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Directory Structure

```
clg_site/
├── app/
│   ├── (site)/                   # Route group (no URL segment)
│   │   ├── layout.tsx            # SiteShell: header + footer
│   │   ├── page.tsx              # Home (/) with featured carousel
│   │   ├── gallery/page.tsx      # /gallery
│   │   ├── about/page.tsx        # /about
│   │   └── commissions/page.tsx  # /commissions
│   ├── layout.tsx                # Root: html, body, fonts (Orbitron), providers
│   └── styles/globals.css        # Tailwind v4 + theme tokens + iOS-inspired styling
├── components/
│   ├── ui/                       # shadcn primitives (Button, Card, Carousel, etc.)
│   ├── site-header.tsx           # Navbar with logo + Orbitron branding
│   ├── site-footer.tsx           # Footer
│   ├── theme-toggle.tsx          # Dark/light mode toggle
│   ├── theme-provider.tsx        # next-themes wrapper
│   └── featured-carousel.tsx     # Auto-playing image carousel (4s delay)
├── lib/
│   └── utils.ts                  # cn() helper
├── public/
│   └── images/
│       ├── brand/                # Logo files
│       ├── featured/             # Featured work images for carousel
│       └── gallery/              # Gallery images
├── brand_kit_clg/                # Palette docs, logo variations
├── PROJECT_CONTEXT.md            # Project context
└── package.json
```

## Documentation Suite (outside repo)

Agent workflow docs live outside the git repo and are managed via `jake_mcp`:
- Primer: `primer://clg_site/clg_site_primer` (`F:\DEV_REFERENCES\primers\project\clg_site\CLG_SITE_PRIMER.md`)
- Context: `context://project/clg_site` (`F:\DEV_REFERENCES\primers\project\clg_site\CLG_SITE_CONTEXT.md`)
- Logs: `primer://clg_site/clg_site_logs` (`F:\DEV_REFERENCES\primers\project\clg_site\CLG_SITE_LOGS.md`)
- TODO: `primer://clg_site/clg_site_todo` (`F:\DEV_REFERENCES\primers\project\clg_site\CLG_SITE_TODO.md`)

---

## App Router Patterns

- **Root layout (`app/layout.tsx`):** Wraps entire app — `<html>`, `<body>`, Orbitron font, global CSS, ThemeProvider.
- **Route group `(site)`:** Groups public pages under shared layout without adding `/site/` to URLs.
- **Site layout (`app/(site)/layout.tsx`):** Wraps pages with `<SiteHeader />` and `<SiteFooter />`.
- **Page files:** Each `page.tsx` renders content only; layout handles chrome.
- **Layouts persist:** Don't remount on navigation — good for nav state, scroll position.

---

## Custom Utility Classes

Defined in `app/styles/globals.css`:

| Class           | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `.site-section` | Responsive container (`max-w-5xl`, responsive padding)        |
| `.page-header`  | Title + subtitle stack with spacing                           |
| `.site-card`    | iOS-inspired card with gradient overlay, outer shadow, border |
| `.link-pill`    | Inline pill for quick links                                   |

All classes use shadcn theme tokens for light/dark compatibility.

---

## Design System

### iOS-Inspired Styling

- **Gradient overlays:** Subtle diagonal gradient (primary color at 8% opacity)
- **Outer shadows:** Two-layer soft shadows for floating effect
- **Crisp borders:** Thin white borders at 10% (light) / 5% (dark) opacity
- **Rounded corners:** `rounded-lg` and `rounded-md` for modern feel
- **Hover animations:** Lift elements with enhanced shadows

### Color System

- **Dark Mode:** "Midnight Atmosphere" — deep blue-violet (`oklch(15% 0.031 272)`)
- **Light Mode:** "Pastel Twilight" — soft lavender-gray (`oklch(88% 0.025 270)`)
- **Primary:** Steel blue with gradient logo (orange-red → steel blue at 135°)
- **Warm Accent:** Magenta used at low opacity for depth

### Typography

- **Headers:** Orbitron (extrabold, 2xl) for "Chief Live Gaming"
- **Subheaders:** Orbitron (bold, base) for "Miniature Painting Services"
- **Body:** Geist Sans

---

## Featured Carousel

The home page features an auto-playing carousel:

- **Images** from `/public/images/featured/` (auto-detected at build time)
- **4 second** auto-play delay
- **Pauses on hover** and user interaction
- **Aspect ratio:** 16:9 (aspect-video)
- **Navigation:** Previous/Next arrows + swipe/drag support

---

## Tailwind v4 Notes

This project uses Tailwind CSS v4 with the new CSS-first configuration:

- **No `tailwind.config.*` file** — config lives in CSS
- **Entry syntax:** `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- **PostCSS plugin:** `@tailwindcss/postcss` (not legacy `tailwindcss` plugin)
- **Color format:** oklch for theme tokens

---

## License

Private project. All rights reserved.

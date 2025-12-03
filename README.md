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
│   │   ├── page.tsx              # Home (/)
│   │   ├── gallery/page.tsx      # /gallery
│   │   ├── about/page.tsx        # /about
│   │   └── commissions/page.tsx  # /commissions
│   ├── layout.tsx                # Root: html, body, fonts, providers
│   └── styles/globals.css        # Tailwind v4 + theme tokens
├── components/
│   ├── ui/                       # shadcn primitives
│   ├── site-header.tsx           # Navbar
│   └── site-footer.tsx           # Footer
├── lib/
│   └── utils.ts                  # cn() helper
├── public/                       # Static assets
├── PROJECT_CONTEXT.md            # Project context + workflow log
└── package.json
```

---

## App Router Patterns

- **Root layout (`app/layout.tsx`):** Wraps entire app — `<html>`, `<body>`, fonts, global CSS.
- **Route group `(site)`:** Groups public pages under shared layout without adding `/site/` to URLs.
- **Site layout (`app/(site)/layout.tsx`):** Wraps pages with `<SiteHeader />` and `<SiteFooter />`.
- **Page files:** Each `page.tsx` renders content only; layout handles chrome.
- **Layouts persist:** Don't remount on navigation — good for nav state, scroll position.

---

## Custom Utility Classes

Defined in `app/styles/globals.css`:

| Class           | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| `.site-section` | Responsive container (`max-w-5xl`, responsive padding) |
| `.page-header`  | Title + subtitle stack with spacing                    |
| `.site-card`    | Bordered card with hover shadow                        |
| `.link-pill`    | Inline pill for quick links                            |

All classes use shadcn theme tokens for light/dark compatibility.

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

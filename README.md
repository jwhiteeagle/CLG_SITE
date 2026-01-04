# Chief Live Gaming

Static website for [chieflivegaming.com](https://www.chieflivegaming.com).

Commission miniature painting business landing page, portfolio, organized image galleries, links and info for other projects Jake is working on.

Deployed on lithiumhosting (shared hosting due to build size from images)

---

## Tech Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Framework       | Next.js 16 (App Router)    |
| Language        | TypeScript                 |
| Styling         | Tailwind CSS v4            |
| Components      | shadcn/radix               |
| Package Manager | npm                        |

---

## Static export (shared hosting)

- Build: `npm run build`
- Output: `out/` (upload this folder’s contents to your hosting web root)

---

## Design Practices

### Frontend Goal: Develop reusable sections to keep route pages lightweight
- Overkill modular pattern for frontend component design to test strategies for larger future projects. 
  - primtives imported with radix/shadcn, modified with globals.css
  - css tokens assembled with primitives avoid repeating markup
  - shared patterns allow global tweaks to UI and prevent weird drift

- Pair programmed with codex CLI, claude code, gemini CLI for various steps.
- Managed long term context, universal agent guardrails, TODOs, logs, etc with a local MCP server.

---

## Directory Structure (approuter driven)

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
      links/page.tsx              # /links
      paintfinity/page.tsx        # /paintfinity
```

## Gallery Stuffs

- **Category discovery:** folders under `/public/images/gallery/<category>/` drive available category routes.
- **Index cards (`/gallery`):** initial cover = newest image. then optional client-side cover cycling with a per-user “Gallery motion effect” toggle.
- **Category pages (`/gallery/[category]`):** click an image to open an in-page lightbox (prev/next + close; supports keyboard + mobile swipe).

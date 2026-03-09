# Chief Live Gaming

Static website for [chieflivegaming.com](https://www.chieflivegaming.com).

Commission miniature painting business landing page, portfolio, organized image galleries, links and info for other mini painting related projects Jake is working on.

---

## Tech Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript              |
| Styling         | Tailwind CSS v4         |
| Components      | shadcn/radix            |
| Package Manager | npm                     |

---

## Design Practices

- vibe in vscode with codex CLI & claude code for various steps.

- I used this project as a messy PoC for a frontend layering strategy I plan to use for other internal projects.

### Frontend Goal: Develop reusable sections to keep route pages lightweight

- utilize shadcn primitives or components from official shadcn registries
- pair with a css style sheet (tailwind v4) and reuse the official shadcn css token names throughout project
- build larger more specific pattern components for bulk of design, upcycle shadcn stuff, use utilty classes heavily
- import building blocks at route level for composition

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

---

## Gallery Stuffs

- **Category discovery:** folders under `/public/images/gallery/<category>/` drive available category routes.
- **Index cards (`/gallery`):** static cover image per category (newest image by numeric-prefix sorting).
- **Category pages (`/gallery/[category]`):** click an image to open an in-page lightbox (prev/next + close; supports keyboard + mobile swipe).

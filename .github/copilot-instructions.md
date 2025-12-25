<!-- Copilot / AI agent instructions for the CLG_SITE repository -->

# Quick Context

This is a Next.js (v16) site using the App Router (`app/`) with TypeScript (strict mode), TailwindCSS, and a small set of design tokens expressed as CSS custom properties. Key directories:

- `app/` — Next.js app router pages and layout (server & client components).
- `components/` — site components; `components/ui/` contains reusable UI primitives.
- `lib/` — small helpers (see `lib/utils.ts` -> `cn`).
- `public/images/*` — static image assets referenced via `next/image` (paths like `/images/featured/...`).
- `brand_kit_clg/` — design token references & palettes (useful for visual changes).

# High-level architecture notes

- App Router: The codebase uses Next's `app/` directory - prefer server components by default and add `"use client"` at the top of files that require client-side hooks or browser-only libraries (examples: `components/app/theme-toggle.tsx`, `components/app/featured-carousel.tsx`).
- UI primitives: `components/ui/*` hold the building blocks (buttons, inputs, carousel). They use `class-variance-authority` (`cva`) for style variants and the shared `cn` helper in `lib/utils.ts` (which calls `clsx` + `twMerge`). Follow these patterns when adding new primitives.
- Theming: Theme tokens live as CSS custom properties in `app/styles/globals.css`. `next-themes` is used via `components/theme-provider.tsx` and `components/theme-toggle.tsx` — avoid hard-coded colors; prefer the CSS variables (e.g. `var(--primary)`, `var(--card)`).
- Images & performance: Images live in `public/images/...` and are rendered with Next's `Image` component using `fill` and `priority` for hero/featured items (see `components/featured-carousel.tsx`). When adding large galleries, keep `priority` only for the first image.

# Conventions & patterns (concrete)

- Path alias: import with `@/` (configured in `tsconfig.json` paths). Use `@/components/...`, `@/lib/utils` etc.
- Client vs Server: Prefer server components for pages/layouts. Add `"use client"` at the top of a component file when you need state/hooks, event handlers, browser-only libs (e.g., `embla-carousel-autoplay` in `components/featured-carousel.tsx`).
- Styling: Use Tailwind utility classes and the CSS variables defined in `app/styles/globals.css`. For complex variants, keep variants in `cva` like `components/ui/button.tsx`.
- Class merging: Use the `cn(...)` helper from `lib/utils.ts` to combine classes and let `twMerge` resolve conflicts.
- Accessibility: UI components include focus and screen-reader patterns (e.g., `sr-only` spans). Keep these when changing UI.

# Developer workflows & commands

- Local dev: `npm run dev` (runs `next dev`).
- Build: `npm run build` then `npm run start` for production preview.
- Linting: `npm run lint` (uses `eslint`).
- Formatting: `npm run format` (Prettier). Run format before committing.

# Integration points & dependencies to be aware of

- `next-themes` - theme context provider; client usage in `components/app/theme-provider.tsx` and `components/app/theme-toggle.tsx`.
- `embla-carousel-react` + `embla-carousel-autoplay` - used in `components/app/featured-carousel.tsx` and underlying `components/ui/carousel.tsx`.
- `class-variance-authority` + `clsx` + `tailwind-merge` — pattern for variant-driven UI primitives in `components/ui/*`.
- `lucide-react` — icons used in toggles and controls.

# Examples to follow (copy/adapt)

- Client component hook pattern (theme-toggle):
  - File: `components/app/theme-toggle.tsx`
  - Key: uses `"use client"`, `useTheme()` from `next-themes`, guarded mount check before accessing `resolvedTheme`.

- Carousel + images:
  - File: `components/app/featured-carousel.tsx`
  - Key: uses Embla Autoplay plugin, `next/image` with `fill`, images served from `/images/featured/<name>`.

# When editing or adding features

- Keep components small and composable; add new shared primitives under `components/ui/`.
- Use TypeScript with explicit props types; repo has `strict: true` in `tsconfig.json` — fix type errors rather than disable strictness.
- Use existing CSS variables rather than introducing new color constants unless adding a new token in `app/styles/globals.css`.

# Files to inspect for context when making changes

- `app/layout.tsx` and `app/(site)/layout.tsx` — top-level layout patterns.
- `components/site-header.tsx`, `components/site-footer.tsx` — navigation and footer patterns.
- `components/ui/*` — primitives (follow these for new components).
- `lib/utils.ts` — helper utilities (`cn`).
- `app/styles/globals.css` — theme tokens and Tailwind base/components.

# Final notes

Keep pull requests small and component-scoped. Mention in PR descriptions which CSS variables or UI primitives you touched so reviewers can validate visual consistency against `brand_kit_clg/` palettes.

If anything here seems incomplete or outdated, tell me which area you want expanded (build steps, test patterns, or deeper file examples) and I will iterate.

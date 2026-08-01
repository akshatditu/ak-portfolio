# akshat-portfolio

Single-page portfolio for **Akshat Gupta** — Senior Frontend Engineer & Technical Lead.
Built with Next.js 16 (App Router), React 19, TypeScript 5.9 and Tailwind CSS v4.

**Live: <https://www.akshatguptadev.in>**

The site is one scrollable page. Every nav item smooth-scrolls to a section; project case
studies open in dialogs; there are no secondary routes beyond the metadata handlers
(sitemap, robots, manifest, OG image, favicon).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000

npm run verify     # typecheck + lint + production build
```

## Environment

There are **no required environment variables**. The site builds and runs with none set.

| Variable | Without it |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production builds use `PRODUCTION_URL` (`https://www.akshatguptadev.in`) from `src/config/site.ts`; `next dev` uses `http://localhost:3000` |

Set it only to point a build at a different origin, such as a staging host. The domain is
hardcoded rather than env-only so a deploy that forgets the variable still emits correct
canonical, OG and sitemap URLs instead of a `*.vercel.app` hostname.

There is no contact form by design — the Contact section is a `mailto:` link, so nothing
needs a backend or an email API key.

## Architecture

```
src/
  app/                    Routes: the single page + metadata handlers.
    layout.tsx            RSC root — fonts, skip link, JSON-LD, ⌘K provider
    page.tsx              Composes the sections in scroll order
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.tsx
    not-found.tsx error.tsx
  features/               One folder per section, each with its own components/
    hero/ about/ skills/ experience/ work/ resume/ contact/
  components/
    motion/               THE animation system (Reveal, Stagger, TextReveal, …)
    primitives/           Section, Container, GlassCard, Skeleton, EmptyState, …
    layout/               Header, Footer, MobileNav, CommandPalette, cursor
    ui/                   Button, Badge (shadcn-style, CVA variants)
    icons/                Brand SVGs (lucide v1 removed brand marks)
  content/data/           ★ Typed content model — the single source of truth
  config/                 site.ts (identity), navigation.ts (sections + scroll)
  hooks/                  Reduced motion, scroll-spy, pointer, shortcuts
  lib/                    seo.ts, structured-data.ts, search-index.ts, utils.ts
  styles/globals.css      ★ The design system (Tailwind v4 CSS-first tokens)
```

### Decisions worth knowing about

- **Content model as single source of truth.** Job title, projects, skills and education live
  once in `src/content/data/*.ts` and feed the page, the résumé section, JSON-LD, the ⌘K
  search index and the OG image. A fact cannot disagree with itself.
- **Content policy: résumé / LinkedIn / public READMEs only.** The `Project` type has no
  `challenges`/`tradeoffs`/`lessons` fields and `Skill` has no proficiency level — earlier
  drafts had them, and filling them meant inventing narrative. Removing the *fields* makes
  fabricated content structurally impossible. There are no testimonials for the same reason.
- **One theme, from the headshot.** Deep navy `#1B2A4A` (hero/nav/footer), off-white
  `#F7F8FA` + charcoal `#22272E` (content), warm amber `#E8A13D` as the single accent.
  `.theme-navy` is a *scope class* that remaps the same CSS variables, so token-based
  utilities work identically inside dark sections. No light/dark toggle by design.
- **RSC-first.** Server Components by default; every `use client` file is a leaf with a
  comment naming the browser API that forced it.
- **Motion is a system.** All animation goes through `components/motion` (LazyMotion,
  transform/opacity only) and every primitive degrades under `prefers-reduced-motion`.
- **Accessibility is load-bearing**, not a pass at the end: skip link, focus moved to the
  section after anchor navigation, Radix for dialogs/accordions, an accessible list
  equivalent for the SVG architecture diagram, no zoom cap.
- **TypeScript pinned to 5.9** (not the TS 7 Go-native compiler) until the lint/framework
  ecosystem settles. Revisit deliberately.

## Deployment

Deployed on Vercel at <https://www.akshatguptadev.in>. Push to `main` and Vercel builds it —
no environment variables to configure.

If the domain ever changes, change `PRODUCTION_URL` in `src/config/site.ts`. That one
constant feeds the canonical URL, OpenGraph and Twitter tags, `metadataBase`, the sitemap
and `robots.txt`, so nothing can disagree with anything else.

**Serve the site on `www`.** `PRODUCTION_URL` includes it, and a canonical URL that doesn't
match the host actually served points at a redirect. If you move to the apex domain, update
the constant to match.

## Still open

- [ ] `src/config/site.ts` — X / LeetCode / Medium links are `placeholder: true` and hidden
      site-wide; fill in a URL and delete the flag to surface one. (The Twitter card's
      `creator` field in `src/lib/seo.ts` is deliberately omitted until the X handle is real.)
- [ ] `public/akshat.jpg` — swap if the headshot changes (hero expects portrait ~3:4).

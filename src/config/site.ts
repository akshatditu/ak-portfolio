/**
 * =============================================================================
 * SITE CONFIGURATION — the single place to edit identity and links.
 * =============================================================================
 *
 * Everything a recruiter sees about "who this is" resolves from here: metadata,
 * OpenGraph, JSON-LD, the header, the footer, the contact section and the
 * command palette. Change a value once, it changes everywhere.
 *
 * PLACEHOLDER POLICY: links marked `placeholder: true` are NOT rendered
 * anywhere. They exist so the wiring is already done — fill in the `url` and
 * delete the flag, and the icon appears in the footer, contact section and ⌘K
 * automatically. Nothing 404s in the meantime.
 */

export type SocialId = 'github' | 'linkedin' | 'x' | 'leetcode' | 'medium' | 'email';

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Shown in the command palette and as part of the accessible name. */
  handle: string;
  url: string;
  /** When true this link is hidden site-wide until a real URL is supplied. */
  placeholder?: boolean;
}

/**
 * The live origin, including `www` — that is the host the domain actually
 * serves, and a canonical URL has to match it exactly or it points somewhere
 * that redirects.
 *
 * It lives in code rather than only in an env var on purpose: a deploy that
 * forgets to set `NEXT_PUBLIC_SITE_URL` would otherwise silently fall back to
 * the generated `*.vercel.app` hostname, and every canonical, OG image and
 * sitemap entry would name the wrong site. Wrong-but-plausible URLs are the
 * hardest SEO bug to notice.
 */
export const PRODUCTION_URL = 'https://www.akshatguptadev.in';

/**
 * Resolution order: an explicit env var wins (so a staging host can override
 * it), then the real domain for any production build — including Vercel
 * previews, which should point their canonicals at production rather than at
 * their own throwaway hostname — then localhost for `next dev`.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_URL;
  }
  return 'http://localhost:3000';
}

export const siteConfig = {
  name: 'Akshat Gupta',
  /** Short mark for the nav badge and OG image corner. */
  initials: 'AG',

  // --- Positioning ---------------------------------------------------------
  // Swap this one string to re-position the entire site.
  role: 'Senior Frontend Engineer & Technical Lead',
  shortRole: 'Senior Frontend Engineer',

  company: 'Majid Al Futtaim (Carrefour)',
  companyTeam: 'RACE — Retail Analytics Centre of Excellence',
  companyUrl: 'https://www.majidalfuttaim.com',
  currentTitle: 'Manager, App Development',

  location: 'Gurgaon, India',
  locality: 'Gurgaon',
  region: 'Haryana',
  country: 'IN',

  /** Career start. Years of experience is DERIVED from this, never hardcoded,
   *  so the hero cannot quietly go stale in January. */
  careerStart: '2020-01-01',

  /**
   * The 30-second pitch, condensed from the résumé's own summary line:
   * "Full-stack developer … Frontend-heavy engineer (React, TypeScript, Vite)
   * with strong backend capability (Python, Flask, SQLAlchemy, PostgreSQL) …
   * Owns applications end-to-end — from API and data layer to high-performance
   * dashboards."
   */
  tagline:
    'Frontend-heavy engineer with strong backend capability, owning applications end to end — from the API and data layer through to high-performance dashboards.',

  description:
    'Akshat Gupta is a frontend-heavy full-stack engineer and technical lead in Gurgaon, India, currently leading application development for a retail analytics platform at Majid Al Futtaim (Carrefour). React, TypeScript, Python, Flask, PostgreSQL and Databricks.',

  url: resolveSiteUrl(),
  /** Path in /public. Drop the real PDF at this path. */
  resumePath: '/Akshat_Gupta_Resume.pdf',

  email: 'akshatav56@gmail.com',

  locale: 'en_IN',
  languageTag: 'en-IN',
} as const;

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    handle: siteConfig.email,
    url: `mailto:${siteConfig.email}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'akshat-g',
    url: 'https://www.linkedin.com/in/akshat-g-10b90bb4/',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'akshatditu',
    url: 'https://github.com/akshatditu',
  },
  // Not supplied — hidden from every surface until a real URL replaces these.
  { id: 'x', label: 'X', handle: '', url: '', placeholder: true },
  { id: 'leetcode', label: 'LeetCode', handle: '', url: '', placeholder: true },
  { id: 'medium', label: 'Medium', handle: '', url: '', placeholder: true },
];

/** The only list any component should render. Placeholders never reach the DOM. */
export const publicSocialLinks = socialLinks.filter((link) => !link.placeholder);

export function getSocialLink(id: SocialId): SocialLink | undefined {
  return publicSocialLinks.find((link) => link.id === id);
}

/**
 * Years of experience, derived from `careerStart`. Floors to whole years so we
 * never round up into a claim that isn't true yet.
 */
export function getYearsOfExperience(now: Date = new Date()): number {
  const start = new Date(siteConfig.careerStart);
  const years = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}

export type SiteConfig = typeof siteConfig;

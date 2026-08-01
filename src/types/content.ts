/**
 * =============================================================================
 * CONTENT MODEL
 * =============================================================================
 * Every piece of portfolio content is typed here and authored in
 * `src/content/data/*`. The page, the JSON-LD, the sitemap, the ⌘K search index
 * and the OG image all read from the same objects — there is no second copy of
 * "what my job title is" anywhere in the codebase.
 *
 * ONE RULE GOVERNS THIS FILE: it may only model facts that exist on Akshat's
 * résumé, his LinkedIn, or a public README of his own project.
 *
 * That is why there is no `Testimonial` type, no `problem`/`challenges`/
 * `tradeoffs`/`lessons` fields on `Project`, and no proficiency level on
 * `Skill`. Earlier drafts had all of those, and populating them required
 * inventing a narrative he never wrote. Removing them from the *type* — rather
 * than just emptying the data — makes it structurally impossible for invented
 * content to creep back in later.
 */

/* -------------------------------------------------------------------------- */
/*                                   METRICS                                  */
/* -------------------------------------------------------------------------- */

export interface Metric {
  /** Numeric portion, animated on reveal. */
  value: number;
  /** e.g. "+", "%" — rendered immediately after the number. */
  suffix?: string;
  prefix?: string;
  label: string;
  /** One line of context, so a bare number never reads as a boast. */
  detail?: string;
  decimals?: number;
}

/* -------------------------------------------------------------------------- */
/*                                 EXPERIENCE                                 */
/* -------------------------------------------------------------------------- */

export interface Experience {
  id: string;
  company: string;
  /** Sub-brand or business unit, e.g. "RACE — Retail Analytics CoE". */
  team?: string;
  companyUrl?: string;
  /** One line on what the business does — recruiters rarely know. */
  companyContext: string;
  title: string;
  /** Pill next to the title, e.g. "Promoted from Associate Manager". */
  titleNote?: string;
  location: string;
  /** ISO dates. `end: null` means current. */
  start: string;
  end: string | null;
  /** Human-readable range, precomputed so SSR and client output are identical. */
  period: string;
  /** The résumé's own bullets for this role. */
  highlights: { headline: string; detail?: string }[];
  technologies: string[];
}

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                   */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /**
   * Optional clarifier, only where the résumé itself supplies one (e.g.
   * "PostgreSQL (JSONB, dynamic schemas)").
   *
   * There is deliberately NO proficiency level. Percentage bars and
   * core/strong/working ratings are judgements Akshat never made.
   */
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name, resolved through a lookup map at render time so this
   *  stays a pure data file with no React import. */
  icon: string;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                            ARCHITECTURE DIAGRAMS                           */
/* -------------------------------------------------------------------------- */

export interface ArchitectureNode {
  id: string;
  label: string;
  /** Drives colour and grouping. */
  kind: 'client' | 'edge' | 'service' | 'data' | 'external' | 'job';
  detail?: string;
  /** Grid position in the diagram, 1-indexed. */
  col: number;
  row: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  /** Dashed edges represent async / background flows. */
  async?: boolean;
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  /** Ordered narration, stepped through in the UI. */
  steps?: { title: string; detail: string; highlight: string[] }[];
}

/* -------------------------------------------------------------------------- */
/*                                  PROJECTS                                  */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = 'Analytics' | 'Design System' | 'Platform' | 'Web' | 'Personal';

export interface Project {
  slug: string;
  title: string;
  /** One line, drawn from the résumé bullet or the project's own README. */
  tagline: string;
  company: string;
  year: string;
  category: ProjectCategory;
  /** Drives the filter chips. */
  tags: string[];
  featured: boolean;
  /** Display order; lower is earlier. */
  order: number;
  /** Stated plainly, from the résumé. */
  role: string;

  techStack: { category: string; items: string[] }[];

  /** Résumé bullets, or README-documented capabilities. Nothing else. */
  highlights: { headline: string; detail?: string }[];

  /** Only present where a public README documents the architecture. */
  architecture?: ArchitectureDiagram;

  links?: {
    github?: string;
    live?: string;
  };

  /**
   * Internal enterprise products cannot be linked or screenshotted. Saying so
   * explicitly is more credible than a dead "Live Demo" button.
   */
  confidential?: boolean;
  confidentialNote?: string;

  /** Abstract visual identity for the card — a gradient pair, not a fake image. */
  accent: [string, string];
}

/* -------------------------------------------------------------------------- */
/*                              EDUCATION / AWARDS                            */
/* -------------------------------------------------------------------------- */

export interface Education {
  institution: string;
  qualification: string;
  field: string;
  location: string;
  start: string;
  end: string;
  period: string;
}

export interface Achievement {
  title: string;
  detail: string;
  date?: string;
  organisation: string;
}

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

export type SearchKind = 'section' | 'project' | 'social';

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  /** In-page hash (e.g. `#work`) or an external URL. */
  href: string;
  /** Extra terms that should match but aren't in the visible text. */
  keywords: string[];
  external?: boolean;
}

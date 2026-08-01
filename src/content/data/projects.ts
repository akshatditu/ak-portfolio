import type { Project } from '@/types/content';

/**
 * Projects.
 *
 * SOURCING RULE — every string below traces to one of exactly two places:
 *
 *  1. **BudgetIQ** — the public README at github.com/akshatditu/budget-tracker.
 *     It is Akshat's own open-source project, so its documented features,
 *     stack and architecture are quotable facts.
 *  2. **The employer projects** — the corresponding bullet on Akshat's
 *     résumé, and nothing beyond it.
 *
 * There is deliberately no "challenges", "tradeoffs" or "lessons learned"
 * prose. Writing those would mean inventing decisions and reasoning that were
 * never recorded. The type in `src/types/content.ts` no longer has fields for
 * them, so this cannot regress.
 *
 * Per-project metrics are also omitted at Akshat's request, even though the
 * percentages appear on the résumé he circulates.
 */
export const projects: Project[] = [
  /* ====================================================================== */
  /* Personal, open source, fully verifiable — so it leads.                 */
  {
    slug: 'budgetiq',
    title: 'BudgetIQ',
    tagline:
      'A full-stack personal finance application that moves budgeting off spreadsheets — transaction ledger, automatic monthly and annual rollups, carry-forward maths and dashboards.',
    company: 'Personal project · open source',
    year: 'Live at budgetiq.in',
    category: 'Personal',
    tags: [
      'React',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Tailwind CSS',
      'Docker',
      'TanStack Query',
    ],
    featured: true,
    order: 1,
    role: 'Sole author — backend, frontend, data model, deployment.',
    accent: ['#e8a13d', '#b77524'],
    links: {
      github: 'https://github.com/akshatditu/budget-tracker',
      live: 'https://www.budgetiq.in/',
    },

    // The only project with a screenshot, because it is the only one with a
    // public URL — this is the page at budgetiq.in, not a mockup of it.
    image: {
      src: '/budgetiq.png',
      alt: 'The BudgetIQ landing page: a monthly budget summary with spend progress and an expense breakdown by category.',
      width: 2000,
      height: 1057,
    },

    techStack: [
      {
        category: 'Backend',
        items: ['FastAPI', 'SQLAlchemy 2.0', 'Alembic', 'PostgreSQL', 'Pydantic v2'],
      },
      {
        category: 'Frontend',
        items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'TanStack Query', 'Recharts'],
      },
      { category: 'Security', items: ['Fernet encryption at rest', 'Google OAuth', 'Cookie sessions'] },
      { category: 'Infrastructure', items: ['Docker', 'Render', 'Single-origin deploy'] },
    ],

    highlights: [
      {
        headline: 'Two-tier budget model',
        detail:
          'Bills, Needs, Wants and Investments, each with sub-items, so a budget maps onto how money is actually categorised rather than onto a flat list of line items.',
      },
      {
        headline: 'Transaction ledger with automatic spent totals',
        detail:
          'Totals are derived from the ledger rather than maintained separately, so the budget and the transactions can never disagree.',
      },
      {
        headline: 'Month-to-month carry-forward pool',
        detail:
          'Unspent budget rolls forward instead of vanishing at the month boundary — the behaviour that spreadsheets make tedious and that motivated the project.',
      },
      {
        headline: 'Annual rollup with elapsed-month-aware maths',
        detail:
          'Yearly aggregates account for how much of the year has actually elapsed, so a mid-year view is not misleadingly under-spent.',
      },
      {
        headline: 'AI-generated budgets from spending history',
        detail: 'Proposes a starting budget derived from the user’s own transaction history.',
      },
      { headline: 'Net-worth tracking and goal monitoring' },
      {
        headline: 'Fernet encryption for monetary values at rest',
        detail: 'Amounts are encrypted in the database rather than stored in plaintext.',
      },
      {
        headline: 'Four themes and a guided onboarding wizard',
        detail: 'Calm and bold palettes, each in light and dark.',
      },
    ],

    architecture: {
      id: 'budgetiq-architecture',
      title: 'BudgetIQ — single-origin architecture',
      description:
        'The React SPA is built into FastAPI’s static directory and served by the same origin that serves the API. Business logic lives in a service layer rather than in route handlers.',
      nodes: [
        { id: 'browser', label: 'React SPA', kind: 'client', detail: 'Vite · TypeScript', col: 1, row: 2 },
        { id: 'query', label: 'TanStack Query', kind: 'client', detail: 'Server-state cache', col: 1, row: 3 },
        { id: 'google', label: 'Google OAuth', kind: 'external', detail: 'Cookie session', col: 2, row: 1 },
        { id: 'fastapi', label: 'FastAPI', kind: 'service', detail: 'Serves API + static SPA', col: 2, row: 2 },
        { id: 'services', label: 'Service layer', kind: 'service', detail: 'Rollup · carry-forward · envelopes', col: 3, row: 2 },
        { id: 'orm', label: 'SQLAlchemy 2.0', kind: 'service', detail: 'Pydantic v2 schemas', col: 3, row: 3 },
        { id: 'postgres', label: 'PostgreSQL', kind: 'data', detail: 'User-scoped · Fernet at rest', col: 4, row: 3 },
        { id: 'alembic', label: 'Alembic', kind: 'job', detail: 'Migrations', col: 4, row: 4 },
        { id: 'docker', label: 'Docker → Render', kind: 'job', detail: 'Deployment', col: 2, row: 4 },
      ],
      edges: [
        { from: 'browser', to: 'fastapi', label: 'same origin' },
        { from: 'query', to: 'fastapi', label: 'REST' },
        { from: 'google', to: 'fastapi', label: 'OAuth callback' },
        { from: 'fastapi', to: 'services' },
        { from: 'services', to: 'orm' },
        { from: 'orm', to: 'postgres' },
        { from: 'alembic', to: 'postgres', label: 'schema', async: true },
        { from: 'docker', to: 'fastapi', label: 'deploy', async: true },
      ],
      steps: [
        {
          title: 'One origin serves everything',
          detail:
            'The React build output is written into FastAPI’s static directory, so the SPA and the API share an origin. No CORS configuration, and cookie sessions work without third-party-cookie caveats.',
          highlight: ['browser', 'fastapi'],
        },
        {
          title: 'Authentication is cookie-based via Google OAuth',
          detail:
            'Sessions are held in cookies rather than tokens in local storage, which keeps credentials out of reach of page JavaScript.',
          highlight: ['google', 'fastapi'],
        },
        {
          title: 'Business logic is centralised in a service layer',
          detail:
            'Rollup, carry-forward and envelope maths live in services rather than in route handlers, so the same rules apply however they are invoked.',
          highlight: ['fastapi', 'services', 'orm'],
        },
        {
          title: 'Data is user-scoped and encrypted at rest',
          detail:
            'The schema is scoped per user, and monetary values are Fernet-encrypted in the database. Alembic manages schema evolution.',
          highlight: ['postgres', 'alembic'],
        },
      ],
    },
  },

  /* ====================================================================== */
  /* Employer work — résumé bullets and tech stack only.                    */
  {
    slug: 'retail-analytics-apps',
    title: 'Retail Analytics Applications',
    tagline:
      'Four-plus retail analytics applications built from scratch, giving category and merchandising teams self-serve, data-driven decision tools in place of manual, spreadsheet-heavy workflows.',
    company: 'Majid Al Futtaim (Carrefour) — RACE',
    year: '2024 — Present',
    category: 'Analytics',
    tags: ['React', 'TypeScript', 'Python', 'Flask', 'PostgreSQL', 'Databricks', 'AG Grid'],
    featured: true,
    order: 2,
    role: 'Hands-on technical lead — architecture decisions, code reviews, performance tuning and infrastructure debugging.',
    confidential: true,
    confidentialNote:
      'Internal enterprise tooling — no public URL, repository or screenshots. Happy to walk through the architecture in detail.',
    accent: ['#3d5580', '#1b2a4a'],

    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'AG Grid', 'Chart.js'] },
      { category: 'Backend', items: ['Python', 'Flask', 'SQLAlchemy', 'REST APIs'] },
      { category: 'Data', items: ['Databricks', 'PostgreSQL', 'JSONB', 'Dynamic schemas'] },
      { category: 'Infrastructure', items: ['Docker', 'Azure Pipelines', 'Nginx'] },
    ],

    highlights: [
      {
        headline:
          'Built 4+ retail analytics applications from scratch, covering localization, rationalization, category review and whitespace analysis.',
      },
      {
        headline:
          'Developed RESTful backend APIs in Python (Flask, SQLAlchemy) integrated with Databricks for large-scale retail data, and PostgreSQL — including JSONB and dynamic schemas — for application state.',
      },
      {
        headline:
          'Engineered high-performance data grids (AG Grid) with server-side filtering, infinite scroll and virtualization to render 100k+ rows smoothly.',
      },
      {
        headline:
          'Acted as hands-on technical lead across 4+ concurrent apps — owning architecture decisions, code reviews, performance tuning and infrastructure debugging (nginx reverse proxy, DNS/VPN routing, Docker disk management).',
      },
    ],
  },

  {
    slug: 'shared-ui-library',
    title: 'Shared UI Component Library',
    tagline:
      'A shared React + TypeScript component library themed to the internal design system and adopted across every application in the portfolio.',
    company: 'Majid Al Futtaim (Carrefour) — RACE',
    year: '2024 — Present',
    category: 'Design System',
    tags: ['React', 'TypeScript', 'Design Systems'],
    featured: true,
    order: 3,
    role: 'Designed and shipped the library; drove adoption across the application portfolio.',
    confidential: true,
    confidentialNote:
      'Internal library themed to a proprietary design system — not publicly available.',
    accent: ['#e8a13d', '#3d5580'],

    techStack: [
      { category: 'Library', items: ['React', 'TypeScript'] },
      { category: 'Delivery', items: ['Docker', 'Azure Pipelines'] },
    ],

    highlights: [
      {
        headline:
          'Designed and shipped a shared React + TypeScript UI component library themed to the internal design system and adopted across all applications, enforcing visual consistency across the portfolio.',
      },
      {
        headline:
          'Containerized all applications with Docker and built CI/CD pipelines (Azure Pipelines) to automate build, test and deployment, standardizing deployments across environments.',
      },
    ],
  },

  {
    slug: 'bot-builder',
    title: 'Chatbot & Bot-Builder Platform',
    tagline:
      'A bot-builder platform built from scratch, enabling non-technical teams to create chatbot flows without engineering involvement.',
    company: 'Cashify',
    year: '2022',
    category: 'Platform',
    tags: ['React', 'REST APIs', 'Platform', 'Automation'],
    featured: true,
    order: 5,
    role: 'Built the platform from scratch; recognised as Superstar of the Month for it.',
    confidential: true,
    confidentialNote: 'Internal platform — not publicly accessible.',
    accent: ['#5a6472', '#1b2a4a'],

    techStack: [
      { category: 'Frontend', items: ['React', 'JavaScript'] },
      { category: 'Integration', items: ['RESTful APIs'] },
      { category: 'Process', items: ['Agile SDLC'] },
    ],

    highlights: [
      {
        headline:
          'Built a bot-builder platform from scratch, enabling non-technical teams to create chatbot flows.',
      },
      {
        headline:
          'Integrated RESTful APIs and shipped features for mobile and desktop within an Agile SDLC.',
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}


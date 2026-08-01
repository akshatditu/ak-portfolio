import type { Achievement, Education, Experience } from '@/types/content';

/**
 * Career history — the résumé's own bullets, verbatim in substance.
 *
 * `companyContext` is the only addition, and it states publicly-known facts
 * about each employer (what the business does) rather than anything about
 * Akshat's work there. It exists because a recruiter outside retail often does
 * not know what "RACE" or "recommerce" means.
 *
 * Per Akshat's instruction the résumé's percentage metrics are omitted here.
 * Ordered most-recent-first; the timeline relies on that.
 */
export const experiences: Experience[] = [
  {
    id: 'majid-al-futtaim',
    company: 'Majid Al Futtaim (Carrefour)',
    team: 'RACE — Retail Analytics Centre of Excellence',
    companyUrl: 'https://www.majidalfuttaim.com',
    companyContext:
      'One of the largest retail and leisure groups in the Middle East, operating Carrefour across the region. RACE is the internal centre of excellence building data products for merchandising, assortment and promotions teams.',
    title: 'Manager, App Development',
    titleNote: 'Promoted from Associate Manager',
    location: 'Gurgaon, India',
    start: '2024-04-01',
    end: null,
    period: 'Apr 2024 — Present',
    highlights: [
      {
        headline: 'Built 4+ retail analytics applications from scratch',
        detail:
          'Covering localization, rationalization, category review and whitespace analysis — giving category and merchandising teams self-serve, data-driven decision tools that replaced manual, spreadsheet-heavy workflows.',
      },
      {
        headline: 'Designed and shipped a shared React + TypeScript UI component library',
        detail:
          'Themed to the internal design system and adopted across all applications, enforcing visual consistency across the portfolio.',
      },
      {
        headline: 'Developed RESTful backend APIs in Python (Flask, SQLAlchemy)',
        detail:
          'Integrated with Databricks for large-scale retail data, and PostgreSQL — including JSONB and dynamic schemas — for application state.',
      },
      {
        headline: 'Engineered high-performance data grids (AG Grid)',
        detail:
          'With server-side filtering, infinite scroll and virtualization to render 100k+ rows smoothly, keeping dashboard interactions responsive on large datasets.',
      },
      {
        headline: 'Containerized all applications with Docker and built CI/CD pipelines',
        detail:
          'Azure Pipelines automating build, test and deployment, standardizing deployments across environments.',
      },
      {
        headline: 'Acted as hands-on technical lead across 4+ concurrent apps',
        detail:
          'Owning architecture decisions, code reviews, performance tuning and infrastructure debugging — nginx reverse proxy, DNS/VPN routing and Docker disk management.',
      },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'AG Grid',
      'Chart.js',
      'Python',
      'Flask',
      'SQLAlchemy',
      'PostgreSQL',
      'Databricks',
      'Docker',
      'Azure Pipelines',
      'Nginx',
    ],
  },
  {
    id: 'cashify',
    company: 'Cashify',
    companyUrl: 'https://www.cashify.in',
    companyContext:
      'A recommerce marketplace for buying and selling used electronics.',
    title: 'Software Engineer 3',
    location: 'Gurgaon, India',
    start: '2021-06-01',
    end: '2024-04-01',
    period: 'Jun 2021 — Apr 2024',
    highlights: [
      {
        headline: 'Migrated the web application from React to the latest Next.js',
        detail:
          'Using server-side rendering best practices, improving performance and SEO metrics across the platform.',
      },
      {
        headline: 'Optimized page performance',
        detail: 'By applying rendering, asset and loading best practices.',
      },
      {
        headline: 'Improved organic search performance',
        detail: 'Through technical SEO and keyword research.',
      },
      {
        headline: 'Built a bot-builder platform from scratch',
        detail:
          'Enabling non-technical teams to create chatbot flows; integrated RESTful APIs and shipped features for mobile and desktop within an Agile SDLC.',
      },
    ],
    technologies: [
      'Next.js',
      'React',
      'JavaScript',
      'Server-side rendering',
      'Technical SEO',
      'REST APIs',
      'Agile',
    ],
  },
  {
    id: 'nineleaps',
    company: 'Nineleaps Technology Solutions',
    companyUrl: 'https://www.nineleaps.com',
    companyContext: 'A product engineering consultancy building software for enterprise clients.',
    title: 'Member of Technical Staff II',
    location: 'Bangalore, India',
    start: '2020-01-01',
    end: '2021-06-01',
    period: 'Jan 2020 — Jun 2021',
    highlights: [
      {
        headline: 'Developed React front-end features',
        detail:
          'Applying component lifecycle best practices to improve maintainability and performance.',
      },
      {
        headline: 'Achieved full unit-test coverage using Jest and Enzyme',
        detail: 'Strengthening release confidence and reducing regressions.',
      },
    ],
    technologies: ['React', 'JavaScript', 'Jest', 'Enzyme', 'REST APIs'],
  },
];

export const education: Education[] = [
  {
    institution: 'DIT University',
    qualification: 'B.Tech',
    field: 'Computer Science & Engineering',
    location: 'Dehradun, India',
    start: '2016-08-01',
    end: '2020-06-01',
    period: '2016 — 2020',
  },
];

export const achievements: Achievement[] = [
  {
    title: 'Promoted from Associate Manager to Manager, App Development',
    detail:
      'Within roughly a year at Majid Al Futtaim, for end-to-end ownership of the analytics app portfolio.',
    organisation: 'Majid Al Futtaim',
    date: '2024',
  },
  {
    title: 'Superstar of the Month',
    detail: 'For building the chatbot and bot-builder platform from scratch.',
    organisation: 'Cashify',
    date: 'Mar 2022',
  },
];

/** Current role — used by the hero and JSON-LD. Guaranteed non-null by design. */
export const currentExperience = experiences[0]!;

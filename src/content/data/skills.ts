import type { SkillCategory } from '@/types/content';

/**
 * Technical skills — the résumé's own five groups, trimmed to the headline
 * items. (The résumé lists more — HTML5, CSS3, MUI, React Native, Jenkins,
 * Linux, CSV ingestion — but a skills wall reads as noise; the full list
 * remains on the PDF.)
 *
 * No proficiency levels, deliberately: percentage bars and star ratings are
 * judgements Akshat never made, so this site does not invent them.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'The primary craft.',
    icon: 'Monitor',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Vite' },
      { name: 'AG Grid' },
      { name: 'Tailwind CSS' },
      { name: 'Chart.js' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Enough depth to own the API contract.',
    icon: 'Server',
    skills: [
      { name: 'Python' },
      { name: 'Flask' },
      { name: 'SQLAlchemy' },
      { name: 'REST APIs' },
      { name: 'JWT auth' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    description: 'In analytics, the data layer is the product.',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', note: 'JSONB' },
      { name: 'Databricks' },
      { name: 'SQL' },
      { name: 'Data pipelines' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Shipping is a feature.',
    icon: 'Container',
    skills: [
      { name: 'Docker' },
      { name: 'CI/CD', note: 'Azure Pipelines' },
      { name: 'Nginx' },
      { name: 'Git' },
    ],
  },
  {
    id: 'practices',
    title: 'Practices',
    description: 'How the work gets done.',
    icon: 'Network',
    skills: [
      { name: 'System design' },
      { name: 'Performance optimization' },
      { name: 'Design systems' },
      { name: 'Code review' },
    ],
  },
];

export function getSkillCategory(id: string): SkillCategory | undefined {
  return skillCategories.find((category) => category.id === id);
}

/** Flat list, used by JSON-LD `knowsAbout` and the ⌘K search index. */
export const allSkills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill, category: category.title })),
);

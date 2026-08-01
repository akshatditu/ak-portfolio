import { navItems } from '@/config/navigation';
import { publicSocialLinks, siteConfig } from '@/config/site';
import { projects } from '@/content/data/projects';
import type { SearchEntry } from '@/types/content';

/**
 * The ⌘K search index.
 *
 * Built from the same typed modules the page renders from, so a new project or
 * section is searchable the moment it exists — there is no separate index to
 * remember to update.
 *
 * On a single-page site every internal `href` is a hash. Projects and demos
 * resolve to their own anchor so a result can scroll directly to the card
 * rather than dumping the user at the top of a long section.
 */
export const searchEntries: SearchEntry[] = [
  ...navItems.map<SearchEntry>((item) => ({
    id: `section:${item.sectionId}`,
    kind: 'section',
    title: item.label,
    description: item.description,
    href: item.href,
    keywords: [item.label, ...item.description.split(' ').slice(0, 8)],
  })),

  ...projects.map<SearchEntry>((project) => ({
    id: `project:${project.slug}`,
    kind: 'project',
    title: project.title,
    description: project.tagline,
    href: `#case-${project.slug}`,
    keywords: [project.company, project.category, project.role, ...project.tags],
  })),

  ...publicSocialLinks.map<SearchEntry>((link) => ({
    id: `social:${link.id}`,
    kind: 'social',
    title: link.label,
    description: link.handle,
    href: link.url,
    keywords: [link.label, link.handle, 'contact', 'profile'],
    external: true,
  })),

  {
    id: 'action:resume',
    kind: 'social',
    title: 'Download résumé (PDF)',
    description: 'The one-page version',
    href: siteConfig.resumePath,
    keywords: ['cv', 'resume', 'pdf', 'download'],
    external: true,
  },
];

export const searchGroupLabels: Record<SearchEntry['kind'], string> = {
  section: 'Sections',
  project: 'Work',
  social: 'Elsewhere',
};

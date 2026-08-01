import { publicSocialLinks, siteConfig } from '@/config/site';
import { education as educationHistory, experiences } from '@/content/data/experience';
import { projects } from '@/content/data/projects';
import { allSkills } from '@/content/data/skills';
import { absoluteUrl } from './utils';

/**
 * JSON-LD builders.
 *
 * Structured data turns a search result into a rich card and lets a knowledge
 * graph resolve who this person is. It is also easy to get subtly wrong, so
 * every graph here is built from the same content model the page renders —
 * the markup and the structured data cannot disagree.
 *
 * Only `Person`, `WebSite` and an `ItemList` of projects are emitted. There is
 * no `Review` schema, because there are no testimonials; and no `BlogPosting`,
 * because there is no blog. Emitting schema for content that does not exist is
 * a manufactured-signal problem, not a clever SEO trick.
 */

const url = (path: string) => absoluteUrl(path, siteConfig.url);

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url('/#person'),
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.currentTitle,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.company,
      url: siteConfig.companyUrl,
    },
    alumniOf: educationHistory.map((entry) => ({
      '@type': 'CollegeOrUniversity',
      name: entry.institution,
    })),
    knowsAbout: Array.from(new Set(allSkills.map((skill) => skill.name))),
    // Only real, non-placeholder profiles. A `sameAs` pointing at a 404
    // actively damages entity resolution.
    sameAs: publicSocialLinks.filter((link) => link.id !== 'email').map((link) => link.url),
    hasOccupation: experiences.map((experience) => ({
      '@type': 'Occupation',
      name: experience.title,
      occupationLocation: { '@type': 'City', name: experience.location },
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url('/#website'),
    url: siteConfig.url,
    name: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    inLanguage: siteConfig.languageTag,
    publisher: { '@id': url('/#person') },
  };
}

/**
 * The projects, as an ordered list. Each item anchors to its in-page hash,
 * which is what makes individual work addressable on a single-page site.
 */
export function projectListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Selected work — ${siteConfig.name}`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.tagline,
        url: url(`/#case-${project.slug}`),
        author: { '@id': url('/#person') },
        keywords: project.tags.join(', '),
        ...(project.links?.live ? { sameAs: project.links.live } : {}),
      },
    })),
  };
}

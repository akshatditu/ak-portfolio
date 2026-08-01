'use client';

import { useEffect, useState } from 'react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Section, SectionHeading } from '@/components/primitives';
import { projects } from '@/content/data/projects';
import { ProjectCard } from './project-card';
import { ProjectDialog } from './project-dialog';

/**
 * The Work section — four compact cards in a 2×2 grid.
 *
 * There are no filter chips: at four projects a filter is furniture, not a
 * feature. Each card opens a dialog with the full detail (role, highlights,
 * stack, and for BudgetIQ the architecture diagram), which keeps the grid
 * scannable at a glance.
 *
 * Deep links still work on a single-page site: `/#case-<slug>` opens the
 * matching dialog on load, and ⌘K navigation lands the same way via the
 * `hashchange` listener.
 */
export function WorkSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#case-(.+)$/);
      if (!match?.[1]) return;
      const slug = match[1];
      if (projects.some((project) => project.slug === slug)) setOpenSlug(slug);
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const openProject = projects.find((project) => project.slug === openSlug) ?? null;

  return (
    <Section id="work" labelledBy="work-heading" className="border-border border-t">
      <Reveal>
        <SectionHeading
          id="work-heading"
          eyebrow="Work"
          eyebrowIndex="04"
          title="Selected projects"
          description="One open-source project of my own, and three from my day job. Open any card for the detail."
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} index={index} onOpen={() => setOpenSlug(project.slug)} />
          </StaggerItem>
        ))}
      </Stagger>

      <ProjectDialog
        project={openProject}
        onClose={() => {
          setOpenSlug(null);
          // Clear a stale `#case-…` hash so closing and re-sharing the URL
          // doesn't point at a dialog the visitor closed.
          if (window.location.hash.startsWith('#case-')) {
            window.history.replaceState(null, '', window.location.pathname + '#work');
          }
        }}
      />
    </Section>
  );
}

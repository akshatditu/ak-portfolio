'use client';

import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react';
import Image from 'next/image';
import { GithubIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/content';
import { cn } from '@/lib/utils';

/**
 * A compact project card for the 2×2 grid.
 *
 * The whole card is a button that opens the detail dialog; the GitHub / live
 * links sit on top of it and stop propagation so they stay directly clickable.
 *
 * Only a project with a public URL gets a screenshot. The three internal
 * enterprise products cannot be shown, and a mockup standing in for them would
 * be worse than nothing — so they lean on the accent bar for identity instead.
 * That asymmetry is intentional, not an unfinished state.
 *
 * Everything inside the `<button>` is a `<span>` (or an `<img>`): a button may
 * only contain phrasing content, so a stray `<div>` or `<p>` here is invalid
 * HTML and browsers recover from it inconsistently.
 */
export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const [from, to] = project.accent;
  const hasLinks = Boolean(project.links?.github || project.links?.live);

  return (
    <article className="group relative h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${project.title} — view details`}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface text-left',
          'shadow-[0_1px_2px_rgb(27_42_74/0.05)] transition-[border-color,box-shadow,transform] duration-300 ease-(--ease-out-quart)',
          'hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_10px_30px_-12px_rgb(27_42_74/0.18)]',
          'motion-reduce:hover:translate-y-0',
        )}
      >
        {/* Accent bar — the card's visual identity, generated from data. */}
        <span
          aria-hidden="true"
          className="h-1 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
        />

        {/* 2:1 rather than 16:9 — the screenshot is naturally 1.89:1, so this
            trims only a sliver off the bottom while keeping this card closer in
            height to the three that have no image to show. */}
        {project.image && (
          <span className="relative block aspect-2/1 w-full shrink-0 overflow-hidden border-b border-border bg-surface-raised">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 45vw, 92vw"
              className={cn(
                'h-full w-full object-cover object-top',
                'transition-transform duration-500 ease-(--ease-out-quart) group-hover:scale-[1.03]',
                'motion-reduce:transition-none motion-reduce:group-hover:scale-100',
              )}
            />
          </span>
        )}

        <span className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <span className="flex items-center gap-2.5">
            <span className="font-mono text-micro tracking-[0.14em] text-accent-tertiary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Badge variant="outline">{project.category}</Badge>
            <span className="ml-auto font-mono text-micro tracking-wide text-foreground-subtle uppercase">
              {project.year}
            </span>
          </span>

          <span className="flex items-start justify-between gap-2">
            <span className="text-h3 font-semibold text-foreground">{project.title}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-foreground-subtle transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-secondary"
            />
          </span>

          <span className="text-small text-foreground-muted">{project.company}</span>

          <span className="line-clamp-3 text-small leading-relaxed text-foreground-muted">
            {project.tagline}
          </span>

          {/* Right padding reserves room for the floating external links so
              wrapping tags never slide underneath them. */}
          <span className={cn('mt-auto flex flex-wrap gap-1.5 pt-2', hasLinks && 'pr-20')}>
            {project.tags.slice(0, 5).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>

          {project.confidential && (
            <span className="flex items-center gap-1.5 text-micro text-foreground-subtle">
              <Lock aria-hidden="true" className="size-3 shrink-0" />
              Internal — details in the dialog, no public demo
            </span>
          )}
        </span>
      </button>

      {/* External links float above the card button. */}
      {(project.links?.github || project.links?.live) && (
        <span className="absolute right-4 bottom-4 flex items-center gap-1.5 sm:right-5 sm:bottom-5">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} on GitHub`}
              onClick={(event) => event.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — live site`}
              onClick={(event) => event.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-full border border-accent/40 bg-accent-muted text-accent-secondary transition-colors hover:border-accent hover:text-accent-tertiary"
            >
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          )}
        </span>
      )}
    </article>
  );
}

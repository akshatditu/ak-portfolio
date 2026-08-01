'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ExternalLink, Lock, X } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/content';
import { cn } from '@/lib/utils';
import { ArchitectureDiagramView } from './architecture-diagram';

/**
 * Project detail dialog.
 *
 * Radix Dialog supplies focus trapping, scroll locking, Escape handling and
 * focus restoration — the things a hand-rolled modal reliably gets wrong.
 * The dialog is controlled from `WorkSection` so `#case-<slug>` deep links can
 * open it programmatically.
 */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = project !== null;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={cn(
            // `calc(100vw_-_2rem)`: underscores become spaces; without them the
            // calc is invalid CSS and the dialog would overflow small screens.
            'fixed top-1/2 left-1/2 z-50 flex max-h-[86dvh] w-[calc(100vw_-_2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col',
            'overflow-hidden rounded-(--radius-panel) border border-border bg-background shadow-2xl',
            'duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95',
            'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95',
          )}
        >
          {project && (
            <>
              {/* Accent bar carries the card's identity into the dialog. */}
              <span
                aria-hidden="true"
                className="h-1 w-full shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${project.accent[0]}, ${project.accent[1]})`,
                }}
              />

              <div className="flex items-start justify-between gap-4 border-b border-border p-6 pb-5 sm:p-8 sm:pb-5">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="font-mono text-micro tracking-wide text-foreground-subtle uppercase">
                      {project.year}
                    </span>
                  </div>
                  <Dialog.Title className="text-h3 font-semibold text-foreground">
                    {project.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-small text-foreground-muted">
                    {project.company}
                  </Dialog.Description>
                </div>

                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close project details">
                    <X aria-hidden="true" className="size-4" />
                  </Button>
                </Dialog.Close>
              </div>

              <div className="flex flex-col gap-8 overflow-y-auto overscroll-contain p-6 sm:p-8">
                <p className="text-lead text-pretty text-foreground-muted">{project.tagline}</p>

                {(project.links?.github || project.links?.live) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.links?.github && (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.links.github} target="_blank" rel="noreferrer noopener">
                          <GithubIcon className="size-4" />
                          View code
                        </a>
                      </Button>
                    )}
                    {project.links?.live && (
                      <Button asChild variant="accent" size="sm">
                        <a href={project.links.live} target="_blank" rel="noreferrer noopener">
                          Live site
                          <ExternalLink aria-hidden="true" className="size-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {project.confidential && (
                  <p className="flex items-start gap-2 rounded-(--radius-card) border border-border bg-surface p-4 text-small text-foreground-muted">
                    <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                    {project.confidentialNote}
                  </p>
                )}

                <Block title="My role">
                  <p className="text-small leading-relaxed text-foreground-muted">{project.role}</p>
                </Block>

                <Block title="What I built">
                  <ul className="flex flex-col gap-3.5">
                    {project.highlights.map((item) => (
                      <li key={item.headline} className="relative flex flex-col gap-1 pl-5">
                        <span
                          aria-hidden="true"
                          className="absolute top-[0.55em] left-0 size-1.5 rounded-full bg-accent"
                        />
                        <span className="text-small font-semibold text-foreground">
                          {item.headline}
                        </span>
                        {item.detail && (
                          <span className="text-small leading-relaxed text-foreground-muted">
                            {item.detail}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block title="Tech stack">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {project.techStack.map((group) => (
                      <div key={group.category} className="flex flex-col gap-2">
                        <h4 className="text-small font-semibold text-foreground">
                          {group.category}
                        </h4>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Badge>{item}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>

                {project.architecture && (
                  <Block title="Architecture">
                    <ArchitectureDiagramView diagram={project.architecture} />
                  </Block>
                )}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

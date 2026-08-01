'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { experiences } from '@/content/data/experience';
import { Badge } from '@/components/ui/badge';
import { cn, formatDuration } from '@/lib/utils';

/**
 * The experience timeline.
 *
 * Built on Radix Accordion rather than hand-rolled disclosure state. That is
 * not laziness — it provides correct `aria-expanded`/`aria-controls` wiring,
 * roving arrow-key navigation between triggers, Home/End support, and a
 * `data-state` hook for animation. A bespoke implementation typically misses
 * every one of those.
 *
 * `type="multiple"` with the current role open by default: a recruiter should
 * see the most relevant detail without a click, but be able to compare two
 * roles side by side.
 *
 * The height animation uses Radix's `--radix-accordion-content-height`, so it
 * animates to a real pixel value rather than the `height: auto` CSS cannot
 * transition to. Keyframes live in globals.css.
 */
export function ExperienceTimeline({ className }: { className?: string }) {
  const firstId = experiences[0]?.id;

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={firstId ? [firstId] : []}
      className={cn('relative flex flex-col', className)}
    >
      {/* The vertical rail. Decorative — the list structure carries the meaning. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/50 via-border-strong to-transparent"
      />

      {experiences.map((experience) => (
        <Accordion.Item
          key={experience.id}
          value={experience.id}
          className="group relative pb-4 pl-8 last:pb-0 sm:pl-10"
        >
          {/* Node marker */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-[1.4rem] left-0 size-[15px] rounded-full border-2 border-background transition-colors',
              experience.end === null ? 'bg-accent' : 'bg-border-strong',
            )}
          >
            {experience.end === null && (
              <span className="absolute inset-0 animate-(--animate-pulse-ring) rounded-full bg-accent" />
            )}
          </span>

          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                'flex w-full items-start justify-between gap-4 rounded-(--radius-card) px-4 py-4 text-left',
                'transition-colors hover:bg-surface/60 data-[state=open]:bg-surface/40',
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-h3 font-semibold text-foreground">{experience.title}</span>
                  {experience.titleNote && (
                    <Badge variant="accent" size="sm">
                      {experience.titleNote}
                    </Badge>
                  )}
                </span>

                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-foreground-muted">
                  <span className="font-medium text-foreground">{experience.company}</span>
                  {experience.team && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{experience.team}</span>
                    </>
                  )}
                </span>

                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro tracking-wide text-foreground-subtle uppercase">
                  <span>{experience.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatDuration(experience.start, experience.end)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{experience.location}</span>
                </span>
              </span>

              <ChevronDown
                aria-hidden="true"
                className="mt-1.5 size-4 shrink-0 text-foreground-subtle transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-(--animate-accordion-up) data-[state=open]:animate-(--animate-accordion-down)">
            <div className="flex flex-col gap-8 px-4 pt-2 pb-6">
              <p className="max-w-2xl text-small leading-relaxed text-foreground-subtle">
                {experience.companyContext}
              </p>

              <ul className="flex flex-col gap-4">
                {experience.highlights.map((item) => (
                  <li key={item.headline} className="relative flex flex-col gap-1 pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.55em] left-0 size-1.5 rounded-full bg-accent/50"
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

              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
                  Technologies
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex w-fit items-center gap-1.5 text-small text-accent underline-offset-4 hover:underline"
                >
                  Visit {experience.company}
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              )}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

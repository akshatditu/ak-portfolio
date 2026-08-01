import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*                                  CONTAINER                                 */
/* -------------------------------------------------------------------------- */

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `prose` narrows to a comfortable reading measure (~68ch). */
  size?: 'content' | 'prose' | 'wide';
  as?: ElementType;
}

/**
 * The only place horizontal page gutters are defined.
 *
 * Gutter width is a fluid token (`--spacing-gutter`), so padding scales with
 * viewport rather than stepping at breakpoints — which is what stops the
 * layout feeling cramped at 400px and empty at 1600px.
 */
export function Container({
  children,
  className,
  size = 'content',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-(--spacing-gutter)',
        size === 'content' && 'max-w-(--container-content)',
        size === 'prose' && 'max-w-(--container-prose)',
        size === 'wide' && 'max-w-[88rem]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   SECTION                                  */
/* -------------------------------------------------------------------------- */

export interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Becomes the element id, and the anchor target for in-page links. */
  id?: string;
  /** Labels the section for screen readers via aria-labelledby. */
  labelledBy?: string;
  size?: 'content' | 'prose' | 'wide' | 'full';
  /** Vertical rhythm. `tight` for stacked sections that read as one block. */
  spacing?: 'none' | 'tight' | 'base' | 'loose';
}

/**
 * A landmark section with consistent vertical rhythm.
 *
 * Always renders a real `<section>` element. Combined with `labelledBy`
 * pointing at the section heading, this gives screen reader users a navigable
 * landmark list that mirrors the visual structure of the page.
 */
export function Section({
  children,
  className,
  id,
  labelledBy,
  size = 'content',
  spacing = 'base',
}: SectionProps) {
  const content = size === 'full' ? children : <Container size={size}>{children}</Container>;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      /**
       * `tabIndex={-1}` makes the section programmatically focusable so
       * `scrollToSection` can move keyboard focus here after an anchor click.
       * Without it, a keyboard user "navigates" to a section and their next
       * Tab lands back in the header — the single most common single-page
       * accessibility failure. The focus ring is suppressed in globals.css.
       */
      tabIndex={id ? -1 : undefined}
      className={cn(
        'relative',
        spacing === 'tight' && 'py-16 sm:py-20',
        spacing === 'base' && 'py-(--spacing-section)',
        spacing === 'loose' && 'py-(--spacing-section) lg:py-[calc(var(--spacing-section)*1.35)]',
        className,
      )}
    >
      {content}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   EYEBROW                                  */
/* -------------------------------------------------------------------------- */

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Small numeral shown before the label, e.g. "01". */
  index?: string;
}

/**
 * The small uppercase label above a section heading. Provides visual hierarchy
 * without adding a second heading level that would pollute the document
 * outline — this is a `<p>`, deliberately, not an `<h3>`.
 */
export function Eyebrow({ children, className, index }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-micro font-medium tracking-[0.14em] text-foreground-subtle uppercase',
        className,
      )}
    >
      {index && (
        <>
          <span className="text-accent tabular">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
        </>
      )}
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SECTION HEADING                              */
/* -------------------------------------------------------------------------- */

export interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  eyebrowIndex?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  /** Heading level. Defaults to h2 — h1 is reserved for the page title. */
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  id,
  eyebrow,
  eyebrowIndex,
  title,
  description,
  className,
  align = 'left',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow index={eyebrowIndex}>{eyebrow}</Eyebrow>}
      <Tag id={id} className="max-w-3xl text-h2 font-semibold text-balance text-foreground">
        {title}
      </Tag>
      {description && (
        <p className="max-w-2xl text-lead text-pretty text-foreground-muted">{description}</p>
      )}
    </div>
  );
}

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * `raised` adds the hairline top sheen — a 1px gradient border that reads as
   * a surface catching light. Reserve it for cards that should feel primary;
   * using it everywhere flattens the hierarchy it exists to create.
   */
  variant?: 'flat' | 'raised' | 'outline';
  /** Adds a subtle lift + border brighten on hover. Only for interactive cards. */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'base' | 'lg';
}

/**
 * The standard surface.
 *
 * On dark backgrounds, elevation comes from a brighter hairline border rather
 * than a drop shadow — a shadow against near-black is invisible, so the
 * conventional approach simply does not work here.
 *
 * `backdrop-blur` is applied only on the `raised` variant. It is a genuinely
 * expensive paint operation, and using it on every card in a long list is a
 * measurable scroll-performance cost for a effect nobody notices.
 */
export function GlassCard({
  children,
  className,
  as: Tag = 'div',
  variant = 'flat',
  interactive = false,
  padding = 'base',
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-(--radius-card) border border-border',
        variant === 'flat' && 'bg-surface/60',
        variant === 'outline' && 'bg-transparent',
        variant === 'raised' && 'glass shadow-[0_1px_0_0_var(--border-strong)_inset]',
        padding === 'sm' && 'p-4',
        padding === 'base' && 'p-6',
        padding === 'lg' && 'p-8 sm:p-10',
        interactive && [
          'transition-[transform,border-color,background-color] duration-300 ease-(--ease-out-quart)',
          'hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised/70',
          'motion-reduce:hover:translate-y-0',
        ],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Decorative hairline at the top edge of a card. Rendered as a separate
 * element rather than a pseudo-element so its opacity can be animated
 * independently of the card's own hover transition.
 */
export function CardSheen({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-6 top-0 h-px',
        'bg-gradient-to-r from-transparent via-border-strong to-transparent',
        className,
      )}
    />
  );
}

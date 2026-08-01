import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface/60 text-foreground-muted',
        accent: 'border-accent/25 bg-accent-muted text-accent',
        outline: 'border-border-strong bg-transparent text-foreground-muted',
        success: 'border-success/25 bg-success/10 text-success',
        /** Used exclusively to flag generated placeholder content. */
        warning: 'border-warning/30 bg-warning/10 text-warning',
      },
      size: {
        sm: 'px-2 py-0.5 text-micro',
        base: 'px-3 py-1 text-small',
      },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  },
);

export interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

/**
 * A live indicator with a pulsing ring. Used for "Currently at ..." in the
 * hero. The ring is `aria-hidden` — the text carries the meaning.
 *
 * Alignment is `items-start` rather than `items-center` so the dot pins to the
 * first line when the label wraps — which it does on narrow screens. Centred,
 * the dot drifts to the middle of a two-line block and reads as a stray mark.
 * The `mt` keeps it optically centred on that first line.
 */
export function LiveBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-start gap-2.5 rounded-2xl border border-border bg-surface/50 py-1.5 pr-4 pl-3 text-small text-foreground-muted backdrop-blur-sm sm:rounded-full',
        className,
      )}
    >
      <span aria-hidden="true" className="relative mt-[0.45em] flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-(--animate-pulse-ring) rounded-full bg-success" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {children}
    </span>
  );
}

export { badgeVariants };

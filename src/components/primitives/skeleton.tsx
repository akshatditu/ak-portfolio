import { cn } from '@/lib/utils';

/**
 * Loading placeholder.
 *
 * The shimmer is a background-position animation on a gradient, not a
 * `width`/`opacity` animation — it composites cleanly and does not trigger
 * layout, so a screen full of skeletons stays cheap.
 *
 * `aria-hidden` plus a `role="status"` wrapper (see `SkeletonPanel`) means
 * screen readers hear "Loading" once, not a description of every grey box.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-md bg-surface',
        'after:absolute after:inset-0 after:animate-(--animate-shimmer)',
        'after:bg-[linear-gradient(90deg,transparent,var(--border-strong),transparent)]',
        'after:bg-[length:200%_100%]',
        className,
      )}
    />
  );
}

/**
 * Skeleton wrapper that reserves a fixed height.
 *
 * The height is the load-bearing part: a dynamically imported demo that
 * mounts into an unreserved container shifts the entire page below it. Every
 * `next/dynamic` boundary on this site passes an explicit height here.
 */
export function SkeletonPanel({
  className,
  label = 'Loading',
  height = 'h-80',
}: {
  className?: string;
  label?: string;
  height?: string;
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'flex w-full flex-col gap-4 rounded-(--radius-card) border border-border bg-surface/40 p-6',
        height,
        className,
      )}
    >
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="mt-2 flex-1 w-full" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

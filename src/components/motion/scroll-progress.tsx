'use client';

import { m, useScroll, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

export interface ScrollProgressProps {
  className?: string;
  /** Rendered fixed to the viewport top by default. */
  fixed?: boolean;
}

/**
 * A 2px gradient bar showing document scroll progress.
 *
 * Uses `scaleX` rather than `width` — width animation triggers layout on every
 * frame, scale is composited on the GPU. `transform-origin: left` makes it grow
 * from the leading edge.
 *
 * `aria-hidden` because it is purely decorative: it conveys nothing a
 * screen reader user cannot get from the scroll position itself, and
 * announcing a continuously changing percentage would be actively hostile.
 */
export function ScrollProgress({ className, fixed = true }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = usePrefersReducedMotion();

  // Spring only when motion is welcome; otherwise track scroll exactly.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      className={cn(
        'z-50 h-0.5 origin-left bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary',
        fixed && 'fixed inset-x-0 top-0',
        className,
      )}
    />
  );
}

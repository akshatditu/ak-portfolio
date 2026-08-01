'use client';

import { m, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * The "keep scrolling" indicator at the bottom of the hero.
 *
 * Fades out as the user scrolls — an indicator that persists after you have
 * already scrolled is noise. Driven by `useScroll` rather than a scroll
 * listener so the opacity change happens without a React render.
 *
 * `aria-hidden` because it communicates nothing to a screen reader user, who
 * has no concept of "below the fold" to be prompted about.
 */
export function ScrollCue() {
  const { scrollY } = useScroll();
  const reducedMotion = usePrefersReducedMotion();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  if (reducedMotion) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex"
    >
      <div className="flex flex-col items-center gap-2.5">
        <span className="font-mono text-micro tracking-[0.16em] text-foreground-subtle uppercase">
          Scroll
        </span>
        {/* A dot travelling down a hairline track. Cheaper and quieter than
            a bouncing chevron, and it reads as an instrument rather than a UI. */}
        <span className="relative h-10 w-px overflow-hidden bg-border-strong">
          <m.span
            className="absolute inset-x-0 top-0 h-3 bg-accent"
            animate={{ y: ['-100%', '400%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </m.div>
  );
}

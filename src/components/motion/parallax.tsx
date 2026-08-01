'use client';

import { m, useScroll, useSpring, useTransform } from 'motion/react';
import { type ReactNode, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

export interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Pixels of travel across the full scroll range. Keep small — parallax that
   * is noticeable as an effect has already gone too far.
   */
  amount?: number;
  axis?: 'y' | 'x';
}

/**
 * Scroll-linked parallax.
 *
 * `useScroll` with an element target uses IntersectionObserver + rAF rather
 * than a scroll listener, so this stays off the main thread's critical path.
 * The spring smooths the raw scroll value, which prevents the stepping you get
 * on trackpads that emit large discrete deltas.
 *
 * Returns children unwrapped under reduced motion — no motion component, no
 * scroll subscription, no cost at all.
 */
export function Parallax({ children, className, amount = 60, axis = 'y' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const travel = useTransform(smooth, [0, 1], [amount, -amount]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn(className)}>
      <m.div
        style={axis === 'y' ? { y: travel } : { x: travel }}
        className="will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}

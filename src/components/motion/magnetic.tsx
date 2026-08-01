'use client';

import { m, useMotionValue, useSpring } from 'motion/react';
import { type ReactNode, useRef } from 'react';
import { useHasFinePointer } from '@/hooks/use-media-query';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { transitions } from './motion-tokens';

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
}

/**
 * Nudges its child toward the cursor on hover.
 *
 * Deliberately subtle — 8px of drift reads as responsiveness; 30px reads as a
 * gimmick and makes the element hard to click.
 *
 * Disabled entirely on coarse pointers (where there is no hover to respond to)
 * and under reduced motion. In both cases the children render with no wrapper
 * motion component at all.
 *
 * Note this only moves a wrapper — the child keeps its own hit area and focus
 * behaviour, so keyboard users are unaffected.
 */
export function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, transitions.follow);
  const springY = useSpring(y, transitions.follow);

  const enabled = finePointer && !reducedMotion;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    // Offset from centre, normalised to -1..1, then scaled by `strength`.
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}

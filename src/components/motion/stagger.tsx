'use client';

import { m } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import {
  distance,
  stagger as staggerTokens,
  staticVariants,
  transitions,
  viewportOnce,
} from './motion-tokens';

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. Defaults to the `base` token (60ms). */
  step?: number;
  delay?: number;
  as?: ElementType;
}

/**
 * Parent for staggered lists. Pair with `<StaggerItem>` children.
 *
 * The parent only orchestrates timing — it has no visual variant of its own,
 * so it never fades a whole section in as a block.
 *
 * Like `Reveal`, every path supplies an `animate`/`whileInView` target so a
 * reduced-motion preference discovered after hydration can still drive the
 * already-mounted children out of their `hidden` state. See the note in
 * `reveal.tsx`.
 */
export function Stagger({
  children,
  className,
  step = staggerTokens.base,
  delay = 0,
  as = 'div',
}: StaggerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  const animationProps = reducedMotion
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportOnce };

  return (
    <MotionTag
      data-motion-reveal=""
      className={className}
      {...animationProps}
      variants={{
        hidden: {},
        // No stagger under reduced motion: the children arrive together.
        visible: reducedMotion
          ? { transition: { staggerChildren: 0, delayChildren: 0 } }
          : { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  as?: ElementType;
}

/**
 * A child of `<Stagger>`. Has no `initial`/`animate` of its own — it inherits
 * variant state from the parent, which is what makes the stagger work.
 */
export function StaggerItem({
  children,
  className,
  offset = distance.sm,
  as = 'div',
}: StaggerItemProps) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  return (
    <MotionTag
      data-motion-reveal=""
      className={className}
      variants={
        reducedMotion
          ? staticVariants
          : {
              hidden: { opacity: 0, y: offset },
              visible: { opacity: 1, y: 0, transition: transitions.base },
            }
      }
    >
      {children}
    </MotionTag>
  );
}

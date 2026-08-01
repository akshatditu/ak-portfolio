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

  if (reducedMotion) {
    return (
      <MotionTag className={className} initial="visible" variants={staticVariants}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
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

  if (reducedMotion) {
    return (
      <MotionTag className={className} variants={staticVariants}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: offset },
        visible: { opacity: 1, y: 0, transition: transitions.base },
      }}
    >
      {children}
    </MotionTag>
  );
}

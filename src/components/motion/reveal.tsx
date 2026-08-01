'use client';

import { m } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { distance, staticVariants, transitions, viewportOnce } from './motion-tokens';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Which way the element travels from. `none` fades only. */
  direction?: Direction;
  /** Travel distance in px. Defaults to the `md` token. */
  offset?: number;
  delay?: number;
  duration?: number;
  /** Render as a different element — `li`, `section`, etc. Keeps markup semantic. */
  as?: ElementType;
  /** Animate on mount rather than on scroll. Use for above-the-fold content. */
  immediate?: boolean;
}

function offsetFor(direction: Direction, amount: number) {
  switch (direction) {
    case 'up':
      return { y: amount };
    case 'down':
      return { y: -amount };
    case 'left':
      return { x: amount };
    case 'right':
      return { x: -amount };
    case 'none':
      return {};
  }
}

/**
 * The workhorse scroll reveal.
 *
 * Three properties make it safe to use liberally:
 *  - Only `opacity` and `transform` animate, so it never triggers layout.
 *  - `viewportOnce` means the observer disconnects after firing once.
 *  - Under reduced motion it renders the content immediately with no
 *    transform, rather than not rendering it — content is never gated behind
 *    an animation a user has asked not to see.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  offset = distance.md,
  delay = 0,
  duration,
  as = 'div',
  immediate = false,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  if (reducedMotion) {
    return (
      <MotionTag className={className} variants={staticVariants} initial="visible">
        {children}
      </MotionTag>
    );
  }

  const transition = {
    ...transitions.base,
    ...(duration ? { duration } : {}),
    delay,
  };

  const animationProps = immediate
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportOnce };

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...offsetFor(direction, offset) },
        visible: { opacity: 1, x: 0, y: 0, transition },
      }}
      {...animationProps}
    >
      {children}
    </MotionTag>
  );
}

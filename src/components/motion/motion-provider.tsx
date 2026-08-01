'use client';

import { domAnimation, LazyMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Wraps the app in Motion's lazy feature loader.
 *
 * Why this exists: importing `motion.div` directly pulls Motion's full feature
 * set into the initial bundle. `LazyMotion` with `domAnimation` ships only the
 * DOM animation features we actually use (no layout projection, no drag), which
 * is roughly a third of the size.
 *
 * The tradeoff: components must use `m.div` from `motion/react` rather than
 * `motion.div`. That is the only rule this provider imposes, and it is enforced
 * by every primitive in this directory using `m.*`.
 *
 * `strict` makes a stray `motion.div` throw in development rather than silently
 * re-introducing the full bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

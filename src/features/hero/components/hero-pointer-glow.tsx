'use client';

import { useRef } from 'react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * A spotlight that follows the pointer across the hero.
 *
 * Implementation note: this writes a CSS custom property on a wrapper div and
 * lets a `radial-gradient` read it, rather than re-rendering a Motion element
 * on every pointer move. The gradient repaints on the compositor and React
 * does no work per frame beyond a single style write.
 *
 * `useMousePosition` already opts out on coarse pointers and under reduced
 * motion, so on a phone this component subscribes to nothing.
 */
export function HeroPointerGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { nx, ny, inside } = useMousePosition(ref);
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-(--ease-out-quart) data-[visible=true]:opacity-100"
        data-visible={inside}
        style={{
          background: `radial-gradient(600px circle at ${nx * 100}% ${ny * 100}%, oklch(from var(--accent) l c h / 0.09), transparent 65%)`,
        }}
      />
    </div>
  );
}

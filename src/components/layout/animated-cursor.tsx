'use client';

import { m, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useHasFinePointer } from '@/hooks/use-media-query';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * A soft accent glow that trails the cursor, plus a ring that expands over
 * interactive elements.
 *
 * Deliberately *additive*: the native cursor is never hidden. Replacing the
 * system cursor with a custom element is a well-known accessibility problem —
 * it breaks text-selection affordances, ignores the user's cursor size and
 * contrast settings, and lags on a loaded main thread. This adds an ambient
 * highlight and leaves the real cursor exactly where the OS put it.
 *
 * Renders nothing at all on touch devices or under reduced motion, so there is
 * no listener and no element for the majority of mobile visitors.
 */
export function AnimatedCursor() {
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Loose spring — a tight one just reproduces the native cursor with extra steps.
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });

  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let latest: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!latest) return;
      x.set(latest.x);
      y.set(latest.y);
    };

    const onMove = (event: PointerEvent) => {
      latest = { x: event.clientX, y: event.clientY };
      setVisible(true);
      frame ||= requestAnimationFrame(flush);

      // `closest` on an interactive selector is cheap and handles the common
      // case of hovering a child of a link or button.
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest('a, button, [role="button"], input, textarea, select')));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden lg:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <m.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-xl"
        animate={{
          width: active ? 88 : 44,
          height: active ? 88 : 44,
          opacity: active ? 0.55 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      />
    </m.div>
  );
}

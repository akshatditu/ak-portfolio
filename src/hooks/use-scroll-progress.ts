'use client';

import { type RefObject, useEffect, useState } from 'react';

/**
 * Fraction of the document (or of `ref`'s element) that has been scrolled
 * past, 0–1.
 *
 * Powers both the global scroll bar in the header and the per-article reading
 * progress indicator, which is why it takes an optional ref.
 *
 * Reads are batched into rAF because `scrollHeight` forces layout, and doing
 * that on every scroll event is a classic jank source.
 */
export function useScrollProgress(ref?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = ref?.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        // Distance scrolled into the element, over its scrollable extent.
        const total = rect.height - window.innerHeight;
        if (total <= 0) {
          setProgress(rect.bottom <= window.innerHeight ? 1 : 0);
          return;
        }
        setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
        return;
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable <= 0 ? 0 : Math.min(window.scrollY / scrollable, 1));
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

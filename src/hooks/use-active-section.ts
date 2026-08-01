'use client';

import { useEffect, useState } from 'react';
import { HEADER_OFFSET } from '@/config/navigation';

/**
 * Scroll-spy: which section is currently "the one you're reading".
 *
 * Implemented with IntersectionObserver rather than a scroll handler, so the
 * browser does the intersection maths off the main thread and we do no work
 * per scroll frame.
 *
 * Two details that most scroll-spy implementations get wrong:
 *
 *  1. **Tie-breaking.** Tall sections mean several can intersect at once. We
 *     keep a live set of intersecting ids and pick the one earliest in page
 *     order, which is the one whose heading the reader has most recently
 *     passed. Picking "highest intersection ratio" instead makes the indicator
 *     jump backwards when a short section scrolls past a tall one.
 *
 *  2. **The header offset.** `rootMargin`'s top is pulled down by the fixed
 *     header height, so a section counts as active when its heading clears the
 *     header — not when its first pixel enters the viewport underneath it.
 *
 * The bottom margin (-55%) means a section becomes active once it occupies the
 * upper part of the viewport, which matches where attention actually is.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const visible = new Set<string>();

    const resolve = () => {
      // Earliest in page order wins.
      const next = sectionIds.find((id) => visible.has(id)) ?? null;
      setActiveId((current) => (current === next ? current : next));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        resolve();
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`, threshold: 0 },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

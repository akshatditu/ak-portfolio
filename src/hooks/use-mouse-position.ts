'use client';

import { type RefObject, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

export interface MousePosition {
  /** Pixels, relative to the element (or viewport when no ref is given). */
  x: number;
  y: number;
  /** 0–1 normalised. Convenient for gradients and parallax maths. */
  nx: number;
  ny: number;
  inside: boolean;
}

const INITIAL: MousePosition = { x: 0, y: 0, nx: 0.5, ny: 0.5, inside: false };

/**
 * Pointer position, throttled to the frame rate via rAF.
 *
 * Three things make this safe to use on a page with a performance budget:
 *  - Listener is `passive`, so it never blocks scrolling.
 *  - State updates are coalesced into one per animation frame; a raw
 *    `mousemove` handler can fire several times per frame and cause a render
 *    storm.
 *  - It opts out entirely under reduced motion and on coarse pointers, where
 *    the effects it drives are meaningless anyway.
 */
export function useMousePosition(ref?: RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>(INITIAL);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let latest: { clientX: number; clientY: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!latest) return;

      const element = ref?.current;
      const rect = element?.getBoundingClientRect();

      if (rect) {
        const x = latest.clientX - rect.left;
        const y = latest.clientY - rect.top;
        setPosition({
          x,
          y,
          nx: rect.width === 0 ? 0.5 : x / rect.width,
          ny: rect.height === 0 ? 0.5 : y / rect.height,
          inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height,
        });
        return;
      }

      setPosition({
        x: latest.clientX,
        y: latest.clientY,
        nx: latest.clientX / window.innerWidth,
        ny: latest.clientY / window.innerHeight,
        inside: true,
      });
    };

    const onMove = (event: PointerEvent) => {
      latest = { clientX: event.clientX, clientY: event.clientY };
      frame ||= requestAnimationFrame(flush);
    };

    const target: HTMLElement | Window = ref?.current ?? window;
    target.addEventListener('pointermove', onMove as EventListener, { passive: true });

    return () => {
      target.removeEventListener('pointermove', onMove as EventListener);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, reducedMotion]);

  return position;
}

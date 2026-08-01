'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a media query without the hydration mismatch that the naive
 * `useState` + `useEffect` version causes.
 *
 * `defaultValue` is what the server assumes. Pick it to match the design's
 * mobile-first default so the first paint is correct for the common case.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Matches the `lg` breakpoint. Used to disable pointer-only effects on touch. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * True only for devices with a precise pointer. The custom cursor and magnetic
 * hover effects are meaningless (and janky) on touch, so they check this.
 */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}

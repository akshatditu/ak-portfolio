'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * Server snapshot is `false` — we assume motion is allowed during SSR and
 * correct on the client if not.
 *
 * The alternative (assuming reduced motion) would mean every animated element
 * renders in its "final" state on the server and then animates in on hydration,
 * which is a visible flash for the majority of users. `useSyncExternalStore`
 * makes the correction happen before paint for the minority who need it.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Single source of truth for motion preference. Every animation primitive in
 * `components/motion` consults this; nothing animates without asking.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

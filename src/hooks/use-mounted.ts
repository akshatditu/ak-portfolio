'use client';

import { useSyncExternalStore } from 'react';

/** Never fires — the value can only change once, at hydration. */
const noopSubscribe = () => () => {};

/**
 * True only after hydration.
 *
 * Implemented with `useSyncExternalStore` rather than the conventional
 * `useState(false)` + `useEffect(() => setMounted(true))`. Two reasons:
 *
 *  - The effect version triggers a second render pass on every mount, which
 *    React's own lint rules now flag (`react-hooks/set-state-in-effect`).
 *  - `useSyncExternalStore` distinguishes server and client snapshots natively,
 *    which is exactly the question being asked here.
 *
 * Use this ONLY for values genuinely unknowable on the server (the resolved
 * theme, a portal target). Reaching for it to silence a hydration warning is
 * almost always the wrong fix — it trades a warning for a flash of missing
 * content.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // client
    () => false, // server
  );
}

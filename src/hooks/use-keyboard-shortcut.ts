'use client';

import { useEffect, useRef } from 'react';

export interface ShortcutOptions {
  /** Require ⌘ on macOS / Ctrl elsewhere. */
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  /**
   * By default shortcuts are suppressed while the user is typing. Set true for
   * shortcuts that must work everywhere (Escape, ⌘K).
   */
  allowInInput?: boolean;
  enabled?: boolean;
  preventDefault?: boolean;
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable === true
  );
}

/**
 * Bind a keyboard shortcut.
 *
 * The handler is held in a ref so callers can pass an inline arrow function
 * without re-binding the listener on every render — a subtle but real source
 * of dropped keystrokes in components that re-render often.
 */
export function useKeyboardShortcut(
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {},
): void {
  const {
    meta = false,
    shift = false,
    alt = false,
    allowInInput = false,
    enabled = true,
    preventDefault = true,
  } = options;

  /**
   * The handler is held in a ref so callers can pass an inline arrow function
   * without re-binding the window listener on every render — a subtle but real
   * source of dropped keystrokes in components that re-render often.
   *
   * The ref is updated in an effect rather than during render: writing to a ref
   * while rendering is unsafe under concurrent rendering, because a render that
   * React later discards would still have mutated the ref.
   */
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;

    const keys = (Array.isArray(key) ? key : [key]).map((k) => k.toLowerCase());

    const onKeyDown = (event: KeyboardEvent) => {
      if (!keys.includes(event.key.toLowerCase())) return;
      if (!allowInInput && isEditable(event.target)) return;

      // `metaKey` on macOS, `ctrlKey` everywhere else — accept either so we
      // don't need to sniff the platform.
      const metaPressed = event.metaKey || event.ctrlKey;
      if (meta !== metaPressed) return;
      if (shift !== event.shiftKey) return;
      if (alt !== event.altKey) return;

      if (preventDefault) event.preventDefault();
      handlerRef.current(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, meta, shift, alt, allowInInput, enabled, preventDefault]);
}

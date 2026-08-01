'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

/**
 * Easter egg: a message for anyone who opens devtools.
 *
 * The audience for this site is engineers, and a meaningful share of them will
 * open the console. It costs one effect and a few hundred bytes.
 *
 * Runs once, guarded so React 19 Strict Mode's double-invoke in development
 * does not print it twice.
 */
declare global {
  interface Window {
    __ag_signed?: boolean;
  }
}

export function ConsoleSignature() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__ag_signed) return;
    window.__ag_signed = true;

    const heading = [
      'color: #e8a13d',
      'font-size: 13px',
      'font-weight: 600',
      'font-family: ui-monospace, monospace',
    ].join(';');

    const body = ['color: #9a9aa5', 'font-size: 12px', 'line-height: 1.6'].join(';');

    // The one intentional console.log on the site — it *is* the easter egg.
    // eslint-disable-next-line no-console
    console.log(
      `%c${siteConfig.name} — ${siteConfig.role}\n%c` +
        `You found the console. Since you're here:\n\n` +
        `  · This site is Next.js App Router with React Server Components.\n` +
        `  · Every animation checks prefers-reduced-motion before it runs.\n` +
        `  · The palette is pulled from the headshot — navy blazer, amber accent.\n` +
        `  · Press ⌘K to search, or "/" if you're on a keyboard without ⌘.\n\n` +
        `If you're hiring for frontend architecture or performance work,\n` +
        `I'd genuinely like to hear from you: ${siteConfig.email}`,
      heading,
      body,
    );
  }, []);

  return null;
}

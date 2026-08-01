import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

/**
 * Typography.
 *
 * `next/font` self-hosts these at build time — no request to Google's servers
 * at runtime, which removes a third-party connection (a Best Practices win)
 * and a render-blocking round trip.
 *
 * `adjustFontFallback` (on by default) generates a fallback @font-face with
 * matched metrics, so the swap from fallback to webfont produces no layout
 * shift. That is worth more to the CLS score than anything else on this page.
 */

export const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
  // Only the weights the design system actually uses. Each extra weight is a
  // separate file the browser may need to fetch.
  weight: ['400', '500', '600', '700'],
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500'],
});

/**
 * Display serif, used sparingly — pull quotes, the hero's emphasised phrase,
 * section eyebrows. A serif accent against a geometric sans is what stops the
 * page reading as a generic Tailwind template.
 */
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  instrumentSerif.variable,
].join(' ');

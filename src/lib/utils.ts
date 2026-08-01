import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind conflict resolution.
 * `cn('p-2', condition && 'p-4')` yields `p-4` rather than both.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Deterministic date formatting. Locale is pinned so SSR and client agree. */
export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    ...opts,
  }).format(value);
}

export function formatMonthYear(date: string | Date): string {
  return formatDate(date, { year: 'numeric', month: 'short', day: undefined });
}

/** ISO date for `<time dateTime>` and structured data. */
export function toISODate(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  return value.toISOString().split('T')[0] ?? '';
}

/**
 * Duration between two dates as "2 yrs 4 mos". `end: null` means "now".
 * Used by the experience timeline so tenure never has to be hand-maintained.
 */
export function formatDuration(start: string, end: string | null): string {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();

  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  months = Math.max(months, 0);

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? '' : 's'}`);
  if (remainder > 0) parts.push(`${remainder} mo${remainder === 1 ? '' : 's'}`);
  return parts.length > 0 ? parts.join(' ') : '< 1 mo';
}

/** URL-safe slug. Used for MDX heading anchors in the TOC. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Absolute URL from a site-relative path. Required for OG tags and JSON-LD. */
export function absoluteUrl(path: string, base: string): string {
  if (path.startsWith('http')) return path;
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Clamp for pointer-driven effects. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Split an array into `count` roughly equal columns, preserving order down
 * each column. Used by the masonry-ish skills and footer layouts.
 */
export function chunkIntoColumns<T>(items: T[], count: number): T[][] {
  const columns: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => {
    columns[index % count]?.push(item);
  });
  return columns;
}

/** Compact large numbers: 10000 → "10K". Used in metric tiles. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  );
}

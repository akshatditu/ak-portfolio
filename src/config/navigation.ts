import type { LucideIcon } from 'lucide-react';
import { Braces, FileText, Layers, Mail, User, Wrench } from 'lucide-react';

export interface NavItem {
  label: string;
  /** The section's DOM id. The href is always `#${sectionId}`. */
  sectionId: string;
  href: string;
  description: string;
  icon: LucideIcon;
  /** Shown in the desktop header. Everything else lives in ⌘K + the footer. */
  primary?: boolean;
}

function section(
  sectionId: string,
  label: string,
  description: string,
  icon: LucideIcon,
  primary = false,
): NavItem {
  return { sectionId, href: `#${sectionId}`, label, description, icon, primary };
}

/**
 * ONE navigation source, consumed by the header, the mobile sheet, the footer
 * and the ⌘K palette — so a section can never be reachable from one surface
 * but missing from another.
 *
 * This is a single-page site: every href is an in-page hash. `sectionId` is
 * kept as its own field (rather than parsed back out of `href`) because the
 * scroll-spy observer needs the bare id, and string-slicing a href in three
 * places is exactly the kind of duplication this file exists to prevent.
 *
 * ORDER MATTERS: it is both the visual order of the page and the order the
 * scroll-spy resolves ties in.
 */
export const navItems: NavItem[] = [
  section('about', 'About', 'Who I am and how I work', User, true),
  section('skills', 'Skills', 'The stack I build with', Wrench),
  section('experience', 'Experience', 'Six years across retail analytics, recommerce and consulting', Braces, true),
  section('work', 'Work', 'Projects, with architecture and tech stack', Layers, true),
  section('resume', 'Résumé', 'Full résumé, print-optimised, with PDF download', FileText, true),
  section('contact', 'Contact', 'Get in touch about a role', Mail, true),
];

export const primaryNavItems = navItems.filter((item) => item.primary);

/** Every section id, in page order — the scroll-spy observer's input. */
export const sectionIds = navItems.map((item) => item.sectionId);

/** Grouped for the footer's column layout. */
export const footerNavGroups = [
  { title: 'Profile', items: ['about', 'skills', 'resume'] },
  { title: 'Work', items: ['experience', 'work'] },
  { title: 'Get in touch', items: ['contact'] },
] as const;

export function getNavItem(sectionId: string): NavItem | undefined {
  return navItems.find((item) => item.sectionId === sectionId);
}

/** Height of the fixed header, in px. Used as the scroll offset. */
export const HEADER_OFFSET = 72;

/**
 * Scroll a section into view, honouring the user's motion preference.
 *
 * Deliberately does NOT use `element.scrollIntoView()`: that ignores the fixed
 * header and lands the section title underneath it. `window.scrollTo` with an
 * explicit offset puts the heading where a reader expects it.
 *
 * The hash is written with `history.replaceState` rather than by setting
 * `location.hash`, because assigning the hash triggers the browser's own
 * (unoffset, instant) jump and fights the smooth scroll we just started.
 */
export function scrollToSection(sectionId: string, options: { updateHash?: boolean } = {}): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  if (options.updateHash !== false) {
    window.history.replaceState(null, '', `#${sectionId}`);
  }

  /**
   * Move keyboard focus to the section so the next Tab continues from there
   * rather than from the nav. Without this, anchor navigation is visually
   * correct but useless to a keyboard user — a classic single-page a11y bug.
   * `preventScroll` stops focus() from undoing the smooth scroll.
   */
  element.focus({ preventScroll: true });
}

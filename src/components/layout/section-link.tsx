'use client';

import type { ReactNode } from 'react';
import { scrollToSection } from '@/config/navigation';
import { cn } from '@/lib/utils';

export interface SectionLinkProps {
  sectionId: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  /** Called after the scroll starts — used to close the mobile sheet. */
  onNavigate?: () => void;
  'aria-label'?: string;
}

/**
 * An in-page anchor.
 *
 * Renders a real `<a href="#section">`, which matters more than it might seem:
 * middle-click and "open in new tab" work, the link is announced correctly by
 * screen readers, and — critically — if JavaScript fails to load, the browser's
 * native anchor behaviour still navigates to the section. The click handler is
 * a progressive enhancement over that, not a replacement for it.
 *
 * `preventDefault` is only called for plain left clicks; modified clicks fall
 * through to the browser so ⌘-click still opens a new tab.
 */
export function SectionLink({
  sectionId,
  children,
  className,
  active,
  onNavigate,
  ...rest
}: SectionLinkProps) {
  return (
    <a
      href={`#${sectionId}`}
      aria-current={active ? 'true' : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button !== 0) return;
        event.preventDefault();
        scrollToSection(sectionId);
        onNavigate?.();
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </a>
  );
}

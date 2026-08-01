'use client';

import { useEffect, useState } from 'react';
import { CommandPaletteTrigger } from '@/components/layout/command-palette';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SectionLink } from '@/components/layout/section-link';
import { ScrollProgress } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { primaryNavItems, sectionIds } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

/**
 * Sticky header with scroll-spy navigation.
 *
 * Wrapped in `.theme-navy`: the header is always navy, matching the hero it
 * initially overlays. Over the hero it is transparent (the hero's own navy
 * shows through); once scrolled it paints its own translucent navy + blur so
 * it stays legible over the off-white content sections.
 *
 * A client component because it needs the IntersectionObserver scroll-spy and
 * a scroll listener for the condensed style — kept as a *leaf* of the root
 * layout so nothing else joins the client bundle.
 */
export function Header() {
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          'theme-navy fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-(--ease-out-quart)',
          scrolled
            ? 'border-b border-border !bg-navy/85 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent !bg-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-(--container-content) items-center justify-between gap-4 px-(--spacing-gutter)"
        >
          {/* Wordmark — scrolls back to the top of the page */}
          <a
            href="#top"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey) return;
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              });
              window.history.replaceState(null, '', window.location.pathname);
            }}
            className="flex items-center gap-2.5 rounded-md text-small font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-md bg-accent font-mono text-[0.65rem] font-bold text-accent-foreground"
            >
              {siteConfig.initials}
            </span>
            <span className="hidden text-foreground sm:inline">{siteConfig.name}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryNavItems.map((item) => {
              const active = activeSection === item.sectionId;
              return (
                <li key={item.sectionId}>
                  <SectionLink
                    sectionId={item.sectionId}
                    active={active}
                    className={cn(
                      'relative block rounded-full px-3.5 py-2 text-small transition-colors duration-200',
                      active ? 'text-foreground' : 'text-foreground-muted hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                      />
                    )}
                  </SectionLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger className="hidden md:flex" />
            <Button asChild size="sm" variant="accent" className="hidden lg:inline-flex">
              <SectionLink sectionId="contact">Get in touch</SectionLink>
            </Button>
            <MobileNav activeSection={activeSection} />
          </div>
        </nav>
      </header>
    </>
  );
}

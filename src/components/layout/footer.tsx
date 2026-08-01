import { SOCIAL_ICONS } from '@/components/icons';
import { SectionLink } from '@/components/layout/section-link';
import { Container } from '@/components/primitives';
import { footerNavGroups, getNavItem } from '@/config/navigation';
import { publicSocialLinks, siteConfig } from '@/config/site';

/**
 * Site footer. A Server Component — the only dynamic value is the year, and
 * rendering that on the server means zero client JavaScript for the whole
 * footer except the section links.
 *
 * Social links come from `publicSocialLinks`, which excludes anything still
 * flagged as a placeholder. Nothing here can render a dead link.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Navy scope: the footer mirrors the hero, bookending the page in the
    // brand colour so the off-white content reads as the "page" between them.
    <footer className="theme-navy relative mt-auto border-t border-border bg-background">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Identity */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5 text-small font-semibold">
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-secondary font-mono text-[0.65rem] font-bold text-accent-foreground"
              >
                {siteConfig.initials}
              </span>
              <span className="text-foreground">{siteConfig.name}</span>
            </div>

            <p className="max-w-xs text-small leading-relaxed text-foreground-muted">
              {siteConfig.role} in {siteConfig.location}. Currently {siteConfig.currentTitle} at{' '}
              {siteConfig.company}.
            </p>

            <ul className="flex flex-wrap items-center gap-2">
              {publicSocialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.id];
                const external = link.url.startsWith('http');
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      aria-label={`${link.label} — ${link.handle}`}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section map */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNavGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h2 className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((sectionId) => {
                    const item = getNavItem(sectionId);
                    if (!item) return null;
                    return (
                      <li key={sectionId}>
                        <SectionLink
                          sectionId={sectionId}
                          className="text-small text-foreground-muted transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </SectionLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-foreground-subtle">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-micro text-foreground-subtle">
            <span>Built with</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              Next.js
            </a>
            <span aria-hidden="true">·</span>
            <span>Typeset in Geist &amp; Instrument Serif</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

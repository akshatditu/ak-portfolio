import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, GradientMesh, GridBackdrop } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { navItems } from '@/config/navigation';

export const metadata: Metadata = {
  title: 'Page not found',
  // A 404 should never be indexed — it has no content and dilutes the site.
  robots: { index: false, follow: true },
};

/**
 * Custom 404.
 *
 * On a single-page site almost every 404 is a stale or mistyped link, so the
 * most useful thing to offer is the section list rather than a generic "go
 * home" button. Each entry links to `/#section`, which lands on the right part
 * of the page.
 */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden py-24">
      <GradientMesh variant="hero" />
      <GridBackdrop />

      <Container className="relative z-10">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <p className="font-mono text-micro tracking-[0.18em] text-accent uppercase">
            Error 404
          </p>

          <h1 className="text-h1 font-semibold tracking-tight text-foreground">
            That page doesn&apos;t exist.
          </h1>

          <p className="text-lead text-pretty text-foreground-muted">
            This site is a single page, so there is not much to get lost in. Here is everything on
            it.
          </p>

          <nav aria-label="Sections" className="w-full">
            <ul className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.sectionId}>
                    <Link
                      href={`/${item.href}`}
                      className="flex items-start gap-3 rounded-(--radius-card) border border-border bg-surface/40 p-4 transition-colors hover:border-border-strong hover:bg-surface"
                    >
                      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="flex flex-col gap-0.5">
                        <span className="text-small font-medium text-foreground">{item.label}</span>
                        <span className="text-micro leading-relaxed text-foreground-subtle">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Button asChild variant="accent">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Back to the start
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

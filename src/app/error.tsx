'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { Container } from '@/components/primitives';
import { Button } from '@/components/ui/button';

/**
 * Route-level error boundary.
 *
 * Must be a client component — React error boundaries are a client concept.
 *
 * The message deliberately does NOT render `error.message`: in production
 * Next.js replaces it with a generic digest anyway, and showing raw error text
 * to a visitor is noise at best and an information leak at worst. The digest is
 * shown instead, because it is the thing that makes a bug report actionable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app] Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center py-24">
      <Container>
        <div className="flex max-w-xl flex-col items-start gap-5">
          <p className="font-mono text-micro tracking-[0.18em] text-danger uppercase">
            Something broke
          </p>

          <h1 className="text-h2 font-semibold tracking-tight text-foreground">
            That didn&apos;t work.
          </h1>

          <p className="text-lead text-foreground-muted">
            An unexpected error stopped this page rendering. Trying again usually fixes it.
          </p>

          {error.digest && (
            <p className="font-mono text-micro text-foreground-subtle">
              Reference: {error.digest}
            </p>
          )}

          <Button variant="accent" onClick={reset}>
            <RotateCcw aria-hidden="true" />
            Try again
          </Button>
        </div>
      </Container>
    </div>
  );
}

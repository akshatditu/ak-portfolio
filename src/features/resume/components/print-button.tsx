'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Triggers the browser's print dialog.
 *
 * A tiny client component, isolated so the whole résumé section can stay a
 * Server Component. `window.print()` is the only thing here that needs the
 * browser — extracting it costs one file and saves shipping the entire
 * section's markup logic to the client.
 */
export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <Button variant="outline" onClick={() => window.print()}>
      {children}
    </Button>
  );
}

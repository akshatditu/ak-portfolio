import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * The empty state.
 *
 * Treated as a real design surface rather than an afterthought, because "no
 * results" is a state a visitor will actually hit — filter a project list
 * hard enough and you get here. A blank area reads as a bug; this reads as
 * a considered outcome.
 *
 * The icon is decorative and hidden from assistive tech; the title carries
 * the meaning.
 */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-(--radius-panel) border border-dashed border-border px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <div className="relative flex size-12 items-center justify-center rounded-full border border-border bg-surface/60">
          <Icon aria-hidden="true" className="size-5 text-foreground-subtle" />
        </div>
      )}
      <div className="space-y-1.5">
        <p className="text-h3 font-medium text-foreground">{title}</p>
        <div className="mx-auto max-w-sm text-small text-foreground-muted">{description}</div>
      </div>
      {action}
    </div>
  );
}

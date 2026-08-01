import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Marks content that was drafted rather than written by Akshat.
 *
 * This is an integrity feature, not a UI flourish. Any section rendering
 * content flagged `placeholder: true` in the content model must render one of
 * these, so a visitor is never shown generated copy presented as fact.
 *
 * Every instance is greppable: `rg "placeholder: true" src/content`.
 */
export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <Badge variant="warning" className={cn('gap-1', className)}>
      <AlertTriangle aria-hidden="true" className="size-3" />
      Sample content
    </Badge>
  );
}

export interface PlaceholderNoticeProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function PlaceholderNotice({
  children,
  className,
  title = 'Placeholder content',
}: PlaceholderNoticeProps) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-(--radius-card) border border-warning/25 bg-warning/[0.06] p-4 text-small',
        className,
      )}
    >
      <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning" />
      <div className="space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-foreground-muted">{children}</p>
      </div>
    </div>
  );
}

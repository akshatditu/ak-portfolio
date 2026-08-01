'use client';

import { m } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { easing, stagger as staggerTokens } from './motion-tokens';

export interface TextRevealProps {
  text: string;
  className?: string;
  /** Word-level is smoother and cheaper; character-level is for short phrases only. */
  by?: 'word' | 'line';
  delay?: number;
  step?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Reveals text word by word from behind a mask.
 *
 * Accessibility is the tricky part here: splitting text into per-word spans
 * makes some screen readers announce it as disconnected fragments. So the
 * full string is rendered once in a visually-hidden node for assistive tech,
 * and the animated fragments are marked `aria-hidden`. Sighted users get the
 * animation; screen reader users get one clean sentence.
 *
 * Under reduced motion this collapses to plain text with no wrapper spans.
 */
export function TextReveal({
  text,
  className,
  by = 'word',
  delay = 0,
  step = staggerTokens.tight,
  as: Tag = 'span',
}: TextRevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const parts = by === 'word' ? text.split(' ') : text.split('\n');

  return (
    <Tag className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((part, index) => (
          <span
            key={`${part}-${index}`}
            // `overflow-hidden` is the mask; the inner span slides up into it.
            // `pb-[0.12em]` stops descenders (g, y, p) being clipped.
            className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
          >
            <m.span
              data-motion-reveal=""
              className="inline-block will-change-transform"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.85,
                ease: easing.outExpo,
                delay: delay + index * step,
              }}
            >
              {part}
              {index < parts.length - 1 && by === 'word' ? ' ' : ''}
            </m.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

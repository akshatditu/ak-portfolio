'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { easing, viewportOnce } from './motion-tokens';

export interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Animates a number up to its value when scrolled into view.
 *
 * Two details that matter:
 *  - The final value is rendered on the server, so the correct number is in
 *    the HTML for crawlers and for anyone who never triggers the animation.
 *    The counter only ever animates *to* the value that was already there.
 *  - `tabular-nums` (via the `.tabular` utility) keeps digit width fixed, so
 *    the surrounding layout does not jitter while counting.
 *
 * Under reduced motion the number simply appears.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1.4,
  className,
  prefix,
  suffix,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewportOnce);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, value, {
      duration,
      ease: easing.outExpo,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, reducedMotion, value, duration]);

  const formatted = display.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

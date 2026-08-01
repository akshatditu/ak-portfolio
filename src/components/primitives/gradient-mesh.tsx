import { cn } from '@/lib/utils';

export interface GradientMeshProps {
  className?: string;
  /** `hero` is larger and slower; `section` is a quiet background wash. */
  variant?: 'hero' | 'section';
}

/**
 * Ambient background bloom for navy sections.
 *
 * A pure Server Component with CSS-only animation — a canvas or WebGL shader
 * would look marginally better and cost a client bundle, a render loop and
 * battery. Two blurred radial gradients (amber + a lighter navy) drifting on a
 * long ease get the effect for zero JavaScript.
 *
 * Opacities are tuned for the navy hero: amber blooms fast into "muddy" if
 * pushed harder than this against #1B2A4A.
 *
 * `aria-hidden` and `pointer-events-none` throughout; the animation is
 * disabled by the global reduced-motion rule in globals.css.
 */
export function GradientMesh({ className, variant = 'section' }: GradientMeshProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Amber bloom */}
      <div
        className={cn(
          'absolute rounded-full opacity-[0.16] blur-[100px] will-change-transform',
          'bg-[radial-gradient(circle,var(--accent),transparent_70%)]',
          variant === 'hero'
            ? 'animate-(--animate-aurora) -top-[30%] -left-[10%] size-[65vw] max-h-[820px] max-w-[820px]'
            : '-top-1/4 left-[5%] size-[40vw] max-h-[520px] max-w-[520px]',
        )}
      />

      {/* Cool counter-bloom — a lighter navy, offset in position and phase */}
      <div
        className={cn(
          'absolute rounded-full opacity-[0.28] blur-[110px] will-change-transform',
          'bg-[radial-gradient(circle,#3d5580,transparent_70%)]',
          variant === 'hero'
            ? 'animate-(--animate-aurora) [animation-delay:-12s] top-[10%] -right-[15%] size-[60vw] max-h-[760px] max-w-[760px]'
            : 'top-[20%] -right-[10%] size-[35vw] max-h-[460px] max-w-[460px]',
        )}
      />
    </div>
  );
}

/**
 * Faint blueprint grid, masked to fade at the edges. Reinforces the
 * "engineering" register without competing with content.
 */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grid-lines pointer-events-none absolute inset-0 opacity-30',
        '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]',
        className,
      )}
    />
  );
}

/**
 * Subtle film grain. Kills the banding that large blurred gradients produce on
 * 8-bit displays. Inline SVG data URI so there is no extra network request.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

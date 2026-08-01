import type { Transition, Variants } from 'motion/react';

/**
 * =============================================================================
 * MOTION TOKENS
 * =============================================================================
 * The animation equivalent of the colour palette. Every transition on this
 * site composes from these values — no component invents its own easing curve
 * or duration.
 *
 * These deliberately mirror the CSS easing tokens in `globals.css`, so a CSS
 * hover transition and a Motion-driven reveal feel like the same physical
 * system rather than two systems that happen to be on the same page.
 */

/** cubic-bezier tuples, matched to the CSS custom properties. */
export const easing = {
  /** Decisive, front-loaded. The default for anything entering. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Slightly softer. Good for movement rather than appearance. */
  outQuart: [0.25, 1, 0.5, 1],
  /** Gentle overshoot. Reserved for small, deliberate emphasis. */
  spring: [0.34, 1.56, 0.64, 1],
  /** Symmetrical. For things that both enter and exit, like overlays. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  instant: 0.15,
  fast: 0.28,
  base: 0.5,
  slow: 0.75,
  /** Only for large hero-scale reveals. */
  deliberate: 1.05,
} as const;

/** The single default transition. If you're unsure, use this. */
export const transitions = {
  base: { duration: duration.base, ease: easing.outExpo },
  fast: { duration: duration.fast, ease: easing.outQuart },
  slow: { duration: duration.slow, ease: easing.outExpo },
  /**
   * Physical spring for pointer-following elements (cursor, magnetic buttons)
   * where a fixed duration would feel laggy and mechanical.
   */
  follow: { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 },
  soft: { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
} satisfies Record<string, Transition>;

/** How far elements travel when revealing. Small — motion should be felt, not watched. */
export const distance = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

/**
 * Stagger timing. 60ms reads as "one thing after another"; anything much
 * longer starts to feel like the page is loading slowly.
 */
export const stagger = {
  tight: 0.04,
  base: 0.06,
  loose: 0.1,
} as const;

/* -------------------------------------------------------------------------- */
/*                              SHARED VARIANTS                               */
/* -------------------------------------------------------------------------- */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

/** Parent variant that drives children via `staggerChildren`. */
export function staggerContainer(step: number = stagger.base, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
}

/**
 * The reduced-motion equivalent of every variant above: no transform, no
 * duration. Primitives swap to this rather than skipping the animation
 * wholesale, so the element still appears (and `whileInView` bookkeeping
 * still works) without any movement.
 */
export const staticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/**
 * Shared `whileInView` viewport config.
 *
 * `once: true` matters for performance — without it, every reveal on the page
 * keeps an IntersectionObserver alive and re-animates on scroll-back, which
 * both costs CPU and feels twitchy. The negative bottom margin means an
 * element animates when it is genuinely visible, not when its first pixel
 * crosses the fold.
 */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;

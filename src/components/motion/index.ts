/**
 * The animation system. No component outside this directory should import
 * from `motion/react` directly — if a new kind of animation is needed, it
 * belongs here as a primitive so the vocabulary stays shared.
 */
export { MotionProvider } from './motion-provider';
export { Reveal, type RevealProps } from './reveal';
export { Stagger, StaggerItem } from './stagger';
export { TextReveal } from './text-reveal';
export { Parallax } from './parallax';
export { Magnetic } from './magnetic';
export { ScrollProgress } from './scroll-progress';
export { CountUp } from './count-up';
export {
  easing,
  duration,
  transitions,
  distance,
  stagger,
  fadeIn,
  fadeInUp,
  scaleIn,
  staggerContainer,
  staticVariants,
  viewportOnce,
} from './motion-tokens';

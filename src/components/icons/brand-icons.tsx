import type { SVGProps } from 'react';

/**
 * Brand marks.
 *
 * lucide-react v1 removed brand icons (they are third-party trademarks, not
 * part of an open icon set), so these are authored here as minimal single-path
 * SVGs matching lucide's conventions: 24×24 viewBox, `currentColor`, sized by
 * className so they inherit the `size-*` utilities used elsewhere.
 *
 * All are `aria-hidden` by default — every usage site supplies an accessible
 * name on the wrapping link instead, which is the correct place for it.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
} as const;

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** X (formerly Twitter). */
export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

export function LeetcodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.48 0a1.37 1.37 0 0 0-.98.42L7.2 5.8 2.4 10.63a5.55 5.55 0 0 0 0 7.84l4.8 4.83a5.5 5.5 0 0 0 7.8 0l2.7-2.72a1.38 1.38 0 0 0-1.95-1.95l-2.7 2.72a2.74 2.74 0 0 1-3.9 0l-4.8-4.83a2.8 2.8 0 0 1 0-3.94l4.8-4.83 5.3-5.38a1.38 1.38 0 0 0-.97-2.36Zm-2.1 9.26a1.38 1.38 0 0 0 0 2.76h11.24a1.38 1.38 0 0 0 0-2.76H11.38Z" />
      <path d="M8.02 8.06a1.38 1.38 0 0 0 .97 2.36 1.38 1.38 0 0 0 .98-.41l3.13-3.15a1.38 1.38 0 1 0-1.96-1.94L8.02 8.06Z" />
    </svg>
  );
}

export function MediumIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12ZM20.96 12c0 3.54-1.51 6.4-3.38 6.4-1.87 0-3.39-2.86-3.39-6.4s1.52-6.4 3.39-6.4 3.38 2.87 3.38 6.4ZM24 12c0 3.17-.54 5.74-1.19 5.74-.66 0-1.19-2.57-1.19-5.74s.53-5.74 1.19-5.74C23.46 6.26 24 8.83 24 12Z" />
    </svg>
  );
}

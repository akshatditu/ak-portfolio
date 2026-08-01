import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Long-form typography for MDX output.
 *
 * We style descendants here rather than using @tailwindcss/typography for one
 * reason: MDX content on this site includes custom components (callouts,
 * architecture diagrams, code blocks with Shiki output), and the plugin's
 * broad descendant selectors fight those constantly. Owning ~40 lines of
 * selectors is cheaper than owning the overrides.
 *
 * Measure is capped at ~68 characters via `--container-prose`. Anything wider
 * measurably hurts reading speed on long technical articles.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-none text-body text-foreground-muted',

        // --- Headings ---
        '[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:scroll-mt-28 [&_h2]:text-h3 [&_h2]:font-semibold [&_h2]:text-foreground',
        '[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:scroll-mt-28 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground',
        '[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:scroll-mt-28 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground',

        // Autolinked headings: the anchor is invisible until hover/focus, but
        // always reachable by keyboard.
        '[&_.heading-anchor]:ml-2 [&_.heading-anchor]:text-accent [&_.heading-anchor]:opacity-0',
        '[&_h2:hover_.heading-anchor]:opacity-100 [&_h3:hover_.heading-anchor]:opacity-100',
        '[&_.heading-anchor:focus-visible]:opacity-100',

        // --- Body ---
        '[&_p]:my-5 [&_p]:leading-[1.75]',
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_em]:italic',

        // --- Links ---
        '[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-[3px]',
        '[&_a:hover]:decoration-accent',

        // --- Lists ---
        '[&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-5',
        '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5',
        '[&_li]:leading-[1.7]',
        '[&_ul>li]:relative [&_ul>li]:list-none',
        "[&_ul>li]:before:absolute [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:-left-5 [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-accent/50 [&_ul>li]:before:content-['']",

        // --- Code ---
        // Inline code only. `pre code` is reset below so Shiki's own tokens win.
        '[&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground',
        '[&_pre]:my-7 [&_pre]:overflow-x-auto [&_pre]:rounded-(--radius-card) [&_pre]:border [&_pre]:border-border [&_pre]:p-5 [&_pre]:text-small [&_pre]:leading-relaxed',
        '[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit',

        // --- Blockquote ---
        '[&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-lead [&_blockquote]:text-foreground',

        // --- Tables ---
        // Wrapped in an overflow container so a wide table scrolls itself
        // instead of the page.
        '[&_table]:w-full [&_table]:border-collapse [&_table]:text-small',
        '[&_th]:border-b [&_th]:border-border-strong [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground',
        '[&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top',

        '[&_hr]:my-12 [&_hr]:border-border',
        '[&_img]:rounded-(--radius-card) [&_img]:border [&_img]:border-border',

        className,
      )}
    >
      {children}
    </div>
  );
}

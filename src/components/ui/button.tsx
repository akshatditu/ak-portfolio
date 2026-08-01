import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button, in the shadcn/ui idiom.
 *
 * `asChild` merges these styles onto a child element — which is how a
 * `<Link>` gets button styling without nesting an `<a>` inside a `<button>`
 * (invalid HTML, and a real problem for keyboard and screen reader users).
 *
 * Note there is no `:focus` styling here, only `:focus-visible`. The global
 * focus ring in globals.css handles it, so the treatment is identical across
 * every focusable element on the site.
 */
const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-full font-medium',
    'transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-(--ease-out-quart)',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98] motion-reduce:active:scale-100',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-foreground text-background',
          'hover:bg-foreground/90',
          'shadow-[0_1px_2px_oklch(0_0_0/0.2)]',
        ],
        accent: [
          'bg-accent text-accent-foreground',
          'hover:brightness-110',
          'shadow-[0_0_0_1px_var(--accent),0_8px_24px_-8px_var(--accent)]',
        ],
        outline: [
          'border border-border-strong bg-surface/40 text-foreground',
          'hover:border-foreground/30 hover:bg-surface-raised',
        ],
        ghost: 'text-foreground-muted hover:bg-surface hover:text-foreground',
        link: 'text-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-small',
        base: 'h-11 px-6 text-small',
        lg: 'h-13 px-8 text-body',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'base' },
  },
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

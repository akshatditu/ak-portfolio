'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SectionLink } from '@/components/layout/section-link';
import { Button } from '@/components/ui/button';
import { navItems } from '@/config/navigation';
import { publicSocialLinks } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * Mobile navigation sheet.
 *
 * Built on Radix Dialog rather than a hand-rolled panel, which gets us focus
 * trapping, scroll locking, Escape handling, `aria-modal` and inert background
 * content for free — exactly the things hand-rolled mobile menus get wrong.
 *
 * The sheet closes via `SectionLink`'s `onNavigate` callback rather than on a
 * route change, since on a single-page site there is no route change to react
 * to. Radix restores focus to the trigger on close, and `SectionLink` has
 * already moved focus to the section, so we close *after* the scroll starts.
 */
export function MobileNav({ activeSection }: { activeSection: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" className="size-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-6 overflow-y-auto',
            'border-l border-border bg-background p-6 shadow-2xl',
            'duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
            'data-[state=open]:animate-in data-[state=open]:slide-in-from-right',
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-small font-semibold text-foreground">
              Navigation
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Jump to a section of the page
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close navigation menu">
                <X aria-hidden="true" className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.sectionId;
              const Icon = item.icon;
              return (
                <li key={item.sectionId}>
                  <SectionLink
                    sectionId={item.sectionId}
                    active={active}
                    onNavigate={() => setOpen(false)}
                    className={cn(
                      'flex items-start gap-3 rounded-(--radius-card) px-3 py-3 transition-colors',
                      active
                        ? 'bg-surface text-foreground'
                        : 'text-foreground-muted hover:bg-surface/60',
                    )}
                  >
                    <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-small font-medium text-foreground">{item.label}</span>
                      <span className="text-micro leading-relaxed text-foreground-subtle">
                        {item.description}
                      </span>
                    </span>
                  </SectionLink>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {publicSocialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="text-small text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

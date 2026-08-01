'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { ArrowUpRight, Search } from 'lucide-react';
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { scrollToSection } from '@/config/navigation';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { searchEntries, searchGroupLabels } from '@/lib/search-index';
import { cn } from '@/lib/utils';
import type { SearchEntry } from '@/types/content';

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                   */
/* -------------------------------------------------------------------------- */

interface SearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used inside <SearchProvider>');
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // ⌘K / Ctrl+K. `allowInInput` so it works even while a form field is focused.
  useKeyboardShortcut('k', () => setOpen((value) => !value), { meta: true, allowInInput: true });
  // "/" is the other near-universal search shortcut, but only outside inputs.
  useKeyboardShortcut('/', () => setOpen(true));

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandPalette />
    </SearchContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TRIGGER                                   */
/* -------------------------------------------------------------------------- */

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const { setOpen } = useSearch();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        'group flex h-9 items-center gap-2 rounded-full border border-border bg-surface/50 pr-1.5 pl-3.5',
        'text-small text-foreground-subtle transition-colors hover:border-border-strong hover:text-foreground-muted',
        className,
      )}
    >
      <Search aria-hidden="true" className="size-3.5" />
      <span>Search</span>
      <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[0.65rem] text-foreground-subtle">
        ⌘K
      </kbd>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PALETTE                                   */
/* -------------------------------------------------------------------------- */

function CommandPalette() {
  const { open, setOpen } = useSearch();

  const onSelect = useCallback(
    (entry: SearchEntry) => {
      setOpen(false);

      if (entry.external) {
        window.open(entry.href, '_blank', 'noopener,noreferrer');
        return;
      }

      /**
       * Wait a frame before scrolling. Radix restores focus to the trigger when
       * the dialog closes, and that focus restoration scrolls the trigger into
       * view — which would fight (and win against) a scroll started in the same
       * tick. Deferring lets the dialog finish closing first.
       */
      requestAnimationFrame(() => scrollToSection(entry.href.replace(/^#/, '')));
    },
    [setOpen],
  );

  // Group for display. cmdk handles filtering and keyboard navigation; we only
  // decide which section a result belongs to.
  const grouped = useMemo(() => {
    const map = new Map<SearchEntry['kind'], SearchEntry[]>();
    for (const entry of searchEntries) {
      const bucket = map.get(entry.kind) ?? [];
      bucket.push(entry);
      map.set(entry.kind, bucket);
    }
    return map;
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={cn(
            // Underscores become spaces in arbitrary values — `calc(100vw-2rem)`
            // without them is invalid CSS and the whole width rule is dropped.
            'fixed top-[12vh] left-1/2 z-50 w-[calc(100vw_-_2rem)] max-w-xl -translate-x-1/2',
            'overflow-hidden rounded-(--radius-panel) border border-border-strong bg-background shadow-2xl',
            'duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95',
            'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95',
          )}
        >
          <Dialog.Title className="sr-only">Search this site</Dialog.Title>
          <Dialog.Description className="sr-only">
            Jump to a section, a project or a playground demo.
          </Dialog.Description>

          <Command
            loop
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-micro [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-foreground-subtle [&_[cmdk-group-heading]]:uppercase"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search aria-hidden="true" className="size-4 shrink-0 text-foreground-subtle" />
              <Command.Input
                placeholder="Jump to a section, project or demo…"
                className="h-14 w-full bg-transparent text-body text-foreground outline-none placeholder:text-foreground-subtle"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-foreground-subtle sm:inline">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-3 py-10 text-center text-small text-foreground-muted">
                No results. Try “BudgetIQ”, “virtualization” or “résumé”.
              </Command.Empty>

              {Array.from(grouped.entries()).map(([kind, items]) => (
                <Command.Group key={kind} heading={searchGroupLabels[kind]}>
                  {items.map((entry) => (
                    <Command.Item
                      key={entry.id}
                      value={`${entry.title} ${entry.description} ${entry.keywords.join(' ')}`}
                      onSelect={() => onSelect(entry)}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5',
                        'data-[selected=true]:bg-surface data-[selected=true]:text-foreground',
                      )}
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-small font-medium text-foreground">
                          {entry.title}
                        </span>
                        <span className="truncate text-micro text-foreground-subtle">
                          {entry.description}
                        </span>
                      </span>
                      {entry.external && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-foreground-subtle"
                        />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

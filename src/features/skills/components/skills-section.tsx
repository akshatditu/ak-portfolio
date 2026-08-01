import { Container as ContainerIcon, Database, Monitor, Network, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Section, SectionHeading } from '@/components/primitives';
import { skillCategories } from '@/content/data/skills';

/**
 * Icon lookup — the content model stores an icon *name*, keeping
 * `src/content/data/skills.ts` a pure data file with no React import.
 */
const ICONS: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Container: ContainerIcon,
  Network,
};

/**
 * Skills — one compact panel, one row per group.
 *
 * Deliberately small: a skills section is a reference table, not a showcase,
 * and giving it a card per category made it compete with the sections that
 * actually differentiate (Work, Experience). No proficiency bars either —
 * those are judgements the résumé never made.
 *
 * Fully static; a Server Component with no client JS beyond the reveal.
 */
export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-heading" className="border-t border-border">
      <Reveal>
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          eyebrowIndex="02"
          title="The stack I build with"
          description="Frontend first, with enough backend and data depth to own the whole path."
        />
      </Reveal>

      <Stagger className="mt-10 overflow-hidden rounded-(--radius-panel) border border-border bg-surface">
        {skillCategories.map((category) => {
          const Icon = ICONS[category.icon] ?? Monitor;
          return (
            <StaggerItem
              key={category.id}
              className="grid gap-3 border-b border-border p-5 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-6 sm:px-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent-tertiary">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-small font-semibold text-foreground">{category.title}</h3>
                  <p className="truncate text-micro text-foreground-subtle">
                    {category.description}
                  </p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-small text-foreground-muted"
                  >
                    {skill.name}
                    {skill.note && (
                      <span className="ml-1 text-micro text-foreground-subtle">({skill.note})</span>
                    )}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

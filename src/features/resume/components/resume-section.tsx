import { Award, Download, GraduationCap, Printer } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { GlassCard, Section, SectionHeading } from '@/components/primitives';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { achievements, education, experiences } from '@/content/data/experience';
import { skillCategories } from '@/content/data/skills';
import { siteConfig } from '@/config/site';
import { PrintButton } from './print-button';

/**
 * The résumé section.
 *
 * A condensed, print-optimised view of the same content model the rest of the
 * page renders from — so it can never drift from the timeline above it.
 *
 * A Server Component apart from the print button. The `@media print` rules in
 * globals.css hide the header, footer and nav, force a light colour scheme and
 * expand link URLs, so Ctrl+P produces a clean document rather than a
 * screenshot of a dark website.
 */
export function ResumeSection() {
  return (
    <Section id="resume" labelledBy="resume-heading" className="border-t border-border">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="resume-heading"
            eyebrow="Résumé"
            eyebrowIndex="05"
            title="The one-page version"
            description="Print this page for a clean copy, or download the PDF."
          />

          <div className="flex flex-wrap items-center gap-3" data-print-hide>
            <Button asChild variant="accent">
              <a href={siteConfig.resumePath} download type="application/pdf">
                <Download aria-hidden="true" />
                Download PDF
              </a>
            </Button>
            <PrintButton>
              <Printer aria-hidden="true" />
              Print
            </PrintButton>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Experience */}
        <div className="flex flex-col gap-8">
          <h3 className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
            Experience
          </h3>

          <ol className="flex flex-col gap-8">
            {experiences.map((experience) => (
              <li key={experience.id} className="print-break-inside-avoid flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-body font-semibold text-foreground">
                    {experience.title}
                    <span className="font-normal text-foreground-muted"> · {experience.company}</span>
                  </h4>
                  <span className="font-mono text-micro tracking-wide text-foreground-subtle uppercase">
                    {experience.period}
                  </span>
                </div>

                <p className="text-small text-foreground-subtle">
                  {experience.team ? `${experience.team} · ` : ''}
                  {experience.location}
                </p>

                <ul className="flex flex-col gap-2">
                  {experience.highlights.map((item) => (
                    <li
                      key={item.headline}
                      className="relative pl-5 text-small leading-relaxed text-foreground-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent/50"
                      />
                      <span className="font-medium text-foreground">{item.headline}</span>
                      {item.detail && <> {item.detail}</>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <GlassCard className="print-break-inside-avoid">
            <h3 className="flex items-center gap-2 font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
              <GraduationCap aria-hidden="true" className="size-3.5" />
              Education
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              {education.map((entry) => (
                <li key={entry.institution} className="flex flex-col gap-0.5">
                  <span className="text-small font-semibold text-foreground">
                    {entry.qualification}, {entry.field}
                  </span>
                  <span className="text-small text-foreground-muted">{entry.institution}</span>
                  <span className="font-mono text-micro text-foreground-subtle">
                    {entry.period} · {entry.location}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="print-break-inside-avoid">
            <h3 className="flex items-center gap-2 font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
              <Award aria-hidden="true" className="size-3.5" />
              Achievements
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              {achievements.map((achievement) => (
                <li key={achievement.title} className="flex flex-col gap-1">
                  <span className="text-small font-semibold text-foreground">
                    {achievement.title}
                  </span>
                  <span className="text-small leading-relaxed text-foreground-muted">
                    {achievement.detail}
                  </span>
                  <span className="font-mono text-micro text-foreground-subtle">
                    {achievement.organisation}
                    {achievement.date ? ` · ${achievement.date}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="print-break-inside-avoid">
            <h3 className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
              Technical skills
            </h3>
            <dl className="mt-4 flex flex-col gap-3">
              {skillCategories.map((category) => (
                <div key={category.id} className="flex flex-col gap-1">
                  <dt className="text-small font-semibold text-foreground">{category.title}</dt>
                  <dd className="text-small leading-relaxed text-foreground-muted">
                    {category.skills.map((skill) => skill.name).join(', ')}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassCard>

          <div className="flex flex-wrap gap-2" data-print-hide>
            <Badge variant="outline">{siteConfig.location}</Badge>
            <Badge variant="outline">{siteConfig.email}</Badge>
          </div>
        </div>
      </div>
    </Section>
  );
}

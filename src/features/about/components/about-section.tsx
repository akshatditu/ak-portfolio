import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { GlassCard, Section, SectionHeading } from '@/components/primitives';
import { experiences } from '@/content/data/experience';
import { siteConfig } from '@/config/site';

/**
 * About.
 *
 * The copy here is the résumé's own summary paragraph, split into sentences —
 * nothing is added. An earlier draft had an invented six-chapter "engineering
 * story"; it read well and was fiction, so it was deleted.
 *
 * The right-hand column is derived data (current role, tenure, focus areas)
 * rather than prose, which keeps the section informative without inventing
 * narrative to fill it.
 */
export function AboutSection() {
  const current = experiences[0];

  return (
    <Section id="about" labelledBy="about-heading" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              id="about-heading"
              eyebrow="About"
              eyebrowIndex="01"
              title={
                <>
                  I own applications{' '}
                  <span className="font-display italic text-accent">end to end</span> — from the API
                  and data layer to the dashboard.
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-5 text-lead text-pretty text-foreground-muted">
              {/* Verbatim from the résumé summary. */}
              <p>
                Full-stack developer with six-plus years of experience building data-driven web
                products, currently leading application development for a retail analytics platform.
              </p>
              <p>
                Frontend-heavy engineer (React, TypeScript, Vite) with strong backend capability
                (Python, Flask, SQLAlchemy, PostgreSQL) and hands-on data engineering via Databricks.
              </p>
              <p>
                I raise delivery quality through reusable UI libraries, Dockerized deployments and
                automated CI/CD, and operate as a hands-on technical lead across multiple concurrent
                products.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          {current && (
            <StaggerItem>
              <GlassCard variant="raised">
                <p className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
                  Currently
                </p>
                <p className="mt-3 text-h3 font-semibold text-foreground">{current.title}</p>
                <p className="mt-1 text-small text-foreground-muted">
                  {current.company}
                  {current.team ? ` · ${current.team}` : ''}
                </p>
                <p className="mt-4 text-small leading-relaxed text-foreground-subtle">
                  {current.companyContext}
                </p>
              </GlassCard>
            </StaggerItem>
          )}

          <StaggerItem>
            <GlassCard>
              <p className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
                Where I go deepest
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  ['Frontend', 'React, TypeScript, Vite — including 100k-row data grids'],
                  ['Backend', 'Python, Flask, SQLAlchemy, REST APIs'],
                  ['Data', 'PostgreSQL with JSONB, Databricks, aggregation pipelines'],
                  ['Delivery', 'Docker, CI/CD, Nginx — releases that are routine'],
                ].map(([area, detail]) => (
                  <li key={area} className="flex flex-col gap-0.5">
                    <span className="text-small font-medium text-foreground">{area}</span>
                    <span className="text-small text-foreground-muted">{detail}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>

          <StaggerItem>
            <GlassCard>
              <p className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
                Based in
              </p>
              <p className="mt-3 text-body font-medium text-foreground">{siteConfig.location}</p>
              <p className="mt-1 text-small text-foreground-muted">
                Open to conversations about frontend architecture and performance work.
              </p>
            </GlassCard>
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}

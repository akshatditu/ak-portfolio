import { Reveal } from '@/components/motion';
import { CountUp } from '@/components/motion';
import { education } from '@/content/data/experience';
import { siteConfig } from '@/config/site';

/**
 * The fact strip below the hero CTAs.
 *
 * Deliberately NOT a metrics dashboard. An earlier version showed the résumé's
 * percentage outcomes (−60% latency, 10M sessions, and so on); Akshat asked for
 * employer numbers to be left off the site, so this shows only neutral,
 * verifiable facts: tenure, number of employers, degree, location.
 *
 * A Server Component — only `CountUp` is a client leaf, so the real numbers are
 * in the HTML for crawlers and for anyone who never triggers the animation.
 */
export function HeroFacts({ years, companies }: { years: number; companies: number }) {
  const degree = education[0];

  return (
    <Reveal immediate delay={1} className="w-full">
      <dl className="mt-1 grid w-full grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 sm:mt-8 sm:gap-y-8 sm:pt-8 lg:grid-cols-4">
        <Fact label="Experience">
          <CountUp value={years} suffix="+" /> years
        </Fact>

        <Fact label="Companies">
          <CountUp value={companies} /> teams
        </Fact>

        {degree && (
          <Fact label="Education">
            {degree.qualification}
            <span className="block text-small font-normal text-foreground-muted">
              {degree.field}
            </span>
          </Fact>
        )}

        <Fact label="Based in">{siteConfig.location}</Fact>
      </dl>
    </Reveal>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <dt className="font-mono text-micro tracking-[0.14em] text-foreground-subtle uppercase">
        {label}
      </dt>
      <dd className="text-lg font-semibold tracking-tight text-foreground">{children}</dd>
    </div>
  );
}

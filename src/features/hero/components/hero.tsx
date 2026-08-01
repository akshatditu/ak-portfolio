import { ArrowRight, Download, Mail } from 'lucide-react';
import Image from 'next/image';
import { SectionLink } from '@/components/layout/section-link';
import { Reveal, TextReveal } from '@/components/motion';
import { Container, GradientMesh, GridBackdrop, NoiseOverlay } from '@/components/primitives';
import { LiveBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { experiences } from '@/content/data/experience';
import { getYearsOfExperience, siteConfig } from '@/config/site';
import { HeroFacts } from './hero-facts';
import { HeroPointerGlow } from './hero-pointer-glow';
import { ScrollCue } from './scroll-cue';

/**
 * The hero — a navy section, deliberately.
 *
 * The headshot was shot against a grey studio backdrop; on a light page that
 * backdrop reads as an obvious rectangle, but blended into deep navy it sits
 * naturally. So the photo lives here, on the darkest surface of the site, with
 * a soft navy gradient feathering its edges into the section.
 *
 * A Server Component: the pointer glow and scroll cue are client leaves, so
 * the headline, photo and CTAs are all in the initial HTML. The portrait is
 * the LCP candidate and carries `priority`.
 */
export function Hero() {
  const years = getYearsOfExperience();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="theme-navy relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden bg-background pt-28 pb-20 sm:pt-32"
    >
      {/* Decorative layers — all aria-hidden, all zero-JS */}
      <GradientMesh variant="hero" />
      <GridBackdrop />
      <NoiseOverlay />
      <HeroPointerGlow />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Copy */}
          <div className="flex flex-col items-start gap-7">
            <Reveal immediate delay={0.1}>
              <LiveBadge>
                <span className="text-foreground">Currently</span>
                <span aria-hidden="true" className="text-foreground-subtle">
                  ·
                </span>
                <span>
                  {siteConfig.currentTitle} at {siteConfig.company}
                </span>
              </LiveBadge>
            </Reveal>

            {/* The H1 carries the name AND the role — the single most important
                string for both a recruiter's skim and for search. */}
            <h1 id="hero-heading">
              <span className="sr-only">
                {siteConfig.name} — {siteConfig.role}
              </span>

              <span aria-hidden="true" className="flex flex-col gap-1">
                <TextReveal
                  text={siteConfig.name}
                  delay={0.2}
                  className="block text-display font-semibold tracking-[-0.035em] text-foreground"
                />
                <TextReveal
                  text={siteConfig.role}
                  delay={0.42}
                  className="text-gradient block text-h1 font-medium tracking-[-0.028em]"
                />
              </span>
            </h1>

            <Reveal immediate delay={0.75} className="max-w-xl">
              <p className="text-lead text-pretty text-foreground-muted">{siteConfig.tagline}</p>
            </Reveal>

            <Reveal immediate delay={0.9}>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="accent">
                  <SectionLink sectionId="work">
                    View projects
                    <ArrowRight aria-hidden="true" />
                  </SectionLink>
                </Button>

                <Button asChild size="lg" variant="outline">
                  {/* `download` plus an explicit type — the browser should save
                      the PDF rather than navigate to it. */}
                  <a href={siteConfig.resumePath} download type="application/pdf">
                    <Download aria-hidden="true" />
                    Download résumé
                  </a>
                </Button>

                <Button asChild size="lg" variant="ghost">
                  <SectionLink sectionId="contact">
                    <Mail aria-hidden="true" />
                    Contact me
                  </SectionLink>
                </Button>
              </div>
            </Reveal>

            <HeroFacts years={years} companies={experiences.length} />
          </div>

          {/* Portrait */}
          <Reveal immediate delay={0.35} direction="none" className="mx-auto w-full max-w-xs sm:max-w-sm">
            <div className="relative">
              {/* Soft amber halo behind the photo — the one place the accent is
                  allowed to be atmospheric rather than functional. */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,var(--accent-muted),transparent_70%)]"
              />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-border-strong shadow-2xl">
                <Image
                  src="/akshat.jpg"
                  alt="Portrait of Akshat Gupta"
                  width={760}
                  height={1013}
                  priority
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 24rem, 20rem"
                  className="h-auto w-full object-cover"
                />
                {/* Feather the photo's grey studio backdrop into the navy
                    section so the rectangle edge disappears. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
                  style={{
                    background:
                      'linear-gradient(to top, rgb(27 42 74 / 0.55), transparent 32%), linear-gradient(to bottom, rgb(27 42 74 / 0.25), transparent 22%)',
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

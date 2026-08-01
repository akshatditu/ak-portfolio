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
      className="theme-navy relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden bg-background pt-24 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Decorative layers — all aria-hidden, all zero-JS */}
      <GradientMesh variant="hero" />
      <GridBackdrop />
      <NoiseOverlay />
      <HeroPointerGlow />

      <Container className="relative z-10">
        {/* On mobile the portrait is ordered above the copy so the landing view
            leads with a face rather than a wall of type. The DOM order still
            puts the H1 first, which is what crawlers and screen readers read. */}
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Copy */}
          <div className="order-2 flex flex-col items-start gap-5 sm:gap-7 lg:order-1">
            <Reveal immediate delay={0.1}>
              <LiveBadge className="text-micro sm:text-small">
                {/* One text flow rather than three flex children: on a narrow
                    screen separate children break onto their own lines and the
                    label fragments. As inline text it wraps like a sentence. */}
                <span>
                  <span className="text-foreground">Currently</span>
                  <span aria-hidden="true" className="px-1.5 text-foreground-subtle">
                    ·
                  </span>
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
                {/* Steps down hard on mobile. At `text-h1` the role is nearly
                    the size of the name, wraps to three lines and flattens the
                    hierarchy — the two read as one undifferentiated block. */}
                <TextReveal
                  text={siteConfig.role}
                  delay={0.42}
                  className="text-gradient block text-h3 font-medium tracking-[-0.02em] sm:text-h1 sm:tracking-[-0.028em]"
                />
              </span>
            </h1>

            <Reveal immediate delay={0.75} className="max-w-xl">
              <p className="text-lead text-pretty text-foreground-muted">{siteConfig.tagline}</p>
            </Reveal>

            {/* Full-width and stacked on mobile. Left-aligned auto-width
                buttons stack into a ragged edge of three different lengths,
                which is the single most obvious "unfinished" tell on a phone. */}
            <Reveal immediate delay={0.9} className="w-full">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                  <SectionLink sectionId="work">
                    View projects
                    <ArrowRight aria-hidden="true" />
                  </SectionLink>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  {/* `download` plus an explicit type — the browser should save
                      the PDF rather than navigate to it. */}
                  <a href={siteConfig.resumePath} download type="application/pdf">
                    <Download aria-hidden="true" />
                    Download résumé
                  </a>
                </Button>

                <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                  <SectionLink sectionId="contact">
                    <Mail aria-hidden="true" />
                    Contact me
                  </SectionLink>
                </Button>
              </div>
            </Reveal>

            <HeroFacts years={years} companies={experiences.length} />
          </div>

          {/* Portrait — a centred oval on mobile, small enough to share the fold
              with the headline rather than consume it; the full rounded-card
              portrait returns in the two-column layout at lg.

              `rounded-[50%]` not `rounded-full`: on a non-square box a huge
              pixel radius clamps to half the short side and yields a pill with
              straight sides. Only a percentage radius gives a true ellipse. */}
          <Reveal
            immediate
            delay={0.35}
            direction="none"
            className="order-1 mx-auto w-36 sm:w-52 lg:order-2 lg:w-full lg:max-w-sm"
          >
            <div className="relative">
              {/* Soft amber halo behind the photo — the one place the accent is
                  allowed to be atmospheric rather than functional. */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--accent-muted),transparent_70%)] sm:-inset-6 lg:rounded-[2rem]"
              />

              <div className="relative overflow-hidden rounded-[50%] border border-border-strong shadow-2xl lg:rounded-[1.75rem]">
                <Image
                  src="/akshat.jpg"
                  alt="Portrait of Akshat Gupta"
                  width={760}
                  height={1013}
                  priority
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 13rem, 9rem"
                  className="h-auto w-full object-cover"
                />
                {/* Feather the photo's grey studio backdrop into the navy
                    section so the rectangle edge disappears. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[50%] lg:rounded-[1.75rem]"
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

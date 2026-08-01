import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { SOCIAL_ICONS } from '@/components/icons';
import { Reveal } from '@/components/motion';
import { GlassCard, Section, SectionHeading } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { publicSocialLinks, siteConfig } from '@/config/site';

/**
 * Contact.
 *
 * No form by design — a direct mailto link is the whole contact surface.
 * The social links come from `publicSocialLinks`, so unconfigured profiles
 * are absent rather than broken.
 */
export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              eyebrowIndex="06"
              title={
                <>
                  Let&apos;s talk about{' '}
                  <span className="font-display italic text-accent">what you&apos;re building</span>.
                </>
              }
              description="I'm open to conversations about frontend architecture, performance work and technical leadership roles. The fastest way to reach me is email."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild variant="accent" size="lg">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <GlassCard variant="raised" className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/50 text-accent">
                <MapPin aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-small font-medium text-foreground">{siteConfig.location}</p>
                <p className="text-micro text-foreground-subtle">
                  {siteConfig.currentTitle} at {siteConfig.company}
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-2 border-t border-border pt-5">
              {publicSocialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.id];
                const external = link.url.startsWith('http');
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-foreground-subtle transition-colors group-hover:text-accent"
                      />
                      <span className="text-small text-foreground-muted transition-colors group-hover:text-foreground">
                        {link.label}
                      </span>
                      <span className="ml-auto truncate font-mono text-micro text-foreground-subtle">
                        {link.handle}
                      </span>
                      {external && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-foreground-subtle opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

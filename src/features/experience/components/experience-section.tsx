import { Reveal } from '@/components/motion';
import { Section, SectionHeading } from '@/components/primitives';
import { ExperienceTimeline } from './experience-timeline';

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-heading" className="border-t border-border">
      <Reveal>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          eyebrowIndex="03"
          title="Six years, three teams, one throughline"
          description="Retail analytics, recommerce and product consulting — expand any role for the detail."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <ExperienceTimeline className="mt-12" />
      </Reveal>
    </Section>
  );
}

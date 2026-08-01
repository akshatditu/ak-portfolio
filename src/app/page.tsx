import { JsonLd } from '@/components/seo/json-ld';
import { AboutSection } from '@/features/about';
import { ContactSection } from '@/features/contact';
import { ExperienceSection } from '@/features/experience';
import { Hero } from '@/features/hero';
import { ResumeSection } from '@/features/resume';
import { SkillsSection } from '@/features/skills';
import { WorkSection } from '@/features/work';
import { projectListSchema } from '@/lib/structured-data';

/**
 * The page.
 *
 * A single scrollable document — every nav item is an in-page anchor rather
 * than a route. This file is a Server Component and does nothing but compose
 * sections in order; each section owns its own client boundaries internally,
 * so nothing here forces the page into the client bundle.
 *
 * Section ORDER must match `navItems` in `src/config/navigation.ts`, because
 * the scroll-spy resolves ties by that array's order.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <ResumeSection />
      <ContactSection />

      {/* Project list schema lives here rather than in the layout, because it
          describes this page's content specifically. */}
      <JsonLd data={projectListSchema()} />
    </>
  );
}

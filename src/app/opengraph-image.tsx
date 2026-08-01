import { ImageResponse } from 'next/og';
import { getYearsOfExperience, siteConfig } from '@/config/site';

/**
 * Dynamically generated OpenGraph card.
 *
 * Generated rather than designed in Figma and exported, for the same reason
 * the architecture diagrams are: it reads from the content model, so it cannot
 * go stale when the job title or years of experience change.
 *
 * `next/og` renders with Satori, which supports a deliberately small subset of
 * CSS — flexbox only, no grid, no CSS variables, explicit `display: flex` on
 * every container. Hence the inline hex values below rather than tokens.
 */
// No `runtime = 'edge'`: on Next 16 that opts the route out of static
// generation, so the card would be rendered per request forever. The default
// runtime lets it be generated once at build time and served as a static asset.
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const years = getYearsOfExperience();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1b2a4a',
          padding: '72px',
          position: 'relative',
        }}
      >
        {/* Accent bloom, approximating the site's gradient mesh. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,161,61,0.28), rgba(10,10,12,0) 68%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -280,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,85,128,0.45), rgba(10,10,12,0) 68%)',
            display: 'flex',
          }}
        />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              background: '#e8a13d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#1b2a4a',
            }}
          >
            {siteConfig.initials}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#b9c2d4',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            {siteConfig.locality}, India
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: '#f2f4f8',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: '#e8a13d',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        {/* Facts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
            fontSize: 24,
            color: '#b9c2d4',
          }}
        >
          <div style={{ display: 'flex' }}>{years}+ years</div>
          <div style={{ display: 'flex', color: '#8d99b1' }}>·</div>
          <div style={{ display: 'flex' }}>{siteConfig.company}</div>
          <div style={{ display: 'flex', color: '#8d99b1' }}>·</div>
          <div style={{ display: 'flex' }}>React · TypeScript · Python</div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

/**
 * Favicon, generated at build time from the same initials as the wordmark.
 * Avoids committing a binary asset that would drift from the brand.
 */
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1b2a4a',
          color: '#e8a13d',
          fontSize: 240,
          fontWeight: 700,
          letterSpacing: '-0.04em',
        }}
      >
        {siteConfig.initials}
      </div>
    ),
    size,
  );
}

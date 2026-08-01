import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Sitemap.
 *
 * This is a single-page site, so there is exactly one URL. That is not an
 * oversight — listing `#hash` fragments in a sitemap is invalid (fragments are
 * not separate resources, and Google discards them), and padding a sitemap with
 * fake entries is a manufactured signal rather than an optimisation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

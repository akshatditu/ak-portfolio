import type { NextConfig } from 'next';

/**
 * Next.js configuration.
 *
 * Deliberately minimal. Every option here is either a security header (which
 * Lighthouse "Best Practices" checks for) or an image/bundle optimisation.
 * We avoid custom webpack config entirely so Turbopack stays on the happy path.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Fail the production build on type errors. A portfolio that ships broken
  // types is worse than no portfolio. (Linting runs as its own `npm run lint`
  // step — Next 16 no longer runs ESLint during `next build`.)
  typescript: { ignoreBuildErrors: false },

  images: {
    // AVIF first, WebP fallback. Both are ~30-50% smaller than the JPEG/PNG
    // originals and every browser we care about supports at least one.
    formats: ['image/avif', 'image/webp'],
    // Only the widths our layouts actually request — each extra entry is
    // another cached variant we pay for at the edge.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Tree-shake barrel imports from icon/animation libraries so a single
  // `import { Github } from 'lucide-react'` doesn't pull the whole set.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion', 'recharts', '@radix-ui/react-icons'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

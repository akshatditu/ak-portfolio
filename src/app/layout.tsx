import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SearchProvider } from '@/components/layout/command-palette';
import { MotionProvider } from '@/components/motion';
import { JsonLd } from '@/components/seo/json-ld';
import { AnimatedCursor } from '@/components/layout/animated-cursor';
import { ConsoleSignature } from '@/components/layout/console-signature';
import { siteConfig } from '@/config/site';
import { fontVariables } from '@/lib/fonts';
import { personSchema, websiteSchema } from '@/lib/structured-data';
import '@/styles/globals.css';

/**
 * Root layout — a Server Component.
 *
 * Everything interactive below is a leaf: Header, SearchProvider, cursor.
 * Marking this file `use client` would pull every page in the app into the
 * client bundle, which is the single most common way a Next.js app quietly
 * loses the benefit of Server Components.
 *
 * There is deliberately no theme provider: the site ships one theme, chosen
 * around the headshot's palette (navy / off-white / amber). No toggle means no
 * pre-paint theme script, no hydration caveats and no second palette to keep
 * accessible.
 */

export const metadata: Metadata = {
  // Resolves every relative URL in metadata, OG images and canonicals.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'Akshat Gupta',
    'Senior Frontend Engineer',
    'Technical Lead',
    'React',
    'Next.js',
    'TypeScript',
    'Frontend Architecture',
    'Web Performance',
    'Retail Analytics',
    'Gurgaon',
    'India',
  ],
  alternates: { canonical: '/' },

  /**
   * Declared explicitly rather than left to Next's fallbacks.
   *
   * Next derives `og:title`, `og:description` and (via the `opengraph-image`
   * file convention) `og:image` on its own, but it never emits `og:url`,
   * `og:type`, `og:site_name` or `og:locale`. Those are exactly the fields
   * LinkedIn and Slack use to label and attribute a shared link, which for a
   * portfolio is the single highest-traffic first impression.
   */
  openGraph: {
    type: 'profile',
    firstName: 'Akshat',
    lastName: 'Gupta',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },

  // No `creator`/`site` handle: the X account in `site.ts` is still a
  // placeholder, and guessing one credits the card to whoever owns that handle.
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never cap zoom — capping it fails WCAG 1.4.4 (Resize Text).
  maximumScale: 5,
  themeColor: '#1b2a4a',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <MotionProvider>
          <SearchProvider>
            {/* First focusable element on the page — WCAG 2.4.1 */}
            <a
              href="#main"
              className="sr-only-focusable focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:h-auto focus:w-auto focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-small focus:font-medium focus:text-accent-foreground"
            >
              Skip to main content
            </a>

            <Header />

            <main id="main" tabIndex={-1} className="flex-1 focus-visible:outline-none">
              {children}
            </main>

            <Footer />
            <AnimatedCursor />
            <ConsoleSignature />
          </SearchProvider>
        </MotionProvider>

        <JsonLd data={[personSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

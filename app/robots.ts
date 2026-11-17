import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Personal / logged-in pages have nothing to index.
      disallow: ['/account', '/seller', '/login', '/signup'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

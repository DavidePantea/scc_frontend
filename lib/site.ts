// Absolute base URL of the deployed site, used for canonical links, the
// sitemap and structured data. Set NEXT_PUBLIC_SITE_URL to the public
// domain; on Vercel it falls back to the project's production domain.
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const SITE_URL = raw.replace(/\/+$/, '');
export const SITE_NAME = 'SmartCarCompare';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

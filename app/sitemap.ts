import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { absoluteUrl } from '@/lib/site';

// Public, indexable pages only - account/seller/auth pages are left out.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/compare', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/articole', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/how-it-works', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/advantages', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticle = ARTICLES.map((a) => a.updated).sort().at(-1);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(route.path === '/articole' && latestArticle && { lastModified: new Date(latestArticle) }),
    })),
    ...ARTICLES.map((article) => ({
      url: absoluteUrl(`/articole/${article.slug}`),
      lastModified: new Date(article.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

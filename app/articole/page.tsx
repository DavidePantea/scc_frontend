import type { Metadata } from 'next';
import ArticlesIndex from '@/components/articles/ArticlesIndex';
import { sortedArticles, toSummary } from '@/lib/articles';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const TITLE = 'Articole despre costul real al mașinilor';
const DESCRIPTION =
  'Ghiduri practice despre cât costă o mașină în România: combustibil, RCA, CASCO, impozit, reparații și pierderea de valoare.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/articole' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/articole', type: 'website' },
};

export default function Page() {
  const articles = sortedArticles();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/articole'),
    inLanguage: 'ro-RO',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/articole/${a.slug}`),
        name: a.content.ro.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ArticlesIndex articles={articles.map(toSummary)} />
    </>
  );
}

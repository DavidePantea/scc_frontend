import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from '@/components/articles/ArticleView';
import { ARTICLES, getArticle, sortedArticles, toSummary } from '@/lib/articles';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

// Every article is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  // Romanian is the indexed language (it is what the server renders).
  const { title, description } = article.content.ro;
  const path = `/articole/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title,
      description,
      url: path,
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // Same category first, then the newest of the rest.
  const related = sortedArticles()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3)
    .map(toSummary);

  const url = absoluteUrl(`/articole/${article.slug}`);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.content.ro.title,
      description: article.content.ro.description,
      inLanguage: 'ro-RO',
      datePublished: article.published,
      dateModified: article.updated,
      mainEntityOfPage: url,
      url,
      author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Articole', item: absoluteUrl('/articole') },
        { '@type': 'ListItem', position: 3, name: article.content.ro.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ArticleView article={article} related={related} />
    </>
  );
}

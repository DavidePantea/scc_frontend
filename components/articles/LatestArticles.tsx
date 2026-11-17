'use client';

import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { ArrowRightIcon } from '../icons';
import type { ArticleSummary } from '@/lib/articles';
import { useLanguage } from '@/lib/language-context';

/** Home-page teaser: the newest guides, linking into /articole. */
export default function LatestArticles({ articles }: { articles: ArticleSummary[] }) {
  const { t } = useLanguage();
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="latest-articles-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-brand">{t('nav.articles')}</p>
          <h2 id="latest-articles-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t('articles.homeTitle')}
          </h2>
        </div>
        <Link href="/articole" className="btn btn-secondary">
          {t('articles.all')}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

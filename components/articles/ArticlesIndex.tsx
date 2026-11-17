'use client';

import CtaBanner from '../CtaBanner';
import PageHero from '../PageHero';
import ArticleCard from './ArticleCard';
import type { ArticleSummary } from '@/lib/articles';
import { useLanguage } from '@/lib/language-context';

export default function ArticlesIndex({ articles }: { articles: ArticleSummary[] }) {
  const { t } = useLanguage();
  const [featured, ...rest] = articles;

  return (
    <div className="pb-20 text-ink">
      <PageHero eyebrow={t('nav.articles')} title={t('articles.heroTitle')} subtitle={t('articles.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <ArticleCard article={featured} featured />}
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <CtaBanner
          title={t('articles.ctaCalculatorTitle')}
          description={t('articles.ctaCalculatorDesc')}
          cta={t('action.calculate')}
        />
      </div>
    </div>
  );
}

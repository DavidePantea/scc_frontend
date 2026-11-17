'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '../icons';
import { CATEGORY_LABELS, type ArticleSummary } from '@/lib/articles';
import { useLanguage } from '@/lib/language-context';
import { formatArticleDate } from './format';

export default function ArticleCard({ article, featured = false }: { article: ArticleSummary; featured?: boolean }) {
  const { t, language } = useLanguage();
  const content = article.content[language];

  return (
    <article
      className={`card group relative flex flex-col p-6 transition-shadow duration-200 hover:shadow-[var(--shadow-raised)] sm:p-7 ${
        featured ? 'lg:col-span-2 lg:p-9' : ''
      }`}
    >
      <div className="flex items-center gap-3 text-xs font-semibold">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">{CATEGORY_LABELS[article.category][language]}</span>
        <span className="text-muted">
          {content.minutes} {t('articles.minRead')}
        </span>
      </div>
      <h3
        className={`mt-4 text-balance font-heading font-semibold tracking-tight text-ink ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}
      >
        {/* Stretched link: the whole card is clickable, the title stays the accessible name. */}
        <Link
          href={`/articole/${article.slug}`}
          className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-brand/30"
        >
          {content.title}
        </Link>
      </h3>
      <p className={`mt-3 text-pretty leading-relaxed text-muted ${featured ? 'text-base sm:text-lg' : 'text-sm'}`}>
        {content.description}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
        <time dateTime={article.updated} className="text-muted">
          {formatArticleDate(article.updated, language)}
        </time>
        <span className="flex items-center gap-1.5 font-semibold text-brand">
          {t('articles.readMore')}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

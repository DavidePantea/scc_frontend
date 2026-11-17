'use client';

import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { AlertIcon, ArrowRightIcon, ScaleIcon } from '../icons';
import {
  CATEGORY_LABELS,
  readingMinutes,
  type Article,
  type ArticleBlock,
  type ArticleSummary,
} from '@/lib/articles';
import { useLanguage } from '@/lib/language-context';
import { formatArticleDate, headingId } from './format';

function InlineCta({ target }: { target: 'calculator' | 'compare' }) {
  const { t } = useLanguage();
  const isCompare = target === 'compare';
  return (
    <aside className="hero-surface my-10 flex flex-col gap-5 rounded-[1.25rem] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div>
        <p className="font-heading text-xl font-semibold tracking-tight">
          {t(isCompare ? 'articles.ctaCompareTitle' : 'articles.ctaCalculatorTitle')}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/70">
          {t(isCompare ? 'articles.ctaCompareDesc' : 'articles.ctaCalculatorDesc')}
        </p>
      </div>
      <Link href={isCompare ? '/compare' : '/'} className="btn btn-primary shrink-0">
        {t(isCompare ? 'compare.submit' : 'action.calculate')}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </aside>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={headingId(block.text)} className="mt-12 scroll-mt-24 font-heading text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          {block.text}
        </h2>
      );
    case 'p':
      return <p className="mt-5 text-pretty text-[17px] leading-8 text-ink/85">{block.text}</p>;
    case 'ul':
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="relative pl-6 text-[17px] leading-8 text-ink/85">
              <span aria-hidden className="absolute left-0 top-[0.8rem] h-2 w-2 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <figure className="mt-7">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[480px] border-collapse bg-surface text-left text-sm">
              <thead className="bg-canvas">
                <tr>
                  {block.head.map((cell) => (
                    <th key={cell} scope="col" className="px-4 py-3 font-semibold text-ink">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, idx) => {
                  // A final "Total" row is emphasised.
                  const isTotal = idx === block.rows.length - 1 && /^total/i.test(row[0]);
                  return (
                    <tr key={row[0]} className={`border-t border-line-soft ${isTotal ? 'bg-brand-soft font-semibold text-ink' : ''}`}>
                      {row.map((cell, i) => (
                        <td key={i} className={`tabular px-4 py-3 align-top ${i === 0 ? 'font-medium text-ink' : 'text-ink/80'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {block.note && <figcaption className="mt-2 text-xs leading-relaxed text-muted">{block.note}</figcaption>}
        </figure>
      );
    case 'cta':
      return <InlineCta target={block.target} />;
  }
}

export default function ArticleView({ article, related }: { article: Article; related: ArticleSummary[] }) {
  const { t, language } = useLanguage();
  const content = article.content[language];
  const headings = content.blocks.filter((b): b is Extract<ArticleBlock, { type: 'h2' }> => b.type === 'h2');
  const minutes = readingMinutes(content);

  return (
    <div className="pb-20 text-ink">
      <header className="hero-surface">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-on-dark/50">
                  {t('articles.breadcrumbHome')}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/articole" className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-on-dark/50">
                  {t('nav.articles')}
                </Link>
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-brand-on-dark">{CATEGORY_LABELS[article.category][language]}</p>
          <h1 className="mt-3 max-w-4xl text-balance font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-white/70">{content.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            <span className="flex items-center gap-2 text-white/80">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
                <ScaleIcon className="h-3.5 w-3.5" />
              </span>
              {t('articles.by')}
            </span>
            <span>
              {t('articles.updated')}{' '}
              <time dateTime={article.updated}>{formatArticleDate(article.updated, language)}</time>
            </span>
            <span>
              {minutes} {t('articles.minRead')}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-16">
        <article className="min-w-0 lg:col-span-8">
          {content.blocks.map((block, idx) => (
            <Block key={idx} block={block} />
          ))}

          <p className="mt-12 flex items-start gap-2.5 rounded-xl bg-canvas px-4 py-3.5 text-sm leading-relaxed text-muted ring-1 ring-line">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
            {t('articles.disclaimer')}
          </p>
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-5">
              <nav aria-labelledby="toc-title" className="card p-5">
                <p id="toc-title" className="eyebrow mb-3 text-muted">
                  {t('articles.onThisPage')}
                </p>
                <ol className="space-y-1 text-sm">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${headingId(h.text)}`}
                        className="block rounded-lg px-2 py-1.5 text-ink/80 transition-colors hover:bg-canvas hover:text-ink"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="card p-5">
                <p className="font-heading text-base font-semibold tracking-tight">{t('articles.ctaCalculatorTitle')}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t('articles.ctaCalculatorDesc')}</p>
                <Link href="/" className="btn btn-primary mt-4 w-full">
                  {t('action.calculate')}
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 id="related-title" className="font-heading text-2xl font-bold tracking-tight">
              {t('articles.related')}
            </h2>
            <Link href="/articole" className="link text-sm">
              {t('articles.all')}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

'use client';

import PageHero from './PageHero';
import { LEGAL_DOCS, LEGAL_UPDATED, type LegalDocKey } from '@/lib/legal';
import { useLanguage } from '@/lib/language-context';
import { formatArticleDate } from './articles/format';

export default function LegalDocument({ docKey }: { docKey: LegalDocKey }) {
  const { t, language } = useLanguage();
  const doc = LEGAL_DOCS[docKey][language];

  return (
    <div className="pb-20 text-ink">
      <PageHero title={doc.title} subtitle={doc.intro} variant="tuck" />

      <div className="relative z-10 mx-auto -mt-10 max-w-3xl px-4 sm:px-6">
        <article className="card-raised p-6 sm:p-10">
          <p className="text-sm text-muted">
            {t('articles.updated')}{' '}
            <time dateTime={LEGAL_UPDATED}>{formatArticleDate(LEGAL_UPDATED, language)}</time>
          </p>
          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="font-heading text-xl font-semibold tracking-tight">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-pretty text-[15px] leading-7 text-ink/85">
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="relative pl-5 text-[15px] leading-7 text-ink/85">
                      <span aria-hidden className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul className="mt-3 space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="link text-[15px]">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

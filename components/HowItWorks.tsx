'use client';

import Link from 'next/link';
import CtaBanner from './CtaBanner';
import PageHero from './PageHero';
import { ArrowRightIcon, CarIcon, ReceiptIcon, ScaleIcon, SearchIcon } from './icons';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

const STEPS: { icon: React.ComponentType<{ className?: string }>; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: CarIcon, title: 'howItWorks.step1Title', desc: 'howItWorks.step1Desc' },
  { icon: SearchIcon, title: 'howItWorks.step2Title', desc: 'howItWorks.step2Desc' },
  { icon: ReceiptIcon, title: 'howItWorks.step3Title', desc: 'howItWorks.step3Desc' },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <div className="pb-20 text-ink">
      <PageHero eyebrow={t('nav.howItWorks')} title={t('howItWorks.heroTitle')} subtitle={t('howItWorks.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* connector line behind the step numbers on desktop */}
          <span aria-hidden className="absolute left-[16.6%] right-[16.6%] top-[2.75rem] hidden h-px bg-line md:block" />
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="card relative flex flex-col p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-white ring-8 ring-surface">
                    {idx + 1}
                  </span>
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <h2 className="font-heading text-lg font-semibold tracking-tight">{t(step.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(step.desc)}</p>
              </li>
            );
          })}
        </ol>

        <section className="card mt-6 flex flex-col items-start gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <ScaleIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-semibold tracking-tight">{t('howItWorks.compareTitle')}</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{t('howItWorks.compareDesc')}</p>
            </div>
          </div>
          <Link href="/compare" className="btn btn-secondary w-full lg:w-auto">
            {t('howItWorks.compareCta')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>

        <CtaBanner title={t('howItWorks.ctaTitle')} description={t('howItWorks.ctaDesc')} cta={t('howItWorks.ctaButton')} />
      </div>
    </div>
  );
}

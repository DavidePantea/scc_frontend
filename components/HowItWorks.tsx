'use client';

import Link from 'next/link';
import PageHero from './PageHero';
import { ScaleIcon } from './icons';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

const STEPS: { title: TranslationKey; desc: TranslationKey }[] = [
  { title: 'howItWorks.step1Title', desc: 'howItWorks.step1Desc' },
  { title: 'howItWorks.step2Title', desc: 'howItWorks.step2Desc' },
  { title: 'howItWorks.step3Title', desc: 'howItWorks.step3Desc' },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PageHero title={t('howItWorks.heroTitle')} subtitle={t('howItWorks.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <section
              key={step.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                {idx + 1}
              </div>
              <h2 className="font-heading mb-2 text-lg font-semibold text-[#0F172A]">{t(step.title)}</h2>
              <p className="text-sm leading-relaxed text-[#0F172A]/70">{t(step.desc)}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 flex flex-col items-start gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
              <ScaleIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading mb-1 text-lg font-semibold text-[#0F172A]">{t('howItWorks.compareTitle')}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#0F172A]/70">{t('howItWorks.compareDesc')}</p>
            </div>
          </div>
          <Link
            href="/compare"
            className="w-full shrink-0 rounded-xl border-2 border-[#0F172A]/10 px-5 py-3 text-center text-sm font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/10 lg:w-auto lg:whitespace-nowrap"
          >
            {t('howItWorks.compareCta')}
          </Link>
        </section>

        <section className="mt-8 rounded-2xl bg-[#2563EB] p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-white">{t('howItWorks.ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">{t('howItWorks.ctaDesc')}</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#F97316] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            {t('howItWorks.ctaButton')}
          </Link>
        </section>
      </div>
    </div>
  );
}

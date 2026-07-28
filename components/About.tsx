'use client';

import Link from 'next/link';
import PageHero from './PageHero';
import { PriceTagIcon, ReceiptIcon, ShieldIcon } from './icons';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

type IconComponent = React.ComponentType<{ className?: string }>;

const VALUES: { icon: IconComponent; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: PriceTagIcon, title: 'about.value1.title', desc: 'about.value1.desc' },
  { icon: ReceiptIcon, title: 'about.value2.title', desc: 'about.value2.desc' },
  { icon: ShieldIcon, title: 'about.value3.title', desc: 'about.value3.desc' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PageHero title={t('about.heroTitle')} subtitle={t('about.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading mb-3 text-xl font-semibold text-[#0F172A]">{t('about.mission.title')}</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[#0F172A]/70 sm:text-base">
            {t('about.mission.desc')}
          </p>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <section
                key={value.title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading mb-2 text-lg font-semibold text-[#0F172A]">{t(value.title)}</h2>
                <p className="text-sm leading-relaxed text-[#0F172A]/70">{t(value.desc)}</p>
              </section>
            );
          })}
        </div>

        <section className="mt-8 rounded-2xl bg-[#2563EB] p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-white">{t('about.ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">{t('about.ctaDesc')}</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#F97316] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            {t('about.ctaButton')}
          </Link>
        </section>
      </div>
    </div>
  );
}

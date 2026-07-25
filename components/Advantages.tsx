'use client';

import Link from 'next/link';
import PageHero from './PageHero';
import { ReceiptIcon, WrenchIcon, ScaleIcon, CheckCircleIcon, ShieldIcon, PriceTagIcon } from './icons';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

type IconComponent = React.ComponentType<{ className?: string }>;

const CARDS: { icon: IconComponent; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: ReceiptIcon, title: 'advantages.transparency.title', desc: 'advantages.transparency.desc' },
  { icon: WrenchIcon, title: 'advantages.avoidRepairs.title', desc: 'advantages.avoidRepairs.desc' },
  { icon: ScaleIcon, title: 'advantages.compareVehicles.title', desc: 'advantages.compareVehicles.desc' },
  { icon: CheckCircleIcon, title: 'advantages.verifiedEstimates.title', desc: 'advantages.verifiedEstimates.desc' },
  { icon: ShieldIcon, title: 'advantages.warranty.title', desc: 'advantages.warranty.desc' },
  { icon: PriceTagIcon, title: 'advantages.predictable.title', desc: 'advantages.predictable.desc' },
];

export default function Advantages() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PageHero title={t('advantages.heroTitle')} subtitle={t('advantages.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <section
                key={card.title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading mb-2 text-lg font-semibold text-[#0F172A]">{t(card.title)}</h2>
                <p className="text-sm leading-relaxed text-[#0F172A]/70">{t(card.desc)}</p>
              </section>
            );
          })}
        </div>

        <section className="mt-8 rounded-2xl bg-[#2563EB] p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-white">{t('advantages.ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">{t('advantages.ctaDesc')}</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#F97316] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
          >
            {t('advantages.ctaButton')}
          </Link>
        </section>
      </div>
    </div>
  );
}

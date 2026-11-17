'use client';

import CtaBanner from './CtaBanner';
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
    <div className="pb-20 text-ink">
      <PageHero eyebrow={t('nav.advantages')} title={t('advantages.heroTitle')} subtitle={t('advantages.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <section
                key={card.title}
                className="card group flex flex-col p-6 transition-shadow duration-200 hover:shadow-[var(--shadow-raised)] sm:p-7"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-lg font-semibold tracking-tight">{t(card.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(card.desc)}</p>
              </section>
            );
          })}
        </div>

        <CtaBanner title={t('advantages.ctaTitle')} description={t('advantages.ctaDesc')} cta={t('advantages.ctaButton')} />
      </div>
    </div>
  );
}

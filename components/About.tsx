'use client';

import CtaBanner from './CtaBanner';
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
    <div className="pb-20 text-ink">
      <PageHero eyebrow={t('footer.about')} title={t('about.heroTitle')} subtitle={t('about.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand">{t('about.mission.title')}</p>
          </div>
          <p className="text-pretty font-heading text-xl font-medium leading-relaxed tracking-tight text-ink sm:text-2xl lg:col-span-8">
            {t('about.mission.desc')}
          </p>
        </section>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <section key={value.title} className="card flex flex-col p-6 sm:p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-lg font-semibold tracking-tight">{t(value.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(value.desc)}</p>
              </section>
            );
          })}
        </div>

        <CtaBanner title={t('about.ctaTitle')} description={t('about.ctaDesc')} cta={t('about.ctaButton')} />
      </div>
    </div>
  );
}

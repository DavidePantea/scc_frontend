'use client';

import PageHero from './PageHero';
import { useLanguage } from '@/lib/language-context';

export default function CalculatorHeader() {
  const { t } = useLanguage();

  return (
    <PageHero
      align="start"
      variant="overlap"
      title={
        <>
          {t('hero.titleLine1')} <br className="hidden sm:block" />
          <span className="text-[#2563EB]">{t('hero.titleLine2')}</span>
        </>
      }
      subtitle={t('hero.subtitle')}
    />
  );
}

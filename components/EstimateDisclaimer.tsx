'use client';

import { AlertIcon } from './icons';
import { useLanguage } from '../lib/language-context';

export default function EstimateDisclaimer() {
  const { t } = useLanguage();

  return (
    <div className="mb-8 flex items-start gap-3 rounded-2xl border border-[#F97316]/30 bg-[#F97316]/5 p-4 sm:p-5">
      <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#F97316]" />
      <p className="text-sm leading-relaxed text-[#0F172A]/80">{t('disclaimer.estimateOnly')}</p>
    </div>
  );
}

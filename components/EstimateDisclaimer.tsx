'use client';

import { AlertIcon } from './icons';
import { useLanguage } from '../lib/language-context';

/** "AI estimate, not financial advice" note. 'dark' sits on the hero band. */
export default function EstimateDisclaimer({ surface = 'light', className = '' }: { surface?: 'light' | 'dark'; className?: string }) {
  const { t } = useLanguage();
  const dark = surface === 'dark';

  return (
    <p className={`flex items-start gap-2 text-xs leading-relaxed ${dark ? 'text-white/55' : 'text-muted'} ${className}`}>
      <AlertIcon className={`mt-px h-3.5 w-3.5 shrink-0 ${dark ? 'text-accent' : 'text-accent-ink'}`} />
      {t('disclaimer.estimateOnly')}
    </p>
  );
}

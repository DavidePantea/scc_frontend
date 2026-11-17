'use client';

import { CheckCircleIcon } from './icons';
import type { FinalEstimate } from '../lib/api';
import { useLanguage } from '../lib/language-context';

export function confidenceTone(score: number): { bar: string; label: 'high' | 'medium' | 'low' } {
  if (score >= 8) return { bar: 'bg-success', label: 'high' };
  if (score >= 5) return { bar: 'bg-accent', label: 'medium' };
  return { bar: 'bg-danger', label: 'low' };
}

interface EstimateTotalProps {
  result: FinalEstimate;
  /** 'dark' sits on the ink summary banner, 'light' on a white card. */
  surface?: 'dark' | 'light';
  size?: 'lg' | 'md';
}

/** Big total-cost figure plus the confidence meter and verification note. */
export default function EstimateTotal({ result, surface = 'light', size = 'lg' }: EstimateTotalProps) {
  const { t } = useLanguage();
  const dark = surface === 'dark';
  const periodLabels: Record<string, string> = {
    annual: t('period.annual'),
    monthly: t('period.monthly'),
  };
  const period = periodLabels[result.cost_period];
  const pct = Math.max(0, Math.min(100, (result.confidence / 10) * 100));
  const tone = confidenceTone(result.confidence);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className={`eyebrow ${dark ? 'text-brand-on-dark' : 'text-brand'}`}>{t('result.estimatedCost')}</p>
        <p
          className={`tabular mt-1 font-heading font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'} ${
            size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-3xl'
          }`}
        >
          {Math.round(result.total_estimated_cost.amount).toLocaleString()}
          <span className={`ml-2 text-lg font-semibold ${dark ? 'text-white/60' : 'text-muted'}`}>
            {result.total_estimated_cost.currency} {period}
          </span>
        </p>
        {result.vehicle.listing && (
          <p className={`tabular mt-1 text-sm font-semibold ${dark ? 'text-white/60' : 'text-muted'}`}>
            {result.vehicle.listing.price.toLocaleString()} {result.vehicle.listing.currency}
          </p>
        )}
      </div>

      <div className="w-full sm:w-56">
        <div className={`mb-1.5 flex items-center justify-between text-xs font-semibold ${dark ? 'text-white/70' : 'text-muted'}`}>
          <span>{t('result.confidence')}</span>
          <span className={`tabular ${dark ? 'text-white' : 'text-ink'}`}>{result.confidence}/10</span>
        </div>
        <div
          className={`h-2 w-full overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-line-soft'}`}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={result.confidence}
          aria-label={t('result.confidence')}
        >
          <div className={`h-full rounded-full transition-[width] duration-500 ${tone.bar}`} style={{ width: `${pct}%` }} />
        </div>
        {result.verification.verified && (
          <p className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${dark ? 'text-white/70' : 'text-success'}`}>
            <CheckCircleIcon className={`h-3.5 w-3.5 shrink-0 ${dark ? 'text-[#6EE7B7]' : ''}`} />
            {t('result.verified')}
            {result.verification.revisions > 0 && ` · ${result.verification.revisions} ${t('result.revisions')}`}
          </p>
        )}
      </div>
    </div>
  );
}

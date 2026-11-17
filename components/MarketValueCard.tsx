'use client';

import { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import { AlertIcon, LoaderIcon, PriceTagIcon } from './icons';
import { fetchMarketValue, type MarketValue, type MarketValueRequest } from '../lib/api';
import { useLanguage } from '../lib/language-context';

interface MarketValueCardProps {
  request: MarketValueRequest | null;
  accessToken?: string | null;
  // 'compact' (default) is a small inline widget for a card that already has
  // its own chrome (e.g. a seller listing card). 'card' renders a full
  // results card matching the other calculator sections.
  variant?: 'compact' | 'card';
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function MarketValueCard({ request, accessToken, variant = 'compact' }: MarketValueCardProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<MarketValue | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch() {
    if (!request) return;
    setStatus('loading');
    setError(null);
    try {
      const result = await fetchMarketValue(request, accessToken);
      setValue(result);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.generic'));
      setStatus('error');
    }
  }

  // Fires as soon as this card mounts, in parallel with whatever else the
  // caller kicked off (e.g. the cost estimate) - callers key this component
  // on the vehicle identity (see marketValueKey), so a new vehicle/search
  // remounts it and triggers a fresh fetch rather than reusing stale state.
  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const range =
    value && value.price_min != null && value.price_max != null
      ? `${Math.round(value.price_min).toLocaleString()} – ${Math.round(value.price_max).toLocaleString()} ${value.currency}`
      : null;

  if (variant === 'card') {
    if (!request) return null;
    return (
      <SectionCard icon={PriceTagIcon} title={t('marketValue.title')} className="h-full">
        {status === 'loading' && (
          <div className="space-y-3" aria-live="polite">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-line-soft" />
            <div className="h-4 w-36 animate-pulse rounded bg-line-soft" />
            <p className="flex items-center gap-2 pt-2 text-sm text-muted">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              {t('marketValue.loading')}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-start gap-3 rounded-xl bg-danger-soft p-4">
            <p className="flex items-start gap-2 text-sm font-medium text-danger">
              <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
            <button type="button" onClick={handleFetch} className="btn btn-secondary min-h-9 px-3 py-1.5 text-xs">
              {t('marketValue.retry')}
            </button>
          </div>
        )}

        {status === 'success' && value && (
          <div className="animate-in">
            <p className="tabular font-heading text-4xl font-bold tracking-tight text-ink">
              {Math.round(value.average_price).toLocaleString()}
              <span className="ml-2 text-lg font-semibold text-muted">{value.currency}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {t('marketValue.in')} {value.country}
            </p>
            {range && (
              <p className="tabular mt-4 inline-flex rounded-lg bg-canvas px-3 py-1.5 text-sm font-semibold text-ink">
                {range}
              </p>
            )}
            {value.summary && (
              <p className="mt-4 border-t border-line-soft pt-4 text-sm leading-relaxed text-muted">{value.summary}</p>
            )}
          </div>
        )}
      </SectionCard>
    );
  }

  if (!request) return null;

  return (
    <div className="rounded-xl border border-line-soft bg-canvas p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <PriceTagIcon className="h-4 w-4 text-brand" />
          {t('marketValue.title')}
        </h3>
        {status === 'loading' && (
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted">
            <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
            {t('marketValue.loading')}
          </span>
        )}
        {status === 'error' && (
          <button type="button" onClick={handleFetch} className="btn btn-secondary min-h-8 px-3 py-1 text-xs">
            {t('marketValue.retry')}
          </button>
        )}
      </div>

      {status === 'error' && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-danger">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {status === 'success' && value && (
        <div className="mt-2">
          <p className="tabular font-heading text-xl font-bold text-ink">
            {Math.round(value.average_price).toLocaleString()} {value.currency}
          </p>
          <p className="tabular mt-0.5 text-xs font-medium text-muted">
            {t('marketValue.in')} {value.country}
            {range && <> · {range}</>}
          </p>
          {value.summary && <p className="mt-1.5 text-xs text-muted">{value.summary}</p>}
        </div>
      )}
    </div>
  );
}

// Vehicle identity (make/model/year/fuel/city) or a listing reference,
// stringified so callers can key <MarketValueCard> on it and get a fresh
// component instance whenever the underlying vehicle changes.
export function marketValueKey(request: MarketValueRequest | null): string {
  if (!request) return 'none';
  if ('seller_vehicle_id' in request) return `listing:${request.seller_vehicle_id}`;
  return `${request.make}|${request.model}|${request.year}|${request.fuel}|${request.city ?? ''}`;
}

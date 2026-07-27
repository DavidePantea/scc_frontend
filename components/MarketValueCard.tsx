'use client';

import { useEffect, useState } from 'react';
import { AlertIcon, LoaderIcon, PriceTagIcon } from './icons';
import { fetchMarketValue, type MarketValue, type MarketValueRequest } from '../lib/api';
import { useLanguage } from '../lib/language-context';

interface MarketValueCardProps {
  request: MarketValueRequest | null;
  accessToken?: string | null;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function MarketValueCard({ request, accessToken }: MarketValueCardProps) {
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

  if (!request) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-[#F8FAFC] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
          <PriceTagIcon className="h-4 w-4 text-[#2563EB]" />
          {t('marketValue.title')}
        </h3>
        {status === 'loading' && (
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#0F172A]/50">
            <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
            {t('marketValue.loading')}
          </span>
        )}
        {status === 'error' && (
          <button
            type="button"
            onClick={handleFetch}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#2563EB]/10 px-3 py-1.5 text-xs font-bold text-[#2563EB] transition-colors hover:bg-[#2563EB]/20"
          >
            {t('marketValue.retry')}
          </button>
        )}
      </div>

      {status === 'error' && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {status === 'success' && value && (
        <div className="mt-2">
          <p className="font-heading text-xl font-bold text-[#2563EB]">
            {Math.round(value.average_price).toLocaleString()} {value.currency}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-[#0F172A]/50">
            {t('marketValue.in')} {value.country}
            {value.price_min != null && value.price_max != null && (
              <>
                {' '}
                · {Math.round(value.price_min).toLocaleString()} – {Math.round(value.price_max).toLocaleString()}{' '}
                {value.currency}
              </>
            )}
          </p>
          {value.summary && <p className="mt-1.5 text-xs text-[#0F172A]/60">{value.summary}</p>}
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

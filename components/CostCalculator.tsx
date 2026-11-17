'use client';

import { useEffect, useRef, useState } from 'react';
import CommonProblems from './CommonProblems';
import CostBreakdownBars from './CostBreakdownBars';
import EstimateDisclaimer from './EstimateDisclaimer';
import LoadingMessages from './LoadingMessages';
import MarketValueCard, { marketValueKey } from './MarketValueCard';
import PriceEvolutionChart from './PriceEvolutionChart';
import ResultSummary from './ResultSummary';
import SectionCard from './SectionCard';
import VehicleFormFields from './VehicleFormFields';
import { useUrlParams } from './UrlParams';
import { AlertIcon, CheckCircleIcon, LoaderIcon, PriceTagIcon, ReceiptIcon, WrenchIcon } from './icons';
import {
  fetchCostEstimate,
  fetchSellerVehicles,
  fetchSimpleResearchById,
  FinalEstimate,
  MarketValueRequest,
  SellerVehicle,
} from '../lib/api';
import {
  emptyVehicleForm,
  estimateInputFromForm,
  marketValueRequestFromForm,
  marketValueRequestFromVehicle,
  vehicleFormFromSaved,
  type VehicleFormState,
} from '../lib/vehicle-form';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

type Status = 'idle' | 'loading' | 'success' | 'error';

const URL_PARAM_KEYS = ['researchId', 'useListing'] as const;

const HERO_POINTS: TranslationKey[] = ['hero.point1', 'hero.point2', 'hero.point3'];

const PREVIEW: { icon: React.ComponentType<{ className?: string }>; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: ReceiptIcon, title: 'results.preview1Title', desc: 'results.preview1Desc' },
  { icon: WrenchIcon, title: 'results.preview2Title', desc: 'results.preview2Desc' },
  { icon: PriceTagIcon, title: 'results.preview3Title', desc: 'results.preview3Desc' },
];

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CostCalculator() {
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const [{ researchId, useListing }, urlParamsReader] = useUrlParams(URL_PARAM_KEYS);
  const isSeller = user?.accountType === 'seller';
  const resultsRef = useRef<HTMLDivElement>(null);
  const [sellerVehicles, setSellerVehicles] = useState<SellerVehicle[]>([]);
  const [form, setForm] = useState<VehicleFormState>(emptyVehicleForm);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<FinalEstimate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeMarketValueRequest, setActiveMarketValueRequest] = useState<MarketValueRequest | null>(null);

  useEffect(() => {
    if (!isSeller || !accessToken) return;
    fetchSellerVehicles(accessToken)
      .then(setSellerVehicles)
      .catch(() => undefined);
  }, [isSeller, accessToken]);

  useEffect(() => {
    if (!useListing || !isSeller) return;
    setForm((prev) => ({ ...prev, source: 'listing', sellerVehicleId: useListing }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useListing, isSeller]);

  useEffect(() => {
    if (!researchId) return;
    if (!accessToken) {
      setErrorMessage(t('history.loginRequired'));
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setErrorMessage(null);

    fetchSimpleResearchById(researchId, accessToken)
      .then((data) => {
        if (cancelled) return;
        setForm(vehicleFormFromSaved(data.vehicle));
        setResult(data.result);
        setActiveMarketValueRequest(marketValueRequestFromVehicle(data.vehicle));
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : t('error.generic'));
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchId, accessToken]);

  function update(patch: Partial<VehicleFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);
    setResult(null);
    // Set before the estimate call below, not after it resolves, so
    // <MarketValueCard> mounts and starts fetching at the same time as the
    // cost estimate instead of only once it's done.
    setActiveMarketValueRequest(marketValueRequestFromForm(form));
    // On small screens the results start well below the form.
    resultsRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });

    try {
      const output = await fetchCostEstimate(estimateInputFromForm(form), accessToken);
      setResult(output);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t('error.generic'));
      setStatus('error');
    }
  }

  const vehicleLabel = `${result?.vehicle.make ?? form.make} ${result?.vehicle.model ?? form.model}`.trim();

  return (
    <div className="pb-20 text-ink">
      {urlParamsReader}
      {/* Hero: pitch on the left, the form itself on the right, so the
          primary action is above the fold. */}
      <section className="hero-surface">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="text-center text-white lg:col-span-6 lg:pt-6 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">{t('hero.titleLine1')}</span>
              <span className="block text-brand-on-dark">{t('hero.titleLine2')}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <ul className="mx-auto mt-8 hidden max-w-md space-y-3 text-left text-sm text-white/85 sm:block lg:mx-0">
              {HERO_POINTS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-6" aria-labelledby="vehicle-form-title">
            <div className="card-raised p-5 shadow-[var(--shadow-float)] sm:p-7">
              <div className="mb-5">
                <h2 id="vehicle-form-title" className="font-heading text-xl font-semibold tracking-tight text-ink">
                  {t('form.step1Title')}
                </h2>
                <p className="mt-1 text-sm text-muted">{t('form.step1Subtitle')}</p>
              </div>

              <VehicleFormFields value={form} onChange={update} isSeller={isSeller} sellerVehicles={sellerVehicles} />

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg mt-6 w-full">
                {status === 'loading' && <LoaderIcon className="h-4 w-4 animate-spin" />}
                {status === 'loading' ? t('action.calculating') : t('action.calculate')}
              </button>
              <EstimateDisclaimer className="mt-4" />
            </div>
          </form>
        </div>
      </section>

      <div ref={resultsRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {status === 'idle' && (
          <section aria-labelledby="preview-title">
            <h2 id="preview-title" className="eyebrow mb-4 text-muted">
              {t('results.previewTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PREVIEW.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{t(title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{t(desc)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6">
          {status === 'loading' && (
            <div className="card">
              <LoadingMessages />
            </div>
          )}

          {status === 'error' && (
            <div className="card flex flex-col items-center gap-3 px-6 py-10 text-center" role="alert">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger-soft text-danger">
                <AlertIcon className="h-6 w-6" />
              </span>
              <p className="max-w-md text-sm font-semibold text-ink">{errorMessage}</p>
            </div>
          )}

          {status === 'success' && result && (
            <>
              <ResultSummary result={result} />

              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                <SectionCard icon={ReceiptIcon} title={t('results.title')} className="animate-in">
                  <CostBreakdownBars
                    costBreakdown={result.cost_breakdown}
                    total={result.total_estimated_cost}
                    period={result.cost_period}
                  />
                  {result.summary && (
                    <div className="mt-5 rounded-xl bg-canvas p-4">
                      <h3 className="eyebrow mb-1.5 text-muted">{t('results.details')}</h3>
                      <p className="text-sm leading-relaxed text-ink/80">{result.summary}</p>
                    </div>
                  )}
                </SectionCard>

                <CommonProblems engine={result.engine} className="animate-in" />
              </div>
            </>
          )}

          {/* Market value and price trend are fetched independently of the
              cost estimate, starting as soon as the search is submitted. */}
          {activeMarketValueRequest && (
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <MarketValueCard
                  key={marketValueKey(activeMarketValueRequest)}
                  request={activeMarketValueRequest}
                  accessToken={accessToken}
                  variant="card"
                />
              </div>
              <div className="lg:col-span-2">
                <PriceEvolutionChart
                  series={[{ key: 'main', label: vehicleLabel, color: '#2563EB', request: activeMarketValueRequest }]}
                  accessToken={accessToken}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

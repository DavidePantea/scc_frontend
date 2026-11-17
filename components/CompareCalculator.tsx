'use client';

import { useEffect, useState } from 'react';
import CommonProblems from './CommonProblems';
import CostBreakdownBars from './CostBreakdownBars';
import EstimateDisclaimer from './EstimateDisclaimer';
import EstimateTotal from './EstimateTotal';
import LoadingMessages from './LoadingMessages';
import MarketValueCard, { marketValueKey } from './MarketValueCard';
import PageHero from './PageHero';
import PriceEvolutionChart from './PriceEvolutionChart';
import SectionCard from './SectionCard';
import VehicleFormFields from './VehicleFormFields';
import { useUrlParams } from './UrlParams';
import { AlertIcon, CheckCircleIcon, LoaderIcon, ReceiptIcon, ScaleIcon } from './icons';
import {
  fetchComparisonResearchById,
  fetchCostEstimate,
  fetchSellerVehicles,
  saveComparisonResearch,
  type ComparisonVehicleInput,
  type FinalEstimate,
  type MarketValueRequest,
  type SellerSide,
  type SellerVehicle,
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

type Status = 'idle' | 'loading' | 'success' | 'error';

const URL_PARAM_KEYS = ['researchId', 'useListingA'] as const;
type SideKey = 'a' | 'b';

// Fixed per-side colors - never swapped or cycled, so side A is always blue
// and side B always orange regardless of which vehicles are compared. B uses
// the darker orange so its chart line keeps 3:1 contrast on white.
const SIDE_COLORS: Record<SideKey, string> = { a: '#2563EB', b: '#EA580C' };
const SIDE_BADGE: Record<SideKey, string> = { a: 'bg-brand text-white', b: 'bg-accent text-ink' };

function toComparisonVehicleInput(form: VehicleFormState, output: FinalEstimate): ComparisonVehicleInput {
  // Built from the actual estimate response, not the raw form - for a
  // listing-sourced side the form never carries make/model (the backend
  // resolves those from the listing), and output.vehicle is always fully
  // shaped regardless of source.
  if (form.source === 'listing' && output.vehicle.listing) {
    return {
      seller_vehicle_id: output.vehicle.listing.id,
      km: output.vehicle.km,
      urban_percentage: output.vehicle.urban_percentage,
      city: output.vehicle.city,
    };
  }
  return {
    make: output.vehicle.make,
    model: output.vehicle.model,
    year: output.vehicle.year,
    fuel: output.vehicle.fuel,
    km: output.vehicle.km,
    urban_percentage: output.vehicle.urban_percentage,
    city: output.vehicle.city,
    yearly_km: output.vehicle.yearly_km,
  };
}

function SideBadge({ side }: { side: SideKey }) {
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold ${SIDE_BADGE[side]}`}
    >
      {side.toUpperCase()}
    </span>
  );
}

function Stepper({ step, labels }: { step: 1 | 2; labels: [string, string] }) {
  const steps = [
    { n: 1 as const, label: labels[0] },
    { n: 2 as const, label: labels[1] },
  ];

  return (
    <ol className="flex items-center gap-3 sm:gap-4">
      {steps.map((s, idx) => {
        const isDone = step > s.n;
        const isActive = step === s.n;
        return (
          <li
            key={s.n}
            className="flex flex-1 items-center gap-3 last:flex-none"
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                isDone ? 'bg-success text-white' : isActive ? 'bg-ink text-white' : 'bg-line-soft text-muted'
              }`}
            >
              {isDone ? <CheckCircleIcon className="h-4 w-4" /> : s.n}
            </span>
            <span className={`text-sm font-semibold ${isActive || isDone ? 'text-ink' : 'text-muted'}`}>{s.label}</span>
            {idx < steps.length - 1 && (
              <span className={`h-px flex-1 ${isDone ? 'bg-success' : 'bg-line'}`} aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function CompareCalculator() {
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const [{ researchId, useListingA }, urlParamsReader] = useUrlParams(URL_PARAM_KEYS);
  const [step, setStep] = useState<1 | 2>(1);

  const isSeller = user?.accountType === 'seller';
  const [sellerVehicles, setSellerVehicles] = useState<SellerVehicle[]>([]);

  const [formA, setFormA] = useState<VehicleFormState>(emptyVehicleForm);
  const [formB, setFormB] = useState<VehicleFormState>(emptyVehicleForm);
  const [statusA, setStatusA] = useState<Status>('idle');
  const [statusB, setStatusB] = useState<Status>('idle');
  const [resultA, setResultA] = useState<FinalEstimate | null>(null);
  const [resultB, setResultB] = useState<FinalEstimate | null>(null);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

  const [sellerSide, setSellerSide] = useState<SellerSide>(null);
  const [sellingPoints, setSellingPoints] = useState<string[] | null>(null);
  const [sellerModeOn, setSellerModeOn] = useState(false);

  const [marketValueRequestA, setMarketValueRequestA] = useState<MarketValueRequest | null>(null);
  const [marketValueRequestB, setMarketValueRequestB] = useState<MarketValueRequest | null>(null);

  useEffect(() => {
    if (!isSeller || !accessToken) return;
    fetchSellerVehicles(accessToken)
      .then(setSellerVehicles)
      .catch(() => undefined);
  }, [isSeller, accessToken]);

  useEffect(() => {
    if (!useListingA || !isSeller) return;
    setFormA((prev) => ({ ...prev, source: 'listing', sellerVehicleId: useListingA }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useListingA, isSeller]);

  useEffect(() => {
    if (!researchId) return;
    if (!accessToken) {
      setErrorA(t('history.loginRequired'));
      setStatusA('error');
      return;
    }

    let cancelled = false;
    setStatusA('loading');
    setStatusB('loading');
    setErrorA(null);
    setErrorB(null);

    fetchComparisonResearchById(researchId, accessToken)
      .then((data) => {
        if (cancelled) return;
        setFormA(vehicleFormFromSaved(data.vehicleA));
        setFormB(vehicleFormFromSaved(data.vehicleB));
        setResultA(data.resultA);
        setResultB(data.resultB);
        setMarketValueRequestA(marketValueRequestFromVehicle(data.vehicleA));
        setMarketValueRequestB(marketValueRequestFromVehicle(data.vehicleB));
        setSellerSide(data.sellerSide);
        setSellingPoints(data.sellingPoints);
        setStatusA('success');
        setStatusB('success');
        setStep(2);
      })
      .catch((err) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : t('error.generic');
        setErrorA(message);
        setErrorB(message);
        setStatusA('error');
        setStatusB('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchId, accessToken]);

  const periodLabels: Record<string, string> = {
    annual: t('period.annual'),
    monthly: t('period.monthly'),
  };

  function updateForm(key: SideKey, patch: Partial<VehicleFormState>) {
    const setForm = key === 'a' ? setFormA : setFormB;
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function runSide(
    form: VehicleFormState,
    setStatus: (s: Status) => void,
    setResult: (r: FinalEstimate | null) => void,
    setError: (e: string | null) => void,
  ): Promise<FinalEstimate | null> {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      // skip_history: saved as a pair below once both sides succeed, instead
      // of each side also landing in the single-vehicle history.
      const output = await fetchCostEstimate(estimateInputFromForm(form, { skipHistory: true }), accessToken);
      setResult(output);
      setStatus('success');
      return output;
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.generic'));
      setStatus('error');
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSellerSide(null);
    setSellingPoints(null);
    setSellerModeOn(false);
    // Set before the estimate calls below, not after they resolve, so each
    // side's <MarketValueCard> mounts and starts fetching at the same time
    // as its cost estimate instead of only once it's done.
    setMarketValueRequestA(marketValueRequestFromForm(formA));
    setMarketValueRequestB(marketValueRequestFromForm(formB));
    const [outputA, outputB] = await Promise.all([
      runSide(formA, setStatusA, setResultA, setErrorA),
      runSide(formB, setStatusB, setResultB, setErrorB),
    ]);
    if (outputA && outputB) {
      setStep(2);
      window.scrollTo({ top: 0 });
      if (accessToken) {
        const saved = await saveComparisonResearch(
          {
            vehicleA: toComparisonVehicleInput(formA, outputA),
            vehicleB: toComparisonVehicleInput(formB, outputB),
            resultA: outputA,
            resultB: outputB,
          },
          accessToken,
        );
        if (saved) {
          setSellerSide(saved.sellerSide);
          setSellingPoints(saved.sellingPoints);
        }
      }
    }
  }

  const isSubmitting = statusA === 'loading' || statusB === 'loading';

  const sides = [
    {
      key: 'a' as const,
      title: t('compare.titleA'),
      subtitle: t('compare.subtitleA'),
      form: formA,
      result: resultA,
      error: errorA,
      marketValueRequest: marketValueRequestA,
    },
    {
      key: 'b' as const,
      title: t('compare.titleB'),
      subtitle: t('compare.subtitleB'),
      form: formB,
      result: resultB,
      error: errorB,
      marketValueRequest: marketValueRequestB,
    },
  ].map((side) => ({
    ...side,
    // A listing-sourced side never has form.make/model set (only
    // sellerVehicleId) - the result's own vehicle field is always correct.
    name: `${side.result?.vehicle.make ?? side.form.make} ${side.result?.vehicle.model ?? side.form.model}`.trim(),
    year: side.result?.vehicle.year ?? side.form.year,
  }));

  return (
    <div className="pb-20 text-ink">
      {urlParamsReader}
      <PageHero
        eyebrow={t('nav.compare')}
        title={t('compare.heroTitle')}
        subtitle={t('compare.heroSubtitle')}
        variant="tuck"
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="card-raised mb-8 p-4 sm:px-6">
          <Stepper step={step} labels={[t('stepper.step1'), t('stepper.step2')]} />
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {sides.map((side) => (
                <section key={side.key} className="card p-5 sm:p-7" aria-labelledby={`side-${side.key}-title`}>
                  <header className="mb-5 flex items-start gap-3">
                    <SideBadge side={side.key} />
                    <div>
                      <h2 id={`side-${side.key}-title`} className="font-heading text-lg font-semibold tracking-tight">
                        {side.title}
                      </h2>
                      <p className="mt-0.5 text-sm text-muted">{side.subtitle}</p>
                    </div>
                  </header>

                  <VehicleFormFields
                    value={side.form}
                    onChange={(patch) => updateForm(side.key, patch)}
                    isSeller={isSeller}
                    sellerVehicles={sellerVehicles}
                  />

                  {side.error && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger" role="alert">
                      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                      {side.error}
                    </p>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full max-w-sm">
                {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
                {isSubmitting ? t('action.calculating') : t('compare.submit')}
              </button>
              <EstimateDisclaimer className="max-w-xl justify-center text-center" />
            </div>

            {isSubmitting && (
              <div className="card mt-6">
                <LoadingMessages />
              </div>
            )}
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {resultA && resultB && (
              <Verdict
                sides={[
                  { key: 'a', name: sides[0].name, result: resultA },
                  { key: 'b', name: sides[1].name, result: resultB },
                ]}
                periodLabels={periodLabels}
              />
            )}

            {sellerSide && (
              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p id="seller-mode-label" className="text-sm font-bold text-ink">
                      {t('seller.mode.toggleLabel')}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{t('seller.mode.buyerNote')}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sellerModeOn}
                    aria-labelledby="seller-mode-label"
                    onClick={() => setSellerModeOn((v) => !v)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 ${
                      sellerModeOn ? 'bg-brand' : 'bg-line'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                        sellerModeOn ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {sellerModeOn && (
                  <div className="animate-in mt-5 border-t border-line-soft pt-5">
                    <h3 className="eyebrow mb-3 text-muted">{t('seller.mode.sellingPoints')}</h3>
                    {sellingPoints && sellingPoints.length > 0 ? (
                      <ul className="space-y-2">
                        {sellingPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 rounded-xl bg-brand-soft px-3 py-2.5 text-sm text-ink">
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted">{t('seller.mode.none')}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <PriceEvolutionChart
              series={sides.map((side) => ({
                key: side.key,
                label: side.name,
                color: SIDE_COLORS[side.key],
                request: side.marketValueRequest,
              }))}
              accessToken={accessToken}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {sides.map((side) => (
                <div key={side.key} className="flex flex-col gap-6">
                  <section className="card p-5 sm:p-7">
                    <header className="mb-5 flex items-center gap-3">
                      <SideBadge side={side.key} />
                      <div className="min-w-0">
                        <h2 className="truncate font-heading text-lg font-semibold tracking-tight">{side.name}</h2>
                        <p className="tabular text-sm text-muted">{side.year}</p>
                      </div>
                      {sellerSide === side.key && (
                        <span className="ml-auto shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                          {t('seller.mode.yourCar')}
                        </span>
                      )}
                    </header>
                    {side.result ? (
                      <EstimateTotal result={side.result} size="md" />
                    ) : (
                      <p className="rounded-xl border border-dashed border-line bg-canvas p-5 text-center text-sm text-muted">
                        {side.error ?? t('compare.resultPlaceholder')}
                      </p>
                    )}
                  </section>

                  {side.result && (
                    <SectionCard icon={ReceiptIcon} title={t('results.title')}>
                      <CostBreakdownBars
                        costBreakdown={side.result.cost_breakdown}
                        total={side.result.total_estimated_cost}
                        period={side.result.cost_period}
                      />
                      {side.result.summary && (
                        <div className="mt-5 rounded-xl bg-canvas p-4">
                          <h3 className="eyebrow mb-1.5 text-muted">{t('results.details')}</h3>
                          {/* Capped height so summaries of different lengths don't unbalance the columns */}
                          <p className="max-h-32 overflow-y-auto pr-1 text-sm leading-relaxed text-ink/80">
                            {side.result.summary}
                          </p>
                        </div>
                      )}
                    </SectionCard>
                  )}

                  {/* Independent of side.result - starts fetching as soon as
                      this side's search is submitted. */}
                  <MarketValueCard
                    key={marketValueKey(side.marketValueRequest)}
                    request={side.marketValueRequest}
                    accessToken={accessToken}
                    variant="card"
                  />

                  {side.result && <CommonProblems engine={side.result.engine} scrollable />}
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                {t('compare.editVehicles')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Dark head-to-head banner: both totals and which one costs less. */
function Verdict({
  sides,
  periodLabels,
}: {
  sides: [{ key: SideKey; name: string; result: FinalEstimate }, { key: SideKey; name: string; result: FinalEstimate }];
  periodLabels: Record<string, string>;
}) {
  const { t } = useLanguage();
  const [a, b] = sides;
  const amountA = a.result.total_estimated_cost.amount;
  const amountB = b.result.total_estimated_cost.amount;
  const currency = a.result.total_estimated_cost.currency;
  const comparable =
    currency === b.result.total_estimated_cost.currency && a.result.cost_period === b.result.cost_period;
  const diff = Math.abs(amountA - amountB);
  const similar = diff <= Math.max(amountA, amountB) * 0.02;
  const cheaper = amountA <= amountB ? a : b;
  const period = periodLabels[a.result.cost_period] ?? '';

  return (
    <section className="hero-surface animate-in overflow-hidden rounded-[1.25rem] p-6 text-white shadow-[var(--shadow-float)] sm:p-8">
      <p className="eyebrow flex items-center gap-2 text-brand-on-dark">
        <ScaleIcon className="h-4 w-4" />
        {t('compare.verdict')}
      </p>
      {comparable && (
        <p className="mt-2 max-w-3xl font-heading text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          {similar ? (
            t('compare.similar')
          ) : (
            <>
              {cheaper.name} {t('compare.costsLessPrefix')}{' '}
              <span className="tabular text-accent">
                {Math.round(diff).toLocaleString()} {currency}
              </span>{' '}
              {t('compare.costsLessSuffix')} <span className="text-white/60">{period}</span>
            </>
          )}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sides.map((side) => {
          const isCheaper = comparable && !similar && side.key === cheaper.key;
          return (
            <div
              key={side.key}
              className={`flex items-center gap-3 rounded-xl border p-4 ${
                isCheaper ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/5'
              }`}
            >
              <SideBadge side={side.key} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white/80">{side.name}</p>
                <p className="tabular font-heading text-2xl font-bold tracking-tight">
                  {Math.round(side.result.total_estimated_cost.amount).toLocaleString()}
                  <span className="ml-1.5 text-sm font-semibold text-white/60">
                    {side.result.total_estimated_cost.currency} {periodLabels[side.result.cost_period] ?? ''}
                  </span>
                </p>
              </div>
              {isCheaper && <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

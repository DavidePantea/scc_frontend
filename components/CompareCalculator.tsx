'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CalculatorHeader from './CalculatorHeader';
import CostBreakdownBars from './CostBreakdownBars';
import EstimateDisclaimer from './EstimateDisclaimer';
import AdvancedOptionsFields from './AdvancedOptionsFields';
import LoadingMessages from './LoadingMessages';
import MarketValueCard, { marketValueKey } from './MarketValueCard';
import { AlertIcon, CheckCircleIcon, LoaderIcon, ScaleIcon } from './icons';
import { FuelType, FUEL_TYPES } from '../lib/calculator-logic';
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
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/language-context';

const SEVERITY_STYLES: Record<string, string> = {
  low: 'bg-[#2563EB]/10 text-[#2563EB]',
  medium: 'bg-[#F97316]/10 text-[#F97316]',
  high: 'bg-red-100 text-red-700',
};

function confidenceColor(score: number): string {
  if (score >= 8) return '#2563EB';
  if (score >= 5) return '#F97316';
  return '#DC2626';
}

type VehicleSource = 'standard' | 'listing';

interface FormState {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
  urbanPercentage: number;
  city: string;
  yearlyKm: number | null;
  source: VehicleSource;
  sellerVehicleId: string | null;
}

type Status = 'idle' | 'loading' | 'success' | 'error';
type SideKey = 'a' | 'b';

function emptyForm(): FormState {
  return {
    make: '',
    model: '',
    year: 2016,
    km: 150_000,
    fuel: 'diesel',
    urbanPercentage: 50,
    city: '',
    yearlyKm: null,
    source: 'standard',
    sellerVehicleId: null,
  };
}

function parseNumberOrFallback(raw: string, fallback: number): number {
  const parsed = Number(raw);
  return raw === '' || Number.isNaN(parsed) ? fallback : parsed;
}

function toComparisonVehicleInput(form: FormState, output: FinalEstimate): ComparisonVehicleInput {
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

function toMarketValueRequest(result: FinalEstimate | null): MarketValueRequest | null {
  if (!result) return null;
  if (result.vehicle.listing) {
    return { seller_vehicle_id: result.vehicle.listing.id };
  }
  return {
    make: result.vehicle.make,
    model: result.vehicle.model,
    year: result.vehicle.year,
    fuel: result.vehicle.fuel,
    ...(result.vehicle.city && { city: result.vehicle.city }),
  };
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
          <li key={s.n} className="flex flex-1 items-center gap-3 last:flex-none">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                isDone || isActive ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#0F172A]/40'
              }`}
            >
              {isDone ? <CheckCircleIcon className="h-5 w-5" /> : s.n}
            </div>
            <span
              className={`whitespace-nowrap text-sm font-semibold ${
                isActive || isDone ? 'text-[#0F172A]' : 'text-[#0F172A]/40'
              }`}
            >
              {s.label}
            </span>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 flex-1 rounded-full ${isDone ? 'bg-[#2563EB]' : 'bg-[#F8FAFC]'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block w-full">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/60">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function CompareCalculator() {
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const researchId = searchParams.get('researchId');
  const useListingA = searchParams.get('useListingA');
  const [step, setStep] = useState<1 | 2>(1);

  const isSeller = user?.accountType === 'seller';
  const [sellerVehicles, setSellerVehicles] = useState<SellerVehicle[]>([]);

  const [formA, setFormA] = useState<FormState>(emptyForm());
  const [formB, setFormB] = useState<FormState>(emptyForm());
  const [statusA, setStatusA] = useState<Status>('idle');
  const [statusB, setStatusB] = useState<Status>('idle');
  const [resultA, setResultA] = useState<FinalEstimate | null>(null);
  const [resultB, setResultB] = useState<FinalEstimate | null>(null);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

  const [sellerSide, setSellerSide] = useState<SellerSide>(null);
  const [sellingPoints, setSellingPoints] = useState<string[] | null>(null);
  const [sellerModeOn, setSellerModeOn] = useState(false);

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
        setFormA({
          make: data.vehicleA.make,
          model: data.vehicleA.model,
          year: data.vehicleA.year,
          km: data.vehicleA.km,
          fuel: data.vehicleA.fuel as FuelType,
          urbanPercentage: data.vehicleA.urban_percentage,
          city: data.vehicleA.city ?? '',
          yearlyKm: data.vehicleA.yearly_km ?? null,
          source: 'standard',
          sellerVehicleId: null,
        });
        setFormB({
          make: data.vehicleB.make,
          model: data.vehicleB.model,
          year: data.vehicleB.year,
          km: data.vehicleB.km,
          fuel: data.vehicleB.fuel as FuelType,
          urbanPercentage: data.vehicleB.urban_percentage,
          city: data.vehicleB.city ?? '',
          yearlyKm: data.vehicleB.yearly_km ?? null,
          source: 'standard',
          sellerVehicleId: null,
        });
        setResultA(data.resultA);
        setResultB(data.resultB);
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

  const severityLabels: Record<string, string> = {
    low: t('severity.low'),
    medium: t('severity.medium'),
    high: t('severity.high'),
  };
  const periodLabels: Record<string, string> = {
    annual: t('period.annual'),
    monthly: t('period.monthly'),
  };

  function updateForm(key: SideKey, patch: Partial<FormState>) {
    const setForm = key === 'a' ? setFormA : setFormB;
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function runSide(
    form: FormState,
    setStatus: (s: Status) => void,
    setResult: (r: FinalEstimate | null) => void,
    setError: (e: string | null) => void,
  ): Promise<FinalEstimate | null> {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      const output = await fetchCostEstimate(
        form.source === 'listing' && form.sellerVehicleId
          ? { seller_vehicle_id: form.sellerVehicleId, skip_history: true }
          : {
              make: form.make.trim(),
              model: form.model.trim(),
              year: form.year,
              km: form.km,
              fuel: form.fuel,
              urban_percentage: form.urbanPercentage,
              ...(form.city.trim() && { city: form.city.trim() }),
              ...(form.yearlyKm != null && { yearly_km: form.yearlyKm }),
              // Saved as a pair below once both sides succeed, instead of
              // each side also landing in the single-vehicle history.
              skip_history: true,
            },
        accessToken,
      );
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
    const [outputA, outputB] = await Promise.all([
      runSide(formA, setStatusA, setResultA, setErrorA),
      runSide(formB, setStatusB, setResultB, setErrorB),
    ]);
    if (outputA && outputB) {
      setStep(2);
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

  const sides: {
    key: SideKey;
    title: string;
    subtitle: string;
    form: FormState;
    status: Status;
    result: FinalEstimate | null;
    error: string | null;
  }[] = [
    {
      key: 'a',
      title: t('compare.titleA'),
      subtitle: t('compare.subtitleA'),
      form: formA,
      status: statusA,
      result: resultA,
      error: errorA,
    },
    {
      key: 'b',
      title: t('compare.titleB'),
      subtitle: t('compare.subtitleB'),
      form: formB,
      status: statusB,
      result: resultB,
      error: errorB,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20">
      <CalculatorHeader />

      <div className="relative z-30 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32">
        <EstimateDisclaimer />

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Stepper step={step} labels={[t('stepper.step1'), t('stepper.step2')]} />
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {sides.map((side) => (
                <section
                  key={side.key}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
                >
                  <h2 className="font-heading mb-1 text-lg font-semibold text-[#0F172A]">
                    1. {side.title}
                  </h2>
                  <p className="mb-6 text-sm text-[#0F172A]/60">{side.subtitle}</p>

                  {isSeller && (
                    <div className="mb-5 grid grid-cols-2 gap-2">
                      {(['standard', 'listing'] as const).map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => updateForm(side.key, { source: value })}
                          className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
                            side.form.source === value
                              ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]'
                              : 'border-gray-200 bg-[#F8FAFC] text-[#0F172A]/60 hover:border-[#2563EB]/40'
                          }`}
                        >
                          {t(value === 'standard' ? 'source.standard' : 'source.myInventory')}
                        </button>
                      ))}
                    </div>
                  )}

                  {isSeller && side.form.source === 'listing' ? (
                    <div className="space-y-5">
                      {sellerVehicles.length === 0 ? (
                        <p className="text-sm text-[#0F172A]/60">{t('source.noListings')}</p>
                      ) : (
                        <Field label={t('source.selectListing')}>
                          <select
                            required
                            className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                            value={side.form.sellerVehicleId ?? ''}
                            onChange={(e) => updateForm(side.key, { sellerVehicleId: e.target.value || null })}
                          >
                            <option value="" disabled>
                              {t('source.selectListing')}
                            </option>
                            {sellerVehicles.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.make} {v.model} ({v.year}) · {v.price.toLocaleString()} {v.currency}
                              </option>
                            ))}
                          </select>
                        </Field>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label={t('field.make')}>
                          <input
                            required
                            className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                            value={side.form.make}
                            onChange={(e) => updateForm(side.key, { make: e.target.value })}
                            placeholder={t('field.makePlaceholder')}
                          />
                        </Field>
                        <Field label={t('field.model')}>
                          <input
                            required
                            className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                            value={side.form.model}
                            onChange={(e) => updateForm(side.key, { model: e.target.value })}
                            placeholder={t('field.modelPlaceholder')}
                          />
                        </Field>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label={t('field.year')}>
                          <input
                            required
                            type="number"
                            inputMode="numeric"
                            min={1990}
                            max={new Date().getFullYear()}
                            className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                            value={side.form.year}
                            onChange={(e) =>
                              updateForm(side.key, { year: parseNumberOrFallback(e.target.value, side.form.year) })
                            }
                          />
                        </Field>
                        <Field label={t('field.km')}>
                          <input
                            required
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={1000}
                            className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                            value={side.form.km}
                            onChange={(e) =>
                              updateForm(side.key, { km: parseNumberOrFallback(e.target.value, side.form.km) })
                            }
                          />
                        </Field>
                      </div>
                      <Field label={t('field.fuel')}>
                        <select
                          required
                          className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                          value={side.form.fuel}
                          onChange={(e) => updateForm(side.key, { fuel: e.target.value as FuelType })}
                        >
                          {FUEL_TYPES.map((value) => (
                            <option key={value} value={value}>
                              {t(`fuel.${value}`)}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <AdvancedOptionsFields
                        city={side.form.city}
                        yearlyKm={side.form.yearlyKm}
                        urbanPercentage={side.form.urbanPercentage}
                        onCityChange={(value) => updateForm(side.key, { city: value })}
                        onYearlyKmChange={(value) => updateForm(side.key, { yearlyKm: value })}
                        onUrbanPercentageChange={(value) => updateForm(side.key, { urbanPercentage: value })}
                      />
                    </div>
                  )}

                  {side.error && (
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-red-600">
                      <AlertIcon className="h-4 w-4 shrink-0" />
                      {side.error}
                    </p>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
                {isSubmitting ? t('action.calculating') : t('compare.submit')}
              </button>
            </div>

            {isSubmitting && (
              <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <LoadingMessages />
              </div>
            )}
          </form>
        )}

        {step === 2 && (
          <div>
            {sellerSide && (
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{t('seller.mode.toggleLabel')}</p>
                    <p className="mt-0.5 text-xs text-[#0F172A]/50">{t('seller.mode.buyerNote')}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sellerModeOn}
                    onClick={() => setSellerModeOn((v) => !v)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                      sellerModeOn ? 'bg-[#2563EB]' : 'bg-gray-200'
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
                  <div className="mt-5 border-t border-gray-100 pt-5">
                    <h3 className="font-heading mb-3 text-sm font-semibold text-[#0F172A]">
                      {t('seller.mode.sellingPoints')}
                    </h3>
                    {sellingPoints && sellingPoints.length > 0 ? (
                      <ul className="space-y-2">
                        {sellingPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 rounded-lg bg-[#2563EB]/5 px-3 py-2 text-sm text-[#0F172A]"
                          >
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#0F172A]/60">{t('seller.mode.none')}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {sides.map((side) => (
                <div key={side.key} className="flex flex-col gap-6">
                  {/* Bars box */}
                  <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                    <h2 className="font-heading mb-1 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                      <ScaleIcon className="h-5 w-5 text-[#2563EB]" />
                      2. {t('results.title')}
                    </h2>
                    <p className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                      {/* A listing-sourced side never has form.make/model set
                          (only sellerVehicleId) - the result's own vehicle
                          field is always correct regardless of source. */}
                      {side.result?.vehicle.make ?? side.form.make} {side.result?.vehicle.model ?? side.form.model} ·{' '}
                      {side.result?.vehicle.year ?? side.form.year}
                      {sellerSide === side.key && (
                        <span className="rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-xs font-bold">
                          {t('seller.mode.yourCar')}
                        </span>
                      )}
                    </p>

                    {side.result && (
                      <div className="space-y-6">
                        <CostBreakdownBars
                          costBreakdown={side.result.cost_breakdown}
                          total={side.result.total_estimated_cost}
                          period={side.result.cost_period}
                        />
                        {side.result.summary && (
                          <div className="pt-5 border-t border-gray-100">
                            <h3 className="mb-2 text-sm font-semibold text-[#0F172A]">{t('results.details')}</h3>
                            {/* Fixed-height, scrollable so summaries of different lengths don't unbalance the columns */}
                            <div className="h-28 overflow-y-auto pr-1">
                              <p className="text-sm leading-relaxed text-[#0F172A]/70">{side.result.summary}</p>
                            </div>
                          </div>
                        )}

                        <MarketValueCard
                          key={marketValueKey(toMarketValueRequest(side.result))}
                          request={toMarketValueRequest(side.result)}
                          accessToken={accessToken}
                        />
                      </div>
                    )}
                  </section>

                  {/* Issues box */}
                  <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                    <h2 className="font-heading mb-1 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                      <AlertIcon className="h-5 w-5 text-[#F97316]" />
                      {t('problems.title')}
                    </h2>
                    {side.result?.engine.motor_type && (
                      <p className="mb-5 text-sm text-[#0F172A]/50">{side.result.engine.motor_type}</p>
                    )}

                    {side.result && side.result.engine.common_problems.length > 0 ? (
                      /* Fixed-height, scrollable so a longer problem list doesn't unbalance the columns */
                      <div className="h-80 overflow-y-auto pr-1">
                        <ul className="space-y-3">
                          {side.result.engine.common_problems.map((problem, idx) => (
                            <li key={idx} className="rounded-lg border border-gray-100 bg-[#F8FAFC] p-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-2">
                                  <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" />
                                  <span className="text-sm font-medium text-[#0F172A]">{problem.title}</span>
                                </div>
                                <span
                                  className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    SEVERITY_STYLES[problem.severity] ?? SEVERITY_STYLES.medium
                                  }`}
                                >
                                  {severityLabels[problem.severity] ?? problem.severity}
                                </span>
                              </div>
                              {problem.description && (
                                <p className="mt-1.5 pl-6 text-sm text-[#0F172A]/70">{problem.description}</p>
                              )}
                              {(problem.estimated_cost_min > 0 || problem.estimated_cost_max > 0) && (
                                <p className="mt-1.5 pl-6 text-xs font-semibold text-[#0F172A]/50">
                                  {Math.round(problem.estimated_cost_min).toLocaleString()} –{' '}
                                  {Math.round(problem.estimated_cost_max).toLocaleString()} RON
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex h-80 flex-col items-center justify-center gap-3 text-center">
                        <AlertIcon className="h-8 w-8 text-[#0F172A]/20" />
                        <p className="max-w-xs text-sm font-medium text-[#0F172A]/60">
                          {t('problems.none')}
                        </p>
                      </div>
                    )}
                  </section>

                  {/* Step 3: result box, unchanged visual identity, per vehicle */}
                  <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                    <h2 className="font-heading mb-6 text-lg font-semibold text-[#0F172A]">3. {t('result.title')}</h2>

                    {side.result ? (
                      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                            {t('result.estimatedCost')}
                          </p>
                          <p className="font-heading text-3xl font-bold tracking-tight text-[#2563EB]">
                            {Math.round(side.result.total_estimated_cost.amount).toLocaleString()}{' '}
                            {side.result.total_estimated_cost.currency}
                            {periodLabels[side.result.cost_period] && (
                              <span className="ml-1 text-lg font-medium text-[#2563EB]/70">
                                {periodLabels[side.result.cost_period]}
                              </span>
                            )}
                          </p>
                          {side.result.vehicle.listing && (
                            <p className="mt-1 text-sm font-semibold text-[#0F172A]/60">
                              {side.result.vehicle.listing.price.toLocaleString()} {side.result.vehicle.listing.currency}
                            </p>
                          )}
                        </div>

                        <div className="w-full max-w-xs sm:w-56">
                          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F172A]/60">
                            <span>{t('result.confidence')}</span>
                            <span>{side.result.confidence}/10</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#F8FAFC]">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.max(0, Math.min(100, (side.result.confidence / 10) * 100))}%`,
                                backgroundColor: confidenceColor(side.result.confidence),
                              }}
                            />
                          </div>
                          {side.result.verification.verified && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]/70">
                              <CheckCircleIcon className="h-3.5 w-3.5 shrink-0" />
                              {t('result.verified')}
                              {side.result.verification.revisions > 0 &&
                                ` · ${side.result.verification.revisions} ${t('result.revisions')}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-gray-200 bg-[#F8FAFC] p-5 text-center">
                        <p className="text-sm font-medium text-[#0F172A]/60">
                          {t('compare.resultPlaceholder')}
                        </p>
                      </div>
                    )}
                  </section>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border-2 border-[#0F172A]/10 bg-transparent px-6 py-3 text-sm font-bold text-[#0F172A] hover:bg-white active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/10"
              >
                {t('compare.editVehicles')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

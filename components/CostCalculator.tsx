'use client';

import { useState } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorFooter from './CalculatorFooter';
import CostBreakdownBars from './CostBreakdownBars';
import { AlertIcon, LoaderIcon, ScaleIcon } from './icons';
import { FuelType, FUEL_LABELS } from '../lib/calculator-logic';
import { fetchCostEstimate, FinalEstimate } from '../lib/api';

const SEVERITY_STYLES: Record<string, string> = {
  low: 'bg-[#2563EB]/10 text-[#2563EB]',
  medium: 'bg-[#F97316]/10 text-[#F97316]',
  high: 'bg-red-100 text-red-700',
};

const SEVERITY_LABELS: Record<string, string> = {
  low: 'Risc scăzut',
  medium: 'Risc mediu',
  high: 'Risc ridicat',
};

interface FormState {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CostCalculator() {
  const [form, setForm] = useState<FormState>({
    make: '',
    model: '',
    year: 2016,
    km: 150_000,
    fuel: 'diesel',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<FinalEstimate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateNumber<K extends 'year' | 'km'>(key: K, raw: string, fallback: number) {
    const parsed = Number(raw);
    update(key, (raw === '' || Number.isNaN(parsed) ? fallback : parsed) as FormState[K]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);
    setResult(null);

    try {
      const output = await fetchCostEstimate({
        make: form.make.trim(),
        model: form.model.trim(),
        year: form.year,
        km: form.km,
        fuel: form.fuel,
      });
      setResult(output);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.');
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20">
      {/* 1. Header is placed outside any max-width wrappers so it goes edge-to-edge */}
      <CalculatorHeader />

      {/* 2. Main Grid Container - pulled UP over the banner with negative margin */}
      {/* The relative and z-30 ensure the cards float visually above the image */}
      <div className="relative z-30 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32">

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">

          {/* Column 1: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <form onSubmit={handleSubmit}>
              <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading mb-1 text-lg font-semibold text-[#0F172A]">
                  1. Vehiculul tău actual
                </h2>
                <p className="mb-6 text-sm text-[#0F172A]/60">
                  Completează detaliile de mai jos ca să vedem cât te costă cu adevărat mașina ta.
                </p>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Marcă">
                      <input
                        required
                        className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        value={form.make}
                        onChange={(e) => update('make', e.target.value)}
                        placeholder="ex. BMW"
                      />
                    </Field>
                    <Field label="Model">
                      <input
                        required
                        className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        value={form.model}
                        onChange={(e) => update('model', e.target.value)}
                        placeholder="ex. X5"
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="An fabricație">
                      <input
                        required
                        type="number"
                        inputMode="numeric"
                        min={1990}
                        max={new Date().getFullYear()}
                        className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        value={form.year}
                        onChange={(e) => updateNumber('year', e.target.value, form.year)}
                      />
                    </Field>
                    <Field label="Kilometraj (km)">
                      <input
                        required
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={1000}
                        className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                        value={form.km}
                        onChange={(e) => updateNumber('km', e.target.value, form.km)}
                      />
                    </Field>
                  </div>
                  <Field label="Tip combustibil">
                    <select
                      required
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={form.fuel}
                      onChange={(e) => update('fuel', e.target.value as FuelType)}
                    >
                      {Object.entries(FUEL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' && <LoaderIcon className="h-4 w-4 animate-spin" />}
                  {status === 'loading' ? 'Se calculează...' : 'Calculează estimarea'}
                </button>
              </section>
            </form>
          </div>

          {/* Column 2: Estimate details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm h-full">
              <h2 className="font-heading mb-6 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                <ScaleIcon className="h-5 w-5 text-[#2563EB]" />
                2. Analiza Estimării
              </h2>

              {status === 'idle' && (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <ScaleIcon className="h-8 w-8 text-[#0F172A]/20" />
                  <p className="max-w-xs text-sm font-medium text-[#0F172A]/60">
                    Completează detaliile mașinii tale și apasă „Calculează estimarea&rdquo; pentru a vedea analiza completă.
                  </p>
                </div>
              )}

              {status === 'loading' && (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <LoaderIcon className="h-8 w-8 animate-spin text-[#2563EB]" />
                  <p className="max-w-xs text-sm font-medium text-[#0F172A]/60">
                    Se generează estimarea ta. Poate dura câteva secunde.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 py-10 px-6 text-center">
                  <AlertIcon className="h-8 w-8 text-red-500" />
                  <p className="max-w-xs text-sm font-semibold text-red-700">
                    {errorMessage}
                  </p>
                </div>
              )}

              {status === 'success' && result && (
                <div className="space-y-6">
                  <CostBreakdownBars
                    costBreakdown={result.cost_breakdown}
                    total={result.total_estimated_cost}
                    period={result.cost_period}
                  />

                  {result.engine.common_problems.length > 0 && (
                    <div className="pt-5 border-t border-gray-100">
                      <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">
                        Probleme frecvente {result.engine.motor_type && `· ${result.engine.motor_type}`}
                      </h3>
                      <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
                        {result.engine.common_problems.map((problem, idx) => (
                          <li key={idx} className="rounded-lg border border-gray-100 bg-[#F8FAFC] p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2">
                                <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" />
                                <span className="text-sm font-medium text-[#0F172A]">{problem.title}</span>
                              </div>
                              <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${SEVERITY_STYLES[problem.severity] ?? SEVERITY_STYLES.medium}`}>
                                {SEVERITY_LABELS[problem.severity] ?? problem.severity}
                              </span>
                            </div>
                            {problem.description && (
                              <p className="mt-1.5 pl-6 text-sm text-[#0F172A]/70">{problem.description}</p>
                            )}
                            {(problem.estimated_cost_min > 0 || problem.estimated_cost_max > 0) && (
                              <p className="mt-1.5 pl-6 text-xs font-semibold text-[#0F172A]/50">
                                {Math.round(problem.estimated_cost_min).toLocaleString()} – {Math.round(problem.estimated_cost_max).toLocaleString()} RON
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.summary && (
                    <div className="pt-5 border-t border-gray-100">
                      <h3 className="mb-2 text-sm font-semibold text-[#0F172A]">
                        Detalii
                      </h3>
                      <p className="text-sm leading-relaxed text-[#0F172A]/70">
                        {result.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Full-width result banner, always at the base */}
          <div className="lg:col-span-12">
            <CalculatorFooter result={result} />
          </div>

        </div>
      </div>
    </div>
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

'use client';

import { useState } from 'react';
import EstimateTotal from './EstimateTotal';
import { CarIcon, CheckCircleIcon, LoaderIcon } from './icons';
import type { FinalEstimate } from '../lib/api';
import { downloadEstimatePdf } from '../lib/pdf';
import { FUEL_TYPES, type FuelType } from '../lib/calculator-logic';
import { useLanguage } from '../lib/language-context';

/**
 * Headline result for the single-vehicle calculator: the vehicle, its total
 * estimated cost and confidence, plus the PDF download.
 */
export default function ResultSummary({ result }: { result: FinalEstimate }) {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const { vehicle } = result;
  const fuelLabel = (FUEL_TYPES as string[]).includes(vehicle.fuel)
    ? t(`fuel.${vehicle.fuel as FuelType}`)
    : vehicle.fuel;

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadEstimatePdf(result);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className="hero-surface animate-in overflow-hidden rounded-[1.25rem] text-white shadow-[var(--shadow-float)]">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <CarIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-heading text-xl font-semibold tracking-tight">
                {vehicle.make} {vehicle.model}
              </h2>
              <p className="tabular text-sm text-white/60">
                {vehicle.year} · {vehicle.km.toLocaleString()} km · {fuelLabel}
              </p>
            </div>
          </div>
          <button type="button" onClick={handleDownload} disabled={downloading} className="btn btn-primary w-full sm:w-auto">
            {downloading && <LoaderIcon className="h-4 w-4 animate-spin" />}
            {t('cta.download')}
          </button>
        </div>

        <EstimateTotal result={result} surface="dark" />
      </div>

      <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 sm:px-8">
        <p className="eyebrow mb-2 text-white/50">{t('trust.title')}</p>
        <ul className="flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {(['trust.warranty', 'trust.predictable', 'trust.tech'] as const).map((key) => (
            <li key={key} className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 shrink-0 text-accent" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

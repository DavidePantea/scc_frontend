'use client';

import { useState } from 'react';
import { CheckCircleIcon, LoaderIcon } from './icons';
import type { FinalEstimate } from '../lib/api';
import { downloadEstimatePdf } from '../lib/pdf';
import { useLanguage } from '../lib/language-context';

interface CalculatorFooterProps {
  result: FinalEstimate | null;
}

function confidenceColor(score: number): string {
  if (score >= 8) return '#2563EB';
  if (score >= 5) return '#F97316';
  return '#DC2626';
}

export default function CalculatorFooter({ result }: CalculatorFooterProps) {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const periodLabels: Record<string, string> = {
    annual: t('period.annual'),
    monthly: t('period.monthly'),
  };

  async function handleDownload() {
    if (!result || downloading) return;
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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="font-heading mb-6 text-lg font-semibold text-[#0F172A]">
        3. {t('result.title')}
      </h2>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Cost + confidence */}
        <div className="lg:flex-1">
          {result ? (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                  {t('result.estimatedCost')}
                </p>
                <p className="font-heading text-3xl font-bold tracking-tight text-[#2563EB]">
                  {Math.round(result.total_estimated_cost.amount).toLocaleString()} {result.total_estimated_cost.currency}
                  {periodLabels[result.cost_period] && (
                    <span className="ml-1 text-lg font-medium text-[#2563EB]/70">
                      {periodLabels[result.cost_period]}
                    </span>
                  )}
                </p>
                {result.vehicle.listing && (
                  <p className="mt-1 text-sm font-semibold text-[#0F172A]/60">
                    {result.vehicle.listing.price.toLocaleString()} {result.vehicle.listing.currency}
                  </p>
                )}
              </div>

              <div className="w-full max-w-xs sm:w-56">
                <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#0F172A]/60">
                  <span>{t('result.confidence')}</span>
                  <span>{result.confidence}/10</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F8FAFC]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, (result.confidence / 10) * 100))}%`,
                      backgroundColor: confidenceColor(result.confidence),
                    }}
                  />
                </div>
                {result.verification.verified && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]/70">
                    <CheckCircleIcon className="h-3.5 w-3.5 shrink-0" />
                    {t('result.verified')}{result.verification.revisions > 0 && ` · ${result.verification.revisions} ${t('result.revisions')}`}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-[#F8FAFC] p-5 text-center">
              <p className="text-sm font-medium text-[#0F172A]/60">
                {t('result.placeholder')}
              </p>
            </div>
          )}
        </div>

        <div className="hidden h-16 w-px shrink-0 bg-gray-100 lg:block" />

        {/* Trust checklist */}
        <ul className="flex flex-col gap-3 text-sm font-medium text-[#0F172A]/80 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 lg:flex-1 lg:flex-col lg:gap-3">
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> {t('trust.warranty')}
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> {t('trust.predictable')}
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> {t('trust.tech')}
          </li>
        </ul>

        <div className="hidden h-16 w-px shrink-0 bg-gray-100 lg:block" />

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-64 lg:shrink-0 lg:flex-col">
          <button
            type="button"
            disabled={!result || downloading}
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#EA580C] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {downloading && <LoaderIcon className="h-4 w-4 animate-spin" />}
            {t('cta.download')}
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { CheckCircleIcon } from './icons';
import type { FinalEstimate } from '../lib/api';

interface CalculatorFooterProps {
  result: FinalEstimate | null;
}

const PERIOD_LABELS: Record<string, string> = {
  annual: '/ an',
  monthly: '/ lună',
};

function confidenceColor(score: number): string {
  if (score >= 8) return '#2563EB';
  if (score >= 5) return '#F97316';
  return '#DC2626';
}

export default function CalculatorFooter({ result }: CalculatorFooterProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="font-heading mb-6 text-lg font-semibold text-[#0F172A]">
        3. Rezultatul Tău
      </h2>

      {result ? (
        <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-5 text-center mb-6">
          <p className="text-sm font-semibold text-[#2563EB] mb-2 uppercase tracking-wide">
            Cost estimat
          </p>
          <p className="font-heading text-3xl font-bold text-[#2563EB] tracking-tight">
            {Math.round(result.total_estimated_cost.amount).toLocaleString()} {result.total_estimated_cost.currency}
          </p>
          {PERIOD_LABELS[result.cost_period] && (
            <p className="mt-1 text-sm font-medium text-[#2563EB]/80">
              {PERIOD_LABELS[result.cost_period]}
            </p>
          )}

          <div className="mt-4 border-t border-[#2563EB]/10 pt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#2563EB]/80">
              <span>Încredere estimare</span>
              <span>{result.confidence}/10</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(0, Math.min(100, (result.confidence / 10) * 100))}%`,
                  backgroundColor: confidenceColor(result.confidence),
                }}
              />
            </div>
            {result.verification.verified && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2563EB]/70">
                <CheckCircleIcon className="h-3.5 w-3.5" />
                Estimare verificată{result.verification.revisions > 0 && ` · ${result.verification.revisions} revizii`}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-[#F8FAFC] p-5 text-center mb-6">
          <p className="text-sm font-medium text-[#0F172A]/60">
            Completează formularul și apasă „Calculează estimarea&rdquo; pentru a vedea costul estimat.
          </p>
        </div>
      )}

      <ul className="mb-8 space-y-3 text-sm text-[#0F172A]/80 font-medium">
        <li className="flex items-start gap-2">
          <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> Garanție extinsă și siguranță
        </li>
        <li className="flex items-start gap-2">
          <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> Costuri predictibile lunare
        </li>
        <li className="flex items-start gap-2">
          <CheckCircleIcon className="h-4 w-4 mt-0.5 shrink-0 text-[#F97316]" /> Tehnologie și confort avansat
        </li>
      </ul>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-[#F97316] px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-[#EA580C] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
        >
          Programează un test drive
        </button>
        <button
          type="button"
          className="w-full rounded-xl border-2 border-[#0F172A]/10 bg-transparent px-5 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/10"
        >
          Descarcă rezultatul
        </button>
      </div>
    </section>
  );
}

'use client';

import { formatMoney } from '@/lib/calculator-logic';

interface CalculatorFooterProps {
  savings: number;
  monthlySavings: number;
}

export default function CalculatorFooter({ savings, monthlySavings }: CalculatorFooterProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <h2 
        className="mb-6 text-lg font-semibold text-[#0F172A]"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        3. Rezultatul Tău
      </h2>

      <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-5 text-center mb-6">
        <p className="text-sm font-semibold text-[#2563EB] mb-2 uppercase tracking-wide">
          Economisești
        </p>
        <p 
          className="text-4xl font-bold text-[#2563EB] tracking-tight"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {formatMoney(Math.max(0, savings))} / an
        </p>
        <p className="mt-2 text-sm font-medium text-[#2563EB]/80">
          Aproximativ {formatMoney(Math.max(0, monthlySavings))} / lună
        </p>
      </div>

      <ul className="mb-8 space-y-3 text-sm text-[#0F172A]/80 font-medium">
        <li className="flex items-start gap-2">
          <span className="text-[#F97316] mt-0.5">✓</span> Garanție extinsă și siguranță
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#F97316] mt-0.5">✓</span> Costuri predictibile lunare
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#F97316] mt-0.5">✓</span> Tehnologie și confort avansat
        </li>
      </ul>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-[#F97316] px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-[#EA580C] transition-colors focus:ring-4 focus:ring-[#F97316]/20 outline-none"
        >
          Programează un test drive
        </button>
        <button
          type="button"
          className="w-full rounded-xl border-2 border-[#0F172A]/10 bg-transparent px-5 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors outline-none"
        >
          Descarcă rezultatul
        </button>
      </div>
    </section>
  );
}
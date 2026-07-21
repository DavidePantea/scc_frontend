'use client';

import { useMemo, useState } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorFooter from './CalculatorFooter';
import { 
  VehicleInput, 
  FuelType, 
  estimateCurrentVehicleCosts, 
  total, 
  formatMoney, 
  REFERENCE_VEHICLE, 
  FUEL_LABELS, 
  ROW_LABELS,
  CURRENCY
} from '@/lib/calculator-logic';

export default function CostCalculator() {
  const [input, setInput] = useState<VehicleInput>({
    make: '',
    model: '',
    year: 2016,
    mileageKm: 150_000,
    fuelType: 'diesel',
    annualKm: 15_000,
    fuelPrice: 7.2, 
  });

  const currentCosts = useMemo(() => estimateCurrentVehicleCosts(input), [input]);
  const currentTotal = total(currentCosts);
  const referenceTotal = total(REFERENCE_VEHICLE.costs);
  const savings = currentTotal - referenceTotal;
  const monthlySavings = savings / 12;

  const maxCategoryCost = Math.max(
    ...Object.values(currentCosts),
    ...Object.values(REFERENCE_VEHICLE.costs)
  );

  function update<K extends keyof VehicleInput>(key: K, value: VehicleInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        <CalculatorHeader />

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          
          {/* Column 1: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-[#0F172A]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                1. Vehiculul tău actual
              </h2>
              <div className="space-y-5">
                {/* Same input fields as before */}
                <Field label="Marcă și model">
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    value={input.make}
                    onChange={(e) => update('make', e.target.value)}
                    placeholder="e.g. BMW X5"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="An fabricație">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.year}
                      onChange={(e) => update('year', Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Kilometraj">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.mileageKm}
                      onChange={(e) => update('mileageKm', Number(e.target.value))}
                    />
                  </Field>
                </div>
                <Field label="Tip combustibil">
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    value={input.fuelType}
                    onChange={(e) => update('fuelType', e.target.value as FuelType)}
                  >
                    {Object.entries(FUEL_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>
          </div>

          {/* Column 2: Data Visualization Comparison */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm h-full">
              <h2 className="mb-6 text-lg font-semibold text-[#0F172A]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                2. Comparație Costuri
              </h2>

              <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
                <div className="text-sm font-semibold text-[#0F172A]/60">Mașina ta actuală</div>
                <div className="text-sm font-semibold text-[#2563EB]">{REFERENCE_VEHICLE.name}</div>
              </div>

              <div className="space-y-6">
                {ROW_LABELS.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-[#0F172A]">{label}</div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-xs font-semibold text-[#0F172A]">{formatMoney(currentCosts[key])}</span>
                        <div className="w-full bg-[#F8FAFC] h-2.5 rounded-full overflow-hidden flex justify-end">
                          <div className="bg-[#0F172A] h-full rounded-full transition-all duration-500" style={{ width: `${(currentCosts[key] / maxCategoryCost) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="text-xs font-semibold text-[#2563EB]">{formatMoney(REFERENCE_VEHICLE.costs[key])}</span>
                        <div className="w-full bg-[#F8FAFC] h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#2563EB] h-full rounded-full transition-all duration-500" style={{ width: `${(REFERENCE_VEHICLE.costs[key] / maxCategoryCost) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-end">
                   <span className="text-xs font-medium text-[#0F172A]/60 uppercase tracking-wider mb-1">Cost Total</span>
                   <span className="text-xl font-bold text-[#0F172A]">{formatMoney(currentTotal)}</span>
                 </div>
                 <div className="flex flex-col items-start">
                   <span className="text-xs font-medium text-[#0F172A]/60 uppercase tracking-wider mb-1">Cost Total</span>
                   <span className="text-xl font-bold text-[#2563EB]">{formatMoney(referenceTotal)}</span>
                 </div>
              </div>
            </section>
          </div>

          {/* Column 3: Results & CTA */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <CalculatorFooter savings={savings} monthlySavings={monthlySavings} />
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
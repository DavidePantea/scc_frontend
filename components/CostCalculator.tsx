'use client';

import { useMemo, useState } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

interface VehicleInput {
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  fuelType: FuelType;
  annualKm: number;
  fuelPrice: number;
}

interface CostBreakdown {
  fuel: number;
  maintenance: number;
  repairs: number;
  insurance: number;
  taxes: number;
  depreciation: number;
}

const CURRENCY = '$';

const REFERENCE_VEHICLE = {
  name: 'New Smart Model',
  costs: {
    fuel: 1200,
    maintenance: 350,
    repairs: 200,
    insurance: 700,
    taxes: 250,
    depreciation: 1800,
  } as CostBreakdown,
};

const CONSUMPTION: Record<FuelType, number> = {
  petrol: 7.5,
  diesel: 6.2,
  hybrid: 4.8,
  electric: 18,
};

const FUEL_LABELS: Record<FuelType, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

// ---------------------------------------------------------------------------
// Logic
// ---------------------------------------------------------------------------

function estimateCurrentVehicleCosts(input: VehicleInput): CostBreakdown {
  const age = Math.max(0, new Date().getFullYear() - input.year);
  const ageFactor = 1 + age * 0.06;
  const mileageFactor = 1 + input.mileageKm / 200_000;

  const fuel = (input.annualKm / 100) * CONSUMPTION[input.fuelType] * input.fuelPrice;
  const maintenance = 250 * ageFactor * mileageFactor;
  const repairs = 150 * ageFactor * mileageFactor * 1.4;
  const insurance = 500 * (1 + age * 0.01);
  const taxes = 200 * (1 + age * 0.02);

  const estimatedValue = Math.max(2000, 25000 - age * 1800 - input.mileageKm * 0.03);
  const depreciation = estimatedValue * 0.12;

  return { fuel, maintenance, repairs, insurance, taxes, depreciation };
}

function total(costs: CostBreakdown): number {
  return Object.values(costs).reduce((sum, v) => sum + v, 0);
}

function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString()} ${CURRENCY}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const STEPS = ['Your vehicle', 'Annual usage', 'Cost comparison', 'Your result'];

const ROW_LABELS: { key: keyof CostBreakdown; label: string }[] = [
  { key: 'fuel', label: 'Fuel' },
  { key: 'maintenance', label: 'Maintenance & service' },
  { key: 'repairs', label: 'Unexpected repairs' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'taxes', label: 'Taxes & fees' },
  { key: 'depreciation', label: 'Value loss (depreciation)' },
];

export default function CostCalculator() {
  const [input, setInput] = useState<VehicleInput>({
    make: '',
    model: '',
    year: 2018,
    mileageKm: 100_000,
    fuelType: 'diesel',
    annualKm: 15_000,
    fuelPrice: 1.6,
  });

  const currentCosts = useMemo(() => estimateCurrentVehicleCosts(input), [input]);
  const currentTotal = total(currentCosts);
  const referenceTotal = total(REFERENCE_VEHICLE.costs);
  const savings = currentTotal - referenceTotal;
  const monthlySavings = savings / 12;

  // Calculate maximum cost across all categories for dynamic bar chart scaling
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
        {/* Header */}
        <header className="mb-10 text-center lg:text-left">
          <h1 
            className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Cost of Ownership Calculator
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#0F172A]/70 mx-auto lg:mx-0">
            Compare what your current car costs you each year against a new
            reference model, and see how much you could save.
          </p>
        </header>

        {/* Step indicator */}
        <div className="mb-10 overflow-x-auto pb-4 hide-scrollbar">
          <ol className="flex min-w-max gap-x-6 text-sm">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                    i === 0
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white text-[#0F172A]/50 border border-gray-200'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={i === 0 ? 'font-semibold text-[#0F172A]' : 'font-medium text-[#0F172A]/50'}>
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="ml-4 h-[1px] w-8 bg-gray-200 hidden sm:block" />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          
          {/* Column 1: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 
                className="mb-6 text-lg font-semibold text-[#0F172A]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                1. Your Current Vehicle
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Make">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      value={input.make}
                      onChange={(e) => update('make', e.target.value)}
                      placeholder="e.g. BMW"
                    />
                  </Field>
                  <Field label="Model">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      value={input.model}
                      onChange={(e) => update('model', e.target.value)}
                      placeholder="e.g. X5"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Year">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      value={input.year}
                      onChange={(e) => update('year', Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Mileage (km)">
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      value={input.mileageKm}
                      onChange={(e) => update('mileageKm', Number(e.target.value))}
                    />
                  </Field>
                </div>

                <Field label="Fuel Type">
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                    value={input.fuelType}
                    onChange={(e) => update('fuelType', e.target.value as FuelType)}
                  >
                    {Object.entries(FUEL_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="my-6 border-t border-gray-100" />

                <Field label="Annual Distance (km/year)">
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                    value={input.annualKm}
                    onChange={(e) => update('annualKm', Number(e.target.value))}
                  />
                </Field>

                <Field label={`Fuel Price (${CURRENCY} per L/kWh)`}>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                    value={input.fuelPrice}
                    onChange={(e) => update('fuelPrice', Number(e.target.value))}
                  />
                </Field>
              </div>
            </section>
          </div>

          {/* Column 2: Data Visualization Comparison */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm h-full">
              <h2 
                className="mb-6 text-lg font-semibold text-[#0F172A]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                2. Data Visualization
              </h2>

              <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
                <div className="text-sm font-semibold text-[#0F172A]/60">Your Car</div>
                <div className="text-sm font-semibold text-[#2563EB]">New Reference</div>
              </div>

              <div className="space-y-6">
                {ROW_LABELS.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-[#0F172A]">{label}</div>
                    
                    {/* Visual Bar Charts */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-xs font-semibold text-[#0F172A]">
                          {formatMoney(currentCosts[key])}
                        </span>
                        <div className="w-full bg-[#F8FAFC] h-2.5 rounded-full overflow-hidden flex justify-end">
                          <div 
                            className="bg-[#0F172A] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${(currentCosts[key] / maxCategoryCost) * 100}%` }} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="text-xs font-semibold text-[#2563EB]">
                          {formatMoney(REFERENCE_VEHICLE.costs[key])}
                        </span>
                        <div className="w-full bg-[#F8FAFC] h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#2563EB] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${(REFERENCE_VEHICLE.costs[key] / maxCategoryCost) * 100}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-end">
                   <span className="text-xs font-medium text-[#0F172A]/60 uppercase tracking-wider mb-1">Total Annual</span>
                   <span className="text-xl font-bold text-[#0F172A]">{formatMoney(currentTotal)}</span>
                 </div>
                 <div className="flex flex-col items-start">
                   <span className="text-xs font-medium text-[#0F172A]/60 uppercase tracking-wider mb-1">Total Annual</span>
                   <span className="text-xl font-bold text-[#2563EB]">{formatMoney(referenceTotal)}</span>
                 </div>
              </div>
            </section>
          </div>

          {/* Column 3: Results & CTA */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 
                className="mb-6 text-lg font-semibold text-[#0F172A]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                3. Your Result
              </h2>

              <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-5 text-center mb-6">
                <p className="text-sm font-semibold text-[#2563EB] mb-2 uppercase tracking-wide">
                  Estimated Savings
                </p>
                <p 
                  className="text-4xl font-bold text-[#2563EB] tracking-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {formatMoney(Math.max(0, savings))}
                </p>
                <p className="mt-2 text-sm font-medium text-[#2563EB]/80">
                  per year (approx. {formatMoney(Math.max(0, monthlySavings))} / mo)
                </p>
              </div>

              <ul className="mb-8 space-y-3 text-sm text-[#0F172A]/80 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] mt-0.5">✓</span> Lower running costs across fuel
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] mt-0.5">✓</span> Predictable maintenance bills
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97316] mt-0.5">✓</span> Better resale value retention
                </li>
              </ul>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#F97316] px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-[#EA580C] transition-colors focus:ring-4 focus:ring-[#F97316]/20 outline-none"
                >
                  Compare Models Now
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border-2 border-[#0F172A]/10 bg-transparent px-5 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors outline-none"
                >
                  View Full Costs
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
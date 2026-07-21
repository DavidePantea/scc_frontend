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
  fuelPrice: number; // per liter / per kWh
}

interface CostBreakdown {
  fuel: number;
  maintenance: number;
  repairs: number;
  insurance: number;
  taxes: number;
  depreciation: number;
}

// Currency label — change this one constant to localize.
const CURRENCY = '$';

// Reference vehicle the calculator compares against.
// This is placeholder data — swap for a real catalog / API response later.
const REFERENCE_VEHICLE = {
  name: 'New Reference Model',
  costs: {
    fuel: 1200,
    maintenance: 350,
    repairs: 200,
    insurance: 700,
    taxes: 250,
    depreciation: 1800,
  } as CostBreakdown,
};

// Rough fuel consumption assumptions (liters or kWh per 100 km).
const CONSUMPTION: Record<FuelType, number> = {
  petrol: 7.5,
  diesel: 6.2,
  hybrid: 4.8,
  electric: 18, // kWh/100km
};

const FUEL_LABELS: Record<FuelType, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

// ---------------------------------------------------------------------------
// Placeholder cost model — replace with a real API call later.
// Kept simple and transparent so it's easy to swap out.
// ---------------------------------------------------------------------------

function estimateCurrentVehicleCosts(input: VehicleInput): CostBreakdown {
  const age = Math.max(0, new Date().getFullYear() - input.year);
  const ageFactor = 1 + age * 0.06; // older cars cost more to run
  const mileageFactor = 1 + input.mileageKm / 200_000;

  const fuel =
    (input.annualKm / 100) * CONSUMPTION[input.fuelType] * input.fuelPrice;

  const maintenance = 250 * ageFactor * mileageFactor;
  const repairs = 150 * ageFactor * mileageFactor * 1.4;
  const insurance = 500 * (1 + age * 0.01);
  const taxes = 200 * (1 + age * 0.02);

  // Depreciation eases off as the car gets older.
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

  function update<K extends keyof VehicleInput>(key: K, value: VehicleInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cost of ownership calculator
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Compare what your current car costs you each year against a new
            reference model, and see how much you could save.
          </p>
        </header>

        {/* Step indicator */}
        <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-2 text-slate-500">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  i === 0
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {i + 1}
              </span>
              <span className={i === 0 ? 'font-medium text-slate-900' : ''}>
                {step}
              </span>
            </li>
          ))}
        </ol>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr_1fr]">
          {/* Panel 1 — vehicle form */}
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              1. Your current vehicle
            </h2>

            <div className="space-y-4">
              <Field label="Make">
                <input
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.make}
                  onChange={(e) => update('make', e.target.value)}
                  placeholder="e.g. BMW"
                />
              </Field>

              <Field label="Model">
                <input
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.model}
                  onChange={(e) => update('model', e.target.value)}
                  placeholder="e.g. X5"
                />
              </Field>

              <Field label="Year">
                <input
                  type="number"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.year}
                  onChange={(e) => update('year', Number(e.target.value))}
                />
              </Field>

              <Field label="Current mileage (km)">
                <input
                  type="number"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.mileageKm}
                  onChange={(e) => update('mileageKm', Number(e.target.value))}
                />
              </Field>

              <Field label="Fuel type">
                <select
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
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

              <hr className="border-slate-100" />

              <Field label="Annual distance (km/year)">
                <input
                  type="number"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.annualKm}
                  onChange={(e) => update('annualKm', Number(e.target.value))}
                />
              </Field>

              <Field label={`Fuel / energy price (${CURRENCY} per liter or kWh)`}>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  value={input.fuelPrice}
                  onChange={(e) => update('fuelPrice', Number(e.target.value))}
                />
              </Field>
            </div>

            <div className="mt-6 rounded-md bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Estimated monthly cost</p>
              <p className="text-xl font-semibold">
                {formatMoney(currentTotal / 12)}
              </p>
              <p className="text-xs text-slate-400">
                {formatMoney(currentTotal)} total per year
              </p>
            </div>
          </section>

          {/* Panel 2 — comparison table */}
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              2. Cost comparison
            </h2>

            <div className="mb-4 grid grid-cols-2 gap-2 text-sm font-medium text-slate-600">
              <span>Your car</span>
              <span className="text-right">{REFERENCE_VEHICLE.name}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {ROW_LABELS.map(({ key, label }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="text-slate-500">{label}</span>
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-right tabular-nums">
                      {formatMoney(currentCosts[key])}
                    </span>
                    <span className="text-slate-300">&rarr;</span>
                    <span className="w-24 text-right tabular-nums text-emerald-700">
                      {formatMoney(REFERENCE_VEHICLE.costs[key])}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm font-semibold">
              <span>Total annual cost</span>
              <div className="flex items-center gap-3">
                <span className="w-24 text-right tabular-nums">
                  {formatMoney(currentTotal)}
                </span>
                <span className="text-slate-300">&rarr;</span>
                <span className="w-24 text-right tabular-nums text-emerald-700">
                  {formatMoney(referenceTotal)}
                </span>
              </div>
            </div>
          </section>

          {/* Panel 3 — result */}
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              3. Your result
            </h2>

            <div className="rounded-md bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-700">
                Estimated yearly savings
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-700">
                {formatMoney(Math.max(0, savings))}
              </p>
              <p className="text-xs text-emerald-600">
                about {formatMoney(Math.max(0, monthlySavings))} / month
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>&bull; Lower running costs across fuel and upkeep</li>
              <li>&bull; More predictable maintenance and repair bills</li>
              <li>&bull; Better resale value retention</li>
            </ul>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Get a personalized quote
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Download this comparison
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small field wrapper
// ---------------------------------------------------------------------------

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
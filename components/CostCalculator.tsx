'use client';

import { useMemo, useState } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorFooter from './CalculatorFooter';
import {
  FuelPumpIcon,
  WrenchIcon,
  AlertIcon,
  ShieldIcon,
  ReceiptIcon,
  PriceTagIcon,
  ScaleIcon,
} from './icons';
import {
  VehicleInput,
  FuelType,
  CostBreakdown,
  estimateCurrentVehicleCosts,
  total,
  formatMoney,
  REFERENCE_VEHICLE,
  FUEL_LABELS,
  ROW_LABELS,
  DEFAULT_FUEL_PRICE,
} from '../lib/calculator-logic';

const ROW_ICONS: Record<keyof CostBreakdown, React.ComponentType<{ className?: string }>> = {
  fuel: FuelPumpIcon,
  maintenance: WrenchIcon,
  repairs: AlertIcon,
  insurance: ShieldIcon,
  taxes: ReceiptIcon,
  depreciation: PriceTagIcon,
};

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

  function updateFuelType(fuelType: FuelType) {
    setInput((prev) => ({ ...prev, fuelType, fuelPrice: DEFAULT_FUEL_PRICE[fuelType] }));
  }

  function updateNumber<K extends keyof VehicleInput>(key: K, raw: string, fallback: number) {
    const parsed = Number(raw);
    update(key, (raw === '' || Number.isNaN(parsed) ? fallback : parsed) as VehicleInput[K]);
  }

  const isElectric = input.fuelType === 'electric';

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
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading mb-1 text-lg font-semibold text-[#0F172A]">
                1. Vehiculul tău actual
              </h2>
              <p className="mb-6 text-sm text-[#0F172A]/60">
                Completează detaliile de mai jos ca să vedem cât te costă cu adevărat mașina ta.
              </p>
              <div className="space-y-5">
                <Field label="Marcă și model">
                  <input
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    value={input.make}
                    onChange={(e) => update('make', e.target.value)}
                    placeholder="ex. BMW X5"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="An fabricație">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1990}
                      max={new Date().getFullYear()}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.year}
                      onChange={(e) => updateNumber('year', e.target.value, input.year)}
                    />
                  </Field>
                  <Field label="Kilometraj (km)">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1000}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.mileageKm}
                      onChange={(e) => updateNumber('mileageKm', e.target.value, input.mileageKm)}
                    />
                  </Field>
                </div>
                <Field label="Tip combustibil">
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    value={input.fuelType}
                    onChange={(e) => updateFuelType(e.target.value as FuelType)}
                  >
                    {Object.entries(FUEL_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Km parcurși / an">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={500}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.annualKm}
                      onChange={(e) => updateNumber('annualKm', e.target.value, input.annualKm)}
                    />
                  </Field>
                  <Field label={isElectric ? 'Preț energie (lei/kWh)' : 'Preț combustibil (lei/l)'}>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.1}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      value={input.fuelPrice}
                      onChange={(e) => updateNumber('fuelPrice', e.target.value, input.fuelPrice)}
                    />
                  </Field>
                </div>
              </div>
            </section>
          </div>

          {/* Column 2: Data Visualization Comparison */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm h-full">
              <h2 className="font-heading mb-6 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
                <ScaleIcon className="h-5 w-5 text-[#2563EB]" />
                2. Comparație Costuri
              </h2>

              <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
                <div className="text-sm font-semibold text-[#0F172A]/60">Mașina ta actuală</div>
                <div className="text-sm font-semibold text-[#2563EB]">{REFERENCE_VEHICLE.name}</div>
              </div>

              <div className="space-y-6">
                {ROW_LABELS.map(({ key, label }) => {
                  const Icon = ROW_ICONS[key];
                  return (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                      <Icon className="h-4 w-4 shrink-0 text-[#0F172A]/50" />
                      {label}
                    </div>
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
                  );
                })}
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
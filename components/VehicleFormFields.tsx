'use client';

import AdvancedOptionsFields from './AdvancedOptionsFields';
import { FUEL_TYPES, type FuelType } from '../lib/calculator-logic';
import type { SellerVehicle } from '../lib/api';
import { parseNumberOrFallback, type VehicleFormState } from '../lib/vehicle-form';
import { useLanguage } from '../lib/language-context';

interface VehicleFormFieldsProps {
  value: VehicleFormState;
  onChange: (patch: Partial<VehicleFormState>) => void;
  /** Sellers can also pick one of their own listings instead of typing specs. */
  isSeller: boolean;
  sellerVehicles: SellerVehicle[];
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block w-full">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

/** The vehicle-details fields shared by the calculator and comparison forms. */
export default function VehicleFormFields({ value, onChange, isSeller, sellerVehicles }: VehicleFormFieldsProps) {
  const { t } = useLanguage();
  const useListing = isSeller && value.source === 'listing';

  return (
    <div className="space-y-4">
      {isSeller && (
        <div role="group" className="grid grid-cols-2 gap-1 rounded-xl bg-canvas p-1">
          {(['standard', 'listing'] as const).map((source) => {
            const selected = value.source === source;
            return (
              <button
                key={source}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ source })}
                className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                  selected ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {t(source === 'standard' ? 'source.standard' : 'source.myInventory')}
              </button>
            );
          })}
        </div>
      )}

      {useListing ? (
        sellerVehicles.length === 0 ? (
          <p className="rounded-xl bg-canvas px-4 py-3 text-sm text-muted">{t('source.noListings')}</p>
        ) : (
          <Field label={t('source.selectListing')}>
            <select
              required
              className="input"
              value={value.sellerVehicleId ?? ''}
              onChange={(e) => onChange({ sellerVehicleId: e.target.value || null })}
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
        )
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('field.make')}>
              <input
                required
                autoComplete="off"
                className="input"
                value={value.make}
                onChange={(e) => onChange({ make: e.target.value })}
                placeholder={t('field.makePlaceholder')}
              />
            </Field>
            <Field label={t('field.model')}>
              <input
                required
                autoComplete="off"
                className="input"
                value={value.model}
                onChange={(e) => onChange({ model: e.target.value })}
                placeholder={t('field.modelPlaceholder')}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('field.year')}>
              <input
                required
                type="number"
                inputMode="numeric"
                min={1990}
                max={new Date().getFullYear()}
                className="input tabular"
                value={value.year}
                onChange={(e) => onChange({ year: parseNumberOrFallback(e.target.value, value.year) })}
              />
            </Field>
            <Field label={t('field.km')}>
              <input
                required
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                className="input tabular"
                value={value.km}
                onChange={(e) => onChange({ km: parseNumberOrFallback(e.target.value, value.km) })}
              />
            </Field>
          </div>
          <Field label={t('field.fuel')}>
            <select
              required
              className="input"
              value={value.fuel}
              onChange={(e) => onChange({ fuel: e.target.value as FuelType })}
            >
              {FUEL_TYPES.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {t(`fuel.${fuel}`)}
                </option>
              ))}
            </select>
          </Field>
          <AdvancedOptionsFields
            city={value.city}
            yearlyKm={value.yearlyKm}
            urbanPercentage={value.urbanPercentage}
            onCityChange={(city) => onChange({ city })}
            onYearlyKmChange={(yearlyKm) => onChange({ yearlyKm })}
            onUrbanPercentageChange={(urbanPercentage) => onChange({ urbanPercentage })}
          />
        </>
      )}
    </div>
  );
}

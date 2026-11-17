'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from './icons';
import { useLanguage } from '../lib/language-context';

interface AdvancedOptionsFieldsProps {
  city: string;
  yearlyKm: number | null;
  urbanPercentage: number;
  onCityChange: (value: string) => void;
  onYearlyKmChange: (value: number | null) => void;
  onUrbanPercentageChange: (value: number) => void;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="block w-full">
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AdvancedOptionsFields({
  city,
  yearlyKm,
  urbanPercentage,
  onCityChange,
  onYearlyKmChange,
  onUrbanPercentageChange,
}: AdvancedOptionsFieldsProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;

  return (
    <div className="rounded-xl border border-dashed border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-4 text-left text-sm font-semibold text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {t('field.advancedOptions')}
        <ChevronDownIcon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id={panelId} className="animate-in space-y-4 border-t border-dashed border-line px-4 pb-4 pt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t('field.yearlyKm')} htmlFor={`${id}-yearly`}>
              <input
                id={`${id}-yearly`}
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                className="input tabular"
                value={yearlyKm ?? ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  const parsed = Number(raw);
                  onYearlyKmChange(raw === '' || Number.isNaN(parsed) ? null : parsed);
                }}
                placeholder={t('field.yearlyKmPlaceholder')}
              />
            </Field>

            <Field label={t('field.city')} htmlFor={`${id}-city`}>
              <input
                id={`${id}-city`}
                className="input"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                placeholder={t('field.cityPlaceholder')}
              />
            </Field>
          </div>

          <Field label={t('field.drivingEnv')} htmlFor={`${id}-urban`}>
            <div className="rounded-xl bg-canvas px-4 py-3">
              <input
                id={`${id}-urban`}
                type="range"
                min={0}
                max={100}
                step={1}
                value={urbanPercentage}
                onChange={(e) => onUrbanPercentageChange(Number(e.target.value))}
                className="h-6 w-full cursor-pointer accent-brand"
                aria-valuetext={`${urbanPercentage}% ${t('field.urban')}`}
              />
              <div className="mt-1 flex items-center justify-between text-xs font-semibold text-muted">
                <span>{t('field.rural')}</span>
                <span className="tabular rounded-md bg-surface px-2 py-0.5 text-brand shadow-sm">
                  {urbanPercentage}% {t('field.urban')}
                </span>
                <span>{t('field.urban')}</span>
              </div>
            </div>
          </Field>
        </div>
      )}
    </div>
  );
}

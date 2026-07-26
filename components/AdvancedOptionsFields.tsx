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
  const panelId = useId();

  return (
    <div className="rounded-lg border border-gray-200 bg-[#F8FAFC]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0F172A]/60"
      >
        {t('field.advancedOptions')}
        <ChevronDownIcon className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id={panelId} className="space-y-4 border-t border-gray-200 px-4 py-4">
          <Field label={t('field.yearlyKm')}>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              value={yearlyKm ?? ''}
              onChange={(e) => {
                const raw = e.target.value;
                const parsed = Number(raw);
                onYearlyKmChange(raw === '' || Number.isNaN(parsed) ? null : parsed);
              }}
              placeholder={t('field.yearlyKmPlaceholder')}
            />
          </Field>

          <Field label={t('field.city')}>
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              placeholder={t('field.cityPlaceholder')}
            />
          </Field>

          <Field label={t('field.drivingEnv')}>
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={urbanPercentage}
                onChange={(e) => onUrbanPercentageChange(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
                aria-label={t('field.drivingEnv')}
              />
              <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-[#0F172A]/50">
                <span>{t('field.rural')}</span>
                <span className="text-[#2563EB]">{urbanPercentage}% {t('field.urban')}</span>
                <span>{t('field.urban')}</span>
              </div>
            </div>
          </Field>
        </div>
      )}
    </div>
  );
}

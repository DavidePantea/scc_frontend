'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/language-context';
import {
  createSellerVehicle,
  deleteSellerVehicle,
  fetchSellerVehicles,
  updateSellerVehicle,
  type SellerVehicle,
  type SellerVehicleCondition,
  type SellerVehicleInput,
  type SellerVehicleStatus,
} from '../lib/api';
import { FUEL_TYPES, FuelType, formatMoney } from '../lib/calculator-logic';
import AuthFormField, { authInputClassName } from './AuthFormField';
import MarketValueCard from './MarketValueCard';
import { AlertIcon, LoaderIcon, PriceTagIcon } from './icons';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

const CONDITIONS: SellerVehicleCondition[] = ['excellent', 'good', 'fair', 'poor'];
const STATUSES: SellerVehicleStatus[] = ['active', 'sold', 'draft'];

const STATUS_STYLES: Record<SellerVehicleStatus, string> = {
  active: 'bg-brand-soft text-brand',
  sold: 'bg-line-soft text-muted',
  draft: 'bg-accent-soft text-accent-ink',
};

interface FormState {
  make: string;
  model: string;
  year: number;
  fuel_type: FuelType;
  km: number;
  urban_percentage: number;
  price: number;
  vin: string;
  location: string;
  condition: SellerVehicleCondition | '';
  description: string;
  photo_urls: string;
  status: SellerVehicleStatus;
}

function emptyForm(): FormState {
  return {
    make: '',
    model: '',
    year: 2016,
    fuel_type: 'diesel',
    km: 150_000,
    urban_percentage: 50,
    price: 10_000,
    vin: '',
    location: '',
    condition: '',
    description: '',
    photo_urls: '',
    status: 'active',
  };
}

function vehicleToForm(v: SellerVehicle): FormState {
  return {
    make: v.make,
    model: v.model,
    year: v.year,
    fuel_type: v.fuel_type as FuelType,
    km: v.km,
    urban_percentage: v.urban_percentage,
    price: v.price,
    vin: v.vin ?? '',
    location: v.location ?? '',
    condition: v.condition ?? '',
    description: v.description ?? '',
    photo_urls: v.photo_urls.join('\n'),
    status: v.status,
  };
}

export default function SellerDashboard() {
  const { accessToken } = useAuth();
  const { t } = useLanguage();
  const [status, setStatus] = useState<LoadStatus>('idle');
  const [vehicles, setVehicles] = useState<SellerVehicle[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function loadVehicles() {
    if (!accessToken) return;
    setStatus('loading');
    fetchSellerVehicles(accessToken)
      .then((v) => {
        setVehicles(v);
        setStatus('success');
      })
      .catch((err) => {
        setErrorMessage(err instanceof Error ? err.message : t('error.generic'));
        setStatus('error');
      });
  }

  useEffect(() => {
    loadVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm());
    setFormError(null);
    setFormOpen(true);
  }

  function openEditForm(v: SellerVehicle) {
    setEditingId(v.id);
    setForm(vehicleToForm(v));
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessToken) return;
    setSaving(true);
    setFormError(null);

    const input: SellerVehicleInput = {
      make: form.make.trim(),
      model: form.model.trim(),
      year: form.year,
      fuel_type: form.fuel_type,
      km: form.km,
      urban_percentage: form.urban_percentage,
      price: form.price,
      vin: form.vin.trim() || null,
      location: form.location.trim() || null,
      condition: form.condition || null,
      description: form.description.trim() || null,
      photo_urls: form.photo_urls
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean),
      status: form.status,
    };

    try {
      if (editingId) {
        await updateSellerVehicle(editingId, input, accessToken);
      } else {
        await createSellerVehicle(input, accessToken);
      }
      setFormOpen(false);
      loadVehicles();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('error.generic'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(v: SellerVehicle) {
    if (!accessToken) return;
    if (typeof window !== 'undefined' && !window.confirm(t('seller.card.deleteConfirm'))) return;
    try {
      await deleteSellerVehicle(v.id, accessToken);
      loadVehicles();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t('error.generic'));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-ink">{t('seller.dashboard.title')}</h1>
          <p className="mt-1 text-sm text-muted">{t('seller.dashboard.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="btn btn-primary"
        >
          {t('seller.dashboard.addNew')}
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 card p-6 sm:p-8"
        >
          <h2 className="font-heading mb-6 text-lg font-semibold text-ink">
            {editingId ? t('seller.form.editTitle') : t('seller.form.addTitle')}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <AuthFormField label={t('field.make')}>
              <input
                required
                className={authInputClassName}
                value={form.make}
                onChange={(e) => update('make', e.target.value)}
                placeholder={t('field.makePlaceholder')}
              />
            </AuthFormField>
            <AuthFormField label={t('field.model')}>
              <input
                required
                className={authInputClassName}
                value={form.model}
                onChange={(e) => update('model', e.target.value)}
                placeholder={t('field.modelPlaceholder')}
              />
            </AuthFormField>
            <AuthFormField label={t('field.year')}>
              <input
                required
                type="number"
                min={1950}
                max={new Date().getFullYear() + 1}
                className={authInputClassName}
                value={form.year}
                onChange={(e) => update('year', Number(e.target.value) || form.year)}
              />
            </AuthFormField>
            <AuthFormField label={t('field.km')}>
              <input
                required
                type="number"
                min={0}
                step={1000}
                className={authInputClassName}
                value={form.km}
                onChange={(e) => update('km', Number(e.target.value) || 0)}
              />
            </AuthFormField>
            <AuthFormField label={t('field.fuel')}>
              <select
                required
                className={authInputClassName}
                value={form.fuel_type}
                onChange={(e) => update('fuel_type', e.target.value as FuelType)}
              >
                {FUEL_TYPES.map((value) => (
                  <option key={value} value={value}>
                    {t(`fuel.${value}`)}
                  </option>
                ))}
              </select>
            </AuthFormField>
            <AuthFormField label={t('seller.form.price')}>
              <input
                required
                type="number"
                min={1}
                step="any"
                className={authInputClassName}
                value={form.price}
                onChange={(e) => update('price', Number(e.target.value) || 0)}
              />
            </AuthFormField>
          </div>

          <div className="mt-5">
            <AuthFormField label={t('field.drivingEnv')}>
              <div className="rounded-xl border border-line bg-canvas px-4 py-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={form.urban_percentage}
                  onChange={(e) => update('urban_percentage', Number(e.target.value))}
                  className="w-full accent-brand"
                  aria-label={t('field.drivingEnv')}
                />
                <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-muted">
                  <span>{t('field.rural')}</span>
                  <span className="text-brand">
                    {form.urban_percentage}% {t('field.urban')}
                  </span>
                  <span>{t('field.urban')}</span>
                </div>
              </div>
            </AuthFormField>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <AuthFormField label={t('seller.form.vin')}>
              <input className={authInputClassName} value={form.vin} onChange={(e) => update('vin', e.target.value)} />
            </AuthFormField>
            <AuthFormField label={t('seller.form.location')}>
              <input
                className={authInputClassName}
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
              />
            </AuthFormField>
            <AuthFormField label={t('seller.form.condition')}>
              <select
                className={authInputClassName}
                value={form.condition}
                onChange={(e) => update('condition', e.target.value as SellerVehicleCondition | '')}
              >
                <option value="">{t('seller.form.conditionNone')}</option>
                {CONDITIONS.map((value) => (
                  <option key={value} value={value}>
                    {t(`seller.condition.${value}`)}
                  </option>
                ))}
              </select>
            </AuthFormField>
            <AuthFormField label={t('seller.form.status')}>
              <select
                className={authInputClassName}
                value={form.status}
                onChange={(e) => update('status', e.target.value as SellerVehicleStatus)}
              >
                {STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {t(`seller.status.${value}`)}
                  </option>
                ))}
              </select>
            </AuthFormField>
          </div>

          <div className="mt-5">
            <AuthFormField label={t('seller.form.description')}>
              <textarea
                rows={3}
                className={authInputClassName}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
              />
            </AuthFormField>
          </div>

          <div className="mt-5">
            <AuthFormField label={t('seller.form.photoUrls')}>
              <textarea
                rows={2}
                className={authInputClassName}
                value={form.photo_urls}
                onChange={(e) => update('photo_urls', e.target.value)}
                placeholder="https://..."
              />
            </AuthFormField>
          </div>

          {formError && (
            <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-red-600">
              <AlertIcon className="h-4 w-4 shrink-0" />
              {formError}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-brand"
            >
              {saving && <LoaderIcon className="h-4 w-4 animate-spin" />}
              {saving ? t('seller.form.saving') : t('seller.form.save')}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="btn btn-secondary"
            >
              {t('seller.form.cancel')}
            </button>
          </div>
        </form>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-2 py-10 text-sm text-muted">
          <LoaderIcon className="h-4 w-4 animate-spin" />
          {t('seller.dashboard.loading')}
        </div>
      )}

      {status === 'error' && (
        <p className="rounded-xl border border-danger/20 bg-danger-soft px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      {status === 'success' && vehicles.length === 0 && !formOpen && (
        <p className="rounded-[1.25rem] border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          {t('seller.dashboard.empty')}
        </p>
      )}

      {status === 'success' && vehicles.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {vehicles.map((v) => (
            <div key={v.id} className="flex flex-col card p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {v.make} {v.model} · {v.year}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {t(`fuel.${v.fuel_type as FuelType}`)} · {v.km.toLocaleString()} km
                  </p>
                </div>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[v.status]}`}
                >
                  {t(`seller.status.${v.status}`)}
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-lg font-bold text-brand">
                <PriceTagIcon className="h-5 w-5" />
                {formatMoney(v.price)}
              </p>

              {v.location && <p className="mt-1 text-xs text-muted">{v.location}</p>}

              <div className="mt-4">
                <MarketValueCard request={{ seller_vehicle_id: v.id }} accessToken={accessToken} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-line-soft pt-4">
                <Link
                  href={`/?useListing=${v.id}`}
                  className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-line-soft"
                >
                  {t('seller.card.research')}
                </Link>
                <Link
                  href={`/compare?useListingA=${v.id}`}
                  className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-line-soft"
                >
                  {t('seller.card.compare')}
                </Link>
                <button
                  type="button"
                  onClick={() => openEditForm(v)}
                  className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-line-soft"
                >
                  {t('seller.card.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(v)}
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  {t('seller.card.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

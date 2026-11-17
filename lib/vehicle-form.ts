import type { FuelType } from './calculator-logic';
import type { EstimateInput, MarketValueRequest } from './api';

// Shared by the single-vehicle calculator (/) and the comparison page
// (/compare): both collect the exact same vehicle details per car.

export type VehicleSource = 'standard' | 'listing';

export interface VehicleFormState {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
  urbanPercentage: number;
  city: string;
  yearlyKm: number | null;
  source: VehicleSource;
  sellerVehicleId: string | null;
}

export function emptyVehicleForm(): VehicleFormState {
  return {
    make: '',
    model: '',
    year: 2016,
    km: 150_000,
    fuel: 'diesel',
    urbanPercentage: 50,
    city: '',
    yearlyKm: null,
    source: 'standard',
    sellerVehicleId: null,
  };
}

/** Form state for a saved research entry's vehicle (history links). */
export function vehicleFormFromSaved(vehicle: {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  urban_percentage: number;
  city?: string | null;
  yearly_km?: number | null;
}): VehicleFormState {
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    km: vehicle.km,
    fuel: vehicle.fuel as FuelType,
    urbanPercentage: vehicle.urban_percentage,
    city: vehicle.city ?? '',
    yearlyKm: vehicle.yearly_km ?? null,
    source: 'standard',
    sellerVehicleId: null,
  };
}

export function parseNumberOrFallback(raw: string, fallback: number): number {
  const parsed = Number(raw);
  return raw === '' || Number.isNaN(parsed) ? fallback : parsed;
}

export function marketValueRequestFromVehicle(vehicle: {
  make: string;
  model: string;
  year: number;
  fuel: string;
  city?: string | null;
}): MarketValueRequest {
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    fuel: vehicle.fuel,
    ...(vehicle.city && { city: vehicle.city }),
  };
}

// Built straight from the form, not the finished estimate, so the
// market-value lookup can start at the same time as the cost estimate
// instead of waiting for it to finish first.
export function marketValueRequestFromForm(form: VehicleFormState): MarketValueRequest | null {
  if (form.source === 'listing') {
    return form.sellerVehicleId ? { seller_vehicle_id: form.sellerVehicleId } : null;
  }
  if (!form.make.trim() || !form.model.trim()) return null;
  return marketValueRequestFromVehicle({
    make: form.make.trim(),
    model: form.model.trim(),
    year: form.year,
    fuel: form.fuel,
    city: form.city.trim() || null,
  });
}

/** Request body for fetchCostEstimate built from the form. */
export function estimateInputFromForm(form: VehicleFormState, opts: { skipHistory?: boolean } = {}): EstimateInput {
  const skip = opts.skipHistory ? { skip_history: true } : {};
  if (form.source === 'listing' && form.sellerVehicleId) {
    return { seller_vehicle_id: form.sellerVehicleId, ...skip };
  }
  return {
    make: form.make.trim(),
    model: form.model.trim(),
    year: form.year,
    km: form.km,
    fuel: form.fuel,
    urban_percentage: form.urbanPercentage,
    ...(form.city.trim() && { city: form.city.trim() }),
    ...(form.yearlyKm != null && { yearly_km: form.yearlyKm }),
    ...skip,
  };
}

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export interface VehicleInput {
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  fuelType: FuelType;
  annualKm: number;
  fuelPrice: number;
}

export interface CostBreakdown {
  fuel: number;
  maintenance: number;
  repairs: number;
  insurance: number;
  taxes: number;
  depreciation: number;
}

export const CURRENCY = 'LEI'; // Updated to match your Romanian target market context

export const REFERENCE_VEHICLE = {
  name: 'New Chery Tiggo 7 Pro Max',
  costs: {
    fuel: 7200,
    maintenance: 2000,
    repairs: 1200,
    insurance: 2800,
    taxes: 800,
    depreciation: 1600,
  } as CostBreakdown,
};

const CONSUMPTION: Record<FuelType, number> = {
  petrol: 7.5,
  diesel: 6.2,
  hybrid: 4.8,
  electric: 18,
};

export const FUEL_LABELS: Record<FuelType, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

export const ROW_LABELS: { key: keyof CostBreakdown; label: string }[] = [
  { key: 'fuel', label: 'Combustibil' },
  { key: 'maintenance', label: 'Întreținere & Revizii' },
  { key: 'repairs', label: 'Reparații neprevăzute' },
  { key: 'insurance', label: 'Asigurare (CASCO + RCA)' },
  { key: 'taxes', label: 'Taxe & Impozite' },
  { key: 'depreciation', label: 'Pierdere valoare' },
];

export function estimateCurrentVehicleCosts(input: VehicleInput): CostBreakdown {
  // Placeholder logic: Replace this with your Modal API calls or real database logic later
  const age = Math.max(0, new Date().getFullYear() - input.year);
  const ageFactor = 1 + age * 0.06;
  const mileageFactor = 1 + input.mileageKm / 200_000;

  const fuel = (input.annualKm / 100) * CONSUMPTION[input.fuelType] * input.fuelPrice;
  const maintenance = 2000 * ageFactor * mileageFactor;
  const repairs = 1200 * ageFactor * mileageFactor * 1.4;
  const insurance = 2800 * (1 + age * 0.01);
  const taxes = 800 * (1 + age * 0.02);

  const estimatedValue = Math.max(2000, 25000 - age * 1800 - input.mileageKm * 0.03);
  const depreciation = estimatedValue * 0.12;

  return { fuel, maintenance, repairs, insurance, taxes, depreciation };
}

export function total(costs: CostBreakdown): number {
  return Object.values(costs).reduce((sum, v) => sum + v, 0);
}

export function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString()} ${CURRENCY}`;
}
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export const CURRENCY = 'LEI';

export const FUEL_LABELS: Record<FuelType, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  electric: 'Electric',
};

export function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString()} ${CURRENCY}`;
}

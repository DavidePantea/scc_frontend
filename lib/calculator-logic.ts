export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export const CURRENCY = 'LEI';

export const FUEL_TYPES: FuelType[] = ['petrol', 'diesel', 'hybrid', 'electric'];

export function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString()} ${CURRENCY}`;
}

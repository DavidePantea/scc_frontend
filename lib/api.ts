import { translate } from './language-context';

export interface EstimateRequest {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  urban_percentage: number;
  // Optional, advanced-section inputs: the city the car will mainly be
  // driven in (affects fuel/insurance/tax figures, and is part of the
  // backend's cache identity - the same car researched for two different
  // cities is treated as two different vehicles) and an expected annual
  // mileage (overrides the backend's default ~15,000 km/year assumption).
  city?: string;
  yearly_km?: number;
  // Set by the compare flow, which saves both sides as one comparison via
  // saveComparisonResearch once both succeed, instead of each side also
  // landing in the single-vehicle history.
  skip_history?: boolean;
}

// A seller researching one of their own listings sends this instead of the
// raw spec fields - the backend resolves make/model/etc from the listing
// itself (ownership-checked).
export interface SellerVehicleEstimateRequest {
  seller_vehicle_id: string;
  skip_history?: boolean;
}

export type EstimateInput = EstimateRequest | SellerVehicleEstimateRequest;

export interface ListingSnapshot {
  id: string;
  price: number;
  currency: string;
  status: SellerVehicleStatus;
}

export interface EstimateVehicle {
  make: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  urban_percentage: number;
  // Optional per-search context: the city the car is mainly driven in
  // (null/absent if not specified - for a listing-sourced estimate this is
  // the listing's own location field) and an expected annual mileage
  // (null/absent for listing-sourced estimates, which have no field of
  // their own for this).
  city?: string | null;
  yearly_km?: number | null;
  // Present only when this estimate was researched from a seller's listing
  // (via seller_vehicle_id) - a snapshot of price/status at research time,
  // not a live reference.
  listing?: ListingSnapshot;
}

export interface CommonProblem {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | string;
  estimated_cost_min: number;
  estimated_cost_max: number;
}

export interface EstimateEngine {
  motor_type: string;
  common_problems: CommonProblem[];
}

export interface CostItem {
  key: string;
  label: string;
  icon: string;
  amount: number;
  currency: string;
}

export interface VerificationMeta {
  verified: boolean;
  revisions: number;
  notes?: string | null;
}

export interface FinalEstimate {
  vehicle: EstimateVehicle;
  engine: EstimateEngine;
  cost_breakdown: CostItem[];
  total_estimated_cost: CostItem;
  cost_period: string;
  confidence: number;
  summary: string;
  verification: VerificationMeta;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function friendlyErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return translate('api.error.badRequest');
    case 500:
      return translate('api.error.serviceUnavailable');
    case 502:
      return translate('api.error.estimateFailed');
    default:
      return translate('error.generic');
  }
}

export async function fetchCostEstimate(input: EstimateInput, accessToken?: string | null): Promise<FinalEstimate> {
  if (!API_BASE_URL) {
    throw new Error(translate('api.error.notConfigured'));
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/estimate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error(translate('api.error.networkError'));
  }

  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status));
  }

  let body: FinalEstimate;
  try {
    body = await response.json();
  } catch {
    throw new Error(translate('api.error.unreadableResponse'));
  }

  if (!body || !Array.isArray(body.cost_breakdown) || !body.total_estimated_cost) {
    throw new Error(translate('api.error.unexpectedResponse'));
  }

  return body;
}

// --- Average market value (by country, derived from city) --------------

export interface MarketValue {
  country: string;
  currency: string;
  average_price: number;
  price_min: number | null;
  price_max: number | null;
  confidence: number;
  summary: string;
  from_cache?: boolean;
}

// Either a standard vehicle's identity fields, or a reference to one of the
// caller's own listings - mirrors EstimateInput/SellerVehicleEstimateRequest,
// but without km/urban_percentage, which don't affect a market's average
// asking price.
export type MarketValueRequest =
  | { make: string; model: string; year: number; fuel: string; city?: string }
  | { seller_vehicle_id: string };

export async function fetchMarketValue(input: MarketValueRequest, accessToken?: string | null): Promise<MarketValue> {
  if (!API_BASE_URL) {
    throw new Error(translate('api.error.notConfigured'));
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/market-value`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error(translate('api.error.networkError'));
  }

  if (!response.ok) {
    throw new Error(response.status === 400 ? translate('api.error.marketValueBadRequest') : friendlyErrorMessage(response.status));
  }

  try {
    return (await response.json()) as MarketValue;
  } catch {
    throw new Error(translate('api.error.unreadableResponse'));
  }
}

export interface SimpleResearchListItem {
  id: string;
  type: 'simple';
  make: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  urban_percentage: number;
  city?: string | null;
  yearly_km?: number | null;
  // Flattened from the saved result's vehicle field, so it's present when
  // this research was run against one of the seller's own listings.
  listing?: ListingSnapshot;
  total_estimated_cost: CostItem;
  created_at: string;
}

export type SellerSide = 'a' | 'b' | null;

export interface ComparisonResearchListItem {
  id: string;
  type: 'comparison';
  vehicle_a: EstimateVehicle;
  vehicle_b: EstimateVehicle;
  seller_side: SellerSide;
  has_selling_points: boolean;
  created_at: string;
}

export interface ResearchHistory {
  simple: SimpleResearchListItem[];
  comparisons: ComparisonResearchListItem[];
}

export interface SimpleResearchDetail {
  vehicle: EstimateVehicle;
  result: FinalEstimate;
}

export interface ComparisonResearchDetail {
  vehicleA: EstimateVehicle;
  vehicleB: EstimateVehicle;
  resultA: FinalEstimate;
  resultB: FinalEstimate;
  sellerSide: SellerSide;
  sellingPoints: string[] | null;
}

async function authorizedGet<T>(path: string, accessToken: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(translate('api.error.notConfigured'));
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    throw new Error(translate('api.error.networkError'));
  }

  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status));
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(translate('api.error.unreadableResponse'));
  }
}

export async function fetchResearchHistory(accessToken: string): Promise<ResearchHistory> {
  return authorizedGet<ResearchHistory>('/api/research/history', accessToken);
}

export async function fetchSimpleResearchById(id: string, accessToken: string): Promise<SimpleResearchDetail> {
  return authorizedGet<SimpleResearchDetail>(`/api/research/simple/${encodeURIComponent(id)}`, accessToken);
}

export async function fetchComparisonResearchById(id: string, accessToken: string): Promise<ComparisonResearchDetail> {
  const body = await authorizedGet<{
    vehicle_a: EstimateVehicle;
    vehicle_b: EstimateVehicle;
    result_a: FinalEstimate;
    result_b: FinalEstimate;
    seller_side: SellerSide;
    selling_points: string[] | null;
  }>(`/api/research/comparison/${encodeURIComponent(id)}`, accessToken);

  return {
    vehicleA: body.vehicle_a,
    vehicleB: body.vehicle_b,
    resultA: body.result_a,
    resultB: body.result_b,
    sellerSide: body.seller_side,
    sellingPoints: body.selling_points,
  };
}

// Either a standard car's full spec, or a reference to one of the caller's
// own listings - km/urban_percentage are still required alongside
// seller_vehicle_id since they're per-search, not part of the listing's
// fixed identity. city is carried on the listing branch too, purely so the
// backend can store it on the comparison row - it isn't used to resolve the
// listing (seller_vehicle_id already identifies it uniquely).
export type ComparisonVehicleInput =
  | EstimateVehicle
  | { seller_vehicle_id: string; km: number; urban_percentage: number; city?: string | null };

export interface ComparisonResearchInput {
  vehicleA: ComparisonVehicleInput;
  vehicleB: ComparisonVehicleInput;
  resultA: FinalEstimate;
  resultB: FinalEstimate;
}

export interface ComparisonSaveResult {
  id: string;
  createdAt: string;
  sellerSide: SellerSide;
  sellingPoints: string[] | null;
}

export async function saveComparisonResearch(
  input: ComparisonResearchInput,
  accessToken: string,
): Promise<ComparisonSaveResult | null> {
  if (!API_BASE_URL) {
    return null;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/research/comparison`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        vehicle_a: input.vehicleA,
        vehicle_b: input.vehicleB,
        result_a: input.resultA,
        result_b: input.resultB,
      }),
    });
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    return {
      id: body.id,
      createdAt: body.created_at,
      sellerSide: body.seller_side ?? null,
      sellingPoints: body.selling_points ?? null,
    };
  } catch {
    // Best-effort: saving history should never block showing the comparison results.
    return null;
  }
}

// --- Seller inventory (CRUD) -----------------------------------------

export type SellerVehicleCondition = 'excellent' | 'good' | 'fair' | 'poor';
export type SellerVehicleStatus = 'active' | 'sold' | 'draft';

export interface SellerVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  km: number;
  urban_percentage: number;
  price: number;
  currency: string;
  vin: string | null;
  location: string | null;
  condition: SellerVehicleCondition | null;
  description: string | null;
  photo_urls: string[];
  status: SellerVehicleStatus;
  created_at: string;
  updated_at: string;
}

export interface SellerVehicleInput {
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  km: number;
  urban_percentage: number;
  price: number;
  currency?: string;
  vin?: string | null;
  location?: string | null;
  condition?: SellerVehicleCondition | null;
  description?: string | null;
  photo_urls?: string[];
  status?: SellerVehicleStatus;
}

async function sellerVehicleRequest<T>(
  path: string,
  method: string,
  accessToken: string,
  body?: unknown,
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(translate('api.error.notConfigured'));
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(translate('api.error.networkError'));
  }

  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(translate('api.error.unreadableResponse'));
  }
}

export async function fetchSellerVehicles(accessToken: string): Promise<SellerVehicle[]> {
  const body = await sellerVehicleRequest<{ vehicles: SellerVehicle[] }>('/api/seller/vehicles', 'GET', accessToken);
  return body.vehicles;
}

export function createSellerVehicle(input: SellerVehicleInput, accessToken: string): Promise<SellerVehicle> {
  return sellerVehicleRequest<SellerVehicle>('/api/seller/vehicles', 'POST', accessToken, input);
}

export function updateSellerVehicle(
  id: string,
  input: Partial<SellerVehicleInput>,
  accessToken: string,
): Promise<SellerVehicle> {
  return sellerVehicleRequest<SellerVehicle>(`/api/seller/vehicles/${encodeURIComponent(id)}`, 'PATCH', accessToken, input);
}

export async function deleteSellerVehicle(id: string, accessToken: string): Promise<void> {
  await sellerVehicleRequest<void>(`/api/seller/vehicles/${encodeURIComponent(id)}`, 'DELETE', accessToken);
}

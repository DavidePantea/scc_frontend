import { translate } from './language-context';

export interface EstimateRequest {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  urban_percentage: number;
  // Set by the compare flow, which saves both sides as one comparison via
  // saveComparisonResearch once both succeed, instead of each side also
  // landing in the single-vehicle history.
  skip_history?: boolean;
}

export interface EstimateVehicle {
  make: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  urban_percentage: number;
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

export async function fetchCostEstimate(input: EstimateRequest, accessToken?: string | null): Promise<FinalEstimate> {
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

export interface SimpleResearchListItem {
  id: string;
  type: 'simple';
  make: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  urban_percentage: number;
  total_estimated_cost: CostItem;
  created_at: string;
}

export interface ComparisonResearchListItem {
  id: string;
  type: 'comparison';
  vehicle_a: EstimateVehicle;
  vehicle_b: EstimateVehicle;
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
  }>(`/api/research/comparison/${encodeURIComponent(id)}`, accessToken);

  return { vehicleA: body.vehicle_a, vehicleB: body.vehicle_b, resultA: body.result_a, resultB: body.result_b };
}

export interface ComparisonResearchInput {
  vehicleA: EstimateVehicle;
  vehicleB: EstimateVehicle;
  resultA: FinalEstimate;
  resultB: FinalEstimate;
}

export async function saveComparisonResearch(input: ComparisonResearchInput, accessToken: string): Promise<void> {
  if (!API_BASE_URL) {
    return;
  }
  try {
    await fetch(`${API_BASE_URL}/api/research/comparison`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        vehicle_a: input.vehicleA,
        vehicle_b: input.vehicleB,
        result_a: input.resultA,
        result_b: input.resultB,
      }),
    });
  } catch {
    // Best-effort: saving history should never block showing the comparison results.
  }
}

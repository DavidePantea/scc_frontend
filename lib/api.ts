import { translate } from './language-context';

export interface EstimateRequest {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  urban_percentage: number;
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

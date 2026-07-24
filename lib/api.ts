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
      return 'Te rugăm să completezi toate câmpurile: marcă, model, an, kilometraj și tip combustibil.';
    case 500:
      return 'Serviciul de estimare este momentan indisponibil. Te rugăm să încerci din nou puțin mai târziu.';
    case 502:
      return 'Nu am reușit să generăm o estimare de cost chiar acum. Te rugăm să încerci din nou.';
    default:
      return 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.';
  }
}

export async function fetchCostEstimate(input: EstimateRequest, accessToken?: string | null): Promise<FinalEstimate> {
  if (!API_BASE_URL) {
    throw new Error('Adresa serviciului de estimare nu este configurată (NEXT_PUBLIC_API_URL).');
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
    throw new Error('Nu am putut contacta serviciul de estimare. Verifică-ți conexiunea la internet.');
  }

  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status));
  }

  let body: FinalEstimate;
  try {
    body = await response.json();
  } catch {
    throw new Error('Răspunsul primit de la serviciul de estimare nu a putut fi citit.');
  }

  if (!body || !Array.isArray(body.cost_breakdown) || !body.total_estimated_cost) {
    throw new Error('Răspuns neașteptat de la serviciul de estimare.');
  }

  return body;
}

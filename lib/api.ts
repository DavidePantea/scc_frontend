export interface EstimateRequest {
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
}

export interface EstimateOutput {
  min_cost: number;
  max_cost: number;
  issue_list: string[];
  Accuracy: number;
  Details: string;
}

interface EstimateSuccessBody {
  output: EstimateOutput;
}

interface ApiErrorBody {
  error: string;
  details?: string;
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

export async function fetchCostEstimate(input: EstimateRequest): Promise<EstimateOutput> {
  if (!API_BASE_URL) {
    throw new Error('Adresa serviciului de estimare nu este configurată (NEXT_PUBLIC_API_URL).');
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error('Nu am putut contacta serviciul de estimare. Verifică-ți conexiunea la internet.');
  }

  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status));
  }

  let body: EstimateSuccessBody | ApiErrorBody;
  try {
    body = await response.json();
  } catch {
    throw new Error('Răspunsul primit de la serviciul de estimare nu a putut fi citit.');
  }

  if (!('output' in body)) {
    throw new Error('Răspuns neașteptat de la serviciul de estimare.');
  }

  return body.output;
}

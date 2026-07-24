export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

function friendlyErrorMessage(status: number, code: string | undefined): string {
  switch (code) {
    case "invalid_credentials":
      return "Email sau parolă incorectă.";
    case "email_already_registered":
      return "Există deja un cont cu acest email.";
    case "invalid_request":
      return "Te rugăm să completezi corect toate câmpurile (email valid, parolă de minim 8 caractere).";
    default:
      break;
  }
  switch (status) {
    case 401:
      return "Sesiunea ta a expirat. Te rugăm să te autentifici din nou.";
    case 429:
      return "Prea multe încercări. Te rugăm să încerci din nou peste câteva minute.";
    default:
      return "A apărut o eroare neașteptată. Te rugăm să încerci din nou.";
  }
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  if (!AUTH_API_URL) {
    throw new Error("Adresa serviciului de autentificare nu este configurată (NEXT_PUBLIC_AUTH_API_URL).");
  }

  let response: Response;
  try {
    response = await fetch(`${AUTH_API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Nu am putut contacta serviciul de autentificare. Verifică-ți conexiunea la internet.");
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // no body / not JSON - fall through to the generic error below
  }

  if (!response.ok) {
    const code = payload && typeof payload === "object" && "error" in payload
      ? String((payload as { error: unknown }).error)
      : undefined;
    throw new Error(friendlyErrorMessage(response.status, code));
  }

  return payload as T;
}

export function signupRequest(email: string, password: string, name?: string): Promise<AuthResponse> {
  return postJson<AuthResponse>("/signup", { email, password, name });
}

export function loginRequest(email: string, password: string): Promise<AuthResponse> {
  return postJson<AuthResponse>("/login", { email, password });
}

export async function logoutRequest(refreshToken: string): Promise<void> {
  await postJson<{ success: boolean }>("/logout", { refreshToken });
}

export async function meRequest(accessToken: string): Promise<AuthUser> {
  if (!AUTH_API_URL) {
    throw new Error("Adresa serviciului de autentificare nu este configurată (NEXT_PUBLIC_AUTH_API_URL).");
  }
  const response = await fetch(`${AUTH_API_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(friendlyErrorMessage(response.status, undefined));
  }
  return response.json();
}

'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { loginRequest, logoutRequest, signupRequest, type AuthResponse, type AuthUser } from './auth-api';

type AuthStatus = 'unauthenticated' | 'authenticating' | 'authenticated';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Intentionally in-memory only (React state + a ref), never localStorage or
// a cookie: this is what keeps a JWT stolen via a stored-XSS payload useless
// once the tab closes, at the cost of the session not surviving a page
// reload. Reflects that tradeoff on purpose - see the frontend README.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const refreshTokenRef = useRef<string | null>(null);

  const applyAuthResponse = useCallback((response: AuthResponse) => {
    refreshTokenRef.current = response.refreshToken;
    setUser(response.user);
    setAccessToken(response.accessToken);
    setStatus('authenticated');
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setStatus('authenticating');
    try {
      const response = await loginRequest(email, password);
      applyAuthResponse(response);
    } catch (err) {
      setStatus('unauthenticated');
      throw err;
    }
  }, [applyAuthResponse]);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    setStatus('authenticating');
    try {
      const response = await signupRequest(email, password, name);
      applyAuthResponse(response);
    } catch (err) {
      setStatus('unauthenticated');
      throw err;
    }
  }, [applyAuthResponse]);

  const logout = useCallback(async () => {
    const refreshToken = refreshTokenRef.current;
    refreshTokenRef.current = null;
    setUser(null);
    setAccessToken(null);
    setStatus('unauthenticated');
    if (refreshToken) {
      // Best-effort: the token is already gone from memory either way, this
      // just also revokes it server-side so it can't be replayed.
      await logoutRequest(refreshToken).catch(() => undefined);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, accessToken, status, login, signup, logout }),
    [user, accessToken, status, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { translations, TranslationKey } from './translations';

export type Language = 'ro' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'scc-language';

function isLanguage(value: string | null): value is Language {
  return value === 'ro' || value === 'en';
}

let currentLanguage: Language = 'ro';
if (typeof window !== 'undefined') {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) {
    currentLanguage = stored;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Language {
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return 'ro';
}

// Non-reactive getter for plain (non-component) modules, e.g. API error
// messages thrown outside of React's render/hook lifecycle.
export function getLanguage(): Language {
  return currentLanguage;
}

export function translate(key: TranslationKey): string {
  return translations[key][currentLanguage];
}

function commitLanguage(lang: Language) {
  currentLanguage = lang;
  window.localStorage.setItem(STORAGE_KEY, lang);
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    commitLanguage(lang);
  }, []);

  const t = useCallback((key: TranslationKey) => translations[key][language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

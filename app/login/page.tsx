'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import AuthFormField, { authInputClassName } from '@/components/AuthFormField';
import { LoaderIcon } from '@/components/icons';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.generic'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-[#0F172A]">{t('auth.login.title')}</h1>
      <p className="mt-2 text-sm text-[#0F172A]/60">
        {t('auth.login.subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <AuthFormField label={t('auth.emailLabel')}>
          <input
            required
            type="email"
            autoComplete="email"
            className={authInputClassName}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </AuthFormField>
        <AuthFormField label={t('auth.passwordLabel')}>
          <input
            required
            type="password"
            autoComplete="current-password"
            className={authInputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </AuthFormField>

        {error && (
          <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
          {submitting ? t('auth.login.submitting') : t('auth.login.title')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#0F172A]/60">
        {t('auth.login.noAccount')}{' '}
        <Link href="/signup" className="font-semibold text-[#2563EB] hover:underline">
          {t('auth.login.createOne')}
        </Link>
      </p>
    </div>
  );
}

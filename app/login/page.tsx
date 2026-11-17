'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import AuthFormField, { authInputClassName } from '@/components/AuthFormField';
import PageHero from '@/components/PageHero';
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
    <div className="pb-20 text-ink">
      <PageHero title={t('auth.login.title')} subtitle={t('auth.login.subtitle')} variant="overlap" />

      <div className="relative z-10 mx-auto -mt-24 max-w-md px-4 sm:px-6">
        <div className="card-raised p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg w-full"
          >
            {submitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
            {submitting ? t('auth.login.submitting') : t('auth.login.title')}
          </button>
        </form>

        <p className="mt-6 border-t border-line-soft pt-5 text-center text-sm text-muted">
          {t('auth.login.noAccount')}{' '}
          <Link href="/signup" className="link">
            {t('auth.login.createOne')}
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

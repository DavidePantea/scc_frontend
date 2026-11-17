'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import type { AccountType } from '@/lib/auth-api';
import AuthFormField, { authInputClassName } from '@/components/AuthFormField';
import PageHero from '@/components/PageHero';
import { LoaderIcon } from '@/components/icons';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('buyer');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup(email, password, name.trim() || undefined, accountType);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.generic'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pb-20 text-ink">
      <PageHero title={t('auth.signup.title')} subtitle={t('auth.signup.subtitle')} variant="overlap" />

      <div className="relative z-10 mx-auto -mt-24 max-w-md px-4 sm:px-6">
        <div className="card-raised p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormField label={t('auth.signup.nameLabel')}>
            <input
              type="text"
              autoComplete="name"
              className={authInputClassName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AuthFormField>
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
              minLength={8}
              autoComplete="new-password"
              className={authInputClassName}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthFormField>
          <p className="text-xs text-muted">{t('auth.signup.passwordHint')}</p>

          <fieldset>
            <legend className="field-label">{t('auth.signup.accountType')}</legend>
            <div className="grid grid-cols-2 gap-3">
              {(['buyer', 'seller'] as const).map((value) => {
                const selected = accountType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAccountType(value)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 ${
                      selected
                        ? 'border-brand bg-brand-soft ring-1 ring-brand'
                        : 'border-line bg-canvas hover:border-ink/25'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ink">
                      {t(`auth.signup.accountType.${value}`)}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {t(`auth.signup.accountType.${value}Hint`)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted">{t('auth.signup.accountType.fixedNotice')}</p>
          </fieldset>

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
            {submitting ? t('auth.signup.submitting') : t('auth.signup.title')}
          </button>
        </form>

        <p className="mt-6 border-t border-line-soft pt-5 text-center text-sm text-muted">
          {t('auth.signup.haveAccount')}{' '}
          <Link href="/login" className="link">
            {t('auth.signup.login')}
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

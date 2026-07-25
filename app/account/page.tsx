'use client';

import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { ScaleIcon, CheckCircleIcon, AlertIcon } from '@/components/icons';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

function AccountContent() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  if (!user) {
    return null;
  }

  const memberSince = new Date().toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
        {t('account.welcomeBack')}{user.name ? `, ${user.name}` : ''}
      </h1>
      <p className="mt-1 text-sm text-[#0F172A]/60">
        {t('account.subtitle')}
      </p>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-heading mb-6 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
          <ScaleIcon className="h-5 w-5 text-[#2563EB]" />
          {t('account.info.title')}
        </h2>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]/50">{t('account.info.name')}</dt>
            <dd className="mt-1 text-sm font-medium text-[#0F172A]">{user.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]/50">{t('account.info.email')}</dt>
            <dd className="mt-1 text-sm font-medium text-[#0F172A]">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]/50">{t('account.info.emailStatus')}</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium">
              {user.emailVerified ? (
                <>
                  <CheckCircleIcon className="h-4 w-4 text-[#2563EB]" />
                  <span className="text-[#0F172A]">{t('account.info.verified')}</span>
                </>
              ) : (
                <>
                  <AlertIcon className="h-4 w-4 text-[#F97316]" />
                  <span className="text-[#0F172A]">{t('account.info.unverified')}</span>
                </>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]/50">{t('account.info.memberSince')}</dt>
            <dd className="mt-1 text-sm font-medium text-[#0F172A]">{memberSince}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-heading mb-2 text-lg font-semibold text-[#0F172A]">
          {t('account.estimates.title')}
        </h2>
        <p className="mb-4 text-sm text-[#0F172A]/60">
          {t('account.estimates.empty')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1D4ED8] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
        >
          {t('account.estimates.cta')}
        </Link>
      </section>

      <button
        type="button"
        onClick={() => {
          void logout();
        }}
        className="mt-6 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-[#0F172A] transition-all hover:bg-gray-50"
      >
        {t('account.logout')}
      </button>
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountContent />
    </RequireAuth>
  );
}

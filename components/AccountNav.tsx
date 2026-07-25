'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

export default function AccountNav() {
  const { status, user, logout } = useAuth();
  const { t } = useLanguage();

  if (status === 'authenticated' && user) {
    return (
      <div className="flex min-w-0 items-center gap-3">
        {user.accountType === 'seller' && (
          <Link
            href="/seller"
            className="shrink-0 whitespace-nowrap rounded-sm text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
          >
            {t('nav.sellerDashboard')}
          </Link>
        )}
        <Link
          href="/account"
          className="min-w-0 max-w-[8rem] truncate rounded-sm text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
        >
          {user.name ?? user.email}
        </Link>
        <button
          type="button"
          onClick={() => {
            void logout();
          }}
          className="shrink-0 whitespace-nowrap rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20"
        >
          {t('account.logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20"
      >
        {t('account.login')}
      </Link>
      <Link
        href="/signup"
        className="rounded-xl bg-[#F97316] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
      >
        {t('account.signup')}
      </Link>
    </div>
  );
}

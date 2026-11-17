'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

function initials(nameOrEmail: string): string {
  const parts = nameOrEmail.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?';
}

export default function AccountNav() {
  const { status, user, logout } = useAuth();
  const { t } = useLanguage();

  if (status === 'authenticated' && user) {
    const display = user.name ?? user.email;
    return (
      <div className="flex min-w-0 items-center gap-2">
        {user.accountType === 'seller' && (
          <Link href="/seller" className="btn btn-ghost min-h-10 px-3">
            {t('nav.sellerDashboard')}
          </Link>
        )}
        <Link
          href="/account"
          className="flex min-h-10 min-w-0 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-ink transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <span
            aria-hidden
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand"
          >
            {initials(display)}
          </span>
          <span className="max-w-[8rem] truncate">{display}</span>
        </Link>
        <button type="button" onClick={() => void logout()} className="btn btn-secondary min-h-10 px-3.5">
          {t('account.logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link href="/login" className="btn btn-ghost min-h-10 px-3.5">
        {t('account.login')}
      </Link>
      <Link href="/signup" className="btn btn-primary min-h-10 px-4">
        {t('account.signup')}
      </Link>
    </div>
  );
}

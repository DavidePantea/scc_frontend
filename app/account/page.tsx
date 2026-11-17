'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import PageHero from '@/components/PageHero';
import { ScaleIcon, CheckCircleIcon, AlertIcon, LoaderIcon } from '@/components/icons';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { fetchResearchHistory, ComparisonResearchListItem, SimpleResearchListItem } from '@/lib/api';

type HistoryStatus = 'idle' | 'loading' | 'success' | 'error';
type HistoryItem = SimpleResearchListItem | ComparisonResearchListItem;

function AccountContent() {
  const { user, accessToken, logout } = useAuth();
  const { t, language } = useLanguage();
  const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('idle');
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    setHistoryStatus('loading');
    fetchResearchHistory(accessToken)
      .then((data) => {
        if (cancelled) return;
        const merged: HistoryItem[] = [...data.simple, ...data.comparisons].sort((a, b) =>
          a.created_at < b.created_at ? 1 : -1,
        );
        setItems(merged);
        setHistoryStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setHistoryError(err instanceof Error ? err.message : t('error.generic'));
        setHistoryStatus('error');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language === 'ro' ? 'ro-RO' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [language],
  );

  if (!user) {
    return null;
  }

  const memberSince = new Date().toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="pb-20 text-ink">
      <PageHero
        title={`${t('account.welcomeBack')}${user.name ? `, ${user.name}` : ''}`}
        subtitle={t('account.subtitle')}
        variant="overlap"
      />

      <div className="relative z-10 mx-auto -mt-24 max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="card-raised p-6 sm:p-8">
          <h2 className="font-heading mb-6 flex items-center gap-2 text-lg font-semibold text-ink">
            <ScaleIcon className="h-5 w-5 text-brand" />
            {t('account.info.title')}
          </h2>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-muted">{t('account.info.name')}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{user.name ?? '—'}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{t('account.info.email')}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{user.email}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{t('account.info.emailStatus')}</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                {user.emailVerified ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 text-success" />
                    <span className="text-ink">{t('account.info.verified')}</span>
                  </>
                ) : (
                  <>
                    <AlertIcon className="h-4 w-4 text-accent-ink" />
                    <span className="text-ink">{t('account.info.unverified')}</span>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{t('account.info.memberSince')}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{memberSince}</dd>
            </div>
          </dl>
        </section>

        <section className="card mt-6 p-6 sm:p-8">
          <h2 className="font-heading mb-3 text-lg font-semibold tracking-tight text-ink">
            {t('account.estimates.title')}
          </h2>

          {historyStatus === 'loading' && (
            <div className="flex items-center gap-2 py-6 text-sm text-muted">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              {t('account.estimates.loading')}
            </div>
          )}

          {historyStatus === 'error' && (
            <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger">{historyError}</p>
          )}

          {historyStatus === 'success' && items.length === 0 && (
            <>
              <p className="mb-4 text-sm text-muted">{t('account.estimates.empty')}</p>
              <Link
                href="/"
                className="btn btn-primary"
              >
                {t('account.estimates.cta')}
              </Link>
            </>
          )}

          {historyStatus === 'success' && items.length > 0 && (
            <ul className="divide-y divide-line-soft">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <Link
                    href={item.type === 'simple' ? `/?researchId=${item.id}` : `/compare?researchId=${item.id}`}
                    className="-mx-3 flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.type === 'simple'
                          ? `${item.make} ${item.model} · ${item.year}`
                          : `${item.vehicle_a.make} ${item.vehicle_a.model} vs. ${item.vehicle_b.make} ${item.vehicle_b.model}`}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {item.type === 'simple' ? t('account.estimates.typeSingle') : t('account.estimates.typeComparison')}
                        {' · '}
                        {dateFormatter.format(new Date(item.created_at))}
                      </p>
                    </div>
                    {item.type === 'simple' && (
                      <p className="tabular shrink-0 text-sm font-bold text-ink">
                        {Math.round(item.total_estimated_cost.amount).toLocaleString()} {item.total_estimated_cost.currency}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <button
          type="button"
          onClick={() => {
            void logout();
          }}
          className="btn btn-secondary mt-6"
        >
          {t('account.logout')}
        </button>
      </div>
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

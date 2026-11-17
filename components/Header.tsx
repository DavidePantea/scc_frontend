'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, ScaleIcon, XIcon } from './icons';
import AccountNav from './AccountNav';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

const NAV_LINKS = [
  { href: '/', key: 'nav.calculator' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/how-it-works', key: 'nav.howItWorks' },
  { href: '/advantages', key: 'nav.advantages' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)]">
        <ScaleIcon className="h-[18px] w-[18px]" />
      </span>
      <span className={`whitespace-nowrap font-heading text-lg font-bold tracking-tight ${onDark ? 'text-white' : 'text-ink'}`}>
        SmartCar<span className={onDark ? 'text-brand-on-dark' : 'text-brand'}>Compare</span>
      </span>
    </span>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const { status, user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-surface/85 backdrop-blur-lg backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          aria-label="SmartCarCompare"
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                  active ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas hover:text-ink'
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <LanguageToggle />
          <AccountNav />
        </div>

        {/* Below `lg` the full nav + account controls don't fit, so they move into the menu. */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t('nav.menu')}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="animate-in max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <nav aria-label="Main" className="flex flex-col gap-0.5 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 items-center rounded-xl px-3 text-[15px] font-medium transition-colors ${
                    active ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line px-4 py-4">
            {status === 'authenticated' && user ? (
              <div className="flex flex-col gap-1">
                {user.accountType === 'seller' && (
                  <Link
                    href="/seller"
                    onClick={closeMenu}
                    className="flex min-h-11 items-center rounded-xl px-3 text-[15px] font-semibold text-ink hover:bg-canvas"
                  >
                    {t('nav.sellerDashboard')}
                  </Link>
                )}
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="flex min-h-11 items-center truncate rounded-xl px-3 text-[15px] font-semibold text-ink hover:bg-canvas"
                >
                  {user.name ?? user.email}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    void logout();
                  }}
                  className="btn btn-secondary mt-2 w-full"
                >
                  {t('account.logout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={closeMenu} className="btn btn-secondary w-full">
                  {t('account.login')}
                </Link>
                <Link href="/signup" onClick={closeMenu} className="btn btn-primary w-full">
                  {t('account.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

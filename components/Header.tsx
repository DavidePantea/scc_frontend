'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, ScaleIcon, XIcon } from './icons';
import AccountNav from './AccountNav';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

const NAV_LINKS = [
  { href: '/compare', key: 'nav.compare' },
  { href: '/how-it-works', key: 'nav.howItWorks' },
  { href: '/advantages', key: 'nav.advantages' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export default function Header() {
  const { t } = useLanguage();
  const { status, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass =
    'rounded-sm hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <ScaleIcon className="h-5 w-5" />
            </div>
            <span className="whitespace-nowrap font-heading text-xl font-bold tracking-tight text-[#0F172A]">
              SmartCar<span className="text-[#2563EB]">Compare</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden shrink-0 lg:flex gap-6 text-sm font-medium text-[#0F172A]/80">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className={`whitespace-nowrap ${linkClass}`}>
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Language switch + auth controls (login/signup, or account + logout once signed in) */}
        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <LanguageToggle />
          <AccountNav />
        </div>

        {/* Mobile/tablet controls: language switch stays compact, everything else moves into the menu.
            This kicks in below `lg` (not just phones) because the full nav + account controls need
            more horizontal room than they get between `md` and `lg`. */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t('nav.menu')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#0F172A] transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-200 bg-white lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3 text-sm font-medium text-[#0F172A]/80">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 hover:bg-gray-50 hover:text-[#2563EB] transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 px-4 py-3">
            {status === 'authenticated' && user ? (
              <div className="flex flex-col gap-1">
                {user.accountType === 'seller' && (
                  <Link
                    href="/seller"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-2 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-gray-50 hover:text-[#2563EB] transition-colors"
                  >
                    {t('nav.sellerDashboard')}
                  </Link>
                )}
                <Link
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="min-w-0 truncate rounded-lg px-2 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-gray-50 hover:text-[#2563EB] transition-colors"
                >
                  {user.name ?? user.email}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    void logout();
                  }}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-left text-sm font-bold text-[#0F172A] transition-all hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20"
                >
                  {t('account.logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full rounded-xl px-4 py-2.5 text-center text-sm font-bold text-[#0F172A] transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20"
                >
                  {t('account.login')}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full rounded-xl bg-[#F97316] px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30"
                >
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

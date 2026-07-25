'use client';

import Link from 'next/link';
import { ScaleIcon } from './icons';
import AccountNav from './AccountNav';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/lib/language-context';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <ScaleIcon className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#0F172A]">
              SmartCar<span className="text-[#2563EB]">Compare</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[#0F172A]/80">
          <Link href="/compare" className="rounded-sm hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
            {t('nav.compare')}
          </Link>
          <Link href="/how-it-works" className="rounded-sm hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
            {t('nav.howItWorks')}
          </Link>
          <Link href="/advantages" className="rounded-sm hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
            {t('nav.advantages')}
          </Link>
          <Link href="#" className="rounded-sm hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Language switch + auth controls (login/signup, or account + logout once signed in) */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <AccountNav />
        </div>

      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Logo } from './Header';
import { useLanguage } from '@/lib/language-context';
import type { TranslationKey } from '@/lib/translations';

const PRODUCT_LINKS: { href: string; key: TranslationKey }[] = [
  { href: '/', key: 'nav.calculator' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/how-it-works', key: 'nav.howItWorks' },
  { href: '/articole', key: 'nav.articles' },
  { href: '/advantages', key: 'nav.advantages' },
  { href: '/about', key: 'footer.about' },
];

const LEGAL_LINKS: { href: string; key: TranslationKey }[] = [
  { href: '/terms', key: 'footer.terms' },
  { href: '/privacy', key: 'footer.privacy' },
  { href: '/cookies', key: 'footer.cookiePolicy' },
];

const linkClass =
  'rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-on-dark/50';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t('footer.tagline')}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-4 text-white/45">{t('footer.product')}</h2>
            <ul className="space-y-2.5 text-sm text-white/75">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="eyebrow mb-4 text-white/45">{t('footer.contact')}</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-white/45">{t('footer.email')}</dt>
                <dd>
                  <a href="mailto:davide.pantea22@gmail.com" className={`break-all text-white/80 ${linkClass}`}>
                    davide.pantea22@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-white/45">{t('footer.address')}</dt>
                <dd className="text-white/80">{t('footer.addressValue')}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            {LEGAL_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className={linkClass}>
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/50">
            &copy; {currentYear} SmartCarCompare. {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

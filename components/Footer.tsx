'use client';

import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0F172A] py-12 text-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Brand & Description */}
          <div>
            <h3 className="font-heading mb-4 text-xl font-bold tracking-tight text-white">
              SmartCarCompare
            </h3>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-white/70">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading mb-4 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm font-medium text-white/70">
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">{t('footer.phone')}</span>
                <a href="tel:+40700000000" className="hover:text-white transition-colors">+40 700 000 000</a>
              </li>
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">{t('footer.email')}</span>
                <a href="mailto:davide.pantea22@gmail.com" className="hover:text-white transition-colors">davide.pantea22@gmail.com</a>
              </li>
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">{t('footer.address')}</span>
                <span>{t('footer.addressValue')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: legal links + copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/50">
            <li>
              <a href="/about" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">{t('footer.about')}</a>
            </li>
            <li>
              <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">{t('footer.terms')}</a>
            </li>
            <li>
              <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">{t('footer.privacy')}</a>
            </li>
            <li>
              <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">{t('footer.cookiePolicy')}</a>
            </li>
          </ul>
          <p className="text-xs font-medium text-white/50">
            &copy; {currentYear} SmartCarCompare. {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

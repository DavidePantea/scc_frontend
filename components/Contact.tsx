'use client';

import PageHero from './PageHero';
import { MailIcon } from './icons';
import { useLanguage } from '../lib/language-context';

const CONTACT_EMAIL = 'davide.pantea22@gmail.com';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PageHero title={t('contact.heroTitle')} subtitle={t('contact.heroSubtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
            <MailIcon className="h-6 w-6" />
          </div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-[#0F172A]">{t('contact.email.title')}</h2>
          <p className="mb-4 text-sm leading-relaxed text-[#0F172A]/70">{t('contact.email.desc')}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1D4ED8] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </div>
  );
}

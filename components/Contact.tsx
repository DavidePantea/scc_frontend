'use client';

import PageHero from './PageHero';
import { MailIcon } from './icons';
import { useLanguage } from '../lib/language-context';

const CONTACT_EMAIL = 'davide.pantea22@gmail.com';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="pb-20 text-ink">
      <PageHero eyebrow={t('nav.contact')} title={t('contact.heroTitle')} subtitle={t('contact.heroSubtitle')} variant="overlap" />

      <div className="relative z-10 mx-auto -mt-24 max-w-xl px-4 sm:px-6">
        <section className="card-raised flex flex-col items-center p-7 text-center sm:p-10">
          <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <MailIcon className="h-6 w-6" />
          </span>
          <h2 className="font-heading text-xl font-semibold tracking-tight">{t('contact.email.title')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t('contact.email.desc')}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-brand btn-lg mt-6 max-w-full">
            <MailIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{CONTACT_EMAIL}</span>
          </a>
        </section>
      </div>
    </div>
  );
}

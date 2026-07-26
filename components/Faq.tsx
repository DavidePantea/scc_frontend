'use client';

import { useState } from 'react';
import PageHero from './PageHero';
import { AlertIcon, ChevronDownIcon } from './icons';
import { useLanguage } from '../lib/language-context';
import type { TranslationKey } from '../lib/translations';

const QUESTIONS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: 'faq.whatIsIt.q', a: 'faq.whatIsIt.a' },
  { q: 'faq.accuracy.q', a: 'faq.accuracy.a' },
  { q: 'faq.free.q', a: 'faq.free.a' },
  { q: 'faq.account.q', a: 'faq.account.a' },
  { q: 'faq.compare.q', a: 'faq.compare.a' },
  { q: 'faq.dataSource.q', a: 'faq.dataSource.a' },
  { q: 'faq.seller.q', a: 'faq.seller.a' },
  { q: 'faq.privacy.q', a: 'faq.privacy.a' },
];

function FaqAccordion() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {QUESTIONS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-heading text-sm font-semibold text-[#0F172A] sm:text-base">
                {t(item.q)}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-[#2563EB] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm leading-relaxed text-[#0F172A]/70">{t(item.a)}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ComplaintForm() {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      setError(t('faq.complaint.errorRequired'));
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  function resetForm() {
    setMessage('');
    setEmail('');
    setError(null);
    setSubmitted(false);
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316]">
          <AlertIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading mb-1 text-lg font-semibold text-[#0F172A]">
            {t('faq.complaint.title')}
          </h2>
          <p className="text-sm leading-relaxed text-[#0F172A]/70">{t('faq.complaint.subtitle')}</p>
        </div>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 py-8 text-center">
          <p className="font-heading text-base font-semibold text-[#0F172A]">
            {t('faq.complaint.successTitle')}
          </p>
          <p className="max-w-sm text-sm text-[#0F172A]/70">{t('faq.complaint.successDesc')}</p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-2 rounded-xl border-2 border-[#0F172A]/10 px-5 py-2.5 text-sm font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/10"
          >
            {t('faq.complaint.another')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="complaint-message" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              {t('faq.complaint.messageLabel')}
            </label>
            <textarea
              id="complaint-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError(null);
              }}
              placeholder={t('faq.complaint.messagePlaceholder')}
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
            {error && <p className="mt-1.5 text-sm font-semibold text-red-600">{error}</p>}
          </div>

          <div>
            <label htmlFor="complaint-email" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              {t('faq.complaint.emailLabel')}
            </label>
            <input
              id="complaint-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('faq.complaint.emailPlaceholder')}
              className="w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#EA580C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/30 sm:w-auto"
          >
            {t('faq.complaint.submit')}
          </button>
        </form>
      )}
    </section>
  );
}

export default function Faq() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PageHero title={t('faq.heroTitle')} subtitle={t('faq.heroSubtitle')} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <FaqAccordion />

        <div className="mt-10">
          <ComplaintForm />
        </div>
      </div>
    </div>
  );
}

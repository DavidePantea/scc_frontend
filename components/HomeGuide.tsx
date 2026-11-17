'use client';

import Link from 'next/link';
import { ChevronDownIcon } from './icons';
import { HOME_FAQ, HOME_METHOD } from '@/lib/home-content';
import { useLanguage } from '@/lib/language-context';

/** "How we calculate" + FAQ: real, server-rendered explanatory content. */
export default function HomeGuide() {
  const { language } = useLanguage();
  const method = HOME_METHOD[language];
  const faq = HOME_FAQ[language];

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6 lg:px-8">
      <section aria-labelledby="method-title" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="method-title" className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {method.title}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted">{method.intro}</p>
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {method.steps.map((step, idx) => (
            <li key={step.title} className="card p-5 sm:p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-white">
                {idx + 1}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-title" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {faq.title}
          </h2>
        </div>
        <div className="card divide-y divide-line-soft lg:col-span-8">
          {faq.items.map((item) => (
            <details key={item.q} className="group px-5 sm:px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-pretty text-sm leading-relaxed text-muted">
                {item.a}
                {item.link && (
                  <>
                    {' '}
                    <Link href={item.link.href} className="link">
                      {item.link.label}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

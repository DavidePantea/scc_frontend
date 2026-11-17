'use client';

import Link from 'next/link';
import { ArrowRightIcon } from './icons';

/** Closing call-to-action band used at the bottom of the content pages. */
export default function CtaBanner({
  title,
  description,
  cta,
  href = '/',
}: {
  title: string;
  description: string;
  cta: string;
  href?: string;
}) {
  return (
    <section className="hero-surface mt-10 overflow-hidden rounded-[1.25rem] px-6 py-10 sm:px-10 sm:py-12">
      <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-balance font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">{description}</p>
        </div>
        <Link href={href} className="btn btn-primary btn-lg shrink-0">
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

'use client';

import { useLanguage } from '@/lib/language-context';

export default function CalculatorHeader() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full pt-16 pb-40 lg:pt-24 lg:pb-48 overflow-hidden bg-[#F8FAFC]">
      
      {/* 1. Background Image - Fully visible */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }} 
      />
      
      {/* 2. Subtle Top Gradient - Only behind the text to ensure it stays readable */}
      <div className="absolute top-0 left-0 right-0 h-72 z-0 bg-gradient-to-b from-black/70 to-transparent" />

      {/* 3. The Bottom Fade Only - Smoothly blends the image into the page background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 z-10 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="text-center lg:text-left">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-white drop-shadow-lg">
            {t('hero.titleLine1')} <br className="hidden sm:block" />
            <span className="text-[#2563EB]">{t('hero.titleLine2')}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white mx-auto lg:mx-0 font-medium drop-shadow-md">
            {t('hero.subtitle')}
          </p>
        </header>
      </div>
    </div>
  );
}
'use client';

import { useLanguage, Language } from '@/lib/language-context';

const OPTIONS: { code: Language; label: string }[] = [
  { code: 'ro', label: 'RO' },
  { code: 'en', label: 'EN' },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-gray-200 p-0.5 text-xs font-bold">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          aria-pressed={language === option.code}
          className={`rounded-md px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 ${
            language === option.code
              ? 'bg-[#2563EB] text-white'
              : 'text-[#0F172A]/60 hover:text-[#0F172A]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

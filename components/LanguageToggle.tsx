'use client';

import { useLanguage, Language } from '@/lib/language-context';

const OPTIONS: { code: Language; label: string; name: string }[] = [
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'en', label: 'EN', name: 'English' },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div role="group" aria-label="Language" className="flex items-center rounded-lg bg-canvas p-0.5 text-xs font-bold">
      {OPTIONS.map((option) => {
        const active = language === option.code;
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            aria-label={option.name}
            className={`min-h-8 min-w-9 rounded-md px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
              active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

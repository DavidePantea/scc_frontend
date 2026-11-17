'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/language-context';
import {
  CarIcon,
  FuelPumpIcon,
  ReceiptIcon,
  ScaleIcon,
  SearchIcon,
  ShieldIcon,
  WrenchIcon,
} from './icons';

type IconComponent = typeof SearchIcon;

const STEPS: Array<{ icon: IconComponent; ro: string; en: string }> = [
  { icon: SearchIcon, ro: 'Căutăm mașina ta...', en: 'Finding your car...' },
  { icon: CarIcon, ro: 'Verificăm istoricul vehiculului...', en: 'Checking the vehicle history...' },
  { icon: WrenchIcon, ro: 'Desfacem motorul din șuruburi...', en: 'Taking the engine apart...' },
  { icon: FuelPumpIcon, ro: 'Calculăm consumul de combustibil...', en: 'Crunching the fuel numbers...' },
  { icon: ScaleIcon, ro: 'Cântărim toate costurile...', en: 'Weighing up all the costs...' },
  { icon: ReceiptIcon, ro: 'Generăm rezultatele...', en: 'Putting together your results...' },
  { icon: ShieldIcon, ro: 'Facem verificările finale...', en: 'Running the final checks...' },
];

const STEP_DURATION_MS = 1800;

export default function LoadingMessages({ className }: { className?: string }) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[index];
  const Icon = step.icon;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 py-12 text-center ${className ?? ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-brand/10 [animation-duration:1.8s]" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_8px_24px_-6px_rgb(37_99_235/0.55)]">
          <Icon key={index} className="animate-in h-6 w-6" />
        </span>
      </span>
      <p key={index} className="animate-in max-w-xs font-heading text-base font-semibold text-ink">
        {language === 'ro' ? step.ro : step.en}
      </p>
      <div className="flex gap-1.5" aria-hidden>
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-brand' : i < index ? 'w-1.5 bg-brand/40' : 'w-1.5 bg-ink/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

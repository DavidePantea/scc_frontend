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
    <div className={`flex flex-col items-center justify-center gap-4 py-12 text-center ${className ?? ''}`}>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#2563EB]/10" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10">
          <Icon key={index} className="h-6 w-6 text-[#2563EB]" />
        </span>
      </span>
      <p
        key={index}
        className="max-w-xs text-sm font-medium text-[#0F172A]/60"
        style={{ animation: 'fade-in-up 0.35s ease-out' }}
      >
        {language === 'ro' ? step.ro : step.en}
      </p>
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              i === index ? 'bg-[#2563EB]' : 'bg-[#0F172A]/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

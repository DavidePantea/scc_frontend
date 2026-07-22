type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function FuelPumpIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 22V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v18" />
      <path d="M3 22h9" />
      <path d="M5 9h5" />
      <path d="M14 6h1.5a2 2 0 0 1 2 2v2.5" />
      <circle cx="19" cy="12" r="1.5" />
      <path d="M14 22v-8" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.8-.8-.8-2.8Z" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

export function PriceTagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12.6 2.7 2.7 12.6a2 2 0 0 0 0 2.8l6 6a2 2 0 0 0 2.8 0l9.9-9.9a2 2 0 0 0 .6-1.4V4a2 2 0 0 0-2-2h-6a2 2 0 0 0-1.4.6Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17.5v.01" />
    </svg>
  );
}

export function ReceiptIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function LoaderIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

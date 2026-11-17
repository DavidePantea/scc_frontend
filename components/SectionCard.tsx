type IconComponent = React.ComponentType<{ className?: string }>;

interface SectionCardProps {
  title: React.ReactNode;
  icon?: IconComponent;
  /** Icon tint: 'brand' for data/neutral sections, 'accent' for warnings. */
  tone?: 'brand' | 'accent';
  subtitle?: React.ReactNode;
  /** Right-aligned header slot, e.g. a toggle button. */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const TONES = {
  brand: 'bg-brand-soft text-brand',
  accent: 'bg-accent-soft text-accent-ink',
};

/** Standard white results card with an icon + title header. */
export default function SectionCard({
  title,
  icon: Icon,
  tone = 'brand',
  subtitle,
  action,
  className = '',
  children,
}: SectionCardProps) {
  return (
    <section className={`card flex flex-col p-5 sm:p-7 ${className}`}>
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {Icon && (
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
              <Icon className="h-[18px] w-[18px]" />
            </span>
          )}
          <div className="min-w-0">
            <h2 className="font-heading text-lg font-semibold leading-tight tracking-tight text-ink">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      {children}
    </section>
  );
}

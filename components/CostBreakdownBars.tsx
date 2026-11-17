'use client';

import {
  FuelPumpIcon,
  WrenchIcon,
  AlertIcon,
  ShieldIcon,
  ReceiptIcon,
  PriceTagIcon,
  ScaleIcon,
} from './icons';
import type { CostItem } from '../lib/api';
import { useLanguage, type TranslateFn } from '../lib/language-context';

type IconComponent = React.ComponentType<{ className?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  fuel: FuelPumpIcon,
  maintenance: WrenchIcon,
  repair: AlertIcon,
  repairs: AlertIcon,
  insurance: ShieldIcon,
  tax: ReceiptIcon,
  taxes: ReceiptIcon,
  depreciation: PriceTagIcon,
  total: ScaleIcon,
};

// The backend always returns Romanian label text, but its `key` is a
// stable, finite identifier (already used above for icon mapping) - use it
// to show a localized label instead, falling back to the API's own label
// for any key we don't recognize.
const LABEL_KEY_MAP: Record<string, 'costItem.total' | 'costItem.fuel' | 'costItem.maintenance' | 'costItem.repair' | 'costItem.insurance' | 'costItem.tax' | 'costItem.depreciation'> = {
  total: 'costItem.total',
  fuel: 'costItem.fuel',
  maintenance: 'costItem.maintenance',
  repair: 'costItem.repair',
  repairs: 'costItem.repair',
  insurance: 'costItem.insurance',
  tax: 'costItem.tax',
  taxes: 'costItem.tax',
  depreciation: 'costItem.depreciation',
};

function resolveIcon(item: CostItem): IconComponent {
  return ICON_MAP[item.key] ?? ICON_MAP[item.icon] ?? ReceiptIcon;
}

function resolveLabel(item: CostItem, t: TranslateFn): string {
  const translationKey = LABEL_KEY_MAP[item.key];
  return translationKey ? t(translationKey) : item.label;
}

function formatAmount(amount: number): string {
  return Math.round(amount).toLocaleString();
}

// Fixed category order and colour, so the breakdown always reads the same
// way - and two vehicles on the compare page line up row for row. Each row
// repeats its colour next to a text label and amount, so colour is never the
// only signal.
const CATEGORY_STYLE: Record<string, { order: number; color: string; fg: string }> = {
  fuel: { order: 0, color: '#1D4ED8', fg: '#FFFFFF' },
  maintenance: { order: 1, color: '#3B82F6', fg: '#FFFFFF' },
  repair: { order: 2, color: '#93C5FD', fg: '#0F172A' },
  repairs: { order: 2, color: '#93C5FD', fg: '#0F172A' },
  insurance: { order: 3, color: '#F97316', fg: '#0F172A' },
  tax: { order: 4, color: '#FDBA74', fg: '#0F172A' },
  taxes: { order: 4, color: '#FDBA74', fg: '#0F172A' },
  depreciation: { order: 5, color: '#64748B', fg: '#FFFFFF' },
};
// Unknown keys go last, in the order the API sent them.
const FALLBACK_STYLE = { order: 99, color: '#CBD5E1', fg: '#0F172A' };

interface CostBreakdownBarsProps {
  costBreakdown: CostItem[];
  total: CostItem;
  period: string;
}

export default function CostBreakdownBars({ costBreakdown, total, period }: CostBreakdownBarsProps) {
  const { t } = useLanguage();
  const periodLabels: Record<string, string> = {
    annual: t('period.annual'),
    monthly: t('period.monthly'),
  };
  const totalAmount = total.amount > 0 ? total.amount : 0;
  const periodLabel = periodLabels[period] ?? (period ? `/ ${period}` : '');
  const items = costBreakdown
    .map((item, idx) => ({ item, idx, style: CATEGORY_STYLE[item.key] ?? FALLBACK_STYLE }))
    .sort((a, b) => a.style.order - b.style.order || a.idx - b.idx)
    .map(({ item, style }) => ({
      item,
      color: style.color,
      fg: style.fg,
      pct: totalAmount > 0 ? Math.max(0, Math.min(100, (item.amount / totalAmount) * 100)) : 0,
    }));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-medium text-muted">{resolveLabel(total, t)}</p>
        <p className="tabular font-heading text-2xl font-bold tracking-tight text-ink">
          {formatAmount(total.amount)}
          <span className="ml-1.5 text-sm font-semibold text-muted">
            {total.currency} {periodLabel}
          </span>
        </p>
      </div>

      <div className="mt-3 flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-line-soft" aria-hidden>
        {items.map(({ item, color, pct }) => (
          <div
            key={item.key}
            className="h-full transition-[width] duration-700 first:rounded-l-full last:rounded-r-full"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        ))}
      </div>

      <ul className="mt-5 divide-y divide-line-soft">
        {items.map(({ item, color, fg, pct }) => {
          const Icon = resolveIcon(item);
          return (
            <li key={item.key} className="flex items-center gap-3 py-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: color, color: fg }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium text-ink">{resolveLabel(item, t)}</span>
                  <span className="tabular whitespace-nowrap text-sm font-semibold text-ink">
                    {formatAmount(item.amount)} <span className="font-normal text-muted">{item.currency}</span>
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="tabular w-9 text-right text-xs font-medium text-muted">{Math.round(pct)}%</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

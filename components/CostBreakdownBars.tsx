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

function resolveIcon(item: CostItem): IconComponent {
  return ICON_MAP[item.key] ?? ICON_MAP[item.icon] ?? ReceiptIcon;
}

function formatAmount(amount: number, currency: string): string {
  return `${Math.round(amount).toLocaleString()} ${currency}`;
}

const PERIOD_LABELS: Record<string, string> = {
  annual: '/ an',
  monthly: '/ lună',
};

interface CostBreakdownBarsProps {
  costBreakdown: CostItem[];
  total: CostItem;
  period: string;
}

export default function CostBreakdownBars({ costBreakdown, total, period }: CostBreakdownBarsProps) {
  const totalAmount = total.amount > 0 ? total.amount : 0;
  const periodLabel = PERIOD_LABELS[period] ?? (period ? `/ ${period}` : '');

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
            <ScaleIcon className="h-4 w-4 text-[#0F172A]/50" />
            {total.label}
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-[#0F172A]">
            {formatAmount(total.amount, total.currency)}
            {periodLabel && <span className="ml-1 font-normal text-[#0F172A]/50">{periodLabel}</span>}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#F8FAFC]">
          <div className="h-full w-full rounded-full bg-[#0F172A]" />
        </div>
      </div>

      <div className="space-y-4">
        {costBreakdown.map((item) => {
          const Icon = resolveIcon(item);
          const pct = totalAmount > 0 ? Math.max(0, Math.min(100, (item.amount / totalAmount) * 100)) : 0;
          return (
            <div key={item.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-[#0F172A]">
                  <Icon className="h-4 w-4 shrink-0 text-[#0F172A]/50" />
                  {item.label}
                </div>
                <span className="whitespace-nowrap font-semibold text-[#2563EB]">
                  {formatAmount(item.amount, item.currency)}
                  <span className="ml-1.5 text-xs font-normal text-[#0F172A]/40">{Math.round(pct)}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F8FAFC]">
                <div
                  className="h-full rounded-full bg-[#2563EB] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

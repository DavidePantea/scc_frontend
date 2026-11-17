'use client';

import SectionCard from './SectionCard';
import { AlertIcon, CheckCircleIcon } from './icons';
import type { EstimateEngine } from '../lib/api';
import { useLanguage } from '../lib/language-context';

// Colour is always paired with a text label, never the only signal.
const SEVERITY: Record<string, { bar: string; pill: string; dot: string }> = {
  low: { bar: 'bg-brand', pill: 'bg-brand-soft text-brand', dot: 'bg-brand' },
  medium: { bar: 'bg-accent', pill: 'bg-accent-soft text-accent-ink', dot: 'bg-accent' },
  high: { bar: 'bg-danger', pill: 'bg-danger-soft text-danger', dot: 'bg-danger' },
};

interface CommonProblemsProps {
  engine: EstimateEngine;
  /** Cap the list height and scroll inside it (keeps compare columns even). */
  scrollable?: boolean;
  className?: string;
}

export default function CommonProblems({ engine, scrollable = false, className = '' }: CommonProblemsProps) {
  const { t } = useLanguage();
  const labels: Record<string, string> = {
    low: t('severity.low'),
    medium: t('severity.medium'),
    high: t('severity.high'),
  };
  const problems = engine.common_problems;

  return (
    <SectionCard
      icon={AlertIcon}
      tone="accent"
      title={t('problems.title')}
      subtitle={engine.motor_type || undefined}
      className={className}
    >
      {problems.length > 0 ? (
        <ul className={`space-y-2.5 ${scrollable ? 'max-h-96 overflow-y-auto pr-1' : ''}`}>
          {problems.map((problem, idx) => {
            const style = SEVERITY[problem.severity] ?? SEVERITY.medium;
            const hasCost = problem.estimated_cost_min > 0 || problem.estimated_cost_max > 0;
            return (
              <li key={idx} className="relative overflow-hidden rounded-xl border border-line-soft bg-canvas py-3 pl-5 pr-4">
                <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${style.bar}`} />
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">{problem.title}</p>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.pill}`}
                  >
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {labels[problem.severity] ?? problem.severity}
                  </span>
                </div>
                {problem.description && <p className="mt-1 text-sm leading-relaxed text-muted">{problem.description}</p>}
                {hasCost && (
                  <p className="tabular mt-2 text-xs font-semibold text-ink">
                    {Math.round(problem.estimated_cost_min).toLocaleString()} –{' '}
                    {Math.round(problem.estimated_cost_max).toLocaleString()} RON
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="flex items-center gap-2 rounded-xl bg-success-soft px-4 py-3 text-sm font-medium text-success">
          <CheckCircleIcon className="h-4 w-4 shrink-0" />
          {t('problems.none')}
        </p>
      )}
    </SectionCard>
  );
}

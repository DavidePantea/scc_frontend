'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertIcon, LoaderIcon, TrendIcon } from './icons';
import { fetchPriceEvolution, type PriceEvolution, type PriceEvolutionRequest } from '../lib/api';
import { useLanguage } from '../lib/language-context';

export interface PriceEvolutionSeriesInput {
  key: string;
  label: string;
  color: string;
  request: PriceEvolutionRequest | null;
}

type FetchStatus = 'loading' | 'success' | 'error';

interface SeriesFetchState {
  status: FetchStatus;
  data: PriceEvolution | null;
  error: string | null;
}

function requestKey(request: PriceEvolutionRequest | null): string {
  if (!request) return 'none';
  if ('seller_vehicle_id' in request) return `listing:${request.seller_vehicle_id}`;
  return `${request.make}|${request.model}|${request.year}|${request.fuel}|${request.city ?? ''}`;
}

const VIEW_W = 640;
const VIEW_H = 260;
const PAD = { top: 16, right: 16, bottom: 26, left: 60 };
const CHART_W = VIEW_W - PAD.left - PAD.right;
const CHART_H = VIEW_H - PAD.top - PAD.bottom;

interface PriceEvolutionChartProps {
  // One series (single-vehicle calculator) or two (compare page) - either
  // way each is fetched independently and plotted on a shared timeline, each
  // in its own fixed color, never cycled.
  series: PriceEvolutionSeriesInput[];
  accessToken?: string | null;
}

export default function PriceEvolutionChart({ series, accessToken }: PriceEvolutionChartProps) {
  const { t } = useLanguage();
  const [statesByKey, setStatesByKey] = useState<Record<string, SeriesFetchState>>({});
  const [retryNonce, setRetryNonce] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const activeSeries = series.filter(
    (s): s is PriceEvolutionSeriesInput & { request: PriceEvolutionRequest } => s.request !== null,
  );
  const signature = activeSeries.map((s) => `${s.key}:${requestKey(s.request)}`).join(',');

  // Reset the table/chart toggle when the underlying vehicle(s) change -
  // done during render (the React-sanctioned way to adjust state in
  // response to a prop change) rather than in the effect below, so it
  // doesn't trigger an extra synchronous setState-in-effect render.
  const [prevSignature, setPrevSignature] = useState(signature);
  if (signature !== prevSignature) {
    setPrevSignature(signature);
    setShowTable(false);
  }

  useEffect(() => {
    activeSeries.forEach((s) => {
      setStatesByKey((prev) => ({ ...prev, [s.key]: { status: 'loading', data: null, error: null } }));
      fetchPriceEvolution(s.request, accessToken)
        .then((data) => {
          setStatesByKey((prev) => ({ ...prev, [s.key]: { status: 'success', data, error: null } }));
        })
        .catch((err) => {
          setStatesByKey((prev) => ({
            ...prev,
            [s.key]: { status: 'error', data: null, error: err instanceof Error ? err.message : t('error.generic') },
          }));
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, retryNonce]);

  if (activeSeries.length === 0) {
    return (
      <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="font-heading mb-1 flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
          <TrendIcon className="h-5 w-5 text-[#2563EB]" />
          {t('priceEvolution.title')}
        </h2>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
          <TrendIcon className="h-8 w-8 text-[#0F172A]/20" />
          <p className="max-w-xs text-sm font-medium text-[#0F172A]/60">{t('priceEvolution.idle')}</p>
        </div>
      </section>
    );
  }

  type ActiveEntry = {
    series: PriceEvolutionSeriesInput & { request: PriceEvolutionRequest };
    state: SeriesFetchState | undefined;
  };

  const entries: ActiveEntry[] = activeSeries.map((s) => ({ series: s, state: statesByKey[s.key] }));
  const anyLoading = entries.some((e) => !e.state || e.state.status === 'loading');
  const successes = entries.filter(
    (e): e is ActiveEntry & { state: SeriesFetchState & { data: PriceEvolution } } =>
      !!e.state && e.state.status === 'success' && e.state.data !== null,
  );
  const allErrored = !anyLoading && successes.length === 0;

  return (
    <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2 className="font-heading flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
          <TrendIcon className="h-5 w-5 text-[#2563EB]" />
          {t('priceEvolution.title')}
        </h2>
        {successes.length > 0 && (
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="shrink-0 rounded-lg bg-[#2563EB]/10 px-3 py-1.5 text-xs font-bold text-[#2563EB] transition-colors hover:bg-[#2563EB]/20"
          >
            {showTable ? t('priceEvolution.showChart') : t('priceEvolution.showTable')}
          </button>
        )}
      </div>
      <p className="mb-5 text-xs font-semibold text-[#0F172A]/50">{t('priceEvolution.subtitle')}</p>

      {anyLoading && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
          <LoaderIcon className="h-8 w-8 animate-spin text-[#0F172A]/20" />
          <p className="max-w-xs text-sm font-medium text-[#0F172A]/60">{t('priceEvolution.loading')}</p>
        </div>
      )}

      {!anyLoading && allErrored && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 py-10 px-6 text-center">
          <AlertIcon className="h-8 w-8 text-red-500" />
          <p className="max-w-xs text-sm font-semibold text-red-700">{entries.find((e) => e.state?.error)?.state?.error}</p>
          <button
            type="button"
            onClick={() => setRetryNonce((n) => n + 1)}
            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-200"
          >
            {t('marketValue.retry')}
          </button>
        </div>
      )}

      {!anyLoading && successes.length > 0 && <Chart successes={successes} showTable={showTable} />}
    </section>
  );
}

interface ChartSeries {
  key: string;
  label: string;
  color: string;
  points: PriceEvolution['points'];
  currency: string;
}

function Chart({
  successes,
  showTable,
}: {
  successes: { series: PriceEvolutionSeriesInput; state: { data: PriceEvolution } }[];
  showTable: boolean;
}) {
  const { t } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<{ year: number; x: number } | null>(null);

  const chartSeries: ChartSeries[] = successes.map(({ series, state }) => ({
    key: series.key,
    label: series.label,
    color: series.color,
    points: [...state.data.points].sort((a, b) => a.year - b.year),
    currency: state.data.currency,
  }));

  const allYears = chartSeries.flatMap((s) => s.points.map((p) => p.year));
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const allPrices = chartSeries.flatMap((s) => s.points.map((p) => p.average_price));
  const rawMin = Math.min(...allPrices);
  const rawMax = Math.max(...allPrices);
  const pricePad = (rawMax - rawMin) * 0.15 || rawMax * 0.1 || 1;
  const minPrice = Math.max(0, rawMin - pricePad);
  const maxPrice = rawMax + pricePad;

  const yearSpan = Math.max(maxYear - minYear, 1);
  const priceSpan = Math.max(maxPrice - minPrice, 1);

  function xFor(year: number) {
    return PAD.left + ((year - minYear) / yearSpan) * CHART_W;
  }
  function yFor(price: number) {
    return PAD.top + (1 - (price - minPrice) / priceSpan) * CHART_H;
  }

  const currency = chartSeries[0]?.currency ?? '';
  const yTickCount = 4;
  const yTickValues = Array.from({ length: yTickCount + 1 }, (_, i) => minPrice + (priceSpan * i) / yTickCount);
  const xYears = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
  const tooShort = chartSeries.every((s) => s.points.length < 2);

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const svgX = fraction * VIEW_W;
    const yearFloat = minYear + ((svgX - PAD.left) / CHART_W) * yearSpan;
    const year = Math.round(Math.min(maxYear, Math.max(minYear, yearFloat)));
    setHover({ year, x: xFor(year) });
  }

  if (showTable) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-[#0F172A]/50">
              <th className="py-2 pr-4">{t('priceEvolution.year')}</th>
              {chartSeries.map((s) => (
                <th key={s.key} className="py-2 pr-4 font-semibold normal-case tracking-normal text-[#0F172A]">
                  <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: s.color }} />
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {xYears.map((year) => (
              <tr key={year} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-semibold text-[#0F172A]">{year}</td>
                {chartSeries.map((s) => {
                  const point = s.points.find((p) => p.year === year);
                  return (
                    <td key={s.key} className="py-2 pr-4 text-[#0F172A]/70">
                      {point ? `${Math.round(point.average_price).toLocaleString()} ${s.currency}` : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      {tooShort && (
        <p className="mb-3 rounded-lg bg-[#2563EB]/5 px-3 py-2 text-xs font-semibold text-[#2563EB]">
          {t('priceEvolution.tooNew')}
        </p>
      )}
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#0F172A]/40">
        {t('priceEvolution.pricesIn')} {currency}
      </p>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full touch-none"
          role="img"
          aria-label={t('priceEvolution.title')}
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >
          {yTickValues.map((value, i) => (
            <g key={i}>
              <line x1={PAD.left} x2={VIEW_W - PAD.right} y1={yFor(value)} y2={yFor(value)} stroke="#E2E8F0" strokeWidth={1} />
              <text x={PAD.left - 8} y={yFor(value)} textAnchor="end" dominantBaseline="middle" className="fill-[#0F172A]/40" fontSize={10}>
                {Math.round(value).toLocaleString()}
              </text>
            </g>
          ))}

          {xYears.map((year) => (
            <text key={year} x={xFor(year)} y={VIEW_H - PAD.bottom + 18} textAnchor="middle" className="fill-[#0F172A]/40" fontSize={10}>
              {year}
            </text>
          ))}

          {hover && (
            <line x1={hover.x} x2={hover.x} y1={PAD.top} y2={VIEW_H - PAD.bottom} stroke="#0F172A" strokeOpacity={0.15} strokeWidth={1} />
          )}

          {chartSeries.map((s) => {
            const path = s.points
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year).toFixed(1)} ${yFor(p.average_price).toFixed(1)}`)
              .join(' ');
            const last = s.points[s.points.length - 1];
            const labelAtEnd = last && xFor(last.year) + 6 <= VIEW_W - PAD.right - 4;
            return (
              <g key={s.key}>
                <path d={path} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {s.points.map((p) => (
                  <circle
                    key={p.year}
                    cx={xFor(p.year)}
                    cy={yFor(p.average_price)}
                    r={hover?.year === p.year ? 4.5 : 3}
                    fill="#fff"
                    stroke={s.color}
                    strokeWidth={2}
                  />
                ))}
                {last && (
                  <text
                    x={labelAtEnd ? xFor(last.year) + 8 : xFor(last.year) - 8}
                    y={yFor(last.average_price)}
                    textAnchor={labelAtEnd ? 'start' : 'end'}
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={700}
                    className="fill-[#0F172A]"
                  >
                    {s.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute top-2 z-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${(hover.x / VIEW_W) * 100}%`, transform: 'translateX(-50%)' }}
          >
            <p className="mb-1 font-bold text-[#0F172A]">{hover.year}</p>
            {chartSeries.map((s) => {
              const point = s.points.find((p) => p.year === hover.year);
              if (!point) return null;
              return (
                <p key={s.key} className="flex items-center gap-1.5 whitespace-nowrap text-[#0F172A]/70">
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                  {Math.round(point.average_price).toLocaleString()} {s.currency}
                </p>
              );
            })}
          </div>
        )}
      </div>

      {chartSeries.length >= 2 && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4">
          {chartSeries.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A]/70">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

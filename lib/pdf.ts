import jsPDF from 'jspdf';
import type { CostItem, FinalEstimate } from './api';
import { translate } from './language-context';
import { translations, type TranslationKey } from './translations';

// The backend always returns Romanian label text, but its `key` is a
// stable, finite identifier - use it to show a localized label instead,
// falling back to the API's own label for any key we don't recognize.
// Mirrors CostBreakdownBars' own LABEL_KEY_MAP.
const COST_LABEL_KEYS: Record<string, TranslationKey> = {
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

const SEVERITY_KEYS: Record<string, TranslationKey> = {
  low: 'severity.low',
  medium: 'severity.medium',
  high: 'severity.high',
};

function costLabel(item: CostItem): string {
  const key = COST_LABEL_KEYS[item.key];
  return key ? translate(key) : item.label;
}

function severityLabel(severity: string): string {
  return translate(SEVERITY_KEYS[severity] ?? 'severity.medium');
}

function fuelLabel(fuel: string): string {
  const key = `fuel.${fuel}` as TranslationKey;
  return key in translations ? translate(key) : fuel;
}

function formatAmount(amount: number, currency: string): string {
  return `${Math.round(amount).toLocaleString()} ${currency}`;
}

function safeFilenamePart(value: string): string {
  return value.trim().replace(/[^a-zA-Z0-9-]+/g, '_');
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// jsPDF's built-in "helvetica" is a base-14 PDF font restricted to
// WinAnsi/Latin-1, which doesn't cover Romanian diacritics (ă, â, î, ș, ț) -
// text using them renders with missing glyphs and broken spacing. Liberation
// Sans (SIL OFL licensed, bundled under public/fonts) covers the full Latin
// Extended-A range, so it's embedded instead. Fetched (not bundled as a JS
// base64 string) so the ~800KB of font data is only downloaded when a user
// actually exports a PDF, and cached across calls in the same page session.
let fontRegistrationPromise: Promise<boolean> | null = null;

async function ensureUnicodeFont(doc: jsPDF): Promise<string> {
  if (!fontRegistrationPromise) {
    fontRegistrationPromise = (async () => {
      const [regular, bold] = await Promise.all([
        fetch('/fonts/LiberationSans-Regular.ttf').then((r) => r.arrayBuffer()),
        fetch('/fonts/LiberationSans-Bold.ttf').then((r) => r.arrayBuffer()),
      ]);
      doc.addFileToVFS('LiberationSans-Regular.ttf', arrayBufferToBase64(regular));
      doc.addFont('LiberationSans-Regular.ttf', 'LiberationSans', 'normal');
      doc.addFileToVFS('LiberationSans-Bold.ttf', arrayBufferToBase64(bold));
      doc.addFont('LiberationSans-Bold.ttf', 'LiberationSans', 'bold');
      return true;
    })().catch((err) => {
      // Falls back to helvetica (diacritics render imperfectly, but the PDF
      // still generates) rather than blocking the download entirely.
      fontRegistrationPromise = null;
      console.error('Failed to load PDF font, falling back to a built-in font', err);
      return false;
    });
  }
  return (await fontRegistrationPromise) ? 'LiberationSans' : 'helvetica';
}

/** Builds a one/two-page PDF summary of a cost estimate and triggers a
 * browser download - no server round-trip, since everything needed is
 * already in the `FinalEstimate` the frontend already has in memory. */
export async function downloadEstimatePdf(result: FinalEstimate): Promise<void> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const fontName = await ensureUnicodeFont(doc);
  const marginX = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - marginX * 2;
  let y = 56;

  function ensureSpace(next: number) {
    if (y + next > pageHeight - 56) {
      doc.addPage();
      y = 56;
    }
  }

  function heading(text: string, size = 13) {
    ensureSpace(size + 10);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(size);
    doc.setTextColor('#0F172A');
    doc.text(text, marginX, y);
    y += size + 8;
  }

  function line(text: string, opts: { bold?: boolean; size?: number; color?: string } = {}) {
    const { bold = false, size = 10.5, color = '#0F172A' } = opts;
    ensureSpace(size + 6);
    doc.setFont(fontName, bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);
    doc.text(text, marginX, y);
    y += size + 6;
  }

  function paragraph(text: string, size = 10, color = '#334155') {
    doc.setFont(fontName, 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);
    const wrapped: string[] = doc.splitTextToSize(text, contentWidth);
    for (const wrappedLine of wrapped) {
      ensureSpace(size + 4);
      doc.text(wrappedLine, marginX, y);
      y += size + 4;
    }
  }

  function spacer(height = 10) {
    y += height;
  }

  // Header
  doc.setFont(fontName, 'bold');
  doc.setFontSize(20);
  doc.setTextColor('#2563EB');
  doc.text('SmartCarCompare', marginX, y);
  y += 26;

  const { vehicle } = result;
  heading(`${vehicle.make} ${vehicle.model} (${vehicle.year})`, 15);

  const details = [
    `${vehicle.km.toLocaleString()} km`,
    fuelLabel(vehicle.fuel),
    `${vehicle.urban_percentage}% ${translate('field.urban')}`,
  ];
  if (vehicle.city) details.push(vehicle.city);
  if (vehicle.yearly_km) details.push(`${vehicle.yearly_km.toLocaleString()} km/${translate('period.annual').replace('/', '').trim()}`);
  line(details.join(' · '), { size: 10, color: '#475569' });
  spacer(6);

  heading(translate('results.title'));
  for (const item of result.cost_breakdown) {
    line(`${costLabel(item)}: ${formatAmount(item.amount, item.currency)}`);
  }
  line(
    `${costLabel(result.total_estimated_cost)}: ${formatAmount(result.total_estimated_cost.amount, result.total_estimated_cost.currency)}`,
    { bold: true, size: 11.5 },
  );
  spacer(4);
  line(`${translate('result.confidence')}: ${result.confidence}/10`);
  if (result.verification.verified) {
    const revisionsSuffix =
      result.verification.revisions > 0 ? ` (${result.verification.revisions} ${translate('result.revisions')})` : '';
    line(`${translate('result.verified')}${revisionsSuffix}`);
  }

  if (result.summary) {
    spacer(6);
    heading(translate('results.details'), 12);
    paragraph(result.summary);
  }

  if (result.engine.common_problems.length > 0) {
    spacer(8);
    heading(translate('problems.title'), 12);
    if (result.engine.motor_type) {
      line(result.engine.motor_type, { color: '#64748B' });
    }
    for (const problem of result.engine.common_problems) {
      ensureSpace(30);
      line(`${problem.title} — ${severityLabel(problem.severity)}`, { bold: true });
      if (problem.description) paragraph(problem.description);
      if (problem.estimated_cost_min > 0 || problem.estimated_cost_max > 0) {
        line(
          `${Math.round(problem.estimated_cost_min).toLocaleString()} – ${Math.round(problem.estimated_cost_max).toLocaleString()} RON`,
          { size: 9.5, color: '#64748B' },
        );
      }
      spacer(4);
    }
  }

  // Disclaimer box - always the last thing on the document, echoing the
  // on-page banner so the "not financial advice" notice survives export.
  spacer(14);
  const disclaimerText = translate('disclaimer.estimateOnly');
  doc.setFont(fontName, 'normal');
  doc.setFontSize(9.5);
  const disclaimerLines: string[] = doc.splitTextToSize(disclaimerText, contentWidth - 20);
  const boxHeight = disclaimerLines.length * 12 + 16;
  ensureSpace(boxHeight);
  const boxTop = y;
  doc.setDrawColor('#F97316');
  doc.setFillColor('#FFF7ED');
  doc.roundedRect(marginX, boxTop, contentWidth, boxHeight, 4, 4, 'FD');
  doc.setTextColor('#9A3412');
  let disclaimerY = boxTop + 16;
  for (const disclaimerLine of disclaimerLines) {
    doc.text(disclaimerLine, marginX + 10, disclaimerY);
    disclaimerY += 12;
  }
  y = boxTop + boxHeight;

  const filename = `SmartCarCompare-${safeFilenamePart(vehicle.make)}-${safeFilenamePart(vehicle.model)}-${vehicle.year}.pdf`;
  doc.save(filename);
}

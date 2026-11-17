import type { ArticleLang } from '@/lib/articles';

// Formatted in UTC so the server-rendered date matches the browser's,
// whatever time zone either runs in.
export function formatArticleDate(iso: string, lang: ArticleLang): string {
  return new Intl.DateTimeFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Stable anchor id for an article heading. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

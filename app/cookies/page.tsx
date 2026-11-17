import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';
import { LEGAL_DOCS } from '@/lib/legal';

const doc = LEGAL_DOCS.cookies.ro;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.intro,
  alternates: { canonical: '/cookies' },
};

export default function Page() {
  return <LegalDocument docKey="cookies" />;
}

import { Suspense } from 'react';
import CompareCalculator from '@/components/CompareCalculator';

export default function Page() {
  return (
    <Suspense>
      <CompareCalculator />
    </Suspense>
  );
}

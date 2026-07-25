import { Suspense } from 'react';
import CostCalculator from '@/components/CostCalculator';

export default function Page() {
  return (
    <Suspense>
      <CostCalculator />
    </Suspense>
  );
}

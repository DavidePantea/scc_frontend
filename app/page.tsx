import { Suspense } from 'react';
import CostCalculator from '@/components/CostCalculator';
import LatestArticles from '@/components/articles/LatestArticles';
import { sortedArticles, toSummary } from '@/lib/articles';

export default function Page() {
  return (
    <>
      <Suspense>
        <CostCalculator />
      </Suspense>
      <LatestArticles articles={sortedArticles().slice(0, 3).map(toSummary)} />
    </>
  );
}

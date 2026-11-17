import CostCalculator from '@/components/CostCalculator';
import HomeGuide from '@/components/HomeGuide';
import LatestArticles from '@/components/articles/LatestArticles';
import { sortedArticles, toSummary } from '@/lib/articles';

export default function Page() {
  return (
    <>
      <CostCalculator />
      <HomeGuide />
      <LatestArticles articles={sortedArticles().slice(0, 3).map(toSummary)} />
    </>
  );
}

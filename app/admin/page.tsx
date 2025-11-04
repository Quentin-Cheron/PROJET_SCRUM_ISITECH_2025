import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "@/components/ui/chart-area";
import { SeoClickRateCard, SeoKeywordRankingCard, SeoTrafficGrowthCard, SeoIndexedPagesCard, SeoTopKeywordsCard } from "@/components/ui/seo-cards";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-4xl p-4">
        <ChartAreaInteractive />
        <div className="grid gap-6 p-10 sm:grid-cols-2 lg:grid-cols-3">
          <SeoClickRateCard />
          <SeoKeywordRankingCard />
          <SeoTrafficGrowthCard />
          <SeoIndexedPagesCard />
          <SeoTopKeywordsCard />
        </div>
      </div>
    </div>
  );
}

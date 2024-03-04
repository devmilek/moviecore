import Hero from "@/components/hero";
import TrendingToday from "@/components/trending-today";
import UniversalFeed, {
  UniversalFeedSkeleton,
} from "@/components/universal-feed";
import { getPopularMovies, getTopRatedMovies } from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="space-y-12">
      <Hero />
      <TrendingToday />
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed heading="Popularne filmy" getFn={getPopularMovies} />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading="Najwyżej oceniane filmy"
          getFn={getTopRatedMovies}
        />
      </Suspense>
    </main>
  );
}

import Hero from "@/components/hero";
import MoviesWatchProvider from "@/components/movies-watch-providers";
import PopularPeople from "@/components/popular-people";
import TrendingToday from "@/components/trending-today";
import UniversalFeed, {
  UniversalFeedSkeleton,
} from "@/components/universal-feed";
import { getPopularMovies, getTopRatedMovies } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  const t = await getTranslations("Index");
  return (
    <main className="space-y-12">
      <Hero />
      <TrendingToday />
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed heading={t("popularMovies")} getFn={getPopularMovies} />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading={t("topRatedMovies")}
          getFn={getTopRatedMovies}
        />
      </Suspense>
      <PopularPeople />
      <MoviesWatchProvider />
    </main>
  );
}

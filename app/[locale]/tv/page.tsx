import { Button } from "@/components/ui/button";
import UniversalFeed, {
  UniversalFeedSkeleton,
} from "@/components/universal-feed";
import {
  getAiringToday,
  getOnTheAir,
  getPopularTv,
  getTopRatedTv,
} from "@/lib/data";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { GenreList, Timezone } from "@/types";
import { getLocale } from "next-intl/server";
import React, { Suspense } from "react";

const TvsPage = async () => {
  const locale = await getLocale();
  const genres: GenreList = await fetcher({
    url: "/genre/tv/list",
    options: [],
  });

  const timezones: Timezone[] = await fetcher({
    url: "/configuration/timezones",
    options: [],
  });

  const timezone = timezones.find(
    (timezone) => timezone.iso_3166_1.toLowerCase() === locale
  );

  return (
    <div className="space-y-12">
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed heading="Popularne seriale" getFn={getPopularTv} />
      </Suspense>
      <section className="p-6 bg-foreground/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Kategorie</h1>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {genres.genres.map((genre) => (
            <Button variant="outline" size="lg" key={genre.id} asChild>
              <Link href={`/movies/genre/${genre.id}`}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </section>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading="Najwyżej oceniane seriale"
          getFn={getTopRatedTv}
        />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading="Dzisiaj w telewizji"
          getFn={() => {
            return getAiringToday(timezone?.zones[0]);
          }}
        />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading="W trakcie emisji"
          getFn={() => {
            return getOnTheAir(timezone?.zones[0]);
          }}
        />
      </Suspense>
    </div>
  );
};

export default TvsPage;

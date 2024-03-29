import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import UniversalCard from "@/components/universal-card";
import UniversalFeed, {
  UniversalFeedSkeleton,
} from "@/components/universal-feed";
import {
  getNowPlaying,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/data";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { GenreList, Movie, MovieList } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React, { Suspense } from "react";

const MoviePage = async () => {
  const t = await getTranslations("Index");
  const genres: GenreList = await fetcher({
    url: "/genre/movie/list",
    options: [],
  });

  return (
    <div className="space-y-12">
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed heading={t("popularMovies")} getFn={getPopularMovies} />
      </Suspense>
      <section className="p-6 bg-foreground/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">{t("genres")}</h1>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {genres.genres.map((genre) => (
            <Button variant="outline" size="lg" key={genre.id} asChild>
              <Link href={`/movie/genre/${genre.id}`}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </section>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading={t("topRatedMovies")}
          getFn={getTopRatedMovies}
        />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed heading={t("nowInTheaters")} getFn={getNowPlaying} />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading={t("upcomingMovies")}
          getFn={getUpcomingMovies}
        />
      </Suspense>
    </div>
  );
};

export default MoviePage;

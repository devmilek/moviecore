import CollectionCard from "@/components/collection-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { Movie, MovieDetails } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import CastSection from "./_components/cast_section";
import { CalendarIcon, ClockIcon } from "lucide-react";
import WatchProviders from "@/components/watch_providers";
import VoteAverageCard from "@/components/vote-average-card";
import ReleaseDateCard from "@/components/release-date-card";
import RunTimeCard from "@/components/runtime-card";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import TrailerButton from "@/components/trailer-button";
import MediaSection from "./_components/media-section";
import UniversalFeed, {
  UniversalFeedSkeleton,
} from "@/components/universal-feed";
import MovieHeader from "./_components/movie-header";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    options: [],
  });
  return {
    title: movie.title,
    description: movie.overview,
    keywords: movie.genres.map((genre) => genre.name).join(", "),
    openGraph: {
      title: movie.title,
      description: movie.overview,
      type: "video.movie",
      images: [
        {
          url: getImage(movie.backdrop_path, "backdrop", "w780"),
          width: 500,
          height: 750,
          alt: movie.title,
        },
      ],
      tags: movie.genres.map((genre) => genre.name),
    },
  };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const t = await getTranslations("Index");
  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    options: [
      "append_to_response=credits,watch/providers,videos,similar,recommendations",
    ],
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div className="space-y-12">
      <div className="flex md:space-x-8">
        <section className="w-96 space-y-6 hidden md:block">
          <Image
            src={getImage(movie.poster_path, "poster", "w500")}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-xl w-full"
          />
          <WatchProviders watchProviders={movie["watch/providers"].results} />
          <VoteAverageCard voteAverage={movie.vote_average} />
          <ReleaseDateCard date={movie.release_date} />
          <RunTimeCard runtime={movie.runtime} />
        </section>
        <section className="w-full space-y-8">
          <MovieHeader movie={movie} />
          <div className="md:hidden space-y-4">
            <WatchProviders watchProviders={movie["watch/providers"].results} />
            <VoteAverageCard voteAverage={movie.vote_average} />
            <ReleaseDateCard date={movie.release_date} />
            <RunTimeCard runtime={movie.runtime} />
          </div>
          <CollectionCard collection={movie.belongs_to_collection} />
          <CastSection cast={movie.credits.cast} id={params.id} />
          <MediaSection movieId={params.id} />
        </section>
      </div>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading={t("recommendations")}
          getFn={() =>
            fetcher({
              url: `/movie/${params.id}/recommendations`,
              options: [],
            })
          }
        />
      </Suspense>
      <Suspense fallback={<UniversalFeedSkeleton />}>
        <UniversalFeed
          heading={t("simmilar")}
          getFn={() =>
            fetcher({
              url: `/movie/${params.id}/similar`,
              options: [],
            })
          }
        />
      </Suspense>
    </div>
  );
};

export default MoviePage;

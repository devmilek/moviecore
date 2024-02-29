import CollectionCard from "@/components/collection-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { getPoster } from "@/lib/utils";
import { Movie, MovieDetails } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import CastSection from "./_components/cast_section";
import { CalendarIcon, ClockIcon } from "lucide-react";
import WatchProviders from "@/components/watch_providers";
import VoteAverageCard from "@/components/vote-average-card";
import ReleaseDateCard from "@/components/release-date-card";
import RunTimeCard from "@/components/runtime-card";

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
    lang: "pl",
    options: [],
  });
  return {
    title: movie.title,
    description: movie.overview,
    keywords: movie.genres.map((genre) => genre.name).join(", "),
  };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    lang: "pl",
    options: ["append_to_response=credits,watch/providers"],
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-5">
        <Image
          src={getPoster(movie.poster_path, "w780")}
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
        <header>
          <h1 className="text-4xl font-bold">
            {movie.title}{" "}
            <span className="text-2xl font-semibold text-foreground/70">
              ({movie.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="gap-2 flex flex-wrap mt-4">
            {movie.genres.map((genre) => (
              <Badge variant="outline" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <Button className="mt-4">Zapisz na liście</Button>
        </header>
        <section>
          <h2 className="text-2xl font-bold mt-6">Opis</h2>
          <p className="text-sm text-muted-foreground mt-2">{movie.overview}</p>
        </section>
        <CollectionCard collection={movie.belongs_to_collection} />
        <CastSection cast={movie.credits.cast} />
      </section>
    </div>
  );
};

export default MoviePage;

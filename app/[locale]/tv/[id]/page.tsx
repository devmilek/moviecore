import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { TvDetails } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import SeasonSection from "./_components/seasons-section";
import { Metadata } from "next";
import VoteAverageCard from "@/components/vote-average-card";
import Link from "next/link";
import WatchProviders from "@/components/watch_providers";
import moment from "moment";
import ReleaseDateCard from "@/components/release-date-card";
import { getImage } from "@/lib/utils";

interface TvPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: TvPageProps): Promise<Metadata> {
  const tv: TvDetails = await fetcher({
    url: `/tv/${params.id}`,
    options: [],
  });
  return {
    title: tv.name,
    description: tv.overview,
    keywords: tv.genres.map((genre) => genre.name).join(", "),
    openGraph: {
      title: tv.name,
      description: tv.overview,
      type: "video.tv_show",
      images: [
        {
          url: getImage(tv.backdrop_path, "backdrop", "w780"),
          width: 500,
          height: 750,
          alt: tv.name,
        },
      ],
    },
  };
}

const TvPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const tv: TvDetails = await fetcher({
    url: `/tv/${params.id}`,
    options: ["append_to_response=watch/providers"],
  });

  if (!tv) {
    return notFound();
  }
  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-5">
        <Image
          src={getImage(tv.poster_path, "poster")}
          alt={tv.name}
          width={300}
          height={450}
          className="rounded-xl w-full"
        />
        <WatchProviders watchProviders={tv["watch/providers"].results} />
        <VoteAverageCard voteAverage={tv.vote_average} />
        <ReleaseDateCard date={tv.first_air_date} />
      </section>
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-4xl font-bold">
            {tv.name}{" "}
            <span className="text-2xl font-semibold text-foreground/70">
              ({tv.first_air_date.split("-")[0]})
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">{tv.tagline}</p>
          <div className="gap-2 flex flex-wrap mt-4">
            {tv.genres.map((genre) => (
              <Badge variant="outline" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <Button className="mt-4">Zapisz na liście</Button>
        </header>
        <section>
          <h2 className="text-2xl font-bold mt-6">Opis</h2>
          <p className="text-sm text-muted-foreground mt-2">{tv.overview}</p>
        </section>
        <SeasonSection seasons={tv.seasons} tvId={params.id} />
        {/* <CastSection cast={movie.credits.cast} /> * */}
      </section>
    </div>
  );
};

export default TvPage;

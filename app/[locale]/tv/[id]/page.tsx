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
import TvHeader from "./_components/tv-header";

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
    options: ["append_to_response=watch/providers,videos"],
  });

  if (!tv) {
    return notFound();
  }
  return (
    <div className="flex md:space-x-8">
      <section className="w-96 space-y-5 hidden md:block">
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
        <TvHeader tv={tv} />
        <div className="md:hidden space-y-4">
          <WatchProviders watchProviders={tv["watch/providers"].results} />
          <VoteAverageCard voteAverage={tv.vote_average} />
          <ReleaseDateCard date={tv.first_air_date} />
        </div>
        <SeasonSection seasons={tv.seasons} tvId={params.id} />
        {/* <CastSection cast={movie.credits.cast} /> * */}
      </section>
    </div>
  );
};

export default TvPage;

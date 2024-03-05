import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/fetcher";
import { SeasonDetails } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import EpisodeCard from "./_components/episode-card";
import { Metadata } from "next";
import { getImage } from "@/lib/utils";
import moment from "moment";

interface SeasonPageProps {
  params: {
    id: string;
    number: string;
  };
}

export async function generateMetadata({
  params,
}: SeasonPageProps): Promise<Metadata> {
  const season: SeasonDetails = await fetcher({
    url: `/tv/${params.id}/season/${params.number}`,
    options: [],
  });
  return {
    title: season.name,
    description: season.overview,
    keywords: season.episodes.map((episode) => episode.name).join(", "),
    openGraph: {
      title: season.name,
      description: season.overview,
      type: "video.tv_show",
      images: [
        {
          url: getImage(season.poster_path, "poster", "w500"),
          width: 500,
          height: 750,
          alt: season.name,
        },
      ],
    },
  };
}

const SeasonPage = async ({ params }: SeasonPageProps) => {
  const season: SeasonDetails = await fetcher({
    url: `/tv/${params.id}/season/${params.number}`,
    options: [],
  });
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center gap-4">
        <Image
          src={getImage(season.poster_path, "poster", "w780")}
          alt={season.name}
          width={300}
          height={450}
          className="rounded-xl w-60 hidden md:block"
        />
        <div className="w-full flex flex-col gap-4 md:gap-0">
          <div className="flex gap-4 items-center">
            <Image
              src={getImage(season.poster_path, "poster", "w154")}
              alt={season.name}
              width={300}
              height={450}
              className="rounded-xl w-20 md:hidden"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{season.name}</h1>
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="secondary">
                  <StarIcon className="h-3 w-3 mr-2" />
                  {season.vote_average}
                </Badge>
                <Badge variant="outline">
                  {season.episodes.length} odcinków
                </Badge>
                <Badge variant="outline">
                  {moment(season.air_date).format("LL")}
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-sm">{season.overview}</p>
        </div>
      </header>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Odcinki</h2>
        <ul className="space-y-6">
          {season.episodes.map((episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SeasonPage;

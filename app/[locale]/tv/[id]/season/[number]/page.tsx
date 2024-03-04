import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/fetcher";
import { SeasonDetails } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import EpisodeCard from "./_components/episode-card";
import { Metadata } from "next";
import { getImage } from "@/lib/utils";

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
    // description: movie.overview,
    // keywords: movie.genres.map((genre) => genre.name).join(", "),
  };
}

const SeasonPage = async ({ params }: SeasonPageProps) => {
  const season: SeasonDetails = await fetcher({
    url: `/tv/${params.id}/season/${params.number}`,
    options: [],
  });
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center space-x-4">
        <Image
          src={getImage(season.poster_path, "poster", "w780")}
          alt={season.name}
          width={300}
          height={450}
          className="rounded-xl w-60"
        />
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{season.name}</h1>
          <div className="flex space-x-2 mb-4">
            <Badge variant="secondary">
              <StarIcon className="h-3 w-3 mr-2" />
              {season.vote_average}
            </Badge>
            <Badge variant="outline">{season.episodes.length} odcinków</Badge>
            <Badge variant="outline">{season.air_date}</Badge>
          </div>
          <p>{season.overview}</p>
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

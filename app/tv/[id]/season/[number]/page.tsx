import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/fetcher";
import { getPoster } from "@/lib/utils";
import { SeasonDetails } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const SeasonPage = async ({
  params,
}: {
  params: {
    id: string;
    number: string;
  };
}) => {
  const season: SeasonDetails = await fetcher({
    url: `/tv/${params.id}/season/${params.number}`,
    lang: "pl",
    options: [],
  });
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center space-x-4">
        <Image
          src={getPoster(season.poster_path)}
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
            <li key={episode.id} className="flex items-center space-x-4">
              <Image
                src={getPoster(episode.still_path, "w780")}
                alt={episode.name}
                width={300}
                height={450}
                className="rounded-xl w-80"
              />
              <div>
                <h3 className="text-2xl font-bold">{episode.name}</h3>
                <div className="flex space-x-2 mt-2 mb-4">
                  <Badge variant="secondary">
                    <StarIcon className="h-3 w-3 mr-2" /> {episode.vote_average}
                  </Badge>
                  <Badge variant="outline">{episode.runtime} min</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {episode.overview}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SeasonPage;

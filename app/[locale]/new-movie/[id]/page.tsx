import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { getImage } from "@/lib/utils";
import { MovieDetails } from "@/types";
import { PlayIcon, StarIcon, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const NewMoviePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    options: ["append_to_response=videos,images,credits,watch/providers"],
  });

  function convertRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }

  return (
    <div className="relative">
      {/* BLURREDPOSTER */}
      <Image
        src={getImage(movie.poster_path, "poster", "w154")}
        alt={movie.title}
        height={1170}
        width={780}
        className="filter blur-[300px] absolute left-1/2 transform -translate-x-1/2 -z-10 -top-3/4 opacity-40"
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="space-x-2 text-muted-foreground mt-2">
            <span>{movie.release_date.split("-")[0]}</span>
            <span>·</span>
            <span>{convertRuntime(movie.runtime)}</span>
          </div>
        </div>
        <div className="space-x-2 flex">
          <Button variant="secondary">
            <StarIcon className="h-4 w-4 mr-2" />
            Rate
          </Button>
          <Button variant="secondary">
            <StarIcon className="h-4 w-4 mr-2" />
            {movie.vote_average.toFixed(1)}/10 ({movie.vote_count})
          </Button>
          <Button variant="secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            {movie.popularity.toFixed(0)}
          </Button>
        </div>
      </div>
      <div className="flex mt-8">
        <Image
          src={getImage(movie.poster_path, "poster", "w780")}
          alt={movie.title}
          height={1170}
          width={780}
          className="rounded-md aspect-[2/3] w-[calc(27.65%-12px)] flex-shrink-0 mr-6"
        />
        <div className="rounded-md aspect-video w-[calc(72.35%-12px)] flex-shrink-0 object-fill overflow-hidden relative">
          <Image
            src={getImage(movie.backdrop_path, "backdrop", "w1280")}
            alt={movie.title}
            height={720}
            width={1280}
          />
          <button className="rounded-full px-4 py-2 absolute z-10 bottom-8 left-8 bg-gray-400/15 flex items-center">
            <PlayIcon className="h-5 w-5 mr-2" />
            Trailer · {movie.videos.results[0].name}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[fit-content(100px),1fr] mt-10 gap-x-8 gap-y-4 max-w-4xl">
        <p className="text-lg font-semibold">Genres</p>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
        <p className="text-lg font-semibold">Plot</p>
        <p>{movie.overview}</p>
        <p className="text-lg font-semibold">Director</p>
      </div>
    </div>
  );
};

export default NewMoviePage;

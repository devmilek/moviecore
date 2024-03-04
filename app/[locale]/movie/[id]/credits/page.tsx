import CastCard from "@/components/cast-card";
import CrewCard from "@/components/crew-card";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { CastResponse, Crew, MovieDetails } from "@/types";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface MovieCastPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: MovieCastPageProps): Promise<Metadata> => {
  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    options: [],
  });
  return {
    title: `Obsada i załoga filmu ${movie.title}`,
    description: movie.overview,
    openGraph: {
      title: `Obsada i załoga filmu ${movie.title}`,
      description: movie.overview,
      type: "video.movie",
      images: [
        {
          url: getImage(movie.poster_path, "poster", "w500"),
          width: 500,
          height: 750,
          alt: movie.title,
        },
      ],
    },
  };
};

const MovieCastPage = async ({ params }: MovieCastPageProps) => {
  type SortedCrew = {
    [department: string]: Crew[];
  };

  const sortCrewByDepartment = (crew: Crew[]): SortedCrew => {
    const sortedCrew: SortedCrew = {};

    for (const member of crew) {
      if (!sortedCrew[member.department]) {
        sortedCrew[member.department] = [];
      }

      sortedCrew[member.department].push(member);
    }

    return sortedCrew;
  };

  const movie: MovieDetails = await fetcher({
    url: `/movie/${params.id}`,
    options: [],
  });

  const cast: CastResponse = await fetcher({
    url: `/movie/${params.id}/credits`,
    options: [],
  });

  const sortedByImage = cast.cast.sort((a, b) => {
    if (a.profile_path && !b.profile_path) {
      return -1;
    }
    if (!a.profile_path && b.profile_path) {
      return 1;
    }
    return 0;
  });

  const sortedCrew = sortCrewByDepartment(cast.crew);

  return (
    <div className="space-y-8">
      <header className="flex items-center space-x-4">
        <Image
          src={getImage(movie.poster_path, "poster", "w500")}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-xl w-60"
        />
        <div>
          <Button variant="outline" className="mb-4" asChild>
            <Link href={`/movie/${params.id}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Wróć do filmu
            </Link>
          </Button>
          <p className="text-muted-foreground text-lg">Obsada i załoga filmu</p>
          <h1 className="font-bold text-4xl">{movie.title}</h1>
          <p className="text-sm text-muted-foreground mt-4">{movie.overview}</p>
        </div>
      </header>
      <section>
        <h1 className="text-3xl font-bold mb-6">Obsada</h1>
        <div className="grid grid-cols-4 gap-4">
          {sortedByImage.map((actor) => (
            <CastCard cast={actor} key={actor.id} />
          ))}
        </div>
      </section>
      {Object.keys(sortedCrew).map((department) => (
        <section key={department}>
          <h1 className="text-3xl font-bold mb-6">{department}</h1>
          <div className="grid grid-cols-4 gap-4">
            {sortedCrew[department].map((member) => (
              <CrewCard crew={member} key={member.id} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MovieCastPage;

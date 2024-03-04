import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { Cast, CominedCredits, PersonDetails } from "@/types";
import { Calendar, HomeIcon, PersonStanding, Skull } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";

const PersonPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const person: PersonDetails = await fetcher({
    url: `/person/${params.id}`,
    options: ["append_to_response=combined_credits"],
  });

  const genderMap = {
    0: "Nieznana",
    1: "Kobieta",
    2: "Mężczyzna",
    3: "Niebinarna",
  };

  function sortByDate(data: CominedCredits[]): CominedCredits[] {
    return data.sort((a, b) => {
      if (!a.release_date && !a.first_air_date) {
        if (b.release_date || b.first_air_date) {
          return 1;
        }
        return 0;
      } else if (!b.release_date && !b.first_air_date) {
        return -1;
      }

      const dateA =
        a.media_type === "movie" ? a.release_date : a.first_air_date;
      const dateB =
        b.media_type === "movie" ? b.release_date : b.first_air_date;

      const parsedDateA = new Date(dateA!);
      const parsedDateB = new Date(dateB!);

      return parsedDateB.getTime() - parsedDateA.getTime();
    });
  }

  const sortedCreditsByDate = sortByDate(person.combined_credits.cast);

  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-8">
        <Image
          src={getImage(person.profile_path, "profile", "original")}
          alt={person.name}
          width={300}
          height={450}
          className="rounded-xl sticky top-20"
        />
      </section>
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <TooltipProvider delayDuration={0}>
              {/* Płeć */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">
                    <PersonStanding className="h-3 w-3 mr-2" />
                    {genderMap[person.gender]}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Płeć</TooltipContent>
              </Tooltip>
              {/* Data urodzenia */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-2" />
                    {moment(person.birthday).format("LL")}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Data urodzenia</TooltipContent>
              </Tooltip>
              {/* Data śmierci */}
              {person.deathday && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline">
                      <Skull className="h-3 w-3 mr-2" />
                      {moment(person.deathday).format("LL")}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Data śmierci</TooltipContent>
                </Tooltip>
              )}
              {/* Miejsce urodzenia */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">
                    <HomeIcon className="h-3 w-3 mr-2" />
                    {person.place_of_birth}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Miejsce urodzenia</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            {person.biography}
          </p>
        </header>
        <section>
          <h1 className="text-2xl font-bold mb-4">Aktorstwo</h1>
          <TimeLine casts={sortedCreditsByDate} />
        </section>
      </section>
    </div>
  );
};

const TimeLine = ({ casts }: { casts: CominedCredits[] }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {casts.map((cast) => (
        <TimeLineItem cast={cast} key={cast.id} />
      ))}
    </ol>
  );
};

const TimeLineItem = ({ cast }: { cast: CominedCredits }) => {
  return (
    <Link
      href={
        cast.media_type === "movie" ? `/movie/${cast.id}` : `/tv/${cast.id}`
      }
      className="mb-10 ms-4 block"
    >
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <div className="flex space-x-4 items-center">
        <Image
          src={getImage(cast.poster_path, "poster", "w185")}
          alt={cast.title || cast.name}
          width={150}
          height={225}
          className="rounded-xl"
        />
        <div className="w-full">
          <time className="text-xs text-muted-foreground">
            {cast.release_date || cast.first_air_date
              ? moment(
                  cast.media_type === "movie"
                    ? cast.release_date
                    : cast.first_air_date
                ).format("LL")
              : "Nieznana data"}
          </time>
          <h3 className="font-bold text-xl">
            {cast.media_type === "movie" ? cast.title : cast.name}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground mt-2">
            {cast.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PersonPage;

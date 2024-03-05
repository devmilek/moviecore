import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { Seasons } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const SeasonSection = ({
  seasons,
  tvId,
}: {
  seasons: Seasons[];
  tvId: string;
}) => {
  if (!seasons) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Sezony</h2>
      <ul className="space-y-6 md:space-y-4">
        {seasons.map((season) => (
          <li
            key={season.id}
            className="flex flex-col md:flex-row items-center space-x-4"
          >
            <Image
              src={getImage(season.poster_path, "poster", "w780")}
              alt={season.name}
              width={300}
              height={450}
              className="rounded-xl w-52 hidden md:block"
            />
            <div className="w-full">
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <Image
                  src={getImage(season.poster_path, "poster", "w154")}
                  alt={season.name}
                  width={300}
                  height={450}
                  className="rounded-xl w-20 md:hidden"
                />
                <div>
                  <Link
                    href={`/tv/${tvId}/season/${season.season_number}`}
                    className="text-2xl font-bold"
                  >
                    {season.name}
                  </Link>
                  <div className="flex space-x-2 mt-2 mb-4">
                    <Badge variant="secondary">
                      <StarIcon className="h-3 w-3 mr-2" />{" "}
                      {season.vote_average === 0
                        ? "Brak ocen"
                        : season.vote_average.toPrecision(2)}
                    </Badge>
                    <Badge variant="outline">
                      {season.episode_count} odcinków
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{season.overview}</p>
              {/* <div>Najnowszy odcinek: {season.}</div> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SeasonSection;

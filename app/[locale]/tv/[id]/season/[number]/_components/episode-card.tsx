import { Badge } from "@/components/ui/badge";
import { getImage } from "@/lib/utils";
import { Episode } from "@/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const EpisodeCard = ({ episode }: { episode: Episode }) => {
  return (
    <li
      key={episode.id}
      className="flex items-center flex-col gap-4 md:flex-row"
    >
      {episode.still_path ? (
        <Image
          src={getImage(episode.still_path, "still", "original")}
          alt={episode.name}
          width={640}
          height={360}
          className="rounded-xl w-96 aspect-video flex-shrink-0"
        />
      ) : (
        <div className="rounded-xl w-96 aspect-video flex-shrink-0"></div>
      )}
      <div className="w-full">
        <h3 className="text-2xl font-bold">{episode.name}</h3>
        <div className="flex space-x-2 mt-2 mb-4">
          <Badge variant="secondary">
            <StarIcon className="h-3 w-3 mr-2" />{" "}
            {episode.vote_average === 0
              ? "Brak ocen"
              : episode.vote_average.toPrecision(2)}
          </Badge>
          <Badge variant="outline">{episode.runtime} min</Badge>
        </div>
        <p className="text-muted-foreground text-sm">{episode.overview}</p>
      </div>
    </li>
  );
};

export default EpisodeCard;

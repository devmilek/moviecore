import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { Cast } from "@/types";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const CastCard = ({ cast }: { cast: Cast }) => {
  return (
    <article key={cast.id}>
      <Link href={`/people/${cast.id}`} className="flex items-center space-x-4">
        {cast.profile_path ? (
          <Image
            src={getImage(cast.profile_path, "profile", "w185")}
            alt={cast.name}
            width={100}
            height={150}
            className="rounded-xl"
          />
        ) : (
          <div className="aspect-[2/3] w-[100px] rounded-xl bg-foreground/10 h-full flex items-center justify-center">
            <UserIcon className="h-4 w-4" />
          </div>
        )}
        <div>
          <h2 className="font-semibold">{cast.name}</h2>
          <p className="text-sm text-muted-foreground">jako {cast.character}</p>
        </div>
      </Link>
    </article>
  );
};

export default CastCard;

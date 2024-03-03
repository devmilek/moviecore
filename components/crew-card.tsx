import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { Cast, Crew } from "@/types";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const CrewCard = ({ crew }: { crew: Crew }) => {
  return (
    <article key={crew.id}>
      <Link href={`/person/${crew.id}`} className="flex items-center space-x-4">
        {crew.profile_path ? (
          <Image
            src={getImage(crew.profile_path, "profile", "w185")}
            alt={crew.name}
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
          <h2 className="font-semibold">{crew.name}</h2>
          <p className="text-sm text-muted-foreground">{crew.job}</p>
        </div>
      </Link>
    </article>
  );
};

export default CrewCard;

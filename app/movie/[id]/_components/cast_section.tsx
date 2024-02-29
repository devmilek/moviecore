import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPoster } from "@/lib/utils";
import { Cast } from "@/types";
import { PlusIcon, UserIcon } from "lucide-react";

const CastSection = ({ cast }: { cast: Cast[] | null }) => {
  if (!cast) return null;

  const castLimit = 8;

  return (
    <section>
      <h2 className="text-2xl font-bold mt-6">Obsada</h2>
      <ul className="mt-4 grid grid-cols-3 gap-4">
        {cast.slice(0, castLimit).map((actor) => (
          <li key={actor.id}>
            <Link
              href={`/person/${actor.id}`}
              className="flex items-center space-x-4"
            >
              {actor.profile_path ? (
                <Image
                  src={getPoster(actor.profile_path, "w300")}
                  alt={actor.name}
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
                <h2 className="font-semibold">{actor.name}</h2>
                <p className="text-sm text-muted-foreground">
                  jako {actor.character}
                </p>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={`/movie/${cast[0].id}/cast`}
            className="flex items-center space-x-4"
          >
            <div className="aspect-[2/3] w-[100px] rounded-xl bg-foreground/10 h-full flex items-center justify-center">
              <PlusIcon className="h-4 w-4" />
              <p>{cast.length - castLimit}</p>
            </div>
            <div>
              <h2 className="font-semibold">Pełna obsada</h2>
              <p className="text-sm text-muted-foreground">
                Zobacz całą obsadę
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default CastSection;

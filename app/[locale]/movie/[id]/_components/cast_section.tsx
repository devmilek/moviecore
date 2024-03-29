import React from "react";
import Image from "next/image";
import { Cast } from "@/types";
import { PlusIcon, UserIcon } from "lucide-react";
import { getImage } from "@/lib/utils";
import { Link } from "@/lib/navigation";
import CastCard from "@/components/cast-card";
import { getTranslations } from "next-intl/server";

const CastSection = async ({
  cast,
  id,
}: {
  cast: Cast[] | null;
  id: string;
}) => {
  const t = await getTranslations("Index");
  if (!cast) return null;

  const castLimit = 8;

  return (
    <section>
      <h2 className="text-2xl font-bold mt-6">Obsada</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cast.slice(0, castLimit).map((actor) => (
          <CastCard cast={actor} key={actor.id} />
        ))}
        <article>
          <Link
            href={`/movie/${id}/credits`}
            className="flex items-center space-x-4"
          >
            <div className="aspect-[2/3] w-[100px] rounded-xl bg-foreground/10 h-full flex items-center justify-center">
              <PlusIcon className="h-4 w-4" />
              <p>{cast.length - castLimit}</p>
            </div>
            <div>
              <h2 className="font-semibold">{t("fullCastAndCrew")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("seeAllCastAndCrew")}
              </p>
            </div>
          </Link>
        </article>
      </div>
    </section>
  );
};

export default CastSection;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/fetcher";
import { getImage } from "@/lib/utils";
import { ImagesResponse } from "@/types";
import { PlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const MediaSection = async ({ movieId }: { movieId: string }) => {
  const t = await getTranslations("Index");
  const media: ImagesResponse = await fetcher({
    url: `/movie/${movieId}/images`,
    options: ["include_image_language=null"],
  });

  const maxBackdrops = 3;
  const maxPosters = 7;

  return (
    <section>
      <Tabs defaultValue="backdrops">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Media</h1>
          <TabsList>
            <TabsTrigger value="backdrops">
              {t("backdrops")} ({media.backdrops.length})
            </TabsTrigger>
            <TabsTrigger value="posters">
              {t("posters")} ({media.posters.length})
            </TabsTrigger>
          </TabsList>
        </header>
        <TabsContent value="backdrops">
          <div className="grid sm:grid-cols-2 gap-4">
            {media.backdrops.slice(0, maxBackdrops).map((backdrop) => (
              <Image
                key={backdrop.file_path}
                src={getImage(backdrop.file_path, "backdrop", "w780")}
                alt=""
                width={780}
                height={439}
                className="rounded-md w-full aspect-video"
              />
            ))}
            {media.backdrops.length > maxBackdrops && (
              <button className="bg-foreground/10 aspect-video rounded-md text-center flex items-center justify-center flex-col">
                <PlusIcon className="w-8 h-8 text-muted-foreground" />
                <span className="mt-2">{t("seeAllBackdrops")}</span>
              </button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="posters">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {media.posters.slice(0, maxPosters).map((poster) => (
              <Image
                key={poster.file_path}
                src={getImage(poster.file_path, "poster", "w500")}
                alt=""
                width={500}
                height={750}
                className="rounded-md w-full aspect-[2/3]"
              />
            ))}
            {media.posters.length > maxPosters && (
              <button className="bg-foreground/10 aspect-[2/3] rounded-md text-center flex items-center justify-center flex-col">
                <PlusIcon className="w-8 h-8 text-muted-foreground" />
                <span className="mt-2">{t("seeAllPosters")}</span>
              </button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MediaSection;

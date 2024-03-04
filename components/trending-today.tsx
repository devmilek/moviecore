import { fetcher } from "@/lib/fetcher";
import { cn, getImage } from "@/lib/utils";
import { MultiSearchResult, MultiSearchResults } from "@/types";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { IBM_Plex_Mono } from "next/font/google";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["700"],
});

const TrendingToday = async () => {
  const t = await getTranslations("Index");
  const trendingToday: MultiSearchResults = await fetcher({
    url: "/trending/all/day",
    options: [],
  });
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{t("trending")}</h1>
      </header>
      <Carousel
        className=""
        opts={{
          dragFree: true,
        }}
      >
        <CarouselContent className="">
          {trendingToday.results.slice(0, 9).map((item, index) => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 sm:basis-1/4 md:basis-1/5 pl-10"
            >
              <TrendingCard key={item.id} item={item} index={index + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const TrendingCard = ({
  item,
  index,
}: {
  item: MultiSearchResult;
  index: number;
}) => {
  return (
    <Link
      className="w-full justify-start relative items-end block"
      href={
        item.media_type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`
      }
    >
      <span className="absolute bg-primary rounded-full w-10 h-10 flex items-center justify-center font-bold -left-5 -top-2">
        {index}
      </span>
      <Image
        src={getImage(item.poster_path, "poster", "w780")}
        alt={item.title}
        width={300}
        height={450}
        className="rounded-lg shadow-lg w-full"
      />
    </Link>
  );
};

export default TrendingToday;

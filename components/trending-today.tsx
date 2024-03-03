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

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["700"],
});

const TrendingToday = async () => {
  const trendingToday: MultiSearchResults = await fetcher({
    url: "/trending/all/day",
    options: [],
  });
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Trendujące dziś</h1>
      </header>
      <Carousel>
        <CarouselContent className="">
          {trendingToday.results.slice(0, 9).map((item, index) => (
            <CarouselItem key={item.id} className="basis-1/5 pl-6">
              <TrendingCard key={item.id} item={item} index={index + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
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
      className="w-full justify-start relative items-end pl-16 block"
      href={
        item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`
      }
    >
      <span
        className={cn(
          "font-bold text-9xl text-muted-foreground/20 absolute left-0 bottom-0 -z-10",
          mono.className
        )}
      >
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

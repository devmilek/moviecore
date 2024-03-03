import { MultiSearchResult, MultiSearchResults } from "@/types";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getImage } from "@/lib/utils";
import { Link } from "@/lib/navigation";

const SearchResults = ({
  results,
}: {
  results: MultiSearchResults | undefined;
}) => {
  if (!results) return null;

  const movies = results.results.filter(
    (result) => result.media_type === "movie"
  );
  const tvs = results.results.filter((result) => result.media_type === "tv");
  const people = results.results.filter(
    (result) => result.media_type === "person"
  );

  return (
    <ScrollArea className="h-[440px] mt-6 border bg-background rounded-lg">
      <div className="p-4 h-full scroll-auto space-y-6">
        <div>
          <h2 className="mb-2 font-medium text-foreground/90">Filmy</h2>
          <div className="grid grid-cols-4 gap-4">
            {movies.map((result) => (
              <Link key={result.id} href={`/${result.media_type}/${result.id}`}>
                {result.poster_path ? (
                  <Image
                    src={getImage(result.poster_path, "poster", "w342")}
                    alt={result.title}
                    width={100}
                    height={200}
                    className="w-full rounded-md aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="aspect-[2/3] relative flex items-end justify-start rounded-xl bg-foreground/5 p-4">
                    <ImageIcon className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <h2 className="text-xs">
                      {result.title}{" "}
                      <span className="text-muted-foreground">
                        ({result.media_type})
                      </span>
                    </h2>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-medium text-foreground/90">Seriale</h2>
          <div className="grid grid-cols-4 gap-4">
            {tvs.map((result) => (
              <Link key={result.id} href={`/${result.media_type}/${result.id}`}>
                {result.poster_path ? (
                  <Image
                    src={getImage(result.poster_path, "poster", "w342")}
                    alt={result.title}
                    width={100}
                    height={200}
                    className="w-full rounded-md aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="aspect-[2/3] relative flex items-end justify-start rounded-xl bg-foreground/5 p-4">
                    <ImageIcon className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <h2 className="text-xs">
                      {result.name}{" "}
                      <span className="text-muted-foreground">
                        ({result.media_type})
                      </span>
                    </h2>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-medium text-foreground/90">Osoby</h2>
          <div className="grid grid-cols-4 gap-4">
            {people.map((result) => (
              <Link key={result.id} href={`/${result.media_type}/${result.id}`}>
                <div>
                  {result.profile_path ? (
                    <Image
                      src={getImage(result.profile_path, "profile", "w185")}
                      alt={result.name}
                      width={100}
                      height={200}
                      className="w-full rounded-md aspect-[2/3] object-cover"
                    />
                  ) : (
                    <div className="aspect-[2/3] relative flex items-end justify-start rounded-xl bg-foreground/5 p-4">
                      <ImageIcon className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      <h2 className="text-xs">
                        {result.name}{" "}
                        <span className="text-muted-foreground">
                          ({result.media_type})
                        </span>
                      </h2>
                    </div>
                  )}
                  <p className="font-medium mt-2 text-xs">{result.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

const Card = ({ res }: { res: MultiSearchResult }) => {};

export default SearchResults;

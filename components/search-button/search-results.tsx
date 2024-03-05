import { MultiSearchResult, MultiSearchResults } from "@/types";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getImage } from "@/lib/utils";
import { Link, useRouter } from "@/lib/navigation";

const SearchResults = ({
  results,
  onSelect,
}: {
  results: MultiSearchResults | undefined;
  onSelect: () => void;
}) => {
  const router = useRouter();
  if (!results) return null;

  const handleSelect = (mediaType: string, id: string) => {
    router.push(`/${mediaType}/${id}`);
    onSelect();
  };

  return (
    <ScrollArea className="h-[440px] mt-6 border bg-background rounded-lg">
      <div className="p-4 h-full scroll-auto space-y-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {results.results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                handleSelect(result.media_type, result.id.toString());
              }}
            >
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
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const Card = ({ res }: { res: MultiSearchResult }) => {};

export default SearchResults;

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDebouncedCallback } from "use-debounce";
import { fetcher } from "@/lib/fetcher";
import { MultiSearchResults } from "@/types";
import SearchResults from "./search-results";

const SearchButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState<MultiSearchResults>();

  const handleSearch = useDebouncedCallback(async (value: string) => {
    const results: MultiSearchResults = await fetcher({
      url: `/search/multi`,
      options: [`query=${value}`],
    });

    setResults(results);
  }, 300);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setValue("");
          setResults(undefined);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button size="icon" variant="ghost">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-28 z-50 w-full max-w-xl translate-x-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-screen px-4">
          <div className="bg-background border rounded-lg px-4 relative">
            <SearchIcon className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 opacity-30" />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={value}
              placeholder="Wpisz wyszkiwana fraze..."
              className="bg-transparent w-full h-12 outline-none px-8"
            />
          </div>

          <SearchResults
            onSelect={() => {
              setIsOpen(false);
            }}
            results={results}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchButton;

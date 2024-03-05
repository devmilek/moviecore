import { Video } from "@/types";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const TrailerButton = async ({ video }: { video: Video }) => {
  const t = await getTranslations("Index");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlayIcon className="h-4 w-4 mr-2" /> {t("trailer")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <iframe
          className="w-full aspect-video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          frameBorder="0"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};

export default TrailerButton;

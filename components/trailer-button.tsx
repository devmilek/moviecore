import { Video } from "@/types";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const TrailerButton = ({ video }: { video: Video }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Zobacz zwiastun</Button>
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

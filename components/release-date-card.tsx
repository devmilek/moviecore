import moment from "moment";
import React from "react";

const ReleaseDateCard = ({ date }: { date: string }) => {
  return (
    <section>
      <h2 className="text-xl font-bold">Data premiery</h2>
      <p className="text-sm text-muted-foreground mt-2">
        {moment(date).locale("pl").format("LL")}
      </p>
    </section>
  );
};

export default ReleaseDateCard;

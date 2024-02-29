import React from "react";

const RunTimeCard = ({ runtime }: { runtime: number }) => {
  return (
    <section>
      <h2 className="text-xl font-bold">Czas trwania</h2>
      <p className="text-sm text-muted-foreground mt-2">{runtime} min</p>
    </section>
  );
};

export default RunTimeCard;

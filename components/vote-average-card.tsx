import { getTranslations } from "next-intl/server";
import React from "react";

const VoteAverageCard = async ({ voteAverage }: { voteAverage: number }) => {
  const t = await getTranslations("Index");
  if (!voteAverage) return null;

  const votes = voteAverage.toPrecision(2);

  return (
    <section>
      <h2 className="text-xl font-bold">{t("rating")}</h2>
      <p className="text-sm text-muted-foreground mt-2">{votes} / 10</p>
    </section>
  );
};

export default VoteAverageCard;

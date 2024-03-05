import moment from "moment";
import { getTranslations } from "next-intl/server";
import React from "react";

const ReleaseDateCard = async ({ date }: { date: string }) => {
  const t = await getTranslations("Index");
  return (
    <section>
      <h2 className="text-xl font-bold">{t("releaseDate")}</h2>
      <p className="text-sm text-muted-foreground mt-2">
        {moment(date).format("LL")}
      </p>
    </section>
  );
};

export default ReleaseDateCard;

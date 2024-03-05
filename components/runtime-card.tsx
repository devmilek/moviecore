import { getTranslations } from "next-intl/server";
import React from "react";

const RunTimeCard = async ({ runtime }: { runtime: number }) => {
  const t = await getTranslations("Index");
  return (
    <section>
      <h2 className="text-xl font-bold">{t("runtime")}</h2>
      <p className="text-sm text-muted-foreground mt-2">{runtime} min</p>
    </section>
  );
};

export default RunTimeCard;

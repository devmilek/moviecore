"use server";

export const fetcher = ({
  url,
  lang,
  options,
}: {
  url: string;
  lang: string;
  options: string[];
}) => {
  const langParam = "?language=" + lang;

  const optionsParam = options ? "&" + options.join("&") : "";

  console.log("https://api.themoviedb.org/3" + url + langParam + optionsParam);

  const res = fetch(
    "https://api.themoviedb.org/3" + url + langParam + optionsParam,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_SECRET_API_KEY}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  ).then((res) => res.json());

  // from console https://api.themoviedb.org/3/movie/1072790?append_to_response=credits?language=pl

  return res;
};

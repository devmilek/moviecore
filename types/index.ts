export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  departament: string;
  job: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface ProviderDetail {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface CountryData {
  link: string;
  buy?: ProviderDetail[];
  flatrate: ProviderDetail[];
  rent?: ProviderDetail[];
}

export interface CountryProviders {
  [countryCode: string]: CountryData;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  "watch/providers": {
    results: CountryProviders;
  };
  watch: any;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  };
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
}

export interface MultiSearchResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  relase_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MultiSearchResults {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}

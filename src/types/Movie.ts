export type MovieResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type GenreResponse = {
  genres: Genre[]
}

export type Genre = {
  id: number
  name: string
}

export type ProductionCompany = {
  id: number
  logo_path: any
  name: string
  origin_country: string
}

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type Featured = {
  id: number
  backdropPath: string
  title: string
  genres: Genre[]
  overview: string
  tagline: string
}

export type PopularMovie = {
  id: number
  posterPath: string
  title: string
  rating: number
}

export type MovieRelativeToGenre = {
  name: string
  data: Movie[]
}

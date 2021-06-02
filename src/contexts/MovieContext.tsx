import { createContext, ReactNode, useContext } from 'react'

import { api } from '../services/api'

import {
  Genre,
  MovieResponse,
  Result,
  GenreResponse,
  MovieDetails,
} from '../types/Movie'

import { Artist, ArtistResponse } from '../types/Artist'

interface IMovieProviderProps {
  children: ReactNode
}

interface MovieContextValue {
  mostPopularArtists?: Artist[]
  mostPopularMovies?: Result[]
  featuredMovie?: MovieDetails
  allGenres?: GenreResponse
  getMostPopularArtists: () => Promise<ArtistResponse>
  getAllGenres: () => Promise<GenreResponse>
  mapGenreIdsToGenreValues: (
    movies?: Result[],
    allGenres?: Genre[]
  ) => { genres: (Genre | undefined)[] }[] | undefined
  getMostPopularMovies: (page?: number) => Promise<MovieResponse>
  getSingleMovie: (id: string) => Promise<MovieDetails>
  getSimilarMovies: (id: string) => Promise<MovieResponse>
}

const MovieContext = createContext({} as MovieContextValue)

export function MovieProvider({ children }: IMovieProviderProps) {
  async function getFeaturedMovie() {
    const { data } = await api.get<MovieDetails>('/movie/299536')
    return data
  }

  async function getMostPopularArtists() {
    const { data } = await api.get<ArtistResponse>(`/person/popular`)
    return data
  }

  async function getSingleMovie(id: string) {
    const { data } = await api.get<MovieDetails>(`/movie/${id}`)
    return data
  }

  async function getSimilarMovies(id: string) {
    const { data } = await api.get<MovieResponse>(`/movie/${id}/similar`)
    return data
  }

  async function getMostPopularMovies(page: number = 1) {
    const { data } = await api.get<MovieResponse>('/movie/popular', {
      params: { page },
    })
    return data
  }

  async function getAllGenres() {
    const { data } = await api.get<GenreResponse>('/genre/movie/list')
    return data
  }

  function mapGenreIdsToGenreValues(movies?: Result[], allGenres?: Genre[]) {
    if (!movies || movies == null) return

    const genres = movies?.map(({ genre_ids }) => {
      const genres = genre_ids.map((genreId) => {
        return allGenres?.find(({ id }) => id === genreId)
      })
      return {
        genres,
      }
    })

    return genres
  }

  // function formatMovies(movies: Result[] | undefined) {
  //   const topMovies = sliceArray(movies, 0, 3)
  //   const formattedMovies = mapGenreIdsToGenreValues(topMovies)

  //   return formattedMovies
  // }

  return (
    <MovieContext.Provider
      value={{
        getMostPopularArtists,
        getAllGenres,
        mapGenreIdsToGenreValues,
        getMostPopularMovies,

        getSingleMovie,
        getSimilarMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  return useContext(MovieContext)
}

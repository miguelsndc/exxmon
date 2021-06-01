import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '../services/api'

import {
  Genre,
  MovieResponse,
  Result,
  GenreResponse,
  MovieDetails,
} from '../types/Movie'

import { Loading } from '../components/Loading'
import { Wrapper } from '../styles/globals'

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
  setMostPopularMovies: (
    value: React.SetStateAction<Result[] | undefined>
  ) => void
}

const MovieContext = createContext({} as MovieContextValue)

export function MovieProvider({ children }: IMovieProviderProps) {
  const [mostPopularArtists, setMostPopularArtists] = useState<Artist[]>()
  const [mostPopularMovies, setMostPopularMovies] = useState<Result[]>()
  const [featuredMovie, setFeaturedMovie] = useState<MovieDetails>()
  const [allGenres, setAllGenres] = useState<GenreResponse>()
  const [isLoading, setIsLoading] = useState(true)

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

  const fetchInitialValues = useCallback(async () => {
    const featuredMovie = await getFeaturedMovie()
    setFeaturedMovie(featuredMovie)

    const mostPopularArtists = await getMostPopularArtists()
    console.log(mostPopularArtists)
    setMostPopularArtists(mostPopularArtists.results)

    const mostPopularMovies = await getMostPopularMovies()
    setMostPopularMovies(mostPopularMovies.results)

    const allGenres = await getAllGenres()
    setAllGenres(allGenres)

    setTimeout(() => {
      setIsLoading(false)
    }, 1200)
  }, [])

  // function formatMovies(movies: Result[] | undefined) {
  //   const topMovies = sliceArray(movies, 0, 3)
  //   const formattedMovies = mapGenreIdsToGenreValues(topMovies)

  //   return formattedMovies
  // }

  useEffect(() => {
    fetchInitialValues()
  }, [fetchInitialValues])

  return (
    <MovieContext.Provider
      value={{
        getMostPopularArtists,
        getAllGenres,
        mapGenreIdsToGenreValues,
        getMostPopularMovies,
        mostPopularArtists,
        mostPopularMovies,
        featuredMovie,
        allGenres,
        getSingleMovie,
        getSimilarMovies,
        setMostPopularMovies,
      }}
    >
      {isLoading ? (
        <Wrapper>
          <Loading />
        </Wrapper>
      ) : (
        children
      )}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  return useContext(MovieContext)
}

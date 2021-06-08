import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { HorizontalScrollSection } from '../components/HorizontalScroll'
import { Loading } from '../components/Loading'
import { useElementOnScreen } from '../hooks/useElementOnScreen'

import { api } from '../services/api'

import {
  Genre,
  GenreResponse,
  Movie,
  MovieDetails,
  MovieResponse,
} from '../types/Movie'

type Featured = {
  id: number
  backdropPath: string
  title: string
  genres: Genre[]
  overview: string
}

type PopularMovie = {
  id: number
  posterPath: string
  title: string
  rating: number
}

type FeedProps = {
  featuredMovie: Featured
  mostPopularMovies: PopularMovie[]
  topRatedMovies: PopularMovie[]
  genres: Genre[]
}

type dum = {
  name: string
  data: Movie[]
}

export default function Feed({
  featuredMovie,
  mostPopularMovies,
  topRatedMovies,
  genres,
}: FeedProps) {
  const [movies, setMovies] = useState<dum[]>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { elementRef, isVisible } = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  })

  async function getMovieByGenre(genre: { name: string; id: number }) {
    const movieRes = await api.get<MovieResponse>('/discover/movie', {
      params: {
        with_genres: genre.id,
      },
    })

    return { name: genre.name, data: movieRes.data.results }
  }

  const [genreIndex, setGenreIndex] = useState(0)

  useEffect(() => {
    if (isVisible && genreIndex < genres.length) {
      console.log(genreIndex)
      setIsLoading(true)
      getMovieByGenre(genres[genreIndex])
        .then((res) => {
          if (movies) {
            setMovies((prevMovies) => {
              return [...prevMovies, res]
            })
          } else {
            setMovies([res])
          }
          setGenreIndex((prevIndex) => prevIndex + 1)
        })
        .finally(() => {
          setIsLoading(false)

          sessionStorage.setItem(
            '@Exxmon/homePersistedState',
            JSON.stringify({
              genreIndex,
              movies,
            })
          )
        })
    }
  }, [isVisible])

  useEffect(() => {
    const data = sessionStorage.getItem('@Exxmon/homePersistedState')
    const persisted = JSON.parse(data)

    if (persisted) {
      setMovies(persisted.movies)
      setGenreIndex(persisted.genreIndex)
    }
  }, [])

  return (
    <section>
      <FeaturedMovie
        id={featuredMovie.id}
        backdropPath={featuredMovie.backdropPath}
        originalTitle={featuredMovie.title}
        genres={featuredMovie.genres}
        overview={featuredMovie.overview}
        hasCta
      />
      <HorizontalScrollSection title="Most Popular" path="/movies/popular">
        {mostPopularMovies.map((movie) => {
          return (
            <Card
              key={movie.id}
              backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              path={`/movies/${movie.id}`}
              name={movie.title}
              popularity={movie.rating}
            />
          )
        })}
      </HorizontalScrollSection>

      <HorizontalScrollSection title="Top Rated" path="/movies/popular">
        {topRatedMovies.map((movie) => {
          return (
            <Card
              key={movie.id}
              backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              path={`/movies/${movie.id}`}
              name={movie.title}
              popularity={movie.rating}
            />
          )
        })}
      </HorizontalScrollSection>

      {movies &&
        movies.map((movie) => {
          return (
            <HorizontalScrollSection
              title={movie.name}
              path="/movies/popular"
              key={movie.name}
            >
              {movie.data.map((movie) => {
                return (
                  <Card
                    key={movie.id}
                    backdropPath={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    path={`/movies/${movie.id}`}
                    name={movie.title}
                    popularity={movie.vote_average}
                  />
                )
              })}
            </HorizontalScrollSection>
          )
        })}
      <div ref={elementRef}>DDDDD</div>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Loading />
        </div>
      )}
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredMovieResponse = await api.get<MovieDetails>('/movie/337404')
  const mostPopularMoviesResponse = await api.get<MovieResponse>(
    '/movie/popular'
  )
  const topRatedMoviesResponse = await api.get<MovieResponse>(
    '/movie/top_rated'
  )
  const genreListRes = await api.get<GenreResponse>('/genre/movie/list')

  const featuredMovie = {
    id: featuredMovieResponse.data.id,
    backdropPath: featuredMovieResponse.data.backdrop_path,
    title:
      featuredMovieResponse.data.title ||
      featuredMovieResponse.data.original_title,
    genres: featuredMovieResponse.data.genres,
    overview: featuredMovieResponse.data.overview,
  }

  const mostPopularMovies = mostPopularMoviesResponse.data.results.map(
    (movie) => {
      return {
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title || movie.original_title,
        rating: movie.vote_average,
      }
    }
  )

  const topRatedMovies = topRatedMoviesResponse.data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
    }
  })

  const genres = genreListRes.data.genres

  return {
    props: { featuredMovie, mostPopularMovies, topRatedMovies, genres },
  }
}

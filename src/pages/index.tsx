import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { HorizontalScrollSection } from '../components/HorizontalScroll'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { Loading } from '../components/Loading'
import { Card } from '../components/Card'

import { useElementOnScreen } from '../hooks/useElementOnScreen'

import { Footer } from '../styles/pages/Home'
import { CtaButton } from '../styles/shared'

import { api } from '../services/api'

import {
  GenreResponse,
  MovieDetails,
  MovieResponse,
  Featured,
  PopularMovie,
  MovieRelativeToGenre,
  Genre,
} from '../types/Movie'

type FeedProps = {
  featuredMovie: Featured
  mostPopularMovies: PopularMovie[]
  topRatedMovies: PopularMovie[]
  genres: Genre[]
}

const ObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

const scrollOptions: ScrollToOptions = {
  top: 0,
  behavior: 'smooth',
}

export default function Feed({
  featuredMovie,
  mostPopularMovies,
  topRatedMovies,
  genres,
}: FeedProps) {
  const [movies, setMovies] = useState<MovieRelativeToGenre[]>([])
  const [canFetch, setCanFetch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [genreIndex, setGenreIndex] = useState(0)

  const { elementRef, isVisible } = useElementOnScreen(ObserverOptions)

  function scrollTop() {
    window.scrollTo(scrollOptions)
  }

  async function getMovieByGenre(genre: Genre) {
    const movieRes = await api.get<MovieResponse>('/discover/movie', {
      params: {
        with_genres: genre.id,
      },
    })

    return { name: genre.name, data: movieRes.data.results }
  }

  async function getNextMovies() {
    setIsLoading(true)
    setCanFetch(false)

    const res = await getMovieByGenre(genres[genreIndex])

    setGenreIndex((prevIndex) => prevIndex + 1)

    movies
      ? setMovies((prevMovies) => {
          return [...prevMovies, res]
        })
      : setMovies([res])

    setIsLoading(false)

    sessionStorage.setItem(
      '@Exxmon/homePersistedState',
      JSON.stringify({
        genreIndex,
        movies,
      })
    )

    setTimeout(() => {
      setCanFetch(true)
    }, 70)
  }

  useEffect(() => {
    const data = sessionStorage.getItem('@Exxmon/homePersistedState')
    const persisted = JSON.parse(data)

    if (persisted) {
      setMovies(persisted.movies)
      setGenreIndex(persisted.genreIndex)
    }
  }, [])

  useEffect(() => {
    if (isVisible && genreIndex < genres.length && canFetch) {
      getNextMovies()
    }
  }, [isVisible])

  return (
    <section>
      <FeaturedMovie
        id={featuredMovie.id}
        backdropPath={featuredMovie.backdropPath}
        originalTitle={featuredMovie.title}
        genres={featuredMovie.genres}
        overview={featuredMovie.overview}
        tagline={featuredMovie.tagline}
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

      {movies.map((movie) => {
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
                  backdropPath={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  path={`/movies/${movie.id}`}
                  name={movie.title}
                  popularity={movie.vote_average}
                />
              )
            })}
          </HorizontalScrollSection>
        )
      })}
      <Footer>
        {isLoading && <Loading />}
        <div ref={elementRef}>
          <CtaButton onClick={scrollTop}>Go back to top</CtaButton>
        </div>
      </Footer>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredMovieResponse = await api.get<MovieDetails>('/movie/299536')
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
    tagline: featuredMovieResponse.data.tagline || 'No tagline',
  }

  const mostPopularMovies = mostPopularMoviesResponse.data.results.map(
    (movie) => {
      return {
        id: movie.id,
        posterPath: movie.backdrop_path,
        title: movie.title || movie.original_title,
        rating: movie.vote_average,
      }
    }
  )

  const topRatedMovies = topRatedMoviesResponse.data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.backdrop_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
    }
  })

  const genres = genreListRes.data.genres

  return {
    props: { featuredMovie, mostPopularMovies, topRatedMovies, genres },
    revalidate: 86400,
  }
}

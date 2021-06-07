import { GetStaticProps } from 'next'
import { Card } from '../components/Card'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { HorizontalScrollSection } from '../components/HorizontalScroll'

import { api } from '../services/api'

import { Genre, MovieDetails, MovieResponse } from '../types/Movie'

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
}

export default function Feed({ featuredMovie, mostPopularMovies }: FeedProps) {
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
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredMovieResponse = await api.get<MovieDetails>('/movie/337404')
  const mostPopularMoviesResponse = await api.get<MovieResponse>(
    '/movie/popular'
  )

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

  return {
    props: { featuredMovie, mostPopularMovies },
  }
}

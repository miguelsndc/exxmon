import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { HorizontalScrollSection } from '../../components/HorizontalScroll'
import { Loading } from '../../components/Loading'
import { Card } from '../../components/Card'
import { FeaturedMovie } from '../../components/FeaturedMovie'

import { Genre, MovieDetails, MovieResponse } from '../../types/Movie'

import { api } from '../../services/api'

import { CtaButton } from '../../styles/shared'
import { MoviePoster, ResultsNotFound } from '../../styles/pages/Id'

import Link from 'next/link'

type SimilarMovie = {
  id: string
  posterPath: string
  title: string
  rating: number
}

type MovieDetailsProps = {
  releaseDate: string
  backdropPath: string
  posterPath: string
  title: string
  overview: string
  rating: number
  genres: Genre[]
  status: string
}

type Params = {
  movieDetails: MovieDetailsProps
  similarMovies: SimilarMovie[]
  recommendedMovies: SimilarMovie[]
}

export default function SpecificMovieDetails({
  movieDetails,
  similarMovies,
  recommendedMovies,
}: Params) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <section>
      <MoviePoster>
        <FeaturedMovie
          showOverview
          backdropPath={movieDetails.backdropPath}
          overview={movieDetails.overview}
          genres={movieDetails.genres}
          originalTitle={movieDetails.title}
          releaseDate={movieDetails.releaseDate}
          rating={movieDetails.rating}
        />
      </MoviePoster>

      {recommendedMovies.length ? (
        <HorizontalScrollSection
          title="Recommended Movies"
          path="/movies/popular"
        >
          {recommendedMovies?.map((movie) => {
            return (
              <Card
                key={movie.id}
                path={`/movies/${movie.id}`}
                name={movie.title}
                popularity={movie.rating}
                backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              />
            )
          })}
        </HorizontalScrollSection>
      ) : (
        <ResultsNotFound>
          Could not find any recommended movies for: "{movieDetails.title}"
          <Link href="/movies/popular">
            <CtaButton>Go back to Popular</CtaButton>
          </Link>
        </ResultsNotFound>
      )}

      {similarMovies.length ? (
        <HorizontalScrollSection title="Similar Movies" path="/movies/popular">
          {similarMovies?.map((movie) => {
            return (
              <Card
                key={movie.id}
                path={`/movies/${movie.id}`}
                name={movie.title}
                popularity={movie.rating}
                backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              />
            )
          })}
        </HorizontalScrollSection>
      ) : (
        <ResultsNotFound>
          Could not find any similar movies of: "{movieDetails.title}"
          <Link href="/movies/popular">
            <CtaButton>Go back to Popular</CtaButton>
          </Link>
        </ResultsNotFound>
      )}
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<MovieResponse>('/movie/popular')

  const paths = data.results.map((movie) => {
    return {
      params: {
        id: String(movie.id),
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const movieDetailsResponse = await api.get<MovieDetails>(`/movie/${id}`)
  const similarMoviesResponse = await api.get<MovieResponse>(
    `/movie/${id}/similar`
  )
  const recommendedMoviesResponse = await api.get<MovieResponse>(
    `/movie/${id}/recommendations`
  )

  const movieDetails = {
    releaseDate: movieDetailsResponse.data.release_date,
    backdropPath: movieDetailsResponse.data.backdrop_path,
    posterPath: movieDetailsResponse.data.poster_path,
    title:
      movieDetailsResponse.data.title ||
      movieDetailsResponse.data.original_title,
    overview: movieDetailsResponse.data.overview,
    rating: movieDetailsResponse.data.vote_average,
    genres: movieDetailsResponse.data.genres,
    status: movieDetailsResponse.data.status,
  }

  const similarMovies = similarMoviesResponse.data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.backdrop_path || movie.poster_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
    }
  })

  const recommendedMovies = recommendedMoviesResponse.data.results.map(
    (movie) => {
      return {
        id: movie.id,
        posterPath: movie.backdrop_path || movie.poster_path,
        title: movie.title || movie.original_title,
        rating: movie.vote_average,
      }
    }
  )

  return {
    props: { movieDetails, similarMovies, recommendedMovies },
  }
}
